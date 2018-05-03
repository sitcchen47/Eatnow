const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/EatnowTest");
mongoose.Promise = Promise;
/*
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
*/

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
    contactInfo: {
        "phoneNum": String,
        "website": String,
    },
    imgURL: String,
    dishes: [{
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

// async function run() {
//     let a = new Restaurants({
//         name: "djf"
//     });
//     await a.save();
//     let a1 = await Restaurants.findOne({name: 'djf'});
//     a1.dishes = a1.dishes || [];
//     a1.dishes.push({
//         calories: "12k",
//         imgURL: "fejf"
//     });

//     console.log(a1);
    
//     await a1.save();
//     console.log(await Restaurants.find({name: 'djf'}));
// }
// run();

// let seller1 = new Sellers({
//     name: "hhhhhhhh",
//     hashedPassword: "fdfasdf",
//     createDate: new Date()
// });
// async function run() {
//     // console.log(await Sellers.find({}));
// }
// run();

// async function test() {
//     Sellers.findById("5adfa8adfd4ac49a665c9f9a", (err, seller) => {
//         console.log(seller);
//     });
// }
// test();
