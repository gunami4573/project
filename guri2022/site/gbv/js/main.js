(function($) {
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

        //메인비주얼 슬라이드 시작
        var $MainVisual = $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_list'),
            $VisualTitleWrap = $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_title_wrap'),
            $VisualSlideControlBox = $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_control_box');
        $MainVisual.on('init', function(event, slick, currentSlide){
            var $currentslide = $(slick.$slides[0]);
            $currentslide.addClass('loading');
            setTimeout(function(){
                $VisualTitleWrap.addClass('active');
            });
            setTimeout(function(){
                $VisualSlideControlBox.addClass('active');
            }, 1000);
        });
        $MainVisual.slick({
            autoplay : true,
            autoplaySpeed : 4500,
            speed : 3000,
            dots : false,
            swipe : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            fade : true,
            prevArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_control_box .control_wrap .prev'),
            nextArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_control_box .control_wrap .next'),
            total : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_control_box .control_wrap .count_box .total'),
            current : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_control_box .control_wrap .count_box .current'),
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            autoArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_control_box .control_wrap .auto'),
            pauseText : '정지',
            playText : '재생',
            zIndex : 5,
            responsive : [{
                breakpoint : 641,
                settings : {
                    autoplaySpeed : 3000,
                    speed : 1000,
                    swipe : true,
                    draggable : true,
                    infinite : true
                }
            }]
        });
        $MainVisual.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]),
                $nextslide = $(slick.$slides[nextSlide]);
            $nextslide.addClass('loading');
            setTimeout(function(){
                $currentslide.removeClass('loading');
            }, 1500);

        });
        //메인비주얼 슬라이드 끝

        //스크롤 애니메이션 시작
        var $ScrollWrap = $('.scroll_wrap'),
            $ScrollWrap2 = $('.scroll_wrap2');
        $window.on('scroll', function(event) {
            $ScrollWrap.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top,
                    ThisOffSetBottom = ThisOffSetTop + $this.height();
                if(ThisOffSetTop < WindowMiddle + 400){
                    $this.addClass('scroll_animation');
                }
                else{
                    $this.removeClass('scroll_animation');
                }
            });

            $ScrollWrap2.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top,
                    ThisOffSetBottom = ThisOffSetTop + $this.height(),
                    ThisOffSetMiddle = (ThisOffSetTop + ThisOffSetBottom) / 2;
                if(ThisOffSetTop + 200 < WindowBottom){
                    $this.addClass('scroll_animation');
                }
                else{
                    $this.removeClass('scroll_animation');
                }
            });
        });
        //스크롤 애니메이션 끝

        //바로가기 영역 슬라이드 시작
        var $QuickSlide = $('.quick_area .quick_area_wrap .right_wrap .quick_slide_list');
        $QuickSlide.slick({
            autoplay : false,
            arrows : false,
            dots : false,
            swipe : false,
            draggable : false,
            slidesToShow : 5,
            slidesToScroll : 1,
            variableWidth: true,
            infinite : false,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 5,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true
                }
            },{
                breakpoint : 824,
                settings : {
                    slidesToShow : 4,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    infinite : true
                }
            }]
        });
        //바로가기 영역 슬라이드 끝

        //출토요물 아차산4보루 슬라이드 시작
        var $RelicSlide = $('.relic .relic_wrap .relic_slide_wrap .relic_slide_list')
        $RelicSlide.slick({
            autoplay : false,
            speed : 1000,
            dots : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            infinite : true,
            variableWidth: true,
            prevArrow : $('.relic .relic_slide_control_box .prev'),
            nextArrow : $('.relic .relic_slide_control_box .next'),
            responsive : [{
                breakpoint : 1501,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 671,
                settings : {
                    slidesToShow : 1
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 455,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        //출토요물 아차산4보루 슬라이드 끝

        //행사안내 슬라이드 시작
        var $InfoSlide = $('.info .info_wrap .info_slide_list')
        $InfoSlide.slick({
            autoplay : false,
            arrows : false,
            dots : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 3,
            slidesToScroll : 1,
            infinite : true,
            variableWidth: false,
            responsive : [{
                breakpoint : 1401,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1001,
                settings : {
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow : 2
                }
            }]
        });
        //행사안내 슬라이드 끝



        $window.on('screen:phone', function(event) {

        });

    });
})(jQuery);