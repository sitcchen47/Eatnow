const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Eatnow");
mongoose.Promise = Promise;

var bcrypt   = require('bcrypt-nodejs');

const Sellers = mongoose.model("Sellers", {
    name: {
        type: String,
        require: true
    },
    hashedPassword: String,
	restaurantsID : [String],
	creatDate : Date
});

const Customers = mongoose.model("Customers", {
    name: {
        type: String,
        require: true 
    },
    hashedPassword: String,
    reviewsID: [String], // review._id
    createDate: Date  
});

const Restaurants = mongoose.model("Restaurants", {
    name: String,
    address: String,
    "contact info": {
        "phoneNum": String,
        "website": String,
    },
    imgURL: String,
    Dishes: {
        "_id": String,
        title: String,
        calories: Number,
        imgURL: String
    },
    createDate: Date
});

const Reviews = mongoose.model("Reviesws", {
    belongtoRestaurants: String, // restaurant._id
    belongtoCustomers: String, // customer._id
    content: String,
    createDate: Date
});

// generating a hash
generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = {
    Sellers,
    Customers,
    Restaurants,
    Reviews
};