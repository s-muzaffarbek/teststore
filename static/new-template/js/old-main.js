function change_input_quantity(id) {
    let value = parseInt($(`#order_qty_${ id }`).val())
    if (value>0 && id){
        if (value<=100){
            change_quantity_shopping_cart(id, value)
        }
        else{
            alert(`${Maximum_available_quantity_of_product_is_100}`)
            $(`#order_qty_${ id }`).val(100)
            change_quantity_shopping_cart(id, 100)
        }

    }

    else{
        $(`#order_qty_${ id }`).val(1)
        change_quantity_shopping_cart(id, 1)
    }
}

function change_quantity(id, action) {
    let input_obj = $(`#order_qty_${id}`)
    let value = parseInt(input_obj.val()) + action

    if (value>0 && id){
        if (value<=100){
            input_obj.val(value)
            change_quantity_shopping_cart(id, value)
        }
        else{
            alert(`${Maximum_available_quantity_of_product_is_100}`)
            input_obj.val(100)
            change_quantity_shopping_cart(id, 100)
        }

    }

    else{
        input_obj.val(1)
        change_quantity_shopping_cart(id, 1)
    }
}


function change_quantity_shopping_cart(id, quantity) {
    console.log(id, quantity)
    let ShoppingCard = JSON.parse(localStorage.getItem('shopping_card'))
    if (ShoppingCard && ShoppingCard.variants) {
        let item_total = 0
        let item_new_total = 0
        let item_total_discount = 0
        let item_quantity = 0
        let item_index = undefined
        for (let item of ShoppingCard.orderItems) {
            if (item.variant === id) {
                item_quantity = item.quantity
                item.quantity = quantity
                item_index = ShoppingCard.orderItems.indexOf(item)
                item_total = item.retail_price * (quantity-item_quantity)
                item_new_total = item.retail_price*quantity
                if (item.discount_price > 0) {
                    item_total = item.discount_price * (quantity-item_quantity)
                    item_new_total = item.discount_price * quantity
                    item_total_discount = item.discount_price * (quantity-item_quantity)
                }
                break;
            }
        }
        if (item_index !== undefined){
        ShoppingCard.subtotal = ShoppingCard.subtotal + item_total
        ShoppingCard.total_discount = ShoppingCard.total_discount + item_total_discount
        ShoppingCard.itemCount = ShoppingCard.itemCount - item_quantity + quantity

        $(`#o_item_${id}`).text(`${sum_format_js(item_new_total)} ${SUM}`)
        $(`#total_price`).text(`${sum_format_js(ShoppingCard.subtotal)} ${SUM}`)
        localStorage.setItem('shopping_card', JSON.stringify(ShoppingCard));
        shopping_cart_badge_update()
    }}
}

function Remove_item(variant_id){
    let ShoppingCard = JSON.parse(localStorage.getItem('shopping_card'))
    if (ShoppingCard && ShoppingCard.variants){
        let item_total_discount = 0
        let item_subtotal = 0
        let item_quantity = 0
        let item_index = undefined
        for (let item of ShoppingCard.orderItems){
            if (item.variant === variant_id){
                item_index = ShoppingCard.orderItems.indexOf(item)
                item_quantity = item.quantity
                if (item.discount_price>0){
                    item_total_discount = item.discount_price*item.quantity
                    item_subtotal = item.discount_price*item.quantity
                }
                else{
                    item_subtotal = item.retail_price*item.quantity
                }
            break;
            }
        }
        if (item_index !== undefined){
            ShoppingCard.orderItems.splice(item_index, 1)
            ShoppingCard.variants.splice(ShoppingCard.variants.indexOf(variant_id), 1)
            ShoppingCard.subtotal = ShoppingCard.subtotal - item_subtotal
            ShoppingCard.total_discount = ShoppingCard.total_discount - item_total_discount
            ShoppingCard.itemCount = ShoppingCard.itemCount - item_quantity
            localStorage.setItem('shopping_card', JSON.stringify(ShoppingCard));
            shopping_cart_badge_update();
            shopping_cart_page_update();
            checkout_page_update();
        }
        }
}

    function sum_format_js(n){
        var text=''
        while(n>=1000){
            var q=n%1000
            if(q<10){
                text=' 00'+q+text
            }else if(q<100 && q>9){
                text=' 0'+q+text
            }else{
                text=' '+q+text
            }
            n=parseInt(n/1000)
            }
        return n+text

        }


