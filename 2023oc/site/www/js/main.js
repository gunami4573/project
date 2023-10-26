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
            autoplay : false,
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
            responsive : [{
                breakpoint : 1461,
                settings : {
                    slidesToShow : 4
                }
            },{
                breakpoint : 1291,
                settings : {
                    slidesToShow : 3
                }
            },{
                breakpoint : 1051,
                settings : {
                    slidesToShow : 2
                }
            }]
        });
        //검색 하단 인기검색어 슬라이드 끝

        //검색 퀵 바로가기 슬라이드 시작
        var $QuickSlideList = $('.w_search_wrap .quick_slide_wrap .quick_slide_list'),
            $QuickSlideDotBox = $('.w_search_wrap .quick_slide_wrap .quick_slide_dotbox');
        $QuickSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 800,
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
            autoplaySpeed : 3000,
            speed : 1000,
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
            autoplay : true,
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
            fade : false,
            responsive : [{
                breakpoint : 1461,
                settings : {
                    slidesToShow : 7
                }
            },{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 6
                }
            }]
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
            autoplaySpeed : 3000,
            speed : 1000,
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

        //옥천군 주요서비스 탭 및 슬라이드 시작
        var $StartMajorSlideTabItem = $('.major_news_wrap .major_slide_tab_list .active');
        setTimeout(function(){
            $StartMajorSlideTabItem.addClass('tab_ani');
        }, 1);
        var $MajorSlideTabItem = $('.major_news_wrap .major_slide_tab_list .major_slide_tab_item');
        $MajorSlideTabItem.each(function(){
            var $this = $(this),
                $MajorSlideList = $this.find('.major_slide_list'),
                $MajorSlideControl = $this.find('.major_slide_control'),
                $MajorSlidePrev = $MajorSlideControl.find('.prev'),
                $MajorSlideNext = $MajorSlideControl.find('.next');
            $MajorSlideList.slick({
                //기본
                autoplay : false,
                speed : 800,
                dots : false,
                draggable : false,
                swipe : false,
                swipeToSlide : false,
                slidesToShow : 1,
                slidesToScroll : 1,
                rows : 2, //여러줄
                slidesPerRow : 3, //여러줄 일 때 한줄의 몇개 출력
                variableWidth : false,
                infinite : false,
                arrows : true,
                prevArrow : $MajorSlidePrev,
                nextArrow : $MajorSlideNext,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                fade : true,
                responsive : [{
                    breakpoint : 1461,
                    settings : {
                        slidesPerRow : 2
                    }
                },{
                    breakpoint : 1001,
                    settings : {
                        draggable : true,
                        swipe : true,
                        swipeToSlide : true,
                        slidesToShow : 5,
                        rows : 1,
                        slidesPerRow : 1,
                        variableWidth : false,
                        infinite : true,
                        fade : false
                    }
                },{
                    breakpoint : 801,
                    settings : {
                        draggable : true,
                        swipe : true,
                        swipeToSlide : true,
                        slidesToShow : 4,
                        rows : 1,
                        slidesPerRow : 1,
                        variableWidth : false,
                        infinite : true,
                        fade : false
                    }
                }]
            });
            $window.on('screen:wide screen:web', function (event) {
                $MajorSlideList.on('wheel', function(e){
                    e.preventDefault();
                    if (e.originalEvent.deltaY < 0) {
                        $(this).slick('slickPrev');
                        setTimeout(function(){
                            $MajorSlideControl.removeClass('down').addClass('up');
                        }, 1);
                        setTimeout(function(){
                            $MajorSlideControl.removeClass('up');
                        }, 800);
                    } else {
                        $(this).slick('slickNext');
                        setTimeout(function(){
                            $MajorSlideControl.removeClass('up').addClass('down');
                        }, 1);
                        setTimeout(function(){
                            $MajorSlideControl.removeClass('down');
                        }, 800);
                    }
                });
            });
        });
        $('.major_news_wrap .major_tab_list .major_tab_item button.major_tab_btn').on('click', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.major_tab_item'),
                IsActive = $MyTabItem.is('.active'),
                MyTabItemIndex = $MyTabItem.index(),
                $OtherTabItem = $MyTabItem.siblings('.major_tab_item'),
                $OtherTabBtn = $OtherTabItem.find('button.major_tab_btn'),
                $SlideTabList = $('.major_news_wrap .major_slide_tab_list'),
                $MySlideTabItem = $SlideTabList.find('.major_slide_tab_item').eq(MyTabItemIndex),
                $MySlideList = $MySlideTabItem.find('.major_slide_list'),
                $MySlideControl = $MySlideTabItem.find('.major_slide_control'),
                $OtherSlideTabItem = $MySlideTabItem.siblings('.major_slide_tab_item');
            if(!IsActive){
                $OtherTabItem.removeClass('active');
                $OtherTabBtn.removeAttr('title');
                $OtherSlideTabItem.removeClass('active tab_ani');
                $MyTabItem.addClass('active');
                $this.attr('title', '선택됨');
                $MySlideTabItem.addClass('active');
                setTimeout(function(){
                    $MySlideTabItem.addClass('tab_ani');
                }, 1);
                setTimeout(function(){
                    $MySlideList.slick('setPosition');
                    $MySlideControl.removeClass('up down');
                }, 1);
            }
        });
        //옥천군 주요서비스 탭 및 슬라이드 끝

        //홍보동영상 슬라이드 시작
        var $MediaSlideList = $('.media_wrap .play_slide_list'),
            $MediaSlidePrev = $('.media_wrap .play_slide_control .prev'),
            $MediaSlideNext = $('.media_wrap .play_slide_control .next');
        $MediaSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 1000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $MediaSlidePrev,
            nextArrow : $MediaSlideNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true
        });
        //홍보동영상 슬라이드 끝

        //포토갤러리 탭 및 슬라이드 시작
        var $StartPhotoCtsItem = $('.media_wrap .photo_cts_list .active');
        setTimeout(function(){
            $StartPhotoCtsItem.addClass('tab_ani');
        }, 1);
        var $PhotoCtsItem = $('.media_wrap .photo_cts_list .photo_cts_item');
        $PhotoCtsItem.each(function(){
            var $this = $(this),
                $PhotoSlideList = $this.find('.photo_slide_list');
            $PhotoSlideList.slick({
                //기본
                autoplay : true,
                autoplaySpeed : 3000,
                speed : 1000,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                fade : false,
                responsive : [{
                    breakpoint : 1461,
                    settings : {
                        variableWidth : true
                    }
                },{
                    breakpoint : 1231,
                    settings : {
                        slidesToShow : 2,
                        variableWidth : true
                    }
                },{
                    breakpoint : 1001,
                    settings : {
                        slidesToShow : 3,
                        variableWidth : true
                    }
                },{
                    breakpoint : 851,
                    settings : {
                        slidesToShow : 3,
                        variableWidth : true
                    }
                }]
            });
        });
        $('.media_wrap .photo_tab_list .photo_tab_item button.photo_tab_btn').on('click', function(){
            var $this = $(this),
                $MyPhotoTabItem = $this.parent('.photo_tab_item'),
                IsActive = $MyPhotoTabItem.is('.active'),
                $MyPhotoItemIndex = $MyPhotoTabItem.index(),
                $OtherPhotoItem = $MyPhotoTabItem.siblings('.photo_tab_item'),
                $OtherPhotoBtn = $OtherPhotoItem.find('button.photo_tab_btn'),
                $PhotoCtsList = $('.media_wrap .photo_cts_list'),
                $MyPhotoCtsItem = $PhotoCtsList.find('.photo_cts_item').eq($MyPhotoItemIndex),
                $MyPhotoSlideList = $MyPhotoCtsItem.find('.photo_slide_list'),
                $OtherPhotoCtsItem = $MyPhotoCtsItem.siblings('.photo_cts_item');
            if(!IsActive){
                $OtherPhotoItem.removeClass('active');
                $OtherPhotoBtn.removeAttr('title');
                $OtherPhotoCtsItem.removeClass('active tab_ani');
                $MyPhotoTabItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyPhotoCtsItem.addClass('active');
                setTimeout(function(){
                    $MyPhotoCtsItem.addClass('tab_ani');
                }, 1);
                $MyPhotoSlideList.slick('setPosition');
            }
        });
        //포토갤러리 탭 및 슬라이드 끝

        //SNS 슬라이드 시작
        var $snsSlideList = $('.media_wrap .sns_slide_wrap .sns_slide_list');
        $snsSlideList.slick({
            //기본
            autoplay : false,
            autoplaySpeed : 3000,
            speed : 1000,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            rows : 1, //여러줄
            slidesPerRow : 4, //여러줄 일 때 한줄의 몇개 출력
            variableWidth : false,
            infinite : false,
            arrows : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false
        });
        //SNS 슬라이드 끝

        //옥천여행 슬라이드 시작
        var $tourSlideList = $('.tour_wrap .tour_slide_wrap .tour_slide_list'),
            $tourSlideControl = $('.tour_wrap .tour_slide_wrap .tour_slide_control'),
            $tourSlidePrev = $tourSlideControl.find('.prev'),
            $tourSlideNext = $tourSlideControl.find('.next');
        $tourSlideList.on('init', function(event, slick, currentSlide, nextSlide) {
            var $currentSlide = $(slick.$slides[0]),
                MyIndex = $currentSlide.index(),
                $siblingSlide = $currentSlide.siblings('.slick-slide');
            $siblingSlide.eq(MyIndex - 1).addClass('prev_slide');
            $siblingSlide.eq(MyIndex - 2).addClass('pprev_slide');
            $siblingSlide.eq(MyIndex).addClass('next_slide');
            $siblingSlide.eq(MyIndex + 1).addClass('nnext_slide');

            var currentDataText = $currentSlide.find('.tour_slide_item').attr('data-text'),
                $startTourBackItem = $('.tour_wrap .tour_back_wrap .tour_back_list .tour_back_item[data-back="'+currentDataText+'"]');
            setTimeout(function(){
                $startTourBackItem.addClass('active');
            }, 1);
        });
        $tourSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            centerMode : true,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $tourSlidePrev,
            nextArrow : $tourSlideNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            vertical : true, //세로모드 유무
            verticalSwiping : true, //세로일때 터치 유무
            zIndex : 1,
            fade : false
        });
        $window.on('screen:wide screen:web', function (event) {
            $tourSlideList.on('wheel', function(e){
                e.preventDefault();
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickPrev');
                    setTimeout(function(){
                        $tourSlideControl.removeClass('down').addClass('up');
                    }, 1);
                    setTimeout(function(){
                        $tourSlideControl.removeClass('up');
                    }, 800);
                } else {
                    $(this).slick('slickNext');
                    setTimeout(function(){
                        $tourSlideControl.removeClass('up').addClass('down');
                    }, 1);
                    setTimeout(function(){
                        $tourSlideControl.removeClass('down');
                    }, 800);
                }
            });
        });
        $tourSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $nextSlide = $(slick.$slides[nextSlide]),
                nextSlideIndex = $nextSlide.index(),
                $nextRows = $nextSlide.find('.slick-rows'),
                $nextTourSlideItem = $nextRows.find('.tour_slide_item'),
                nextDataText = $nextTourSlideItem.attr('data-text'),
                $tourBackList = $('.tour_wrap .tour_back_wrap .tour_back_list'),
                $MytourBackItem = $tourBackList.find('.tour_back_item[data-back="'+nextDataText+'"]'),
                $OthertourBackItem = $tourBackList.find('.tour_back_item').not($MytourBackItem);
            $OthertourBackItem.removeClass('active');
            $MytourBackItem.addClass('active');

            var $siblingsSlide = $nextSlide.siblings('.slick-slide');
            $nextSlide.removeClass('prev_slide pprev_slide next_slide nnext_slide');
            $siblingsSlide.removeClass('prev_slide pprev_slide next_slide nnext_slide');
            $siblingsSlide.eq(nextSlideIndex - 1).addClass('prev_slide');
            $siblingsSlide.eq(nextSlideIndex - 2).addClass('pprev_slide');
            $siblingsSlide.eq(nextSlideIndex).addClass('next_slide');
            $siblingsSlide.eq(nextSlideIndex + 1).addClass('nnext_slide');
        });
        //옥천여행 슬라이드 끝

        //옥천여행 퀵 링크 마우스 오버 효과 시작
        var $tourQuickList = $('.tour_wrap .tour_quick_wrap .tour_quick_list'),
            $tourQuickLink = $tourQuickList.find('.tour_quick_link');
        $tourQuickList.on('mouseover', function(){
            var $this = $(this);
            $this.attr('data-view', 'true');
        });
        $tourQuickList.on('mouseleave', function(){
            var $this = $(this);
            $this.attr('data-view', 'false');
        });
        $tourQuickLink.on('mouseover', function(){
            var $this = $(this),
                $touMyQuickItem = $this.parent('.tour_quick_item'),
                touMyQuickIndex = $touMyQuickItem.index(),
                $tourQuickList = $touMyQuickItem.parent('.tour_quick_list');
            $tourQuickList.attr('data-type', touMyQuickIndex+1);
        });
        //옥천여행 퀵 링크 마우스 오버 효과 끝
    });
})(jQuery);