function createDropDown(id, customUpdater, itemId) {
}

function createColorButtons(id, customUpdater, itemId) {
    var $colorButtonsContainer = $('<div class="color-buttons-wrap"><div class="selected_color_name"></div><ul></ul></div>');
    var $colorButtonList = $colorButtonsContainer.find("ul");
    var $select = $('select[id="' + id + '"]');
    $(".color-buttons-wrap").remove();
    $select.find("option").each(function (i) {
        var $option = $(this);
        var $li = $("<li>");
        var $button = $('<a href="#" id="li_' + $option.val() + '" data-color-val="' + $option.val() + '" data-color-name="' + $option.text() + '"><span class="choose_color_thumb"><img src="' + $option.data("image") + '"></span></a>');
        $li.html($button);
        if ($option.is(":selected")) {
            $button.addClass("selected")
        }
        if ($option.hasClass("disabled")) {
            $button.addClass("disabled")
        }
        $colorButtonList.append($li)
    });
    $select.hide().before($colorButtonsContainer);
    initColorButtons(id, customUpdater, itemId)
}

function initColorButtons(id, customUpdater, itemId) {
    var $colorSelect = $('select[id="' + id + '"]');
    var $colorList = $(".color-buttons-wrap ul");
    var $colorItems = $colorList.find("li");
    var $colorButtons = $colorItems.find("a");
    var $colorName = $(".prod_color .selected_color_name");
    var sizes = $(".sizes").find("li a");
    var widths = $(".widths").find("a");
    $colorSelect.hide();
    customUpdater = customUpdater || null;
    $colorItems.each(function (i) {
        var $colorItem = $(this);
        var $colorButton = $colorItem.find("a");
        var colorValue = $colorButton.data("color-val");
        var colorName = $colorButton.data("color-name");
        $colorButton.on("click", function (event) {
            event.preventDefault();
            var $button = $(this);
            $colorButtons.removeClass("selected");
            $button.addClass("selected");
            var idx = colorValue.substring(("color_").length, colorValue.lastIndexOf("_"));
            if (customUpdater) {
                customUpdater.update_selected("color", idx, false, itemId, true)
            } else {
                update_selected("color", idx, false, itemId, true)
            }
            $colorSelect.val(colorValue);
            $colorName.text(colorName).parent().addClass("selected");
            var swatch = $(".colorswatch[data-cindex = '" + idx + "']");
            if (!swatch.parent().hasClass("selected")) {
                swatch.click()
            }
        })
    });
    if ($("#subcode").attr("value") !== "null" || customUpdater.metaItems[itemId].product.isOneColor) {
        $colorList.find("a.selected").click()
    }
}

function updateCombo(value) {
    var valueID = value.val();
    if (value.hasClass("disabled")) {
        $("#list_" + valueID).addClass("disabled");
        $("#select_" + valueID).addClass("disabled")
    } else {
        $("#list_" + valueID).removeClass("disabled");
        $("#select_" + valueID).removeClass("disabled")
    }
};