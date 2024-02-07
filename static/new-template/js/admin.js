var color_attrs = document.getElementsByClassName('field-color_attrs')
if (color_attrs.length > 0) {
    color_attrs[0].style.display = 'none';
}


(function ($) {
    console.log('js loaded')
    // hide 'color_attrs' property
    $('.field-color_attrs').css('display', 'none');
    var defaultOption = $('option:contains(default)');
    var selectedAttr = $('#id_attribute').val();
    if (selectedAttr != defaultOption.attr('value')) {
        defaultOption.css('display', 'none');
    } else {
        $('form input').attr('disabled', true);
        $('#id_attribute').attr('disabled', true);
        $('.submit-row').css('display', 'none');
    }

    // check if attribute type is color or not and show color picker
    function toggleColorPicker() {
        var selectedAttr = $('#id_attribute').val();
        var color_attribute_ids = JSON.parse($('#cIds').attr('data-ids'));

        if (color_attribute_ids.includes(parseInt(selectedAttr))) {
            $('.field-color').css('display', 'block');
            console.log('show', $('field-color'))
        } else {
            $('.field-color').css('display', 'none');
            console.log('hide', $('field-color'))
        }
    }

    toggleColorPicker()

    $('#id_attribute').on('change', function (e) {
        toggleColorPicker()
    })

})(django.jQuery);