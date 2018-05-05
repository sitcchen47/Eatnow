$().ready(function(){
    $("#loginForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            name: {
                required: "Please enter a username",
                minlength: "Your username must be at least two characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must at least 6 characters long"
            }
        }
    });

})