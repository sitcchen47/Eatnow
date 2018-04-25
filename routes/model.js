const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Eatnow");
mongoose.Promise = Promise;

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


module.exports = {
    Sellers,
    Customers,
    Restaurants,
    Reviews
};

/*
let seller1 = new Sellers({
    name: "hhhhhhhh",
    hashedPassword: "fdfasdf",
    createDate: new Date()
});
async function run() {
    await seller1.save();
    // console.log(await Sellers.find({}));
}
run();

async function test() {
    Sellers.findById("5adfa8adfd4ac49a665c9f9a", (err, seller) => {
        console.log(seller);
    });
}
test();
*/