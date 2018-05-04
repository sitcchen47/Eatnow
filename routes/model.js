const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/EatnowTest");
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
    owner: String,
    address: {
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipcode: String
    },
    map: Object,
    contactInfo: {
        "phoneNum": String,
        "website": String,
    },
    imgURL: String,
    dishes: [{
        name: String,
        calories: String,
        imgURL: String,
        createDate: Date,
        editDate: Date
    }], // Dish _id
    createDate: Date,
    editDate: Date
});

// const Dishes = mongoose.model("Dishes", {
//     calories: String,
//     imgURL: String,
//     createDate: Date,
//     editDate: Date
// });

const Reviews = mongoose.model("Reviews", {
    belongtoRestaurant: String, // restaurant._id
    peopleWhoComment: String, // customer._id
    isSeller: Boolean,
    content: String,
    createDate: Date
});

module.exports = {
    Users,
    Restaurants,
    Reviews
};