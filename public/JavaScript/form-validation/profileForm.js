$().ready(function(){
    $("#profileForm").validate({
        
        rules : {
            rname : {
                required : true,
                minlength : 2
            },
            website : {
                required : true,
                isWebsite : true
            },
            phoneNum : {
                required : true,
                isPhone : true
            },
            address1 : {
                required : true,
                isStreet : true
            },
            address2 : {
                required : true
            },
            city : {
                required : true,
                isCity : true
            },
            zipcode : {
                required: true,
                len: true
            }   
        },
        messages: {
            rname: {
                required: "Please enter your restaurant name",
                minlength: "Your restaurant name must consist of at least two characters"
            }              
        }
    })
    $(':checkbox[type="checkbox"]').each(function(){  
        $(this).click(function(){
            if($(this).attr("checked") != undefined){
                $(this).siblings().attr("check", false);
                $(this).attr("checked", true);
            }
        });
    });
    //validate website
    jQuery.validator.addMethod("isWebsite", function(value, element) {
        return this.optional(element) || (/^[w]{3}.\w+.\w+$/.test(value));
    }, "Please enter a valid website.");
    //validate phone number
    jQuery.validator.addMethod("isPhone", function(value, element) {
        var length = value.length;
        return this.optional(element) || (/^\d{3}-\d{3}-\d{4}$/.test(value));
    }, "Please enter a valid phone number.");

    //validate restaurant address
    jQuery.validator.addMethod("isStreet", function(value, element) {
        return this.optional(element) || (/^\d{1,}\s[A-Za-z]+\s[A-z]+$/.test(value));
    }, "Please enter a valid street");

    //validate restaurant address
    jQuery.validator.addMethod("isCity", function(value, element) {
        return this.optional(element) || (/[A-z]+/.test(value));
    }, "Please enter a valid city");
    //validate zipcode
    jQuery.validator.addMethod("len", function(value, element) {
        var length = value.length;
        return this.optional(element) || (length == 5);
    }, "The zipcode is invalid.");

});