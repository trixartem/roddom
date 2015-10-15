module.exports = function () {
    var submitForm = $('#comment-submit-form');
    var clientName = $('#comment-client-name');
    var formIsValid = {
        clientName: false
    }
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