(function ($) {
    "use strict";

    /*wow activation*/
    // new WOW().init();


    /*--------------------------
     ScrollUp
    ---------------------------- */
    // $.scrollUp({
    //     scrollText: '<i class="fa fa-angle-double-up"></i>',
    //     easingType: 'linear',
    //     scrollSpeed: 900,
    //     animation: 'fade'
    // });


    /*header currencu,languages slideToggle*/

    $(".currency").on("click", function () {
        $('.dropdown_currency').slideToggle('medium');
    });


    $(".languages").on("click", function () {
        $('.dropdown_languages').slideToggle('medium');
    });

    /*categories slideToggle*/

    $(".categori_toggle").on("click", function () {
        $('.categories_menu_inner').slideToggle('medium');
    });

    $(".header_categori_toggle").on("click", function () {
        $('.header_categories_menu_inner').slideToggle('medium');
    });


    /*mini cart slideToggle*/
    $(".shopping_cart a").on("click", function () {
        $('.mini_cart').slideToggle('medium');
    });


    /*------addClass/removeClass-------*/
    $(".categories_menu_inner > ul > li.has-dropdown > a, #cat_toggle.has-sub > a").on("click", function () {
        $(this).removeAttr('href');
        $(this).toggleClass('open').next('.categories_mega_menu,.categorie_sub').toggleClass('open');
        $(this).parents().siblings().find('.categories_mega_menu,#cat_toggle.has-sub > a').removeClass('open');
    });

    $("a.Returning").on("click", function () {
        $("#Returning_customer").toggleClass('show')
    });

    $(".header_categories_menu_inner > ul > li.has-dropdown > a, #header_cat_toggle.has-sub > a").on("mouseover", function () {
        // $(this).removeAttr('href');
        $(this).toggleClass('open').next('.header_categories_mega_menu,.header_categorie_sub').toggleClass('open');
        $(this).parents().siblings().find('.header_categories_mega_menu,#header_cat_toggle.has-sub > a').removeClass('open');
    });

    $('body').on('click', function (e) {
        var target = e.target;
        if (!$(target).is('.categories_menu_inner > ul > li.has-dropdown > a')) {
            $('.categories_mega_menu').removeClass('open');
        }
    });

    $('body').on('click', function (e) {
        var target = e.target;
        if (!$(target).is('.header_categories_menu_inner > ul > li.has-dropdown > a')) {
            $('.header_categories_mega_menu').removeClass('open');
        }
    });


    /*niceSelect*/
    // $('#category_slug, #product_sort_select').niceSelect();


    /*countdown activation*/

    $('[data-countdown]').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<div class="product_countdown"><div class="single_countdown"><div class="countdown_number">%D</div><div class="countdown_title">Days</div></div><div class="single_countdown"><div class="countdown_number">%H</div><div class="countdown_title">hrs</div></div><div class="single_countdown"><div class="countdown_number">%M</div><div class="countdown_title">mins</div></div><div class="single_countdown"><div class="countdown_number">%S</div><div class="countdown_title">secs</div></div></div>'));
        });
    });

    $('.portfolio_gallery').imagesLoaded(function () {
        // init Isotope
        var $grid = $('.portfolio_gallery').isotope({
            itemSelector: '.gird_item',
            percentPosition: true,
            masonry: {
                columnWidth: '.gird_item'
            }
        });

        // filter items on button click
        $('.portfolio_tab_button').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({filter: filterValue});

            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
        });
    });

    $('select[name="category_slug"]').on('change', function () {
        var selected = $(this).find('option:selected');
        selected.attr('selected', true);
        $(this).val(selected.val());
    });
    // /*counterup activation*/
    // $('.counter_number').counterUp({
    //     delay: 10,
    //     time: 1000
    // });
    $('.added-to-wishlist').each(function () {
        $(this).attr('data-original-title', '{%trans "Product"%}')
    });
    $('#notification-x').click(function () {
        $('#go-to-details').css('display', 'none');
    });
})(jQuery);

function queryParse(queryString) {
    const query = {};
    if (queryString) {
        const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
    }
    return query;
}

function queryStringify(params) {
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');
}


