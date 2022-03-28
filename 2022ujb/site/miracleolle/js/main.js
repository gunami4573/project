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

        //체험프로그램 슬라이드 시작
        var $ExperienceSlideList = $('.experience_slide_wrap .experience_slide_list');
        $ExperienceSlideList.slick({
            autoplay : true,
            arrows : true,
            prevArrow : $('.experience_slide_wrap .experience_slide_control .prev'),
            nextArrow : $('.experience_slide_wrap .experience_slide_control .next'),
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            rows : 3,
            slidesPerRow : 3,
            variableWidth : false,
            responsive: [{
                breakpoint : 641,
                settings : {
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    rows : 1,
                    slidesPerRow : 1,
                    variableWidth : true
                }
            }]
        });
        //체험프로그램 슬라이드 끝

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);