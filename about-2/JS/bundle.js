require('./header');
require('./gmaps')();
require('./form')();
var iScroll = require('./iscroll');

function scroll() {
    var myScroll = new iScroll('#gallery', {
        freeScroll: true,
        mouseWheel: true,
        scrollbars: true,
        bounce: false,
        click: true,
        tap: true,
        scrollX: true
    });
    return myScroll;
}
document.addEventListener('DOMContentLoaded', function () {
    var myScroll = scroll();
    var items = [];
    $('.carousel-item').each(function (key, item) {
        var $item = $(item);
        var target = Number($item.data('target'))
        if (target || target === 0) {
            items[target] = key;
        }
    })
    var carousel = $('#carousel');
    $('.gallery__item').click(function () {
        var id = $(this).data('id');
        carousel.carousel(items[id])
        myScroll.scrollToElement(this, 700, null, null, IScroll.utils.ease.quadratic);
    })
}, false);
