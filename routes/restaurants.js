var express = require("express");
var router = express.Router();
var DataModel = require('./model');

var Restaurants = DataModel.Restaurants;
var Comments = DataModel.Reviews;

var Middlewares = require("../config/middleware");

router.get('/get/:id', async function(req, res) {
    let id = req.params.id;
    let rest = await Restaurants.findById(id);

    let comments = await Comments.find({belongtoRestaurant: rest.name});
    res.render('snippets/comments', {
        user: req.user,
        rest,
        comments,
        partial: 'addComment-script'
    });
});

router.post('/post/:id', Middlewares.isLoggedin, async function(req, res) {
    let id = req.params.id;
    let rest = await Restaurants.findById(id);

    console.log("aaa");
    let { content } = req.body;
    let comment = new Comments({
        belongtoRestaurant: rest.name,
        peopleWhoComment: req.user.name,
        isSeller: req.user.isSeller,
        content,
        createDate: new Date()
    });
    await comment.save();
    res.render('snippets/comment-section', {
        layout: null,
        comment
    });
});



module.exports = router;