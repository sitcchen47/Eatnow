$().ready(function(){
    $("#profileForm").validate({
        
        rules : {
            InputPhoneNum : {
                required : true,
                isPhone : true
            },
            InputRName : {
                required : true,
                isName : true,
                minlength : 2
            },
            InputStreet : {
                required : true,
                isStreet : true
            },
            InputCity : {
                required : true,
                isCity : true
            }
        },
        messages: {
            InputRName: {
                required: "Please enter your restaurant name",
                minlength: "Your restaurant name must consist of at least two characters"
            },
            InputPhoneNum: {
                required: "Please input a proper phone number",
                isPhone: "The phone number is invalid"
            },
            InputStreet: {
                required: "Please input a proper street",
                isStreet: "The street is invalid"
            },
            InputCity: {
                required: "Please input a proper city",
                isCity: "The city is invalid" 
            }        
        }
    })
    
    //validate phone number
    jQuery.validator.addMethod("isPhone", function(value, element) {
        var length = value.length;
        return this.optional(element) || (/^\d{3}-\d{3}-\d{4}$/.test(value));
    }, "Please enter a valid phone number.");

    //validate restaurant name
    jQuery.validator.addMethod("isName", function(value, element) {
        return this.optional(element) || (value.length >= 2);
    }, "Your restaurant name must be at least two characters");

    //validate restaurant address
    jQuery.validator.addMethod("isStreet", function(value, element) {
        return this.optional(element) || (/^\d{1,}\s[A-Za-z]+\s[A-z]+$/.test(value));
    }, "Please enter a valid street");

    jQuery.validator.addMethod("isCity", function(value, element) {
        return this.optional(element) || (/[A-z]+/.test(value));
    }, "Please enter a valid city");

});