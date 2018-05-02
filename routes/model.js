const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Eatnow");
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
<<<<<<< HEAD
};
=======
};

// let seller1 = new Sellers({
//     name: "hhhhhhhh",
//     hashedPassword: "fdfasdf",
//     createDate: new Date()
// });
// async function run() {
//     await seller1.save();
//     // console.log(await Sellers.find({}));
// }
// run();

// async function test() {
//     Sellers.findById("5adfa8adfd4ac49a665c9f9a", (err, seller) => {
//         console.log(seller);
//     });
// }
// test();
>>>>>>> 4083272bf6b3987cd6c6eac34879711cf51549f0
