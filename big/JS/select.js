module.exports = function () {
    var isOpened = false;
    $(document).click(function (e) {
        if ($(e.target).parent('.select-map__button').length === 0 && isOpened) {
            $('.select-map').removeClass('_opened');
        }
    });
    $('.select-map__button').on('click', function () {
        setTimeout(function () {
            isOpened = true;
            $('.select-map').toggleClass('_opened');
        }, 0);
    });

    $('.select-map__item').on('click', function () {
        $('.select-map__text').text(this.innerText);
        $('.select-map').trigger('change', {
            id: $(this).data('value')
        })
    });

    return function select(id) {
        $('.select-map__text').text($('.select-map__item').eq(id - 1).text());
    }
}
