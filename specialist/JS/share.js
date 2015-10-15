(function ($) {
    $(function () {
        $('div.share._init').each(function (idx) {
            var el = $(this),
                u = el.attr('data-url'),
                t = el.attr('data-title'),
                i = el.attr('data-image'),
                d = el.attr('data-description'),
                f = el.attr('data-path'),
                fn = el.attr('data-icons-file'),
                z = el.attr("data-zero-counter");

            if (!u)u = location.href;
            if (!fn)fn = 'icons.png';
            if (!z)z = 0;
            function fb_count(url) {
                var shares;
                $.getJSON('//graph.facebook.com/?callback=?&ids=' + url, function (data) {
                    shares = data[url].shares || 0;
                    if (shares > 0 || z == 1)el.find('a[data-count="fb"]').after('<span class="share__counter">' + shares + '</span>')
                })
            }

            fb_count(u);
            function twi_count(url) {
                var shares;
                $.getJSON('//urls.api.twitter.com/1/urls/count.json?callback=?&url=' + url, function (data) {
                    shares = data.count;
                    if (shares > 0 || z == 1) {
                        el.find('a[data-count="twi"]')
                            .after('<span class="share__counter">' + shares + '</span>')
                    }
                })
            }

            twi_count(u);
            function vk_count(url) {
                $.getScript('//vk.com/share.php?act=count&index=' + idx + '&url=' + url);
                if (!window.VK)window.VK = {};
                window.VK.Share = {
                    count: function (idx, shares) {
                        if (shares > 0 || z == 1) {
                            $('div.share._init')
                                .eq(idx)
                                .find('a[data-count="vk"]')
                                .after('<span class="share__counter">' + shares + '</span>')
                        }
                    }
                }
            }

            vk_count(u);
            if (!f) {
                function path(name) {
                    var sc = document.getElementsByTagName('script'), sr = new RegExp('^(.*/|)(' + name + ')([#?]|$)');
                    for (var p = 0, scL = sc.length; p < scL; p++) {
                        var m = String(sc[p].src).match(sr);
                        if (m) {
                            if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\/\\])/))return m[1];
                            if (m[1].indexOf("/") == 0)return m[1];
                            b = document.getElementsByTagName('base');
                            if (b[0] && b[0].href)return b[0].href + m[1]; else return document.location.pathname.match(/(.*[\/\\])/)[0] + m[1];
                        }
                    }
                    return null;
                }

                f = path('share42.js');
            }
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
                '"#" data-count="vk" class="share__link _vk" onclick="window.open(\'//vk.com/share.php?url=' + u + '&title=' + t + vkImage + '&description=' + d + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться В Контакте"',
                '"#" data-count="fb" class="share__link _fb" onclick="window.open(\'//www.facebook.com/sharer.php?m2w&' + fbQuery + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Facebook"',
                '"#" data-count="twi" class="share__link _twi" onclick="window.open(\'//twitter.com/intent/tweet?text=' + t + '&url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Twitter"'
            );
            var l = '';
            for (var j = 0; j < s.length; j++) {
                l += '<span class="share__item">' +
                    '<a rel="nofollow" href=' + s[j] + ' target="_blank"></a></span>';
            }
            el.html('<span id="share">' + l + '</span>');
        })
    })
})(jQuery);
