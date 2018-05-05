const restaurantsData = require("../dataDesign/restaurant");
const usersData = require("../dataDesign/users");
var multer = require('multer');
var path = require('path');
var upload = multer({
    dest: path.join(__dirname, "../public/images")
})
var DataModel = require('../routes/model');
var Restaurants = DataModel.Restaurants;
var Users = DataModel.Users;

for(let u of usersData) {
    let user = new Users({
        name: u.name,
        hashedPassword: u.hashedPassword,
        isSeller: u.isSeller,
        createDate: new Date()
    });
    user.save().then(() => {
        console.log('success');
    });
}

for(let r of restaurantsData) {    
    var addr = r.address.split(',');
    if(addr.length === 4) {
        addr.splice(1, 0, "");
    }
    let rest = new Restaurants({
        name: r.name,
        tag: r.tag,
        address: {
            address1: addr[0],
            address2: addr[1],
            city: addr[2],
            state: addr[3],
            zipcode: addr[4]
        },
        contactInfo: {
            phoneNum: r.contactInfo.phoneNum,
            website: r.contactInfo.website
        },
        dishes : r.Dishes,
        imgURL: r.imgURL,
        map : r.map,
        createDate: r.createDate,
        editDate: new Date()
    });
    rest.save().then(() => {
        console.log('success');
    });
}


