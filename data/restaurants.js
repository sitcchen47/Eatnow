const restaurants = require("../dataDesign/restaurant");
var router = require('express').Router();
var multer = require('multer');
var path = require('path');
var DataModel = require('../routes/model');
var fs = require('fs-extra');
var path = require("path");
var restaurantsModel = DataModel.Restaurants;
var upload = multer({
    dest: path.join(__dirname, "../public/images")
})

for(let r of restaurants) {
    console.log(r.name);
    let rest = new restaurantsModel({
        name: r.name,
        tag: r.tag,
        address: r.address.split(','),
        contactInfo: {
            phoneNum: r.contactInfo.phoneNum,
            website: r.contactInfo.website
        },
        imgURL: r.imgURL,
        map : r.map,
        createDate: new Date(),
        editDate: new Date()
    });
    rest.save().then(() => {
        console.log('success');
    });
}


