var router = require('express').Router();
var xss = require("xss");
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
        let rests  = await Restaurants.find({owner: req.user.name}).sort('-createDate');
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
    const name = xss(req.body.name);
    const calories = xss(req.body.calories);

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
    const rname = xss(req.body.rname);
    const tag = xss(req.body.tag);
    const phoneNum = xss(req.body.phoneNum);
    const website = xss(req.body.website);
    const address1 = xss(req.body.address1);
    const address2 = xss(req.body.address2);
    const city = xss(req.body.city);
    const state = xss(req.body.state);
    const zipcode = xss(req.body.zipcode);
    const map = xss(req.body.map);
    // console.log(req.body);
    // validation()

    // store to the database
    // the rname should be different!
    let rest = new Restaurants({
        name: rname,
        owner: req.user.name,
        tag: tag,
        address: {address1, address2, city, state, zipcode},
        map: map,
        contactInfo: {
            phoneNum, website
        },
        imgURL: req.file.filename,
        createDate: new Date(),
        editDate: new Date(),
        dishes: []
    });
    console.log("false");
    await rest.save();
    console.log("success");

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