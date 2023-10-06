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

        //스크롤 애니메이션 시작
        $('.rowgroup').waypoint(function(direction) {
            $(this.element)[(direction === 'down') ? 'addClass' : 'removeClass']('active');
        }, {
            offset : '90%'
        });
        //스크롤 애니메이션 끝

        //비주얼 슬라이드 시작
        var $VisualSlideList = $('.visual_slide_wrap .visual_slide_list'),
            $VisualSlidePrev = $('.visual_slide_wrap .prev'),
            $VisualSlideNext = $('.visual_slide_wrap .next'),
            $VisualSlideAuto = $('.visual_slide_wrap .auto'),
            $VisualSlideDotBox = $('.visual_slide_wrap .dot_box');
        $VisualSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3500,
            speed : 1000,
            dots : true,
            appendDots : $VisualSlideDotBox,
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
            arrows : true,
            prevArrow : $VisualSlidePrev,
            nextArrow : $VisualSlideNext,
            autoArrow : $VisualSlideAuto,
            pauseText : '정지',
            playText : '재생',
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true
        });
        //비주얼 슬라이드 끝

        //오늘의 사진 슬라이드 시작
        var $PhotoSlideList = $('.photo_slide_wrap .photo_slide_list'),
            $PhotoSlidePrev = $('.photo_slide_wrap .prev'),
            $PhotoSlideNext = $('.photo_slide_wrap .next');
        $PhotoSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3500,
            speed : 1000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $PhotoSlidePrev,
            nextArrow : $PhotoSlideNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            responsive : [{
                breakpoint : 801,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        //오늘의 사진 슬라이드 끝

        //추천 사진 슬라이드 시작
        var $BigSlideWrap = $('.best_big .big_slide_wrap'),
            $BigSlideList = $BigSlideWrap.find('.big_slide_list'),
            $BigSlideItem = $BigSlideList.find('.slide_item'),
            SlideItemLength = $BigSlideItem.length,
            $SmallSlideWrap = $('.best_small .small_slide_wrap'),
            $SmallSlideList = $SmallSlideWrap.find('.small_slide_list'),
            $SmallSlideItem = $BigSlideItem.clone(),
            $BestPrev = $('.best_total .prev'),
            $BestNext = $('.best_total .next');

        for(var i=1; i<SlideItemLength; i++){
            $SmallSlideList.append($SmallSlideItem.eq(i));
        }
        $SmallSlideList.append($SmallSlideItem.eq(0));

        //큰 슬라이드
        $BigSlideList.slick({
            //기본
            autoplay : false,
            autoplaySpeed : 3500,
            speed : 1200,
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
            fade : true,
            asNavFor : $SmallSlideList
        });
        //작은 슬라이드
        $SmallSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3500,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : true,
            prevArrow : $BestPrev,
            nextArrow : $BestNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            asNavFor : $BigSlideList,
            responsive : [{
                breakpoint : 801,
                settings : {
                    slidesToShow : 2,
                    variableWidth : false
                }
            }]
        });
        //추천 사진 슬라이드 끝

    });
})(jQuery);