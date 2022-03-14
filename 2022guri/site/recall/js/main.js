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
        
        //여기서부터 코드 작성

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

        //메인비주얼영역 시작
        var $MainVisualWrap = $('.main_visual .main_visual_wrap'),
            $MainVisual = $('.main_visual .main_visual_wrap .main_visual_list');
        $MainVisual.on('init', function(event, slick, currentSlide){
            var $currentslide = $(slick.$slides[0]);
            $MainVisualWrap.addClass('active roading');
        });
        $MainVisual.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 1000,
            dots : true,
            appendDots: $('.main_visual .main_visual_wrap .main_visual_title_box .visual_dots_box'),
            dotsClass:'slick-dots clearfix',
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).attr('data-thum');
                return '<button type="button"><span>'+(i + 1)+'번 보기</span></button>';
            },
            pauseOnDotsClick : true,
            swipe : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            pauseOnHover : true,
            infinite: true,
            autoArrow : $('.main_visual .main_visual_wrap .main_visual_title_box .visual_btn_box .auto'),
            pauseText : '정지',
            playText : '재생',
            pauseOnArrowClick : true,
            fade : true,
            responsive : []
        });
        $MainVisual.on('beforeChange', function(event, slick, currentSlide) {
            var $currentslide = $(slick.$slides[currentSlide]);
            $MainVisualWrap.removeClass('roading');
            setTimeout(function(){
                $MainVisualWrap.addClass('roading');
            }, 500);
        });
        //메인비주얼영역 끝

        //공지사항영역 시작
        var $ScrollWrap = $('.scroll_wrap');
        $window.on('scroll', function(event) {
            $ScrollWrap.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top,
                    ThisOffSetBottom = ThisOffSetTop + $this.height(),
                    ThisOffSetMiddle = (ThisOffSetTop + ThisOffSetBottom) / 2;
                if( (ThisOffSetMiddle > WindowMiddle - 400) && (ThisOffSetMiddle < WindowMiddle + 400)){
                    $this.addClass('scroll_animation');
                }
                else{
                    $this.removeClass('scroll_animation');
                }
                if(ThisOffSetTop < WindowBottom - 200){
                    $this.addClass('active');
                }
            });
        });

        //공지사항영역 끝

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);