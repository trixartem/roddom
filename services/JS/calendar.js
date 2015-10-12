module.exports = function () {
    $(document).ready(function () {

        // here's some magic to make sure the dates are happening this month.
        moment.locale('fr', {
            months: "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_")
        });
        var thisMonth = moment().locale('ru').format('YYYY-MM');

        // Here's our events array. We could grab this via AJAX as well.
        var eventArray = [
            {
                date: thisMonth + "-24 07:52",
                title: "This is an event title",
                url: "http://google.com",
                time: "7:15PM"
            },
            { date: thisMonth + "-28", title: "the 28th, Part 1", url: "http://www.google.com" },
            {
                date: thisMonth + "-16",
                title: "Another title",
                anotherObject: "clndr exposes whatever is in your event object"
            }
        ];
        var rowDate = $('.calendar__row');
        var moreButton = $('.calendar__all');
        moreButton.click(function () {
            $(this).hide();
            rowDate.show();
        })
        var calendar = $('.calendar__body').clndr({
           template: $('#template-calendar').html(),
           events: eventArray,
            weekOffset: 1,
           startWithMonth: moment().add('month', 0),
           daysOfTheWeek: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
           clickEvents: {
             click: function(target) {
                 if (!target.events.length) {
                     return;
                 }
                 var date = target.date['_i']
                 var currentRow = rowDate.filter(function () {
                     return $(this).data('value') === date;
                 });
                 rowDate.hide();
                 currentRow.show();
                 moreButton.show();
             }
           }
         });
    });
}
