require('./form')();
require('./calendar')();

var iScroll = require('./iscroll');

function scroll(selector, opt) {
    return new iScroll(selector, opt);
}

document.addEventListener('DOMContentLoaded', function () {
    var slider = scroll('#gallery', {
        freeScroll: true,
        mouseWheel: true,
        scrollbars: true,
        bounce: false,
        click: true,
        tap: true,
        scrollX: true
    });
    var items = [];
    $('.carousel-item').each(function (key, item) {
        var $item = $(item);
        var target = Number($item.data('target'))
        if (target || target === 0) {
            items[target] = key;
        }
    });
    var carousel = $('#carousel');
    $('.gallery__item').click(function () {
        var id = $(this).data('id');
        carousel.carousel(items[id])
        slider.scrollToElement(this, 700, null, null, IScroll.utils.ease.quadratic);
    });
    $(".calendar__list").mCustomScrollbar({
        axis:"y",
        theme:"parent",
        scrollButtons:{ enable: true },
        scrollbarPosition: "outside"
    });
}, false);
function getMoreShare() {
    var u = location.href,
        t,
        i,
        d;

    if (!t) {
        t = document.title;
    }
    if (!d) {
        var meta = $('meta[name="description"]').attr('content');
        if (meta !== undefined)d = meta; else d = '';
    }
    u = encodeURIComponent(u);
    t = encodeURIComponent(t);
    t = t.replace(/\'/g, '%27');
    i = encodeURIComponent(i);
    d = encodeURIComponent(d);
    d = d.replace(/\'/g, '%27');
    var fbQuery = 'u=' + u;
    if (i != 'null' && i != '')fbQuery = 's=100&p[url]=' + u + '&p[title]=' + t + '&p[summary]=' + d + '&p[images][0]=' + i;
    var vkImage = '';
    if (i != 'null' && i != '')vkImage = '&image=' + i;
    var s = new Array(
        '"#" data-count="gplus" class="share__link _gplus" onclick="window.open(\'//plus.google.com/share?url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Google+"',
        '"#" data-count="mail" class="share__link _mail" onclick="window.open(\'//connect.mail.ru/share?url=' + u + '&title=' + t + '&description=' + d + '&imageurl=' + i + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Моем Мире@Mail.Ru"',
        '"#" data-count="odkl" class="share__link _odkl" onclick="window.open(\'//ok.ru/dk?st.cmd=addShare&st._surl=' + u + '&title=' + t + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Одноклассники"'
    );
    var l = '';
    for (var j = 0; j < s.length; j++) {
        l += '<span class="share__item _popup">' +
            '<a rel="nofollow" href=' + s[j] + ' target="_blank"></a></span>';
    }
    return l;
}
$('#share-more').popover({
    html: true,
    container: 'body',
    trigger: 'click',
    placement: 'top',
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>',
    content: getMoreShare()
});

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');

        }
    });
});

$(document).ready(function () {
    //$('.text-slider').slick({
    //    slidesToShow: 3,
    //    prevArrow: '<div class="slider-arrow__wrap _prev"><span class="slider-arrow"></span></div>',
    //    nextArrow: '<div class="slider-arrow__wrap _next"><span class="slider-arrow"></span></div>',
    //    variableWidth: true,
    //    slidesToScroll: 1
    //});
    //$('.address-slider').slick({
    //    slidesToShow: 3,
    //    prevArrow: '<div class="slider-arrow__wrap _prev"><span class="slider-arrow"></span></div>',
    //    nextArrow: '<div class="slider-arrow__wrap _next"><span class="slider-arrow"></span></div>',
    //    variableWidth: true,
    //    slidesToScroll: 3
    //});

    $('.address-slider').lightSlider({
        addClass: 'address',
        autoWidth: true,
        enableDrag: false,
        slideMargin: 30,
        slideMove: 3,
        loop: false,
        pager: false
    });
    $('.text-slider').lightSlider({
        autoWidth: true,
        enableDrag: false,
        slideMargin: 0,
        loop: true,
        pager: false
    });

    $('.specialist-slider').lightSlider({
        addClass: 'specialist',
        autoWidth: true,
        enableDrag: false,
        slideMargin: 30,
        slideMove: 3,
        loop: false,
        pager: false
    });
    //$(".calendar__list").mCustomScrollbar({
    //    axis:"y"
    //});
});
var checkedTabItem = $('.tabs__item._checked');
var $tabs = $('.tabs__tab');
var checkedTab = $tabs.filter('._checked');
$('.tabs__item').click(function () {
    var $this = $(this);
    if ($this.hasClass('_checked')) {
        return;
    }
    if ($this.data('url')) {
        document.location.assign($this.data('url'));
        return;
    }
    checkedTabItem.removeClass('_checked');
    checkedTab.removeClass('_checked');

    checkedTab = $tabs.eq($this.data('num') - 1)

    checkedTab.addClass('_checked');
    $this.addClass('_checked');

    checkedTabItem = $this;
});

var select = $('.select');

$(document).click(function () {
   $('.select__list').removeClass('showed');
});

select.each(function () {
    var $select = $(this);
    var list = $select.find('.select__list');
    var items = list.find('.select__item');
    //$select.on('change', function () {
    //    console.log(arguments);
    //})
    items.click(function (e) {
        var $this = $(this);
        e.stopPropagation();
        $('.select__list').removeClass('showed');
        $select.trigger('change',  $this.data('value') || $this.text());
        list.removeClass('showe');
    });
    $select.find('.select__toggle-button').click(function (e) {
        e.stopPropagation();
        $('.select__list').removeClass('showed');
        list.toggleClass('showed');
    });
});

