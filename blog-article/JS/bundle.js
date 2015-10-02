$(document).ready(function () {
    $('.sticky-wrap').stick_in_parent({
        inner_scrolling: false
    });
});

var commentForm = $('.comment-form');
var select = commentForm.find('.comment-form__select');
var avatar = $('#avatar');
var currentAvatar = avatar.data('type');

select.find('.comment-form__avatars').click(function () {
    var currentMode = getMod(currentAvatar);

    currentAvatar = $(this).data('type');
    var newMode = getMod(currentAvatar);
    if (currentMode === newMode) {
        return;
    }
    avatar.removeClass(currentMode);
    avatar.addClass(newMode);
    avatar.data('type', currentAvatar);
});

$(document).click(function () {
    select.removeClass('_opened');
});

function getMod(name) {
    return '_type-' + name;
}
avatar.click(function () {
    event.stopPropagation();
    select.toggleClass('_opened');
});

var commentFormIsShowed = false;
var comments = $('.comments__list');

$('.comments__button').click(function () {
    comments.append(commentForm);
    setTimeout(scrollToCommentForm, 10);
    commentForm.data('level', 0);
    showForm();
});

var maxLevel = $('.comments').data('maxlevel');
$('.comment').click(clickComment);
function clickComment(e) {
    select.removeClass('_opened');
    e.stopPropagation();

    var $this = $(this);
    var level = $this.data('level');
    var target = $(e.target);

    if (level >= maxLevel) {
        $this.parent().first().append(commentForm);
        commentForm.data('level', maxLevel);
        showForm();
        return;
    }

    if (target.hasClass('comment__reply-to')) {
        commentForm.data('level', level + 1);
        $this.find('.comment__content').first().append(commentForm);
        setTimeout(scrollToCommentForm, 10);
        showForm();
    }
}
function scrollToCommentForm() {
    $('body, html').animate({
        scrollTop: commentForm.offset().top
    }, 300);
}
$('#cancelComment').click(function () {
    hideForm();
});

$('#commentText').on('input', function () {
    checkInputs();
});

$('#commentName').on('input', function () {
    checkInputs();
});

function getValues() {
    console.log(commentForm.data('level'));
    return {
        text: $('#commentText').val(),
        name: $('#commentName').val(),
        level: commentForm.data('level') ? commentForm.data('level') : 0,
        avatar: $('#avatar').data('type'),
        date: getDate()
    }
}
function getDate() {
    var date = new Date;
    var months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ]
    var content = '';
    content += prependZero(date.getDate());
    content += '&nbsp;' + months[date.getMonth()];
    content += '&nbsp;' + date.getFullYear() + '&nbsp;года';
    content += '&nbsp;' + prependZero(date.getHours());
    content += ':' + prependZero(date.getMinutes());
    return content;
}
function prependZero(num) {
    return num < 10 ? '0' + num : num;
}
function checkInputs() {
    var value = getValues();
    if (value.text && value.name) {
        $('#submitComment').prop('disabled', false);
        return;
    }
    $('#submitComment').prop('disabled', true);
}

$('#submitComment').click(function () {
    var value = getValues();
    newComment(value);
    hideForm();
    cleanForm();
});

function newComment(value) {
    var html = '<article class="comment" data-level="'
        + value.level +
        '"> <div class="comment__avatar _type-'
        + value.avatar +
        '"></div> <div class="comment__body"> <div class="comment__header"> <div class="comment__name" title="Ann">'
        + value.name +
        '</div> <time class="comment__date">' +
        value.date +
        '</time> <div class="comment__reply-to"></div> </div> <div class="comment__text">'
        + value.text +
        '</div> <div class="comment__content"></div> </div> </article>';
    var $html = $(html);
    commentForm.before($html);
    if (value.level === 0) {
        $html.click(clickComment)
    }
}

function hideForm() {
    commentForm.removeClass('_showed');
    commentFormIsShowed = false;
}

function showForm() {
    commentForm.addClass('_showed');
    commentFormIsShowed = true;
}
function cleanForm() {
    $('#commentText').val('');
    $('#commentName').val('');
    checkInputs();
}

/* share42.com | 23.09.2014 | (c) Dimox */
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
