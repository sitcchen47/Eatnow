var router = require('express').Router();
var xss = require("xss");
var DataModel = require('./model');
var Restaurants = DataModel.Restaurants;
var Middlewares = require('../config/middleware');

var profileRouter = require("./profile");
var restaurantsRouter = require('./restaurants');

module.exports = function(app, passport) {
    app.use('/profile', Middlewares.isLoggedin, profileRouter);
    app.use('/restaurants', restaurantsRouter);
    //show home page
    app.get('/', async function(req, res, next) {
        let itRests = await Restaurants.find({"tag": "Italian"});
        let cnRests = await Restaurants.find({"tag": "Chinese"});
        // console.log(cnRests);
        let usRests = await Restaurants.find({"tag": "American"});
        let jpRests = await Restaurants.find({"tag": "Japanese"});
        let frRests = await Restaurants.find({"tag": "French"});
        
        // console.log(req.flash('loginMessage'));
        // console.log(req.flash('LoginError'));
        //let loginMessage = req.flash('loginMessage').length !== 0 ? req.flash('loginMessage') : req.flash('LoginError');
        // console.log(loginMessage);
        
        res.render('index', { 
            title: 'Eatnow',
            itRests,
            cnRests,
            usRests,
            jpRests,
            frRests,
            user: req.user,
            loginMessage : req.flash('loginMessage'),
            signupMessage: req.flash('signupMessage'),
            partial: 'main-script'
        });
    });

    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // log in
    app.post("/login", passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }));

    // sign up
    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/profile', 
        failureRedirect : '/', 
        failureFlash : true
    }));

    app.post('/search', async function(req, res) {
        let q = xss(req.body.q);
        let rest;
        try {
            rest = await Restaurants.findOne({name: q});
        } catch(e) {
            console.log(e);
            res.status(404).send("There is something wrong!");
        }
        if (rest) {
            res.redirect("restaurants/get/" + rest._id);
        } else {
            res.render('snippets/noRest', {
                message: "There is no Restaurant named ",
                name: q,
                partial: 'main-script'
            });
        }
    })
}
