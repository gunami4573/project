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

        //메인비주얼 버튼 슬라이드 시작
        var $LinkSldieList = $('.miracle_visual .miracle_visual_wrap .link_slide_wrap .link_slide_list');
        $LinkSldieList.slick({
            autoplay : false,
            arrows : true,
            dots : false,
            slidesToShow : 2,
            slidesToScroll : 1,
            infinite : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            rows : 1,
            responsive: [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        //메인비주얼 버튼 슬라이드 끝


        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);