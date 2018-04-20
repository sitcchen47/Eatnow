const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Eatnow");
mongoose.Promise = Promise;

const Sellers = mongoose.model({
    name: {
        type: String,
        require: true
    },
    hashedPassword: String,
	restaurantsID : [String],
	creatDate : Date
});

const Customers = mongoose.model({
    name: {
        type: String,
        require: true 
    },
    hashedPassword: String,
    reviewsID: [String], // review._id
    createDate: Date  
}),

const Restaurants = mongoose.model({
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
}),

const Reviews = mongoose.model({
    belongtoRestaurants: String, // restaurant._id
    belongtoCustomers: String, // customer._id
    content: String,
    createDate: Date
});

module.exports = {
    Sellers,
    Customers,
    Restaurants,
    Reviews
};

