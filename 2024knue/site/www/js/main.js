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

        //비주얼 슬라이드 시작
        var $visualSlideList = $('.visual .visual_wrap .visual_slide_wrap .visual_slide_list'),
            $MobilevisualSlideList = $('.visual .visual_wrap .visual_slide_wrap .m_visual_slide_list'),
            $visualSlidePrev = $('.visual .visual_wrap .visual_slide_wrap .prev'),
            $visualSlideNext = $('.visual .visual_wrap .visual_slide_wrap .next'),
            $visualSlideCurrent = $('.visual .visual_wrap .visual_slide_wrap .current'),
            $visualSlideTotal = $('.visual .visual_wrap .visual_slide_wrap .total');
        //PC 전용
        $visualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3900,
            speed : 1300,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $visualSlidePrev,
            nextArrow : $visualSlideNext,
            current : $visualSlideCurrent,
            total : $visualSlideTotal,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            asNavFor : $MobilevisualSlideList
        });
        //Mobile 전용
        $MobilevisualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3900,
            speed : 1300,
            dots : false,
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
            asNavFor : $visualSlideList
        });
        //비주얼 슬라이드 끝

        //퀵메뉴 슬라이드 시작
        var $quickSlideList = $('.quick_area .quick_wrap .quick_list');
        $quickSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 8,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : false,
            arrows : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1
        });
        //퀵메뉴 슬라이드 끝

        //게시판 슬라이드 탭 시작
        var $boardTab = $('.board_tab');
        $boardTab.slick({
            autoplay : false,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 6,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : false,
            arrows : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1
        });
        var $boardCTSitem = $('.board_cts .board_cts_item');
        $boardCTSitem.each(function(){
            var $this = $(this),
                $thisCTSslide = $this.find('.board_cts_slide');
            $thisCTSslide.slick({
                autoplay : false,
                dots : false,
                draggable : false,
                swipe : false,
                swipeToSlide : false,
                slidesToShow : 6,
                slidesToScroll : 1,
                variableWidth : true,
                infinite : false,
                arrows : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1
            });
        });
        $document.on('click', '.board_tab .board_tab_item button.board_tab_btn', function(){
            var $this = $(this),
                $thisParent = $this.parent('.board_tab_item'),
                thisParentDataBoard = $thisParent.attr('data-board'),
                $thisRows = $thisParent.parent('.slick-rows'),
                $thisSlick = $thisRows.parent('.slick-slide'),
                thisSlideIndex = $thisSlick.attr('data-slick-index'),
                $otherSlick = $thisSlick.siblings('.slick-slide'),
                $otherRows = $otherSlick.find('.slick-rows'),
                $otherParent = $otherRows.find('.board_tab_item'),
                $otherBtn = $otherParent.find('button.board_tab_btn'),
                IsActive = $thisParent.is('.active'),
                $thisCTSitem = $('.board_cts .board_cts_item[data-board="'+thisParentDataBoard+'"]'),
                $otherCTSitem = $('.board_cts').find('.board_cts_item').not($thisCTSitem);
            if(!IsActive){
                $otherParent.removeClass('active');
                $otherBtn.removeAttr('title');
                $otherCTSitem.removeClass('active');
                $thisParent.addClass('active');
                $this.attr('title', '선택됨');
                $thisCTSitem.addClass('active');
                $thisCTSitem.find('.board_cts_slide').slick('setPosition');
                $boardTab.slick('slickGoTo', thisSlideIndex);
            }
        });
        //게시판 슬라이드 탭 끝

        //청람동정 슬라이드 시작
        var $cheongSlide = $('.cheong .cheong_wrap .cheong_slide'),
            $cheongPrev = $('.cheong .cheong_wrap .prev'),
            $cheongNext = $('.cheong .cheong_wrap .next');
        $cheongSlide.slick({
            autoplay : true,
            autoplaySpeed : 3900,
            speed : 1300,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 4,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $cheongPrev,
            nextArrow : $cheongNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1
        });
        //청람동정 슬라이드 끝

        //학사일정 슬라이드 시작
        var $scheSlide = $('.sche .sche_wrap .sche_slide_wrap .sche_slide_list'),
            $schePrev = $('.sche .sche_wrap .sche_slide_wrap .prev'),
            $scheNext = $('.sche .sche_wrap .sche_slide_wrap .next');
        $scheSlide.slick({
            autoplay : true,
            autoplaySpeed : 3900,
            speed : 1300,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 5,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $schePrev,
            nextArrow : $scheNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{
                breakpoint : 1471,
                settings : {
                    slidesToShow : 4
                }
            },{
                breakpoint : 1236,
                settings : {
                    slidesToShow : 3
                }
            }]
        });
        //학사일정 슬라이드 끝

        //팝업존 슬라이드 시작
        var $popupSlide = $('.popup .popup_wrap .popup_slide_wrap .popup_slide_list');
        $popupSlide.on('afterChange', function() {
            setTimeout(function(){
                $('.popup .popup_wrap .popup_slide_wrap .popup_slide_control .popup_nav *').removeAttr('role aria-controls aria-label aria-selected');
            }, 1);
        });
        $popupSlide.slick({
            autoplay : true,
            autoplaySpeed : 3900,
            dots : true,
            appendDots : $('.popup .popup_wrap .popup_slide_wrap .popup_slide_control .popup_nav'),
            dotsClass : 'popup_nav_list',
            customPaging : function(slider, i) {
                return '<button type="button"><span>'+(i + 1)+'번 보기</span></button>';
            },
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            autoArrow : $('.popup .popup_wrap .popup_slide_wrap .popup_slide_control .auto'),
            pauseText : '정지',
            playText : '재생',
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true
        });
        $('.popup .popup_wrap .popup_slide_wrap .popup_slide_control .popup_nav *').removeAttr('role aria-controls aria-label aria-selected');
        //팝업존 슬라이드 끝

        //청람 랜선투어 링크 효과 시작
        var $lanLinkTitle = $('.lan .lan_link_title'),
            $lanText = $lanLinkTitle.find('.text');
        $lanText.each(function(){
            var $this = $(this),
                $thisItag = $this.find('i'),
                $cloneItag = $thisItag.clone();
            $this.append($cloneItag);
        });
        //청람 랜선투어 링크 효과 끝

        //청람 SNS 슬라이드 탭 시작
        var $snsBottomItem = $('.sns_bottom .sns_bottom_item');
        $snsBottomItem.each(function(){
            var $this = $(this),
                $thisSlideList = $this.find('.sns_slide_list'),
                $thisPrev = $this.find('.prev'),
                $thisNext = $this.find('.next');
            $thisSlideList.slick({
                autoplay : true,
                autoplaySpeed : 3900,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : true,
                prevArrow : $thisPrev,
                nextArrow : $thisNext,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                responsive : [{
                    breakpoint : 1236,
                    settings : {
                        slidesToShow : 2
                    }
                }]
            });
        });
        $('.sns_tab .sns_tab_item button.sns_tab_btn').on('click', function(){
            var $this = $(this),
                $thisParent = $this.parent('.sns_tab_item'),
                thisParentIndex = $thisParent.index(),
                IsActive = $thisParent.is('.active'),
                $otherParent = $thisParent.siblings('.sns_tab_item'),
                $otherBtn = $otherParent.find('button.sns_tab_btn'),
                $snsBottom = $('.sns_bottom'),
                $thissnsBottomItem = $snsBottom.find('.sns_bottom_item').eq(thisParentIndex),
                $othersnsBottomItem = $snsBottom.find('.sns_bottom_item').not($thissnsBottomItem);
            if(!IsActive){
                $otherParent.removeClass('active');
                $otherBtn.removeAttr('title');
                $othersnsBottomItem.removeClass('active');
                $thisParent.addClass('active');
                $this.attr('title', '선택됨');
                $thissnsBottomItem.addClass('active');
                $thissnsBottomItem.find('.sns_slide_wrap .sns_slide_list').slick('setPosition');
            }
        });
        //청람 SNS 슬라이드 탭 끝

    });
})(jQuery);