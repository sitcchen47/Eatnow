(function($){
    console.log("success");
    var imgSection = $('#imgSection');
    var triggerButton = $('.trigger');
    var id = $('#restId').text();

    triggerButton.click(function(event) {
        $('#dishForm').toggleClass('hidden');
    });

    $('#dishForm').submit(function(event) {
        event.preventDefault();
        let dishForm = new FormData(event.target);
        $(this).toggleClass('hidden');

        // let form = new FormData(event.target);
        $.ajax({
            url: "/profile/uploadDish/" + id,
            type: "post",
            data: dishForm,
            processData: false,
            contentType: false,
            // 3. get the restaurants html and insert into the album element
            success: function(data) {
                imgSection.append(data);
            },
            error: function(e) {
                alert('There must be some error!');
            }
        });
    });

    $('#mapString').html($('#mapString').text());
})(window.jQuery);