$().ready(function(){
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
            confirmPsd: {
                required: true,
                minlength: 6,
                equalTo: "#signup-psd"
            },
            messages: {
                name: {
                    minlength: "Your username must be at least two characters"
                },
                password: {
                    minlength: "Your password must be at least 6 characters long"
                },
                confirmPsd: {
                    minlength: "Your password must be at least 6 characters long",
                    equalTo: "Please enter the same password as above"
                }
            }
        }
    });
})