const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Eatnow");
mongoose.Promise = Promise;

const Users = mongoose.model("Users", {
    name: {
        type: String,
        require: true 
    },
    isSeller: Boolean,
    hashedPassword: String,
    reviewsID: [String], // review._id
    restaurantsID : [String],
    createDate: Date  
});

const Restaurants = mongoose.model("Restaurants", {
    name: String,
    tag: String,
    owner : String,
    map : String,
    address: {
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipcode: String
    },
    contactInfo: {
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
    createDate: Date,
    editDate: Date
});

const Reviews = mongoose.model("Reviesws", {
    belongtoRestaurants: String, // restaurant._id
    belongtoCustomers: String, // customer._id
    content: String,
    createDate: Date
});


module.exports = {
    Users,
    Restaurants,
    Reviews
};
