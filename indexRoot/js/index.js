(function ($) {

    'use strict';

    $(function () {

        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $footer = $('#footer');

        setTimeout(function(){
            $body.addClass('loading');
        }, 1);

    });
})(jQuery);
