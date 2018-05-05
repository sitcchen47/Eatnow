(function($){
    console.log("success");
    var commentsSection = $('.commentsSection');

    var triggerButton = $('.trigger');
    triggerButton.click(function(event) {
        $('#commentForm').toggleClass('hidden');
    });

    $('#commentForm').submit(function(event) {
        event.preventDefault();
        $(this).toggleClass('hidden');

        let form = new FormData(event.target);
        let id = $('restFlag').text();
        $.ajax({
            url: "/restaurants/post/" + id,
            type: "post",
            data: form,
            processData: false,
            contentType: false,
            // 3. get the restaurants html and insert into the album element
            success: function(data) {
                commentsSection.append(data);
            },
            error: function(e) {
                alert('There must be some error!');
            }
        });
    });

    $('#mapString').html($('#mapString').text());
})(window.jQuery);