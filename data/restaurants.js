const restaurants = require("../dataDesign/restaurant");
var multer = require('multer');
var path = require('path');
var DataModel = require('../routes/model');
var restaurantsModel = DataModel.Restaurants;
var upload = multer({
    dest: path.join(__dirname, "../public/images")
})

for(let r of restaurants) {
    var addr = r.address.split(',');
    if(addr.length === 4) {
        addr.splice(1, 0, "");
    }
    let rest = new restaurantsModel({
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
        imgURL: r.imgURL,
        map : r.map,
        createDate: r.createDate,
        editDate: new Date()
    });
    rest.save().then(() => {
        console.log('success');
    });
}


