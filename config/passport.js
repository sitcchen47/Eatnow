var passport = require('passport');

let localStrategy = require('passport-local').Strategy;

var allmodels = require('../routes/model');
var sellers = allmodels.Sellers;
var customers = allmodels.Customers;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
      
    passport.deserializeUser(function(id, done) {
        users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //local login
    passport.use('login', new localStrategy({
        usernameField : 'name',
        passwordField : 'password',
        passReqToCallback : true    //lets us check if a user is logged in or not
    },
    function(req, name, password, done) {

        /***** pending coding ******/
        var button = 'sellers';
        if(button === 'sellers') {
            process.nextTick(function(){
                sellers.findOne({ 'name' : name}, function(err, user) {
                if(err) return done(err);
                if(!user) return done(null, false, req.flash('loginMessage', 'No sellers found.'));
                if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                else
                    return done(null, user);
                });
            });
        }
        else {
            process.nextTick(function(){
                customers.findOne({ 'name' : name}, function(err, user) {
                if(err) return done(err);
                if(!user) return done(null, false, req.flash('loginMessage', 'No users found.'));
                if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                else
                    return done(null, user);
                });
            });
        }
    }));

    //local sign up
    passport.use('signup', new localStrategy({
        usernameField : 'name',
        passwordField : 'password',
        passReqToCallback : true    //lets us check if a user is logged in or not
    },
    function(req, name, password, done) {
        
        /***** pending coding ******/
        var button = 'sellers';
        if(button === 'sellers') {
            process.nextTick(function(){
                if(!req.user) {
                    sellers.findOne({'name' : name}, function(err, user) {
                        if(err) return done(err);
                        if(user) {
                            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                        } 
                        else {
                            //create the user
                            var newSeller = new sellers();
                            newSeller.name = name;
                            newSeller.password = newSeller.generateHash(password);

                            newSeller.save(function(err) {
                                if(err) return done(err);
                                return done(null, newSeller);
                            })
                        }
                    });
                }
            });
        }
        else {
            process.nextTick(function(){
                if(!req.user) {
                    customers.findOne({'name' : name}, function(err, user) {
                        if(err) return done(err);
                        if(user) {
                            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                        } 
                        else {
                            //create the user
                            var newCustomer = new customers();
                            newCustomer.name = name;
                            newCustomer.password = newSeller.generateHash(password);

                            newCustomer.save(function(err) {
                                if(err) return done(err);
                                return done(null, newCustomer);
                            })
                        }
                    });
                }
            });
        }
    }));
};

