var router = require('express').Router();
var DataModel = require('./model');
var Restaurants = DataModel.Restaurants;
var Middlewares = require('../config/middleware');

var profileRouter = require("./profile");

module.exports = function(app, passport) {
    app.use('/profile', Middlewares.isLoggedin, profileRouter);
    
    //show home page
    app.get('/', async function(req, res, next) {
        let itRests = await Restaurants.find({"tag": "Italian"});
        let cnRests = await Restaurants.find({"tag": "Chinese"});
        // console.log(cnRests);
        let usRests = await Restaurants.find({"tag": "American"});
        let inRests = await Restaurants.find({"tag": "Indian"});
        res.render('index', { 
            title: 'Express',
            itRests,
            cnRests,
            usRests,
            inRests,
            loginMessage: req.flash('loginMessage'),
            SignupMessage: req.flash('signupMessage'),
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
}