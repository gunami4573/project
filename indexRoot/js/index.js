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
        }, 1);
        //

        //
        setTimeout(function () {
            $html.addClass('scroll_on');
        }, 10000);
        //

        //
        var $campanySVG = $('.campany .campany_wrap .campany_box .campany_svg_box .campany_svg'),
            $campanyG = $campanySVG.find('> g');
        console.dir($campanyG);
        setTimeout(function () {
            $campanySVG.addClass('active');
        }, 4000);
        //

    });
})(jQuery);
