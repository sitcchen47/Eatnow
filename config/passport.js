var passport = require('passport');

let Strategy = require('passport-local').Strategy;

var allmodels = require('../routes/model');
var sellers = allmodels.Sellers;
var customers = allmodels.Customers;

var bcrypt   = require('bcrypt-nodejs');

// generating a hash
const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
const validPassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
      
    passport.deserializeUser(function(id, done) {
        sellers.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    //login
     passport.use('login', new Strategy({
         usernameField : 'name',
         passwordField : 'password',
         passReqToCallback : true    //lets us check if a user is logged in or not
     },
     function(req, username, password, done) {

         /***** pending coding ******/
         var button = 'sellers';
         if(button === 'sellers') {
             process.nextTick(function(){
                 sellers.findOne({name: username }, function(err, user) {
                 if(err) { return done(err);}
                 if(!user) { return done(null, false, req.flash('loginMessage', 'No sellers found.'));}
                 if(!bcrypt.compareSync(password, user.hashedPassword)) 
                    { return done(null, false, req.flash('loginMessage', 'Wrong password.'));}
                 return done(null, user);
                 });
             });
         }
         else {
             process.nextTick(function(){
                 customers.findOne({name: username }, function(err, user) {
                 if(err) { return done(err);}
                 if(!user) { return done(null, false, req.flash('loginMessage', 'No sellers found.'));}
                 if(!bcrypt.compareSync(password, user.hashedPassword)) 
                    { return done(null, false, req.flash('loginMessage', 'Wrong password.'));}
                 return done(null, user);
                 });
             });
         }
     }));

     //sign up
     passport.use('signup',new Strategy({
         usernameField : 'name',
         passwordField : 'password',
         passReqToCallback : true    //lets us check if a user is logged in or not
     },
     function(req, username, password, done) {
  
         var button = 'sellers';
         if(button === 'sellers') {
             process.nextTick(function(){
                 if(!req.user) {
                    sellers.findOne({ name: username }, function(err, user) {
                         if(err) {return done(err);}
                         if(!user) { 
                             //create the user
                             var newSeller = new sellers({
                                name: username,
                                hashedPassword: generateHash(password),
                                createDate: new Date()
                             });
                            
                             newSeller.save(function(err) {
                                 if(err) return done(err);
                                 return done(null, newSeller);
                             })
                         }
                         return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                     });
                 }
             });
         }
         else {
             process.nextTick(function(){
                 if(!req.user) {
                    customers.findOne({name: username }, function(err, user) {
                         if(err) {return done(err);}
                         if(!user) {
                             //create the user
                             var newSeller = new customers({
                                name: username,
                                hashedPassword: generateHash(password),
                                createDate: new Date()
                             });
                            
                             newSeller.save(function(err) {
                                 if(err) return done(err);
                                 return done(null, newSeller);
                             })
                         }
                         return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                     });
                 }
             });
         }
     }));

};
