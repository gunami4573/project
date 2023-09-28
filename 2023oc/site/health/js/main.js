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

        //비주얼 팝업존 슬라이드 시작
        var $InfoSlideWrap = $('.info_slide_wrap'),
            $InfoSlideList = $InfoSlideWrap.find('.info_slide_list'),
            $InfoSlideItem = $InfoSlideList.find('.info_slide_item'),
            ItemLength = $InfoSlideItem.length,
            $InfoSlidePrev = $InfoSlideWrap.find('.prev'),
            $InfoSlideNext = $InfoSlideWrap.find('.next'),
            $InfoSlideAuto = $InfoSlideWrap.find('.auto'),
            $InfoSlideCurrent = $InfoSlideWrap.find('.current'),
            $InfoSlideTotal = $InfoSlideWrap.find('.total');
        $InfoSlideWrap.prepend('<div class="img_curtain"></div>');
        var $ImgCurtain = $('.img_curtain');
        for(var i=0; i<ItemLength; i++){
            $ImgCurtain.append('<div class="img_curtain_item"></div>');
        }
        $InfoSlideItem.each(function(){
            var $this = $(this),
                thisIndex = $this.index(),
                $ImgCurtainItem = $('.img_curtain .img_curtain_item').eq(thisIndex),
                ItemImgSrc = $this.find('img').attr('src');
            $ImgCurtainItem.attr('style', 'background-image:url('+ItemImgSrc+')');
            for(var i=0; i<5; i++){
                $ImgCurtainItem.append('<i></i>');
            }
        });
        $InfoSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 4000,
            speed : 1500,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $InfoSlidePrev,
            nextArrow : $InfoSlideNext,
            autoArrow : $InfoSlideAuto,
            pauseText : '정지',
            playText : '재생',
            total : $InfoSlideTotal,
            current : $InfoSlideCurrent,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true
        });
        $InfoSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $crtSlide = $(slick.$slides[currentSlide]),
                crtSlideDataIndex = $crtSlide.attr('data-slick-index'),
                $crtImgCurtainItem = $('.img_curtain .img_curtain_item').eq(crtSlideDataIndex),
                $otherImgCurtainItem = $('.img_curtain').find('.img_curtain_item').not($crtImgCurtainItem);
            $otherImgCurtainItem.removeClass('curtain_ani');
            $crtImgCurtainItem.addClass('curtain_ani');
        });
        //비주얼 팝업존 슬라이드 끝

        //퀵 슬라이드 시작
        var $quickSlideList = $('.quick_slide_list');
        $quickSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 8,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            responsive : [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 5,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 531,
                settings : {
                    slidesToShow : 4,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 411,
                settings : {
                    slidesToShow : 3,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            }]
        });
        //퀵 슬라이드 끝

        //공지사항 슬라이드 시작
        var $newsSlideWrap = $('.news_slide_wrap'),
            $newsSlideList = $newsSlideWrap.find('.news_slide_list'),
            $newsSlidePrev = $newsSlideWrap.find('.prev'),
            $newsSlideNext = $newsSlideWrap.find('.next');
        $newsSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $newsSlidePrev,
            nextArrow : $newsSlideNext,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            responsive : [{
                breakpoint : 1341,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 1
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    adaptiveHeight : true
                }
            }]
        });
        //공지사항 슬라이드 끝

        //보건소 안내 슬라이드 시작
        var $noticeSlideList = $('.notice_slide_list');
        $noticeSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 6,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            responsive : [{
                breakpoint : 801,
                settings : {
                    slidesToShow : 5,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 695,
                settings : {
                    slidesToShow : 4,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 531,
                settings : {
                    slidesToShow : 3,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 391,
                settings : {
                    slidesToShow : 2,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            }]
        });
        //보건소 안내 슬라이드 끝

    });
})(jQuery);