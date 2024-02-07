var productCollection;
var productItemId = 1;
var imginitdone = false;
jQuery(function ($) {
    if (BrowserDetect.browser === "Explorer" && BrowserDetect.version < 10) {
        $("#wish-list").hide()
    }
    var has3More = $(".seo_accordion li:gt(2)").hide().length > 0;
    has3More = $(".seo_accordion .br-related-query:gt(2)").hide().length > 0 || has3More;
    if (has3More) {
        $(".seo_accordion").on("click", ".show-less,.show-more", function () {
            if ($(this).hasClass("show-less")) {
                $(this).parent().find("li:gt(2),.br-related-query:gt(2)").hide();
                $(this).removeClass("show-less").addClass("show-more")
            } else {
                $(this).parent().find("li:gt(2),.br-related-query:gt(2)").show();
                $(this).removeClass("show-more").addClass("show-less")
            }
        }).find(".show-less").removeClass("show-less").addClass("show-more").show()
    }
    $("body").on("click touch", ".modal", function () {
        if (this.id !== "modal-login") {
            $(this).modal("hide")
        }
    });
    var styleId = $("#stylecode").attr("value");
    var subcode = $("#subcode").attr("value");
    var selectId = $(".select-box select").attr("id");
    if (selectId) {
        initMultiImages();
        $(".colorswatch").click(changeColor);
        var subStyleId = 0;
        if (subcode && subcode != null && subcode != "null") {
            subStyleId = parseInt(subcode)
        }
        var productCollection = sbmetacollectionFactory.getCollection("product");
        updateDetail(subStyleId);
        initColorButtons(selectId, productCollection, productItemId);
        $("#modal-login #form-submit").off("click").on("click", function (event) {
            event.preventDefault();
            var $formSubmit = $(event.currentTarget), $form = $formSubmit.parents("form"),
                submitText = $formSubmit.text(), postData = sbApp.Util.serializeFormToObject($form);
            sbApp.loginUser(postData.emailAddress, postData.password, function () {
                $("a#wish-list").click()
            }, function (error) {
                $("#modal-login .crt-form-error").show().html("No account matches the email address and password combination")
            })
        });
        $("a#wish-list").click(function (event) {
            event.preventDefault();
            var styleId = $(this).data("styleid");
            var postData = getDataForPost(styleId);
            var $btn = $(this);
            var command = {styleId: styleId.toString(), quantity: 1};
            if (_.has(postData, "productId")) {
                _.extend(command, {skuCode: postData.productId.toString()})
            }
            if (_.has(postData, "substyleId")) {
                _.extend(command, {subCode: postData.substyleId.toString()})
            }
            $("body").append('<div id="loading"><span class="loading-image"></span></div>');
            $.ajax({
                type: "PUT",
                url: "/cart-checkout/api/legacy/wishlist",
                data: JSON.stringify(command),
                contentType: "application/vnd.com.shoebuy.v1+json",
                dataType: "json"
            }).done(function (data, textStatus, jqXHR) {
                document.location.href = "/lists/wishlist"
            }).fail(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403) {
                    $("#modal-login form")[0].reset();
                    $("#modal-login .crt-form-error").hide().empty();
                    $("#modal-login").modal("show")
                } else {
                    $("#modal-login form")[0].reset();
                    $("#modal-login .crt-form-error").hide().empty();
                    $("#modal-login").modal("hide");
                    alert(jqxhr.responseJSON.error)
                }
            }).always(function () {
                $("#loading").hide()
            })
        });
        var ConfigModal = function (config) {
            this.el = document.createElement("div");
            this.el.id = "pdp-config-modal-overlay";
            this.$el = $(this.el);
            this.defaults = {padding: "0px", width: "800px", height: "600px", delay_until_open: 0};
            this.options = config || {};
            this.settings = $.extend({}, this.defaults, this.options);
            this.is_tablet = false
        };
        ConfigModal.prototype = {
            checkForTablet: function () {
                var regex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
                this.is_tablet = regex.test(navigator.userAgent)
            }, getModalVerticalOffset: function () {
                if (this.is_tablet) {
                    return "12%"
                }
                var windowY = $(window).height(), modalY = parseInt(this.settings.height, 10),
                    windowDelta = windowY - modalY, modal_top_offset = windowDelta / 2;
                if (modal_top_offset < 0) {
                    modal_top_offset *= -1
                }
                return modal_top_offset + "px"
            }, setVariableStyles: function () {
                var settings = this.settings, modal_top_offset = this.getModalVerticalOffset();
                $("#pdp-config-modal-wrapper").css({"margin-top": modal_top_offset, "margin-bottom": modal_top_offset});
                $("#pdp-config-modal").css({
                    "max-width": settings.width,
                    "max-height": settings.height,
                    padding: settings.padding
                });
                $("#pdp-config-modal-img").css({"max-width": settings.width, "max-height": settings.height})
            }, showModal: function () {
                var self = this, delay = parseInt(self.settings.delay_until_open, 10);
                setTimeout(function () {
                    self.$el.fadeIn(100)
                }, delay)
            }, destroyModal: function () {
                $("#pdp-config-modal-overlay").fadeOut(400, function () {
                    $(this).remove()
                });
                $(document).trigger("pdp-config-modal-destroyed")
            }, buildModal: function () {
                var settings = this.settings;
                var optionsText = this.getUnselectedText();
                var html = '<div id="pdp-config-modal-wrapper"><div id="pdp-config-modal"><div id="pdp-config-modal-close"></div><div class="pdp-config-modal-inner"><p>Please select the option(s): <br><span class="optionsText">' + optionsText + "</span> <br>before clicking Add to Cart</p><div></div></div>";
                this.$el.html(html);
                $("body").append(this.$el);
                this.setVariableStyles();
                this.showModal()
            }, getUnselectedText: function () {
                return $("fieldset.selBox:not(:has(a.selected)) .instruction .highlight").map(function (idx, el) {
                    return $(el).text()
                }).toArray().join(", ")
            }, setModalListeners: function () {
                var self = this;
                $("#pdp-config-modal-overlay").on("click", function () {
                    self.destroyModal()
                });
                $("#pdp-config-modal").on("click", function (e) {
                    e.stopPropagation()
                });
                $("#pdp-config-modal-close").on("click", function (e) {
                    e.preventDefault();
                    self.destroyModal()
                })
            }, setListeners: function () {
                var self = this;
                $(document).on("pdp-config-modal-destroyed", function () {
                });
                $(document).on("mousedown", "#pdp-config-modal-link", function () {
                })
            }, init: function () {
                this.checkForTablet();
                this.buildModal();
                this.setModalListeners();
                this.setListeners()
            }
        };
        var configModal;

        function updateAddToCartButton() {
            if ($("fieldset.selBox:not(:has(a.selected)) .instruction .highlight").length === 0) {
                $("a#add-cart").removeClass("disabled")
            } else {
                $("a#add-cart").addClass("disabled")
            }
            if ($("fieldset.selBox .product-option-error").length > 0) {
                toggleProdOptionMessages()
            }
        }

        $(".prodOptions a").click(updateAddToCartButton);
        updateAddToCartButton();

        function toggleProdOptionMessages() {
            $(".prodOptions").each(function () {
                var $this = $(this),
                    optionsTitle = $this.parent("fieldset").find(".instruction .highlight").text().toLowerCase();
                if ($this.find("a.selected").length > 0) {
                    $this.parent("fieldset").find(".error-" + optionsTitle).fadeOut(500, function () {
                        $(this).remove()
                    })
                } else {
                    if ($this.parent("fieldset").find(".error-" + optionsTitle).length === 0) {
                        $this.parent("fieldset").append('<span class="product-option-error error-' + optionsTitle + '"> Please select a ' + optionsTitle + ".</span>")
                    }
                }
            })
        }

        $("a#add-cart").click(function (event) {
            event.preventDefault();
            var styleId = $(this).data("styleid");
            var postData = getDataForPost(styleId);
            var ref = $(this).data("ref");
            postData.ref = ref;
            var command = {styleId: styleId.toString(), quantity: 1};
            if (_.has(postData, "productId")) {
                _.extend(command, {skuCode: postData.productId.toString()})
            } else {
                if (!configModal) {
                    configModal = new ConfigModal({padding: "10px 20px", width: "340px"})
                }
                configModal.init();
                toggleProdOptionMessages();
                return
            }
            $("body").append('<div id="loading"><span class="loading-image"></span></div>');
            $.ajax({
                type: "PUT",
                url: "/cart-checkout/api/legacy/cart",
                data: JSON.stringify(command),
                contentType: "application/vnd.com.shoebuy.v1+json",
                dataType: "json",
                success: function (data) {
                    document.location.href = secureUrl + "/cart/cart"
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    $("#loading").remove();
                    alert(errorThrown)
                }
            })
        })
    } else {
        updateDetail(0)
    }

    function initReviews() {
        $("#review-paging").children("a").click(function (event) {
            event.preventDefault();
            var url = $(this).attr("href");
            var pageNum = $(this).attr("title");
            var styleCode = $(this).siblings("input").attr("value");
            $.get(url, {page: pageNum, numPerPage: "8", style: styleCode}, function (data) {
                $("div#reviews").html(data);
                initReviews();
                $(window).scrollTop($("div#reviews").offset().top)
            })
        });
        $(".bv-tab-button, .bv-view-content").click(function () {
            $(".bv-tab-button").removeClass("active");
            $('.bv-tab-button[ref="' + $(this).attr("ref") + '"]').addClass("active");
            $(".bv-tab-content").css("display", "none");
            $('.bv-tab-content[ref="' + $(this).attr("ref") + '"]').css("display", "block");
            if ($(this).attr("class") == "bv-view-content") {
                window.scrollTo(0, $("#bv-content-container").offset().top)
            }
        })
    }

    initReviews();
    $(".notify-add-cart").click(function (event) {
        event.preventDefault();
        var styleId = $(this).prop("id");
        var productId;
        var sep = styleId.indexOf("_");
        if (sep != -1) {
            productId = styleId.substring(sep + 1);
            styleId = styleId.substring(0, sep)
        }
        var data = {quantity: 1, styleId: styleId, productId: productId, ref: window.location.pathname};
        $("body").append('<div id="loading"><span class="loading-image"></span></div>');
        $.ajax({
            type: "POST",
            url: "/controller/cart/add-to-cart?setResult=success",
            data: data,
            success: function (data) {
                if (data.hasOwnProperty("payload") && data.payload.hasOwnProperty("restriction_message")) {
                    $("#loading").hide();
                    var shipModal = $("div#restrictedShipping");
                    shipModal.find(".modal-body").html(data.payload.restriction_message);
                    shipModal.modal("show")
                } else {
                    if (data.success || data.status == 102) {
                        window.opener.location.href = secureUrl + "/cart/cart";
                        window.close()
                    } else {
                        $("#loading").hide();
                        alert(data.message)
                    }
                }
            },
            error: function (jqxhr, textStatus, errorThrown) {
                $("#loading").hide();
                alert(errorThrown)
            }
        })
    })
});