function initCompareProductsLogic() {

    const compareLinksArray = Array.from(document.getElementsByClassName("add-to-compare"));
    const STORAGE_KEY_FOR_COMPARISON_IDS = 'comparison_added_products';
    const comparePageLink = document.getElementById("compare_products_link")
    const comparePageLink2 = document.getElementById("compare_products_link2")

    function comparePageLinkChange(addedProducts) {
        const query = addedProducts.reduce((sum, id, i) => sum + (i === 0 ? '' : '&') + 'productId=' + id, '?')
        const link = `/${LANGUAGE_CODE}/products/compare` + query;

        comparePageLink.href = link;
        comparePageLink2.href = link;
        comparePageLink.style.display = 'inline-block';
        comparePageLink.querySelector('.comparison__quantity').textContent = addedProducts.length
        comparePageLink2.querySelector('.comparison__quantity').textContent = addedProducts.length

    }


    function initComparePage() {
        const isComparePage = location.href.includes(`/${LANGUAGE_CODE}/products/compare?productId`);
        if (isComparePage) {
            const qs = queryParse(location.search);

        }
    }


    document.addEventListener("DOMContentLoaded", function (event) {
        const addedProducts = JSON.parse(window.localStorage.getItem(STORAGE_KEY_FOR_COMPARISON_IDS) || "[]");
        compareLinksArray.forEach(addToCompareLink => {
            const productId = addToCompareLink.dataset.id
            if (addedProducts.length) {
                if (addedProducts.indexOf(productId) > -1) {
                    addToCompareLink.classList.add("added-for-comparison");
                    addToCompareLink.setAttribute("title", remove_from_compare);
                }
            }
        })
        comparePageLinkChange(addedProducts);

        initComparePage(addedProducts)
    });

    compareLinksArray.forEach(addToCompareLink => {
        addToCompareLink.addEventListener('click', e => {
            if (e) e.preventDefault()
            const addedProducts = JSON.parse(window.localStorage.getItem(STORAGE_KEY_FOR_COMPARISON_IDS) || "[]");
            const productId = addToCompareLink.dataset.id

            if (addedProducts.indexOf(productId) > -1) {
                addedProducts.splice(addedProducts.indexOf(productId), 1);
                addToCompareLink.classList.remove("added-for-comparison")
                addToCompareLink.setAttribute("data-original-title", add_to_compare);
            } else {
                addedProducts.push(productId);
                addToCompareLink.classList.add("added-for-comparison");
                addToCompareLink.setAttribute("data-original-title", remove_from_compare);
            }
            window.localStorage.setItem(STORAGE_KEY_FOR_COMPARISON_IDS, JSON.stringify(addedProducts))
            comparePageLinkChange(addedProducts)

            if (addToCompareLink.classList.contains("remove-from-compare")) {
                window.location.href = comparePageLink.href;
            }
        })
    });
}

initCompareProductsLogic()


document.addEventListener("DOMContentLoaded", function (event) {
    Array.from(document.querySelectorAll('input[type=tel]'))
        .forEach(phoneElem => {
            new IMask(phoneElem, {
                mask: '+99800 000 00 00',
                lazy: false,  // make placeholder always visible
                placeholderChar: '_'     // defaults to '_'
            });
        })

})

function goToLang(val1, val2) {
    window.location.pathname = window.location.pathname.replace(val1, val2)

}

