function include(url) {
    document.write("<script src=\"" + url + "\"></script>");
    return false;
}

/* cookie.JS
 ========================================================*/
include("/Scripts/jquery.cookie.js");


/* DEVICE.JS
 ========================================================*/
include("/Scripts/device.min.js");

/* Stick up menu
 ========================================================*/
include("/Scripts/tmstickup.js");
$(window).load(function() {
    if ($("html").hasClass("desktop")) {
        $("#stuck_container").TMStickUp({

        });
    }
});

/* Easing library
 ========================================================*/
include("/Scripts/jquery.easing.1.3.js");


/* ToTop
 ========================================================*/
include("/Scripts/jquery.ui.totop.js");
$(function() {
    $().UItoTop({ easingType: "easeOutQuart" });
});


/* DEVICE.JS AND SMOOTH SCROLLIG
 ========================================================*/
include("/Scripts/jquery.mousewheel.min.js");
include("/Scripts/jquery.simplr.smoothscroll.min.js");
$(function() {
    if ($("html").hasClass("desktop")) {
        $.srSmoothscroll({
            step: 150,
            speed: 800
        });
    }
});

/* Copyright Year
 ========================================================*/
var currentYear = (new Date).getFullYear();
$(document).ready(function() {
    $("#copyright-year").text((new Date).getFullYear());
});


/* Superfish menu
 ========================================================*/
include("/Scripts/superfish.js");
include("/Scripts/jquery.mobilemenu.js");

/* Unveil
 ========================================================*/
include("/Scripts/jquery.unveil.js");
$(document).ready(function() {
    $("img").unveil();
});

/* Orientation tablet fix
 ========================================================*/
$(function() {
// IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector("meta[name=\"viewport\"]"),
        ua = navigator.userAgent,

        gestureStart = function() {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function() {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM);
        if (!result) {
            $(".sf-menu li").each(function() {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function() {
                            return false;
                        },
                        function() {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            });
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0";
}
document.write("<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0" + userScale + "\">"); /* Custom script
 ========================================================*/
$(document).ready(function() {
    var camera = $("#camera");
    var owl = $("#owl");
    var owl2 = $("#owl_2");
    var isotope = $(".isotope");

    if (camera.length > 0) {
        camera.camera(
            {
                autoAdvance: true,
                height: "31.25%",
                minHeight: "200px",
                pagination: false,
                thumbnails: false,
                playPause: true,
                hover: false,
                loader: "none",
                navigation: true,
                navigationHover: false,
                mobileNavHover: false,
                fx: "simpleFade"
                
            }
        );
    }

    if (owl.length > 0) {
        owl.owlCarousel(
            {
                navigation: true,
                autoPlay: true,
                slideSpeed: 300,
                stopOnHover: true,
                pagination: false,
                paginationSpeed: 400,
                singleItem: true,
                mouseDrag: false,
                navigationText: ["", ""]
            }
        );
    }

    if (owl2.length > 0) {
        owl2.owlCarousel(
            {
                navigation: true,
                autoPlay: true,
                slideSpeed: 300,
                stopOnHover: true,
                pagination: false,
                paginationSpeed: 400,
                singleItem: true,
                mouseDrag: false,
                navigationText: ["", ""]
            }
        );
    }

    if (isotope.length > 0) {
        isotope.isotope({
            itemSelector: ".element-item",
            layoutMode: "fitRows"
        });

        $("#filters").on("click", "a", function() {
            var filterValue = $(this).attr("data-filter");
            console.log(filterValue);
            $("#filters .active-link").removeClass("active-link");
            
            $(this).addClass("active-link");
            if (filterValue == "*") {
                isotope.isotope({ filter: filterValue });
            } else {
                isotope.isotope({ filter: "." + filterValue });
            }
            return false;
        });
    }
    $("#phone").mask("+9 (999) 999-99-99");
    $(document).on('click', '#showCityPopover', function() {
        $('.js-modal_popover').show();
    });
 
    $(document).on('click', '.wrap-close-icon', function () {
        $('.js-modal_popover').hide();
    });
  
    $(document).on('change', '#selectRegion', function () {
        window.location.href = $('#selectRegion').val();
    });
});

$("#RequestCallback").on("shown.bs.modal", function() {
    $("#phone").focus();
});

var CallMe = function() {

    $.ajax({
        url: "/home/CallRequest",
        type: "POST",
        data: { phone: $("#phone").val(), name: $("#message-text").val(), url: window.location.pathname },
        success: function() {
            $("#RequestCallback").modal("hide");
            $(".response-message").find(".modal-body").text("Ваш запрос принят. Мы свяжемся с вами как можно скорее. ");
            $(".response-message").modal();
        },
        error: function() {
            $("#RequestCallback").modal("hide");
            $(".response-message").find(".modal-body").text("К сожалению при отправке запроса произошла ошибка. Попробуйте позднее. ");
            $(".response-message").modal();
        },
        dataType: "text"
    });


};