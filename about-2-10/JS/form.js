module.exports = function () {
    var submitForm = $('#submit-form');
    var name = $('#name');
    var clientName = $('#client-name');
    var phone = $('#phone');
    var formIsValid = {
        name: false,
        clientName: false,
        phone: false
    }
    name.on('input', function () {
        if (name.val() === '') {
            toggleInput(name, false)
            formIsValid.name = false;
        } else {
            formIsValid.name = true;
            toggleInput(name, true)
        }
        checkForms()
    });

    clientName.on('input', function () {
        if (name.val() === '') {
            formIsValid.clientName = false;
            toggleInput(clientName, false)
        } else {
            formIsValid.clientName = true;
            toggleInput(clientName, true)
        }
        checkForms();
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
        for(var key in formIsValid) {
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
