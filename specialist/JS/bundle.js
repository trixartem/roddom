require('./form')();
require('./form-comment')();

var iScroll = require('./iscroll');

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
    $(".info-card__text").mCustomScrollbar({
            axis:"y",
            theme:"parent",
            scrollButtons:{ enable: true },
            scrollbarPosition: "outside"
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

function scroll(selector, opt) {
    return new iScroll(selector, opt);
}
document.addEventListener('DOMContentLoaded', function () {
    scroll('#gallery', {
        freeScroll: true,
        mouseWheel: true,
        scrollbars: true,
        bounce: false,
        click: true,
        tap: true,
        scrollX: true
    });
}, false);
function getShare(obj) {
    var u = obj.url,
        t = obj.title,
        i = obj.img,
        d = obj.desc;

    if (!t)t = document.title;
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
        '"#" data-count="fb" class="share__link _fb" onclick="window.open(\'//www.facebook.com/sharer.php?m2w&' + fbQuery + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Facebook"',
        '"#" data-count="gplus" class="share__link _gplus" onclick="window.open(\'//plus.google.com/share?url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Google+"',
        '"#" data-count="mail" class="share__link _mail" onclick="window.open(\'//connect.mail.ru/share?url=' + u + '&title=' + t + '&description=' + d + '&imageurl=' + i + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Моем Мире@Mail.Ru"',
        '"#" data-count="odkl" class="share__link _odkl" onclick="window.open(\'//ok.ru/dk?st.cmd=addShare&st._surl=' + u + '&title=' + t + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Одноклассники"',
        '"#" data-count="twi" class="share__link _twi" onclick="window.open(\'//twitter.com/intent/tweet?text=' + t + '&url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Twitter"',
        '"#" data-count="vk" class="share__link _vk" onclick="window.open(\'//vk.com/share.php?url=' + u + '&title=' + t + vkImage + '&description=' + d + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться В Контакте"');
    var l = '';
    for (var j = 0; j < s.length; j++) {
        l += '<span class="share__item _column" ><a rel="nofollow" href=' + s[j] + ' target="_blank"></a></span>';
    }

    return l;

}

var popups = $('._popover');
popups.each(function () {
    var $this = $(this);
    var url = $this.data('url');
    var title = $this.data('title');
    var img = $this.data('img');
    var desc = $this.data('desc');
    $(this).popover({
        html: true,
        toggle: 'popover',
        container: 'body',
        trigger: 'click',
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>',
        content: getShare({
            url: url,
            title: title,
            img: img,
            desc: desc
        })
    });
});

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

