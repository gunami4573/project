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

        //퀵메뉴 스크립트 시작
        $('.edu_quick_menu .quick_wrap').navScroll({
            mobileDropdown : false,
            mobileBreakpoint : 1601,
            scrollTime : 300,
            scrollSpy : true,
            activeParent : true,
            navHeight : '0'
        });
        $window.on('scroll', function(){
            var $NewWrapper = $('#wrapper'),
                NewWrapperData = $NewWrapper.attr('data-section');
            var $this = $(this),
                WindowScrollTop = $this.scrollTop(),
                WindowScrollBottom = WindowScrollTop + $window.height(),
                $ScrollFooter = $('#footer'),
                ScrollFooterTop = $ScrollFooter.offset().top;
            if(WindowScrollTop > 0){
                $html.addClass('scroll_start');
            }
            if(WindowScrollTop == 0 || WindowScrollBottom > ScrollFooterTop + 60){
                $html.removeClass('scroll_start');
            }
            if(NewWrapperData == 'edu_quick_menu_active0'){
                $html.removeClass('rowgroup2_ani').removeClass('rowgroup3_ani').addClass('rowgroup1_ani');
            }
            if(NewWrapperData == 'edu_quick_menu_active1'){
                $html.removeClass('rowgroup1_ani').removeClass('rowgroup3_ani').addClass('rowgroup2_ani');
            }
            if(NewWrapperData == 'edu_quick_menu_active2'){
                $html.removeClass('rowgroup1_ani').removeClass('rowgroup2_ani').addClass('rowgroup3_ani');
            }

        });
        //퀵메뉴 스크립트 끝


        //비주얼 검색영역 해시태그 효과 시작
        $('.main_search_form .input_text_box input').on('focus', function(){
            $('.main_search_form .input_text_box').addClass('active');
        });
        $('.main_search_form .input_text_box input').on('focusout', function(e){
            $('.main_search_form .input_text_box').removeClass('active');
        });
        //비주얼 검색영역 해시태그 효과 끝


        //비주얼 공지사항 슬라이드 시작
        var $VisualBoardSlideList = $('.board_slide_wrap .board_slide_list');
        $VisualBoardSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $('.board_slide_wrap .board_slide_control .control_btn_box .prev'),
            nextArrow : $('.board_slide_wrap .board_slide_control .control_btn_box .next'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{
                breakpoint : 1601,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1241,
                settings : {
                    slidesToShow : 1
                }
            },{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 705,
                settings : {
                    slidesToShow : 1
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 3,
                    variableWidth : false,
                    vertical : true,
                    verticalSwiping : true
                }
            }]
        });
        //비주얼 공지사항 슬라이드 끝


        //비주얼 팝업 슬라이드 시작
        var $VisualImgSlideWrap = $('.visual_slide_wrap'),
            $VisualImgSlideList = $VisualImgSlideWrap.find('.visual_slide_list'),
            $VIsualImgSlideCurrent = $('.visual_slide_wrap .visual_slide_control .count_box .current'),
            $VIsualImgSlideTotal = $('.visual_slide_wrap .visual_slide_control .count_box .total');
        var visualSlideListCount = 0;
        setTimeout(function(){
            visualSlideListCount = 1;
            $VisualImgSlideList.on('init', function(event, slick, currentSlide){
                var $currentslide = $(slick.$slides[0]);
                $VisualImgSlideWrap.addClass('active');
            });
            $VisualImgSlideList.slick({
                //기본
                autoplay : true,
                autoplaySpeed : 3500,
                Speed : 3500,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : true,
                prevArrow : $('.visual_slide_wrap .visual_slide_control .btn_box .prev'),
                nextArrow : $('.visual_slide_wrap .visual_slide_control .btn_box .next'),
                autoArrow : $('.visual_slide_wrap .visual_slide_control .btn_box .auto'),
                pauseText : '정지',
                playText : '재생',
                total : $VIsualImgSlideTotal,
                current : $VIsualImgSlideCurrent,
                customState : function(state) {
                    if(state.current < 10) {
                        state.current = '0' + state.current;
                    }
                    if(state.total < 10) {
                        state.total = '0' + state.total;
                    }
                    return state;
                },
                isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                fade : true
            });
            $VisualImgSlideList.on('beforeChange', function(event, slick, currentSlide) {
                var $currentslide = $(slick.$slides[currentSlide]);
                $VisualImgSlideWrap.removeClass('active');
                setTimeout(function(){
                    $VisualImgSlideWrap.addClass('active');
                }, 1);
            });
            var $VisualImgAutoBtn = $('.visual_slide_wrap .visual_slide_control .btn_box .auto');
            $VisualImgAutoBtn.on('click', function(){
                var $this = $(this),
                    $StopBar = $('.visual_slide_wrap .visual_slide_control .count_box .bar .percent'),
                    IsPlay = $this.is('.slick-pause');
                if(IsPlay){
                    $StopBar.css('animation-play-state', 'running');
                }
                else{
                    $StopBar.css('animation-play-state', 'paused');
                }
            });
        }, 1500)
        //비주얼 팝업 슬라이드 끝


        //교육자격소개 슬라이드 및 탭버튼 시작
        var $IntroEduNavList = $('.intro_edu_slide_wrap .intro_edu_nav_list');
        $IntroEduNavList.slick({
            autoplay : false,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 6,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : false,
            arrows : true,
            prevArrow : $('.intro_edu_slide_wrap .intro_edu_nav_control .prev'),
            nextArrow : $('.intro_edu_slide_wrap .intro_edu_nav_control .next'),
            zIndex : 1,
            responsive: [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    variableWidth : false,
                    infinite : true
                }
            }]
        });
        $IntroEduNavList.on('afterChange', function(event, slick, currentSlide) {
            var $this = $(this),
                $currentslide = $(slick.$slides[currentSlide]),
                $currentRow = $currentslide.find('.slick-rows'),
                $currentIntroEduNavItem = $currentRow.find('.intro_edu_nav_item'),
                $currentIntroEduNavBtn = $currentIntroEduNavItem.find('.nav_tab_btn');
            $currentIntroEduNavBtn.click();
        });

        var $IntroEduSlideTabItem = $('.intro_edu_slide_wrap .intro_edu_slide_tab_list .intro_edu_slide_tab_item');
        $IntroEduSlideTabItem.each(function(){
            var $this = $(this),
                $EduSlideList = $this.find('.edu_slide_list');
            $EduSlideList.slick({
                autoplay : false,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                rows : 4,
                slidesPerRow : 2,
                variableWidth : false,
                infinite : true,
                arrows : false,
                zIndex : 1,
                responsive: [{
                    breakpoint : 641,
                    settings : {
                        slidesToShow : 7,
                        rows : 1,
                        slidesPerRow : 1,
                        vertical : true,
                        verticalSwiping : true
                    }
                }]
            });
        });

        $(document).on('click', '.intro_edu_slide_wrap .intro_edu_nav_list .intro_edu_nav_item .nav_tab_btn', function(){
            var $this = $(this),
                $MyNavItem = $this.parent('.intro_edu_nav_item'),
                IsActive = $MyNavItem.is('.active'),
                MyNavData = $MyNavItem.attr('data-intro-nav'),
                $NavList = $MyNavItem.parents('.intro_edu_nav_list'),
                $OtherNavItem = $NavList.find('.intro_edu_nav_item').not($MyNavItem),
                $OtherNavBtn = $OtherNavItem.find('.nav_tab_btn'),
                $IntroEduSlideTabList = $NavList.siblings('.intro_edu_slide_tab_list'),
                $MyIntroEduSlideTabItem = $IntroEduSlideTabList.find('.intro_edu_slide_tab_item[data-intro-tab_slide="'+MyNavData+'"]'),
                $OtherIntroEduSlideTabItem = $MyIntroEduSlideTabItem.siblings('.intro_edu_slide_tab_item'),
                $MyEduSlideList = $MyIntroEduSlideTabItem.find('.edu_slide_list');
            if(!IsActive){
                $OtherNavItem.removeClass('active');
                $OtherNavBtn.removeAttr('title');
                $OtherIntroEduSlideTabItem.removeClass('active').removeClass('tab_ani');

                $MyNavItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyIntroEduSlideTabItem.addClass('active');
                setTimeout(function(){
                    $MyIntroEduSlideTabItem.addClass('tab_ani')
                }, 1)
                $MyEduSlideList.slick('setPosition');

            }
        });
        //교육자격소개 슬라이드 및 탭버튼 끝


        //
        var $TiltVisualImgSlideList = $('.visual_slide_list'),  //비주얼 팝업영역
            $TiltBoardSlideItem = $('.board_slide_item');  //공지사항 아이템
        $window.on('screen:wide screen:web', function (event) {
            $TiltVisualImgSlideList.tilt({
                maxTilt:30, perspective:900, scale:1, speed:300, disableAxis:null, reset:true, glare:false, maxGlare:0, easing:'cubic-bezier(.19,1,.22,1)'
            });
            $TiltBoardSlideItem.tilt({
                maxTilt:30, perspective:400, scale:1, speed:300, disableAxis:null, reset:true, glare:false, maxGlare:0, easing:'cubic-bezier(.19,1,.22,1)'
            });
        });
        //
    });
})(jQuery);