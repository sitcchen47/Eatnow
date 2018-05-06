var router = require('express').Router();
var multer = require('multer');
var path = require('path');
var DataModel = require('./model');
var fs = require('fs-extra');
var path = require("path");

// var createEle = require('../public/JavaScript/createEle');

var Restaurants = DataModel.Restaurants;

var upload = multer({
    dest: path.join(__dirname, "../public/images")
})

router.get('/', async function (req, res) {
    // if the loggedIn user is sellers
    if (req.user.isSeller) {
        let rests  = await Restaurants.find({owner: req.user.name});
        res.render('snippets/profile', {
            user: req.user,
            isSeller: true,
            rests: rests,
            partial: "addRestaurant-script"
        });
    } else {
        res.redirect('back');
    }   
});

router.get('/deleteRes/:id', async function(req, res) {
    let id = req.params.id;
    let rest;
    try {
        rest = await Restaurants.findOne({_id: id});
        await rest.remove();
    } catch (e) {
        console.log('error!!');
    }
    try {
        await fs.remove(path.join(__dirname, `../public/images/${rest.imgURL}`));
    } catch(e) {
        console.log(e);
    }
    res.status(200).send("Success.");
});

router.get('/view/:id', async function (req, res) {
    let id = req.params.id;
    let rest = await Restaurants.findById(id);
    console.log(rest);
    res.render('snippets/dishes', {
        user: req.user,
        rest: rest,
        partial: 'addDish-script'
    });
});

router.post('/uploadDish/:id', upload.single('dishPic'), async function(req, res) {
    const {name, calories} = req.body;
    const id = req.params.id;
    let rest = await Restaurants.findById(id);
    rest.dishes = rest.dishes || [];
    rest.dishes.push({
        name,
        imgURL: req.file.filename,
        calories,
        createDate: new Date()
    });
    await rest.save();

    res.send(`<img src="/images/${req.file.filename}" alt="" class="w-25">`);
});

router.post('/upload', upload.single('restaurantPic'), async function (req, res) {
    const {rname, tag, phoneNum, website, address1, address2, city, state, zipcode, map} = req.body;
    // console.log(req.body);
    // validation()

    // store to the database
    // the rname should be different!
    let rest = new Restaurants({
        name: rname,
        tag: tag,
        address: {address1, address2, city, state, zipcode},
        map: map,
        contactInfo: {
            phoneNum, website
        },
        imgURL: req.file.filename,
        createDate: new Date(),
        editDate: new Date()
    });
    await rest.save();

    // show on the page
    res.render('snippets/restaurants', {
        layout: null,
        _id: rest._id,
        name: rest.name,
        tag: rest.tag,
        address: rest.address,
        contactInfo: rest.contactInfo,
        imgURL: rest.imgURL,
        map: rest.map
    });
});

module.exports = router;