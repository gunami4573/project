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
        var $LinkSlideList = $('.miracle_visual .miracle_visual_wrap .link_slide_wrap .link_slide_list'),
            LinkSlideCurrent = $('.miracle_visual .miracle_visual_wrap .link_slide_control .current'),
            LinkSlideLength = $LinkSlideList.find('.link_slide_item').length;
        $('.miracle_visual .miracle_visual_wrap .link_slide_wrap .link_slide_control .count_box span.total').text(LinkSlideLength);
        $LinkSlideList.slick({
            autoplay : true,
            arrows : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            prevArrow : $('.miracle_visual .miracle_visual_wrap .link_slide_control .prev'),
            nextArrow : $('.miracle_visual .miracle_visual_wrap .link_slide_control .next'),
            autoArrow : $('.miracle_visual .miracle_visual_wrap .link_slide_control .auto'),
            pauseText : '정지',
            playText : '재생',
            current : LinkSlideCurrent,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = state.total;
                }
                return state;
            },
            dots : false,
            infinite : true,
            swipe : true,
            swipeToSlide : false,
            draggable : true,
            rows : 1,
            fade : false,
            //추가 기능
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            responsive: [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    fade : true
                }
            }]
        });
        //메인비주얼 버튼 슬라이드 끝

        //체험프로그램 슬라이드 시작
        var $ExperienceSlideList = $('.experience_slide_wrap .experience_slide_list');
        $ExperienceSlideList.slick({
            autoplay : false,
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
                    slidesToShow : 2,
                    infinite : true,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    rows : 1,
                    slidesPerRow : 1,
                    variableWidth : true
                }
            },{
                breakpoint : 490,
                settings : {
                    slidesToShow : 1,
                    infinite : true,
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

        //팝업존 슬라이드 시작
        var $PopupSlideList = $('.popup_slide_wrap .popup_slide_list'),
            PopUpTotal = $('.popup_slide_wrap .popup_control .total'),
            PopUpCurrent = $('.popup_slide_wrap .popup_control .current');
        $PopupSlideList.slick({
            autoplay : true,
            arrows : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            swipe : true,
            swipeToSlide : false,
            draggable : true,
            variableWidth : false,
            prevArrow : $('.popup_slide_wrap .popup_control .prev'),
            nextArrow : $('.popup_slide_wrap .popup_control .next'),
            autoArrow : $('.popup_slide_wrap .popup_control .auto'),
            pauseText : '정지',
            playText : '재생',
            total : PopUpTotal,
            current : PopUpCurrent,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = state.total;
                }
                return state;
            },
            fade : false,
            //추가 기능
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            responsive: [{
                breakpoint : 641,
                settings : {
                    fade : true
                }
            }]
        });
        //팝업존 슬라이드 끝

        //포토갤러리 슬라이드 시작
        var $PhotoSlideList = $('.photo_slide_wrap .photo_slide_list');
        $PhotoSlideList.slick({
            autoplay : false,
            arrows : true,
            dots : false,
            slidesToShow : 4,
            slidesToScroll : 1,
            infinite : true,
            swipe : true,
            swipeToSlide : false,
            draggable : true,
            variableWidth : false,
            prevArrow : $('.photo_slide_wrap .photo_slide_control .prev'),
            nextArrow : $('.photo_slide_wrap .photo_slide_control .next'),
            fade : false,
            responsive: [{
                breakpoint : 1401,
                settings : {
                    slidesToShow : 3
                }
            },{
                breakpoint : 1001,
                settings : {
                    swipeToSlide : true,
                    variableWidth : true,
                    slidesToShow : 2,
                }
            },{
                breakpoint : 908,
                settings : {
                    swipeToSlide : true,
                    variableWidth : true,
                    slidesToShow : 1,
                }
            },{
                breakpoint : 908,
                settings : {
                    swipeToSlide : true,
                    variableWidth : false,
                    slidesToShow : 1,
                    fade : true
                }
            }]
        });
        //포로갤러리 슬라이드 끝

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);