    // store to the database
    // the rname should be different!
    let rest = new Restaurants({
        name: rname,
        tag: tag,
        address: {address1, address2, city, state, zipcode},
        contactInfo: {
            phoneNum, website
        },
        imgURL: req.file.filename,
        createDate: new Date(),
        editDate: new Date()
    });
    await rest.save();