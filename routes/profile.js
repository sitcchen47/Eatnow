var router = require('express').Router();
var multer = require('multer');
var path = require('path');
var DataModel = require('./model');
var fs = require('fs-extra');
var path = require("path");

var Restaurants = DataModel.Restaurants;

var upload = multer({
    dest: path.join(__dirname, "../public/images")
})

router.get('/', async function (req, res) {
    // if the loggedIn user is sellers
    let rests  = await Restaurants.find({});
    res.render('snippets/profile', {
        user: req.user,
        isSeller: true,
        rests: rests,
        partial: "addRestaurant-script"
    });
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
})

router.post('/upload', upload.single('restaurantPic'), async function (req, res) {
    const {rname, tag, phoneNum, website, address1, address2, city, state, zipcode} = req.body;
    console.log(req.body);
    // validation()

    // store to the database
    // the rname should be different!
    let rest = new Restaurants({
        name: rname,
        tag: tag,
        address: {address1, address2, city, state, zipcode},
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
        imgURL: rest.imgURL
    });
});

module.exports = router;