(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function(){
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if(LayoutType=='normal'){
            if(scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        } else if(LayoutType=='visualtype'){
            if(scrollTop > ContainerOffset.top-150) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        }
        $window.on('scroll', function(event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if(LayoutType=='normal'){
                if(scrollTop > wrapperOffset.top) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            } else if(LayoutType=='visualtype'){
                if(scrollTop > ContainerOffset.top-150) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            }
        });

        //여기서 부터 코드 작성

        //메인비주얼 슬라이드 시작
        var $VisualSlideList = $('.main_visual .main_visual_wrap .visual_slide_wrap .list_wrap .visual_slide_list'),
            $TitleWrap = $('.main_visual .main_visual_wrap .visual_slide_wrap .title_wrap'),
            $ControlWrap = $('.main_visual .main_visual_wrap .visual_slide_wrap .control_wrap');
        $VisualSlideList.on('init', function(event, slick, currentSlide){
            var $currentslide = $(slick.$slides[0]),
                $FirstTopText = $('.visual_text_box .top_wrap .text.num1'),
                $FirstBottomText = $('.visual_text_box .bottom_wrap .text.num1');
            $currentslide.addClass('loading');
            setTimeout(function(){
                $FirstTopText.addClass('loading');
            }, 700);
            setTimeout(function(){
                $FirstBottomText.addClass('loading');
            }, 900)
        });
        $VisualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 6000,
            speed : 1000,
            arrows : true,
            dots : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            fade : true,
            zIndex : 5,
            prevArrow : $ControlWrap.find('.prev'),
            nextArrow : $ControlWrap.find('.next'),
            autoArrow : $ControlWrap.find('.auto'),
            pauseText : '정지',
            playText : '재생',
            responsive : []
        });

        $VisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]),
                $nextslide = $(slick.$slides[nextSlide]),
                $TopText = $('.visual_text_box .top_wrap .text').eq(currentSlide),
                $NextTopText = $('.visual_text_box .top_wrap .text').eq(nextSlide),
                $BottomText = $('.visual_text_box .bottom_wrap .text').eq(currentSlide),
                $NextBottomText = $('.visual_text_box .bottom_wrap .text').eq(nextSlide);

            $TopText.removeClass('loading');
            $BottomText.removeClass('loading');
            $TopText.removeClass('active');
            $BottomText.removeClass('active');
            setTimeout(function(){
                $NextTopText.addClass('active');
                $NextBottomText.addClass('active');
            }, 400);

            $nextslide.addClass('loading');
            setTimeout(function(){
                $currentslide.removeClass('loading');
            }, 2000);
        });
        //메인비주얼 슬라이드 끝

        //스크롤 애니메이션 시작
        var $ScrollAni = $('.scroll_ani');
        $window.on('scroll', function(event) {
            $ScrollAni.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top;
                if(ThisOffSetTop < WindowBottom){
                    $this.addClass('scroll_active');
                }
                if(ThisOffSetTop > WindowBottom){
                    $this.removeClass('scroll_active');
                }
            });
        });
        //스크롤 애니메이션 끝

        //주요명소 슬라이드 영역 시작
        var $PlaceSlideList = $('.place .place_wrap .place_slide_wrap .place_slide_inner .place_slide_list');
        $PlaceSlideList.slick({
            autoplay : false,
            arrows : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            rows : 2,
            slidesPerRow : 3,
            prevArrow : $('.place .place_wrap .place_slide_wrap .place_slide_inner .place_slide_control_box .prev'),
            nextArrow : $('.place .place_wrap .place_slide_wrap .place_slide_inner .place_slide_control_box .next'),
            variableWidth : false,
            responsive: [{
                breakpoint : 1001,
                settings : {
                    speed : 1000,
                    rows : 1,
                    slidesPerRow : 1,
                    fade : true,
                    infinite : true,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true
                }
            }]
        });
        //주요명소 슬라이드 영역 끝




        $window.on('screen:phone', function(event) {

        });

    });
})(jQuery);