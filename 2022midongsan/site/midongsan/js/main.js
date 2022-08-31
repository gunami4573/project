(function ($) {
    'use strict';
    function splittingTextDelay (object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i=0; i<splitLength; i++) {
            if (  $(object).data('css-property') == 'animation' ) {
                $(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
            }else if( $(object).data('css-property') == 'transition' ) {
                $(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
            }
        }
    }

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요

        //텍스트 에니메이션 플러그인 시작
        Splitting({
            target: '[data-splitting]',
            by: 'chars',
            key: null
        });
        var $splittingTxt = $('.word-split');
        $($splittingTxt).each(function  () {
            splittingTextDelay($(this),$(this).data('speed'),$(this).data('speed-delay'));
        });
        //텍스트 에니메이션 플러그인 끝

        //메인 비주얼 슬라이드 시작
        var $MidongSlideList = $('.main_visual .main_visual_wrap .visual_inner_box .wrap_box .midong_slide_wrap .midong_slide_list'),
            $MidongSlidePrev = $('.main_visual .main_visual_wrap .visual_inner_box .wrap_box .midong_slide_wrap .midong_slide_control .prev'),
            $MidongSlideNext = $('.main_visual .main_visual_wrap .visual_inner_box .wrap_box .midong_slide_wrap .midong_slide_control .next');
        $MidongSlideList.slick({
            autoplay : true,
            autoplaySpeed : 4000,
            speed : 1200,
            dots : false,
            arrows : true,
            prevArrow : $MidongSlidePrev,
            nextArrow : $MidongSlideNext,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            zIndex : 4,
            pauseOnHover : false,
            responsive: [{}]
        });

        //메인 비주얼 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);