var router = require('express').Router();
var DataModel = require('./model');
var Restaurants = DataModel.Restaurants;

var profileRouter = require("./profile");

module.exports = function(app, passport) {
    app.use('/profile', profileRouter);
    
    //show home page
    app.get('/', async function(req, res, next) {
        let itRests = await Restaurants.find({"tag": "Italian"});
        let cnRests = await Restaurants.find({"tag": "Chinese"});
        console.log(cnRests);
        let usRests = await Restaurants.find({"tag": "American"});
        let inRests = await Restaurants.find({"tag": "Indian"});
        res.render('index', { 
            title: 'Express',
            itRests,
            cnRests,
            usRests,
            inRests,
            partial: 'main-script'
        });
    });

    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //profile
    app.get('/profile', isLoggedIn, async function(req, res) {
        res.render('profile');
    });

    //login
    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });
    
    app.post("/login", passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //sign up
    app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true
    }));

}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}