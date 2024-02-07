if (!('boxShadow' in document.body.style)) {
    document.body.setAttribute('class', 'noBoxShadow');
}

document.body.addEventListener("click", function (e) {
    var target = e.target;
    if (target.tagName === "INPUT") {
        target.select();
    }
});


(function () {

    var icons = document.getElementById("sidebar-icons");
    var iconBackButton = document.getElementById('icon-back');
    iconBackButton.addEventListener('click', function () {
        icons.setAttribute("class", "sidebar");
    })
    var change_button = document.getElementById('change');
    change_button.addEventListener('click', function () {
        icons.classList.toggle("active");
    });
    var x = document.getElementsByTagName("SPAN");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].addEventListener('click', function () {
            var val = this.className;
            var icon = document.getElementById('id_icon2');
            var curIcon = document.getElementById('cur-icon');
            icon.setAttribute('value', val);
            curIcon.setAttribute("class", val);
        });
    }

}());