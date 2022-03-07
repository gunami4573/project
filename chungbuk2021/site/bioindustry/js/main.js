'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);

            $(function() {
                $window.on('screen:wide screen:web', function(event) {
                    window.mode = 'pc';
                });

                $window.on('screen:tablet screen:phone', function(event) {
                    $('.search_panel').hide();
                    window.mode = 'mobile';
                });

                $('.visual_list a[href="#"]').click(function(e) {
                    e.preventDefault();
                });

                //여기서부터 코드 작성해주세요


            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
