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

        //환경관리사업소 전용
        $window.on('screen:wide screen:web screen:tablet', function(event) {
            window.environmentmode = 'pc';
        });

        $window.on('screen:phone', function(event) {
            window.environmentmode = 'mobile';
        });
        //환경관리사업소 전용

        //메인 lnb 비주얼 이미지 슬라이드 시작
        var $LnbVisualSlide = $('.lnb_area_wrap .lnb_visual_area .lnb_visual_list');
        // $LnbVisualSlide.on('init', function(event, slick, currentSlide){
        //     var $currentslide = $(slick.$slides[0]);
        //     $currentslide.addClass('loading');
        //     setTimeout(function(){
        //         $currentslide.removeClass('loading');
        //     }, 1000);
        // });
        $LnbVisualSlide.slick({
            autoplay : false,
            arrows : false,
            dots : false,
            speed : 700,
            swipe : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            pauseOnArrowClick : true,
            fade : true,
            zIndex : 1,
            responsive : [{
                breakpoint : 641,
                settings : {
                    autoplay : true,
                    autoplaySpeed : 4000,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    infinite : true,
                    fade : true
                }
            }]
        });
        $LnbVisualSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]),
                $nextslide = $(slick.$slides[nextSlide]);
            $currentslide.addClass('default');
            $nextslide.addClass('loading');

        });
        $LnbVisualSlide.on('afterChange', function(event, slick, currentSlide, nextSlide){
            var $currentslide = $(slick.$slides[currentSlide]);
            $(slick.$slides).removeClass('default');
            $currentslide.removeClass('loading');
        });
        //메인 lnb 비주얼 이미지 슬라이드 끝

        //메인 lnb 탭 시작
        var $MainLnbDepth1Text = $('.main_lnb .main_lnb_depth1 .main_lnb_depth1_list .main_lnb_depth1_item .main_lnb_depth1_text');
        $MainLnbDepth1Text.on('click', function(link){
            var $this = $(this),
                $ParentItem = $this.parent('.main_lnb_depth1_item'),
                $MainLnbdepth1List = $ParentItem.parent('.main_lnb_depth1_list'),
                IsActive = $ParentItem.is('.active'),
                $OtherParentItem = $ParentItem.siblings('.main_lnb_depth1_item'),
                $OtherBtn = $OtherParentItem.find('.main_lnb_depth1_text'),
                ParentItemLnbNumber = $ParentItem.attr('data-lnb-number');

                if(environmentmode == 'pc'){
                    if(!IsActive){
                        $OtherParentItem.removeClass('active');
                        $OtherBtn.removeAttr('title');
                        $ParentItem.addClass('active');
                        $MainLnbdepth1List.addClass('active');
                        $this.attr('title', '선택됨');
                        $LnbVisualSlide.slick('slickGoTo', ParentItemLnbNumber);
                    }
                    else{
                        $ParentItem.removeClass('active');
                        $MainLnbdepth1List.removeClass('active');
                        $this.removeAttr('title');
                        $LnbVisualSlide.slick('slickGoTo', 0);
                    }
                    link.preventDefault();
                }
        });
        //메인 lnb 탭 끝

        //공지사항 슬라이드 시작

        //공지사항 슬라이드 끝
        var $BoardSlide = $('.board .board_wrap .board_slide_wrap .board_slide_list');
        $BoardSlide.slick({
            autoplay : true,
            dots : false,
            swipe : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            pauseOnArrowClick : true,
            prevArrow : $('.board .board_wrap .board_slide_wrap .board_slide_control_box .prev'),
            nextArrow : $('.board .board_wrap .board_slide_wrap .board_slide_control_box .next'),
            vertical : true,
            responsive : []
        });



        $window.on('screen:phone', function(event) {
            $LnbVisualSlide.slick({
                autoplay : true,
                autoplaySpeed : 4000
            });
        });

    });
})(jQuery);