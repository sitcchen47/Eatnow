var router = require('express').Router();

var profileRouter = require("./profile");

module.exports = function(app, passport) {
    app.use('/profile', profileRouter);
    
    //show home page
    app.get('/', async function(req, res, next) {
        res.render('index', { 
            title: 'EatNow',
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
    
    app.post("/login", passport.authenticate('login', {
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
    else 
        res.redirect('/login');
}