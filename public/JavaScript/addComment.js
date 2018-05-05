(function($){
    console.log("success");
    var commentsSection = $('.commentsSection');

    var triggerButton = $('.trigger');
    triggerButton.click(function(event) {
        $('#commentForm').toggleClass('hidden');
    });

    $('#commentForm').submit(function(event) {
        event.preventDefault();

        if ($('#username').length === 0) {
            alert('Please sign in your account first!');
            $('#signin-signup-tab').modal("show");
            showSigninPage();
        }
        else {
            let id = $('#restFlag').text();

            $(this).toggleClass('hidden');

            $.ajax({
                url: "/restaurants/post/" + id,
                type: "post",
                data: {'content': $('#content').val()},
                success: function(data) {
                    commentsSection.append(data);
                },
                error: function(e) {
                    alert('There must be some error!');
                }
            });
        }
    });

    $('#mapString').html($('#mapString').text());

    function showSigninPage() {
        $('#signup').removeClass('active');
        $('#signup').removeClass('show');

        $('#signup-tab').removeClass('active');

        $('#signin').addClass('active');
        $('#signin').addClass('show');

        $('#signin-tab').addClass('active');
      }
})(window.jQuery);