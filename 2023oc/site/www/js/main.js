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

        //검색 부분 클릭시 색상 변경 시작
        $('.w_search_wrap .form_ele').each(function(){
            var $this = $(this);
            $this.focus(function(){
                $('.w_search_wrap .form_inner').addClass('gra_deco');
            });
            $this.focusout(function(){
                $('.w_search_wrap .form_inner').removeClass('gra_deco');
            });
        });
        //검색 부분 클릭시 색상 변경 끝

        //검색 하단 인기검색어 슬라이드 시작
        var $PopularSlideList = $('.w_search_wrap .popular_slide_wrap .popular_slide_list'),
            $PopularSlidePrev = $('.w_search_wrap .popular_slide_wrap .prev'),
            $PopularSlideNext = $('.w_search_wrap .popular_slide_wrap .next');
        $PopularSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 5,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $PopularSlidePrev,
            nextArrow : $PopularSlideNext,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            zIndex : 0,
            responsive : [{}]
        });
        //검색 하단 인기검색어 슬라이드 끝

        //검색 퀵 바로가기 슬라이드 시작
        var $QuickSlideList = $('.w_search_wrap .quick_slide_wrap .quick_slide_list'),
            $QuickSlideDotBox = $('.w_search_wrap .quick_slide_wrap .quick_slide_dotbox');
        $QuickSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 2000,
            speed : 1000,
            dots : true,
            appendDots : $QuickSlideDotBox,
            dotsClass : 'slick-dots clearfix',
            customPaging : function(slider, i) {
                return '<button type="button" class="dot_btn">'+(i + 1)+'번 슬라이드 보기</button>';
            },
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true
        });
        //검색 퀵 바로가기 슬라이드 끝

        //비주얼 팝업 슬라이드 시작
        var $vPopupSlideList = $('.gunsu_wrap .v_popup_slide_list'),
            $vPopupSlidePrev = $('.gunsu_wrap .v_popup_slide_control .prev'),
            $vPopupSlideNext = $('.gunsu_wrap .v_popup_slide_control .next'),
            $vPopupSlideAuto = $('.gunsu_wrap .v_popup_slide_control .auto'),
            $vPopupSlideCurrent = $('.gunsu_wrap .v_popup_slide_control .current'),
            $vPopupSlideTotal = $('.gunsu_wrap .v_popup_slide_control .total');
        $vPopupSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $vPopupSlidePrev,
            nextArrow : $vPopupSlideNext,
            autoArrow : $vPopupSlideAuto,
            pauseText : '정지',
            playText : '재생',
            total : $vPopupSlideTotal,
            current : $vPopupSlideCurrent,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false
        });
        //비주얼 팝업 슬라이드 끝

        //자주찾는 알림 바로가기 슬라이드 시작
        var $AlarmSlideList = $('.alarm_wrap .alarm_slide_list'),
            $AlarmSlidePrev = $('.alarm_wrap .alarm_slide_control .prev'),
            $AlarmSlideNext = $('.alarm_wrap .alarm_slide_control .next');
        $AlarmSlideList.slick({
            //기본
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 8,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $AlarmSlidePrev,
            nextArrow : $AlarmSlideNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false
        });
        //자주찾는 알림 바로가기 슬라이드 끝

        //게시판 탭메뉴 시작
        var $StartBoardItem = $('.board_wrap .tab_board_inner .tab_board_list .active');
        setTimeout(function(){
            $StartBoardItem.addClass('tab_ani');
        }, 1);
        $('.board_wrap .tab_choice_inner .tab_choice_list .tab_choice_item button.tab_choice_btn').on('click', function(){
            var $this = $(this),
                $MyChoiceItem = $this.parent('.tab_choice_item'),
                IsActive = $MyChoiceItem.is('.active'),
                MyChoiceIndex = $MyChoiceItem.index(),
                $OtherChoiceItem = $MyChoiceItem.siblings('.tab_choice_item'),
                $OtherChoiceBtn = $OtherChoiceItem.find('button.tab_choice_btn'),
                $TabBoardList = $('.board_wrap .tab_board_inner .tab_board_list'),
                $MyTabBoardItem = $TabBoardList.find('.tab_board_item').eq(MyChoiceIndex),
                $OtherTabBoardItem = $MyTabBoardItem.siblings('.tab_board_item');
            if(!IsActive){
                $OtherChoiceItem.removeClass('active');
                $OtherChoiceBtn.removeAttr('title');
                $OtherTabBoardItem.removeClass('active tab_ani');
                $MyChoiceItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyTabBoardItem.addClass('active');
                setTimeout(function(){
                    $MyTabBoardItem.addClass('tab_ani');
                }, 1);
            }
        });
        //게시판 탭메뉴 끝

        //fast 팝업 슬라이드 시작
        var $fPopupSlideList = $('.board_wrap .f_popup_slide_list'),
            $fPopupSlidePrev = $('.board_wrap .f_popup_slide_control .prev'),
            $fPopupSlideNext = $('.board_wrap .f_popup_slide_control .next'),
            $fPopupSlideAuto = $('.board_wrap .f_popup_slide_control .auto'),
            $fPopupSlideCurrent = $('.board_wrap .f_popup_slide_control .current'),
            $fPopupSlideTotal = $('.board_wrap .f_popup_slide_control .total');
        $fPopupSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $fPopupSlidePrev,
            nextArrow : $fPopupSlideNext,
            autoArrow : $fPopupSlideAuto,
            pauseText : '정지',
            playText : '재생',
            total : $fPopupSlideTotal,
            current : $fPopupSlideCurrent,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false
        });
        //fast 팝업 슬라이드 끝

    });
})(jQuery);