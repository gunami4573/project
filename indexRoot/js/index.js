(function ($) {

    'use strict';

    $(function () {

        var $html = $('html'),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $footer = $('#footer');

        setTimeout(function(){
            $html.addClass('scroll_on');
        }, 6000);
        setTimeout(function(){
            $body.addClass('loading');
        }, 1);

    });
})(jQuery);
