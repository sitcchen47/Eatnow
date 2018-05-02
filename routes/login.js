var router = require('express').Router();
var DataModel = require('./model');
var Restaurants = DataModel.Restaurants;
var Middlewares = require('../config/middleware');

var profileRouter = require("./profile");

module.exports = function(app, passport) {
    app.use('/profile', Middlewares.isLoggedin, profileRouter);
    
    //show home page
    app.get('/', async function(req, res, next) {
<<<<<<< HEAD
        res.render('index', { 
            title: 'EatNow',
=======
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
>>>>>>> 4083272bf6b3987cd6c6eac34879711cf51549f0
            partial: 'main-script'
        });
    });

    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
<<<<<<< HEAD

    //profile
    app.get('/profile', isLoggedIn, async function(req, res) {
        try{
            res.render('profile', {user : req.user});
        }catch(e){
            console.log(e);
            res.redirect('/');
        }
    });

    //login
    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });
=======
>>>>>>> 4083272bf6b3987cd6c6eac34879711cf51549f0
    
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
<<<<<<< HEAD

}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else 
        res.redirect('/login');
=======
>>>>>>> 4083272bf6b3987cd6c6eac34879711cf51549f0
}