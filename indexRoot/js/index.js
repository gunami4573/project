(function ($) {

    'use strict';

    $(function () {

        var $html = $('html'),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $footer = $('#footer');

        //
        setTimeout(function () {
            $body.addClass('loading');
        }, 500);
        //

        //
        setTimeout(function () {
            $html.addClass('scroll_on');
        }, 10300);
        //

        //
        var $campanySVG = $('.campany .campany_wrap .campany_box .campany_svg_box .campany_svg'),
            $campanyG = $campanySVG.find('> g');
        for(var i=0; i<$campanyG.length; i++){
            console.log($campanyG.eq(i));
        }
        setTimeout(function () {
            $campanySVG.addClass('active');
        }, 4300);
        //

    });
})(jQuery);
