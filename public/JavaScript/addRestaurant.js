(function($) {
    // console.log("hi~");
    // $('.album')
    var triggerButton = $('.tigger');
    var restBox = $('#newRestaurants');
    var formDom = $('.needs-validation');
    function bindEventsToRest(rest) {
        rest.find(".edit-btn").click(function(event) {
            // console.log("aaaa");
            formDom.show();
            formDom.find('#restaurantName').val(rest.find("h4").text());
            formDom.find('#phonenumber').val(rest.find('.contactInfo > span').eq(0).text());
            formDom.find('#website').val(rest.find('.contactInfo > span > a').text());

            let addressCollection = rest.find(".address > span");
            formDom.find('#inputAddress').val(addressCollection.eq(0).text());
            formDom.find('#inputAddress2').val(addressCollection.eq(1).text());
            formDom.find('#inputCity').val(addressCollection.eq(2).text());
            formDom.find('#state').val(addressCollection.eq(3).text());
            formDom.find('#inputZip').val(addressCollection.eq(4).text());
        });

        rest.find(".delete-btn").click(function(event) {
            
            // 1. remind the user to confirm the delete operation

            var id = rest.data("id");
            $.ajax({
                url: "/profile/deleteRes/" + id,
                type: "GET",
                success: function(data) {
                    console.log("Successfully delete the restaurant");
                },
                error: function(e) {
                    alert('There must be some error!');                    
                }
            });
            
            // remove itself
            rest.remove();
        });
    }
    // 1. validate the form firstly
    // 2. ajax
    formDom.submit(function(event) {
        
        event.preventDefault();
        $(this).hide();

        let form = new FormData(event.target);
        $.ajax({
            url: "/profile/upload",
            type: "post",
            data: form,
            processData: false,
            contentType: false,
            // 3. get the restaurants html and insert into the album element
            success: function(data) {
                // bind the events
                bindEventsToRest($(data));
                restBox.append($(data));
            },
            error: function(e) {
                alert('There must be some error!');
            }
        });
    }); 

    restBox.children().each(function(index, element) {
        bindEventsToRest($(element));
    });
})(window.jQuery);