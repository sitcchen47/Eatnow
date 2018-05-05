var express = require("express");
var router = express.Router();
var DataModel = require('./model');

var Restaurants = DataModel.Restaurants;
var Comments = DataModel.Reviews;

var Middlewares = require("../config/middleware");

var getDate = require('../util/getDate').getDif;

router.get('/get/:id', async function(req, res) {
    let id = req.params.id;
    let rest = await Restaurants.findById(id);

    let comments = await Comments.find({belongtoRestaurant: rest.name});
    for (let comment of comments) {
        comment.time = getDate(comment.createDate);
    }
    
    res.render('snippets/comments', {
        user: req.user,
        rest,
        comments,
        partial: 'addComment-script'
    });
});

router.post('/post/:id', Middlewares.isLoggedin, async function(req, res) {
    let id = req.params.id;
    let { content } = req.body;

    let rest = await Restaurants.findById(id.trim());

    let comment = new Comments({
        belongtoRestaurant: rest.name,
        peopleWhoComment: req.user.name,
        isSeller: req.user.isSeller,
        content,
        createDate: new Date()
    });

    await comment.save();

    comment.time = getDate(comment.createDate);
    res.render('snippets/comment-section', {
        layout: null,
        comment
    });
});



module.exports = router;