function incrementValue() {
    var value = parseInt(document.getElementById('order_qty').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('order_qty').value = value;
    document.getElementById('order_qty').dispatchEvent(new Event('change'));
}

function incrementValue2(elem) {
    var input_field = elem.parentElement.querySelector('input[type=number]');
    var value = parseInt(input_field.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input_field.value = value;
    id = input_field.data('id')
    document.getElementById(`o_item_${id}`).innerText
    input_field.dispatchEvent(new Event('change'));
}

function decrementValue2(elem) {
    var input_field = elem.parentElement.querySelector('input[type=number]');
    var value = parseInt(input_field.value, 10);
    value = isNaN(value) ? 0 : value;
    value--;
    input_field.value = value;
    input_field.dispatchEvent(new Event('change'));
}

function decrementValue() {
    var value = parseInt(document.getElementById('order_qty').value, 10);
    value = isNaN(value) ? 0 : value;
    if (value > 1) {
        value--;
        document.getElementById('order_qty').value = value;
    }
}

function clickAddToCart(elem) {
    elem.preventDefault;
    document.getElementById('addToCart').click();
}

function clickTwins(elem) {
    var twinsId = elem.getAttribute('href');
    document.getElementById(twinsId).click();
    $('html,body').animate({
            scrollTop: $(twinsId).offset().top - 180
        },
        'slow');
}

function selectedMenu() {
    var path = window.location.pathname;
    $(".menu.menu--market-2 li a").each(function () {
        var href = $(this).attr('href');
        if (path === href) {
            $(this).addClass('active');
        }
    });
}

selectedMenu()
// pagination
var nextPage = $("li.next a")[0]
var prevPage = $("li.prev a")[0]
if (nextPage) {
    nextPage.onmouseover = function () {
        $(this).text('>>');
    };
    nextPage.onmouseout = function () {
        $(this).text('...');
    };
}
;
if (prevPage) {
    prevPage.onmouseover = function () {
        $(this).text('<<');
    };
    prevPage.onmouseout = function () {
        $(this).text('...');
    };
}
// header dropdown category menu
var dropdownCategory = $('.menu--product-categories .menu__content').height();
var megaMenus = $('.menu--product-categories .mega-menu');
megaMenus.each(function () {
    $(this).height(dropdownCategory - 28);
});

// getting siblings of an element 
function getSiblings(e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

function answerButton(elem) {
    var siblings = getSiblings(elem);
    if (elem.classList.contains('btn-ans')) {
        for (sibling of siblings) {
            if (sibling.tagName == 'FORM') {
                sibling.style.display = 'block';
                for (field of sibling.children) {
                    if (field.tagName == 'TEXTAREA') {
                        field.focus();
                    }
                }
                elem.classList.add('btn-sub');
                elem.classList.remove('btn-ans')
            }
        }
    } else if (elem.classList.contains('btn-sub')) {
        for (sibling of siblings) {
            if (sibling.tagName == 'FORM') {
                sibling.style.display = 'none';
                var text = sibling.getElementsByTagName('textarea')
                if (text[0].value != '' && text[0].value != null) {
                    sibling.submit();
                }
                elem.classList.add('btn-ans');
                elem.classList.remove('btn-sub');
            }
        }
    }
}

// script for product adding to wishlist
function initWishlistProductsLogic() {

    const wishlistLinksArray = Array.from(document.getElementsByClassName("add-to-wishlist"));
    const STORAGE_KEY_FOR_WISHLIST_PRODUCTS_IDS = 'wishlist_added_products';
    const wishlistPageLink = document.getElementById("wishlist_products_link");
    const wishlistPageLink2 = document.getElementById("wishlist_products_link2");

    // const wishlistPageFormInput = document.getElementById("wishlist-pids");

    function wishlistPageLinkChange(addedProducts) {
        // const query = addedProducts.reduce((sum, id, i) => sum + (i === 0 ? '' : '&') + 'productId=' + id, '?')
        // const link = `/wishlist` + query;
        //    wishlistPageFormInput.setAttribute('value', String(addedProducts));

        wishlistPageLink.href = `/${LANGUAGE_CODE}/products/wishlist?pids=` + btoa(String(addedProducts));
        wishlistPageLink2.href = `/${LANGUAGE_CODE}/products/wishlist?pids=` + btoa(String(addedProducts));
        wishlistPageLink.style.display = 'inline-block';
        wishlistPageLink.querySelector('.wishlist__quantity').textContent = addedProducts.length
        wishlistPageLink2.querySelector('.wishlist__quantity').textContent = addedProducts.length
    }

    function initWishlistPage() {
        const isWishlistPage = location.href.includes('/wishlist');
        if (isWishlistPage) {
            const qs = queryParse(location.search);
        }
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        const addedProductss = JSON.parse(window.localStorage.getItem(STORAGE_KEY_FOR_WISHLIST_PRODUCTS_IDS) || "[]");
        wishlistLinksArray.forEach(addToWishlistLink => {
            const productId = addToWishlistLink.dataset.id
            if (addedProductss.length) {
                if (addedProductss.indexOf(productId) > -1) {
                    addToWishlistLink.classList.add("added-to-wishlist");
                    addToWishlistLink.setAttribute("title", remove_from_wishlist);
                }
            }
        })
        wishlistPageLinkChange(addedProductss);

        initWishlistPage(addedProductss)
    });

    wishlistLinksArray.forEach(addToWishlistLink => {
        addToWishlistLink.addEventListener('click', e => {
            if (e) e.preventDefault()
            const addedProductss = JSON.parse(window.localStorage.getItem(STORAGE_KEY_FOR_WISHLIST_PRODUCTS_IDS) || "[]");
            const productId = addToWishlistLink.dataset.id

            if (addedProductss.indexOf(productId) > -1) {
                addedProductss.splice(addedProductss.indexOf(productId), 1);
                addToWishlistLink.classList.remove("added-to-wishlist")
                addToWishlistLink.setAttribute("data-original-title", add_to_wishlist);
            } else {
                addedProductss.push(productId);
                addToWishlistLink.classList.add("added-to-wishlist");
                addToWishlistLink.setAttribute("data-original-title", remove_from_wishlist);
            }
            window.localStorage.setItem(STORAGE_KEY_FOR_WISHLIST_PRODUCTS_IDS, JSON.stringify(addedProductss))
            wishlistPageLinkChange(addedProductss)

            if (addToWishlistLink.classList.contains("remove-from-wishlist")) {
                window.location.href = wishlistPageLink.href;
            }
        })
    });
}

initWishlistProductsLogic();

$(document).ready(function () {

});

