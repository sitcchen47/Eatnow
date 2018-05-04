$().ready(function(){
    $("#profileForm").validate({
        
        rules : {
            InputPhoneNum : {
                required : true,
                isPhone : true
            },
            InputRName : {
                required : true,
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
                required: "Please enter phone number",
                isPhone: "The phone number is invalid"
            },
            InputStreet: {
                required: "Please enter restaurant street",
                isStreet: "The street is invalid"
            },
            InputCity: {
                required: "Please enter restaurant city",
                isCity: "The city is invalid" 
            }        
        }
    }),
    $("#signupForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            messages: {
                name: {
                    required: "Please enter a username",
                    minlength: "Your username must be at least two characters"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must at least 6 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must at least 6 characters long",
                    equalTo: "Please enter the same password as above"
                }
            }
        }
    });
    $("#loginForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Your username must be at least two characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must at least 6 characters long"
            }
        }
    });
    $(':checkbox[type="checkbox"]').each(function(){  
        $(this).click(function(){
            if($(this).attr("checked") != undefined){
                $(this).siblings().attr("check", false);
                $(this).attr("checked", true);
            }
        });
    });
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

});