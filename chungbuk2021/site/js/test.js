(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        //여기서부터 코드 작성해주세요
        $('.main').on('click', function(){
           var $this = $(this);

           console.log('GitHub main page test console error');
        });

    });
})(jQuery);