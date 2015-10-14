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
