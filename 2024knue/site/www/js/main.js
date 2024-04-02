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
        $visualSlideList.slick({
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
        $MobilevisualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 1500,
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
        var $cheongSlide = $('.cheong .cheong_wrap .cheong_slide');
        $cheongSlide.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 4,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1
        });
        //청람동정 슬라이드 끝

    });
})(jQuery);