function getDataForPost(styleId) {
    var product = productCollection.metaItems[productItemId].product;
    var data = {quantity: 1, styleId: styleId};
    var subcode = null;
    var c = product.c;
    if (c >= 0) {
        subcode = product.colors[c].subcode
    }
    if (subcode !== null) {
        data.substyleId = subcode
    }
    var productId = (getIsPseudoSKU()) ? null : getSelectedProductId(product);
    if (productId !== null) {
        data.productId = productId
    }
    return data
}

function initMultiImages(colorId) {
    var product = productCollection.metaItems[productItemId].product;
    colorId = colorId || cid;
    $('img[id^="thumb"]').each(function () {
        $(this).hide()
    });
    for (var i = 0; i < product.colors.length; i++) {
        if (colorId === product.colors[i].id) {
            var multiImgs = product.colors[i].multiImages;
            for (var j = 0; j < multiImgs.length; j++) {
                var count = multiImgs[j];
                var url = product.mcfileroot + colorId + "_dt" + count + ".jpg";
                $("img#thumb" + count).attr("src", url);
                $("img#thumb" + count).show();
                $("img#thumb" + count).off().mouseover(function () {
                    var id = $(this).attr("id");
                    var idLen = id.length;
                    var pos = id.substring("thumb".length, idLen);
                    var url = product.mcfileroot + colorId + "_jb" + pos + ".jpg";
                    $("#primary-image").attr("src", url);
                    $("#pdpModalImg").attr("src", url);
                    var hdurl = product.mcfileroot + colorId + "_hd" + pos + ".jpg";
                    dozoom(hdurl)
                })
            }
        }
    }
    try {
        if (!imginitdone && $('img[id^="thumb"]:visible').eq(0).length) {
            $('img[id^="thumb"]:visible').eq(0).trigger("mouseover");
            imginitdone = true
        } else {
            if (!imginitdone && !$('img[id^="thumb"]:visible').eq(0).length) {
                $('[id^="li_color"].selected').eq(0).off("click", changeColor).on("click", changeColor);
                imginitdone = true
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function changeColor() {
    var colorId = $(this).siblings("input.swatchColorId").attr("value");
    cid = parseInt(colorId);
    var imagePath = $(this).siblings("input.imageFilePath").attr("value");
    $("div.color").removeClass("selected");
    $(this).parents("div.color").addClass("selected");
    $("#primary-image").attr("src", imagePath);
    $("#pdpModalImg").attr("src", imagePath);
    var hdurl;
    if (typeof imagePath === "string") {
        hdurl = imagePath.replace(/jb/g, "hd")
    }
    dozoom(hdurl);
    initMultiImages(cid);
    var colorIndex = $(this).attr("data-cindex");
    var colorDD = $("#li_color_" + colorIndex + "_1");
    if (!colorDD.hasClass("selected")) {
        colorDD.click()
    }
    if (cid) {
        var product = productCollection.metaItems[productItemId].product;
        var subcode = 0;
        for (var i in product.colors) {
            if (product.colors[i]["id"] === cid) {
                subcode = product.colors[i]["subcode"];
                break
            }
        }
        var tealium_data = {};
        if (product) {
            tealium_data.product = product
        }
        if (subcode > 0) {
            tealium_data.subcode = subcode
        }
        if (Tealium) {
            Tealium.triggerUpdateListeners(tealium_data)
        }
    }
}

function updateDetail(subStyleCode) {
    var product = productCollection.metaItems[productItemId].product;
    addClickListeners("size", $("ul.item.sizes"), productCollection, productItemId);
    addClickListeners("width", $(".widths"), productCollection, productItemId);
    if (product.isOneWidth) {
        product.w = 0
    }
    if (product.isOneSize) {
        product.s = 0
    }
    if (subStyleCode > 0) {
        var selectedOpt = $(".select-box select").find("option:selected");
        var id = selectedOpt.attr("id");
        var index = id.split("_");
        index = index[1];
        productCollection.update_selected("color", index, false, productItemId, true)
    }
    var tealium_data = {};
    if (product) {
        tealium_data.product = product
    }
    if (subStyleCode) {
        tealium_data.subcode = subStyleCode
    }
    if (typeof Tealium !== "undefined") {
        Tealium.triggerUpdateListeners(tealium_data)
    }
}

function cleared_types_messaging(type, clearedTypes) {
    if (clearedTypes.length === 0) {
        $(".selectors").find(".form-error").hide();
        return
    }
    var msg = "The previously selected " + ((clearedTypes.length === 1) ? clearedTypes[0] : (clearedTypes.length === 2) ? clearedTypes.join(" and ") : clearedTypes.join(", ")) + " is not available in " + type + ".";
    $(".selectors").find(".form-error").text(msg).show();
    $.each({
        ".prod_size a.selected": "body #size-selection",
        ".prod_width a.selected": "body .selection-attr-label",
        ".prod_color a.selected": "body .selected_color_name"
    }, function (selected, labelField) {
        if ($(selected).length === 0) {
            $(labelField).text("").parent().removeClass("selected")
        }
    })
}

function mailPop(search, s) {
    var myLink = location.href;
    var t = window.open(search + "?Notify=friend&Style=" + s, "mail_popup", "width=490,height=340,dependent=1,resizable=1,screenX=125,screenY=165,left=125,top=165")
}

function productPop(search, s) {
    window.open(search + "?Notify=product&Style=" + s, "prd_notification_popup", "width=525,height=480,dependent=1,resizable=1,screenX=125,screenY=165,left=125,top=165")
}

function brandPop(search, s) {
    var z = window.open(search + "?Notify=brand&Style=" + s, "brd_notification_popup", "width=480,height=450,dependent=1,resizable=1,screenX=125,screenY=165,left=125,top=165")
}

function definitionsPop(url) {
    var newwindow = window.open(url, "name", "height=400,width=450,left=90,top=90,scrollbars=1");
    if (window.focus) {
        newwindow.focus()
    }
};