"use strict";

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            $(function() {
                var $window = $(window),
                    $html = $('html'),
                    $container = $('#container'),
                    $footer = $('#footer');

                //여기서부터 코드 작성해주세요.

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}