(function ($) {

    'use strict';

    $(function () {

        var $html = $('html'),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $footer = $('#footer');

        //
        setTimeout(function(){
            $body.addClass('loading');
        }, 1);
        //

        //
        setTimeout(function(){
            $html.addClass('scroll_on');
        }, 6000);
        //

        //
        var $campanySVG = $('.campany .campany_wrap .campany_box .campany_svg_box .campany_svg');
        //

    });
})(jQuery);
