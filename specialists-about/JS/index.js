(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var select = require('./select');
require('./form')();
require('./form-comment')();
select();
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

$('.spec').each(function () {
    var spec = $(this);
    spec.find('.book').click(function () {
        $('#spec-name').val(spec.data('name'));
    });
    spec.find('.spec__comments-link').click(function () {
        $('#comment-spec-name').val(spec.data('name'));
    });
})




},{"./form":3,"./form-comment":2,"./select":4}],2:[function(require,module,exports){
module.exports = function () {
    var submitForm = $('#comment-submit-form');
    var clientName = $('#comment-client-name');
    var specName = $('#comment-spec-name');
    var formIsValid = {
        specName: !!specName.val(),
        clientName: false
    }
    function checkSpecName () {
        if (specName.val() === '') {
            formIsValid.specName = false;
            toggleInput(specName, false)
        } else {
            formIsValid.specName = true;
            toggleInput(specName, true)
        }
        checkForms();
    }
    specName.on('input', function () {
        checkSpecName();
    });
    clientName.on('input', function () {
        if (clientName.val() === '') {
            formIsValid.clientName = false;
            toggleInput(clientName, false)
        } else {
            formIsValid.clientName = true;
            toggleInput(clientName, true)
        }
        checkForms();
    });
    $('#create-comment').on('show.bs.modal', function () {
        checkSpecName();
    })
    function checkForms() {
        var allForm = Object.keys(formIsValid).length
        var counter = 0;
        for (var key in formIsValid) {
            formIsValid[key] && ++counter;
        }
        if (counter === allForm) {
            submitForm.prop('disabled', false);
        } else {
            submitForm.prop('disabled', true);
        }
    }

    function toggleInput(elem, isSuccess) {
        var group = elem.parent('.form-group');
        if (isSuccess) {
            group.removeClass('has-error');
            group.addClass('has-success');
            elem.addClass('form-control-success');
            elem.removeClass('form-control-error');
        } else {
            group.addClass('has-error');
            group.removeClass('has-success');
            elem.addClass('form-control-error');
            elem.removeClass('form-control-success');
        }
    }
}

},{}],3:[function(require,module,exports){
module.exports = function () {
    var submitForm = $('#submit-form');
    var clientName = $('#client-name');
    var specName = $('#spec-name');
    var phone = $('#phone');
    var formIsValid = {
        specName: !!specName.val(),
        clientName: false,
        phone: false
    }

    function checkSpecName() {
        if (specName.val() === '') {
            formIsValid.specName = false;
            toggleInput(specName, false)
        } else {
            formIsValid.specName = true;
            toggleInput(specName, true)
        }
        checkForms();
    }

    specName.on('input', function () {
        checkSpecName()
    });
    clientName.on('input', function () {
        if (clientName.val() === '') {
            formIsValid.clientName = false;
            toggleInput(clientName, false)
        } else {
            formIsValid.clientName = true;
            toggleInput(clientName, true)
        }
        checkForms();
    });
    clientName.on('input', function () {
        if (clientName.val() === '') {
            formIsValid.clientName = false;
            toggleInput(clientName, false)
        } else {
            formIsValid.clientName = true;
            toggleInput(clientName, true)
        }
        checkForms();
    });
    $('#appointment').on('show.bs.modal', function () {
        checkSpecName();
    })
    submitForm.click(function () {
        $('#appointment').modal('hide');
        $('#success').modal('show');
    });
    phone.on('input', function () {
        var phoneIsValid = ValidPhone(phone.val())
        toggleInput(phone, phoneIsValid)
        formIsValid.phone = phoneIsValid;
        checkForms();
    });

    function ValidPhone(phoneNumber) {
        var re = /^\+?\d[\d\(\)\ -]{4,14}\d$/;
        return re.test(phoneNumber);
    }

    function checkForms() {
        var allForm = Object.keys(formIsValid).length
        var counter = 0;
        for (var key in formIsValid) {
            formIsValid[key] && ++counter;
        }
        if (counter === allForm) {
            $('#submit-form').prop('disabled', false);
        } else {
            $('#submit-form').prop('disabled', true);
        }
    }

    function toggleInput(elem, isSuccess) {
        var group = elem.parent('.form-group');
        if (isSuccess) {
            group.removeClass('has-error');
            group.addClass('has-success');
            elem.addClass('form-control-success');
            elem.removeClass('form-control-error');
        } else {
            group.addClass('has-error');
            group.removeClass('has-success');
            elem.addClass('form-control-error');
            elem.removeClass('form-control-success');
        }
    }
}

},{}],4:[function(require,module,exports){
module.exports = function () {
    // Iterate over each select element
    $('select').each(function () {

        // Cache the number of options
        var $this = $(this);
        var children = $(this).children();

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.find('option').filter('[checked]').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<div />', {
            'class': 'options hidden'
        }).insertAfter($styledSelect);

        children.each(function (i, e) {
            console.log($(e).prop("tagName"));
            if ($(e).prop("tagName") === 'OPTION') {
                $list.append($('<div />', {
                    text: $(e).text(),
                    rel: $(e).val(),
                    'class': 'select__item'
                }));
            } else if ($(e).prop("tagName") === 'OPTGROUP') {
                var gr = $('<div class="select__group"/>');

                console.log($(e).attr('label'));
                gr.append($('<div />', {
                    html: $(e).attr('label'),
                    'class': 'select__group-name'
                }));
                var grChild = $(e).children();
                grChild.each(function () {
                    gr.append($('<div />', {
                        text: $(this).text(),
                        rel: $(this).val(),
                        'class': 'select__item'
                    }));
                })
                $list.append(gr);
            }
        });

        // Cache the list items
        var $listItems = $list.find('.select__item');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            e.stopPropagation();
            var $this = $(this);
            var $list = $this.next('.options');
            $('div.styledSelect.active').each(function () {
                if ($this[0] === $(this)[0]) {
                    return;
                }
                $(this)
                    .removeClass('active')
                    .next('.options')
                    .addClass('hidden');
            });

            if (!$this.hasClass('active')) {
                if ($list.width() > $this.width() + 27) {
                    $this.addClass('smaller');
                    $list.removeClass('smaller');
                } else {
                    $list.addClass('smaller');
                    $this.removeClass('smaller');
                }
            }

            $this.toggleClass('active');

            $list.toggleClass('hidden');
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.addClass('hidden');
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.addClass('hidden');
        });

    });
}

},{}]},{},[1]);
