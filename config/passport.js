var passport = require('passport');
let Strategy = require('passport-local').Strategy;

var allmodels = require('../routes/model');
var users = allmodels.Users;

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
    
    // serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中（在这里
    // 存到 session 中的是用户的 id）。在这里的 user 应为我们之前在 new
    // LocalStrategy (fution() { ... }) 中传递到回调函数 done 的参数 user 对象（从数据// 库中获取到的）
    passport.serializeUser(function(user, done) {
        done(null, user.name);
    });
    
    // deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据
    // 的对象，并将其封装到 req.user      
    passport.deserializeUser(function(username, done) {
        users.findOne({name: username}, function(err, user) {
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
        process.nextTick(function(){
                 users.findOne({name: username }, function(err, user) {
                 if(err) { return done(err);} 
                 if(!user) { return done(null, false, req.flash('loginMessage', 'No users found.'));}
                 if(!bcrypt.compareSync(password, user.hashedPassword)) 
                    { return done(null, false, req.flash('loginMessage', 'Wrong password.'));}                
                 return done(null, user);
                 });
             });   
     }));

     //sign up
     passport.use('signup',new Strategy({
         usernameField : 'name',
         passwordField : 'password',
         passReqToCallback : true    //lets us check if a user is logged in or not
     },
     function(req, username, password, done) {
         process.nextTick(function(){
                 // if the user is not already logged in:
                 if(!req.user) {
                    users.findOne({ name: username }, function(err, user) {
                         if(err) { return done(err); }
                         if(!user) { 
                             //create the user 
                             const s = req.body.radio[0].checked;
                             var newUser = new users({
                                name: username,
                                hashedPassword: generateHash(password),
                                isSeller: req.body.radio === "Seller",
                                createDate: new Date()
                             });
                            
                             newUser.save(function(err) {
                                 if(err) return done(err);
                                 return done(null, newUser);
                             })
                         } else {
                                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                         }
                    });
                 }
                 else {
                     //// user is logged in. Ignore signup.
                    return done(null, req.user);
                 }
             });       
     }));

};
