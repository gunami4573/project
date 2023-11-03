(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //여기서부터 코드 작성해주세요

        //문화관광 전용 풀페이지 처럼 동작 시작
        function htmlScrollTop(){
            $('html').animate({
                scrollTop : 0
            }, 800, 'linear');
        }
        var StartRow2Top = $('.rowgroup2').offset().top;
        function moveScroll(){
            var $tourScrollWrapper = $('#wrapper'),
                IsTourScroll = $tourScrollWrapper.is('.tour_scroll');
            var TourScrollTop = $window.scrollTop();
            var Row2Top = $('.rowgroup2').offset().top;
            if(TourScrollTop > StartRow2Top){
                if(!IsTourScroll){
                    $tourScrollWrapper.addClass('tour_scroll');
                    htmlScrollTop();
                }
            }
            if(IsTourScroll) {
                $window.on('wheel', function(e){
                    if (e.originalEvent.deltaY < 0) {
                        $('html').stop();
                        if(TourScrollTop === Row2Top){
                            $tourScrollWrapper.removeClass('tour_scroll');
                            Row2Top = StartRow2Top;
                            TourScrollTop = 0;
                        }
                    }
                });
            }
            console.log('초기값로우2탑:',StartRow2Top);
            console.log('변동값로우2탑:',Row2Top);
            console.log('스크롤상단:',TourScrollTop);
        }
        moveScroll();
        $window.on('scroll', function(){
            moveScroll();
        });
        //문화관광 전용 풀페이지 처럼 동작 끝

        //비주얼 슬라이드 시작
        var $VisualSlideItem = $('.visual_wrap .visual_slide_wrap .visual_slide_list .visual_slide_item'),
            VisualSlideItemLength = $VisualSlideItem.length,
            $BackDeco = $('.back_deco');
        for(var i=0; i<VisualSlideItemLength; i++){
            $BackDeco.append('<i class="back_deco_item" style="background-image:url('+$VisualSlideItem.eq(i).find('.hidden_img').attr('src')+')"></i>');
        }
        var $VisualSlideList = $('.visual_wrap .visual_slide_wrap .visual_slide_list'),
            $VisualSlideControl = $('.visual_wrap .visual_slide_wrap .visual_slide_control'),
            $VisualPrev = $VisualSlideControl.find('.prev'),
            $VisualNext = $VisualSlideControl.find('.next'),
            $VisualTotal = $VisualSlideControl.find('.total'),
            $VisualCurrent = $VisualSlideControl.find('.current'),
            $VisualAuto = $('.visual_wrap .visual_slide_wrap .visual_scroll_box .auto');
        $VisualSlideList.on('init', function(event, slick, currentSlide) {
            var $crtSlide = $(slick.$slides[0]),
                $crtRows = $crtSlide.find('.slick-rows'),
                $crtVisualSlideItem = $crtRows.find('.visual_slide_item'),
                crtVisualBackData = $crtVisualSlideItem.attr('data-type') - 1,
                $crtBackDecoItem = $BackDeco.find('.back_deco_item').eq(crtVisualBackData),
                $otherBackDecoItem = $crtBackDecoItem.siblings('.back_deco_item');
            $otherBackDecoItem.removeClass('active start_deco');
            $crtBackDecoItem.addClass('active');
            $VisualSlideControl.addClass('active');
            setTimeout(function(){
                $crtBackDecoItem.addClass('start_deco');
            }, 1);
        });
        $VisualSlideList.slick({
            //기본
            autoplay : true,
            speed : 3000,
            autoplaySpeed : 4000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            fade : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite: true,
            arrows : true,
            prevArrow : $VisualPrev,
            nextArrow : $VisualNext,
            autoArrow : $VisualAuto,
            pauseText : '정지',
            playText : '재생',
            total : $VisualTotal,
            current : $VisualCurrent,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            variableWidth : false,
            zIndex : 0,
            responsive : [{}]
        });
        $VisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $nextSlide = $(slick.$slides[nextSlide]),
                $nextRows = $nextSlide.find('.slick-rows'),
                $nextVisualSlideItem = $nextRows.find('.visual_slide_item'),
                nextVisualBackData = $nextVisualSlideItem.attr('data-type') - 1,
                $nextBackDecoItem = $BackDeco.find('.back_deco_item').eq(nextVisualBackData),
                $otherBackDecoItem = $nextBackDecoItem.siblings('.back_deco_item');
            $otherBackDecoItem.removeClass('active start_deco');
            $nextBackDecoItem.addClass('active');
            setTimeout(function(){
                $nextBackDecoItem.addClass('start_deco');
            }, 1);

            $VisualSlideControl.removeClass('active');
            setTimeout(function(){
                $VisualSlideControl.addClass('active');
            }, 1);
        });
        $VisualSlideList.on('afterChange', function(event, slick, currentSlide, nextSlide) {

        });
        $VisualAuto.on('click', function(){
            var $this = $(this),
                $Bar = $('.visual_wrap .visual_slide_wrap .visual_slide_control .pro_box .bar'),
                IsPlay = $this.is('.slick-pause');
            if(IsPlay){
                $Bar.css('animation-play-state', 'running');
            }
            else{
                $Bar.css('animation-play-state', 'paused');
            }
        });
        //비주얼 슬라이드 끝

        //문화관광 풀페이지 처럼 동작 시 포커스 동작 시작
        $('.visual_quick_wrap .visual_quick_list .visual_quick_item:last-child .visual_quick_link').on('focusin', function(){
            $('#wrapper').removeClass('tour_scroll');
        });
        $('.visual_quick_wrap .visual_quick_list .visual_quick_item:last-child .visual_quick_link').on('focusout', function(){
            $('#wrapper').addClass('tour_scroll');
        });
        $('.visual_quick_wrap .visual_quick_list .visual_quick_item:nth-child(3) .visual_quick_link').on('focusin', function(){
            $('#wrapper').removeClass('tour_scroll');
        });
        $('.service_wrap .service_slide_list .service_slide_item.type01 .service_slide_link').on('focusin', function(){
            $('#wrapper').addClass('tour_scroll');
            $('html').animate({
                scrollTop : 0
            }, 800, 'linear');
        });
        //문화관광 풀페이지 처럼 동작 시 포커스 동작 끝

        //자주찾는 메뉴 슬라이드 시작
        var $ServiceSlideList = $('.service_wrap .service_slide_wrap .service_slide_list');
        $ServiceSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            fade : false,
            slidesToShow : 10,
            slidesToScroll : 1,
            infinite: true,
            arrows : false,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            variableWidth : true,
            zIndex : 0,
            responsive : [{}]
        });
        //자주찾는 메뉴 슬라이드 끝

    });
})(jQuery);