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

var comments = $('.comments');
comments.each(function (c) {
    var $comment = $(this);
    var items = $comment.find('.comments__item');
    var pageButton = $comment.find('.pagination li');
    var checkedComment = items.filter('.active');
    var checkedButton = pageButton.filter('.active');

    pageButton.click(function () {
         var $this = $(this);
        if ($this.hasClass('active')) {
            return;
        }

        checkedButton.removeClass('active');
        $this.addClass('active');

        var num = $(this).data('value');

        checkedComment.removeClass('active');

        var currentComment = items.eq(num);
        currentComment.addClass('active');

        checkedComment = currentComment;
        checkedButton = $this;
    });
});


