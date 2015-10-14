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
