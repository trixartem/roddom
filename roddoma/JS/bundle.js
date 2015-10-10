require('./header');
require('./gmaps')();
require('./form')();
require('./form-comment')();
var fullImage = $('.full-image');
$('.address__gallery-img').click(function () {
    var src = $(this).data('src') || $(this).attr('src');
    fullImage.attr('src', src);
    $('#gallery').modal('show');
})

$(document).ready(function () {
    $(".fancybox")
        .fancybox({
            padding: 10
        });
});
