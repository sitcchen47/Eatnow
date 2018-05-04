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
                confirmPsd: {
                    required: "Please provide a password",
                    minlength: "Your password must at least 6 characters long",
                    equalTo: "Please enter the same password as above"
                }
            }
        }
    });
})