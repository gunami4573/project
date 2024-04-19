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

        //스크롤 공통 효과 시작
        $('.waypoint').waypoint(function(direction) {
            $(this.element)[(direction === 'down') ? 'addClass' : 'removeClass']('active');
        }, {offset : '90%'});
        //스크롤 공통 효과 끝

        //비주얼 스크롤 시작
        var startRow1Top = $('.rowgroup1').offset().top;
        function moveScroll(){
            var $ScrollBody = $('body'),
                IsBodyScroll = $ScrollBody.is('.eng_scroll'),
                ScrollTop = $window.scrollTop();
            if(ScrollTop > startRow1Top){
                $ScrollBody.addClass('eng_scroll');
            }
            else{
                $ScrollBody.removeClass('eng_scroll');
            }
        }
        moveScroll();
        $window.on('scroll', function(){
            moveScroll();
        });
        //비주얼 스크롤 끝

        //비주얼 슬라이드 시작
        var $visualSlideList = $('.visual_slide_wrap .visual_slide_list'),
            $visualAuto = $('.visual_slide_wrap .visual_slide_control .auto');
        $visualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3500,
            speed : 1500,
            dots : true,
            appendDots : $('.visual_slide_wrap .visual_slide_control .visual_nav'),
            dotsClass : 'visual_nav_list',
            customPaging : function(slider, i) {
                return '<button type="button"><span>'+(i + 1)+'num slide view</span></button>';
            },
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            autoArrow : $visualAuto,
            pauseText : 'pause',
            playText : 'play',
            pauseOnHover : false,
            pauseOnArrowClick : false,
            pauseOnDirectionKeyPush : false,
            pauseOnSwipe : false,
            pauseOnDotsClick : false,
            zIndex : 1,
            fade : true
        });
        //비주얼 슬라이드 끝

        //비주얼 퀵 버튼 시작
        $('.visual_quick_wrap button.visual_quick_open').on('click', function(){
            var $this = $(this),
                $visualQuickWrap = $this.parent('.visual_quick_wrap'),
                IsActive = $visualQuickWrap.is('.active');
            if(!IsActive){
                $this.attr('title', 'quick menu close');
                $visualQuickWrap.addClass('active');
            }
            else{
                $this.attr('title', 'quick menu open');
                $visualQuickWrap.removeClass('active');
            }
        });
        //비주얼 퀵 버튼 끝

        //NEWS 타이틀 효과 시작
        var $newsTitle = $('.news_title'),
            $newsTitleClone = $newsTitle.clone(),
            newsTitleText = $newsTitleClone.text();
        $newsTitle.append('<em class="news_gra_text">'+newsTitleText+'</em>');
        //NEWS 타이틀 효과 끝

        //NEWS 슬라이드 시작
        var $newsLeftSlideList = $('.news_slide_wrap .news_left_slide_list'),
            $newsLeftSlideItem = $newsLeftSlideList.find('.news_slide_item'),
            $newsLeftSlideItemClone = $newsLeftSlideItem.clone(),
            $newsRightSlideList = $('.news_slide_wrap .news_right_slide_list'),
            $newsSlideControl = $('.news_slide_wrap .news_slide_control'),
            $newsPrev = $('.news_slide_wrap .news_slide_control .prev'),
            $newsNext = $('.news_slide_wrap .news_slide_control .next'),
            $newsAuto = $('.news_slide_wrap .news_slide_control .auto'),
            $newsCurrent = $('.news_slide_wrap .news_slide_control .count_box .current'),
            $newsTotal = $('.news_slide_wrap .news_slide_control .count_box .total');
        for(var i=1;i<$newsLeftSlideItem.length;i++){
            $newsRightSlideList.append($newsLeftSlideItemClone[i]);
            $newsRightSlideList.append($newsLeftSlideItemClone[0]);
        }
        $newsLeftSlideList.on('init', function(event, slick, currentSlide) {
            $newsSlideControl.addClass('news_ani');
            $newsLeftSlideList.find('.slick-slide').addClass('mobile_default');
            $(slick.$slides[0]).removeClass('mobile_default');
        });
        $newsLeftSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $newsSlideControl.removeClass('news_ani');
            $newsLeftSlideList.find('.slick-slide').addClass('mobile_default');
            var $nextSlide = $(slick.$slides[nextSlide]);
            $nextSlide.removeClass('mobile_default');
        });
        $newsLeftSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3400,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $newsPrev,
            nextArrow : $newsNext,
            current : $newsCurrent,
            total : $newsTotal,
            autoArrow : $newsAuto,
            pauseText : 'pause',
            playText : 'play',
            pauseOnHover : true,
            pauseOnArrowClick : false,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true,
            asNavFor : $newsRightSlideList,
            responsive : [{
                breakpoint : 641,
                settings : {
                    variableWidth : true,
                    fade : false,
                    centerMode : true,  //센터모드
                    centerPadding : '0px',  //센터모드일때 padding
                }
            }]
        });
        $newsLeftSlideList.on('afterChange', function(event, slick, currentSlide, nextSlide) {
            $newsSlideControl.addClass('news_ani');
        });
        $newsAuto.on('click', function(){
            var $this = $(this),
                $Graph = $('.news_slide_wrap .news_slide_control .count_box .bar .graph'),
                IsPlay = $this.is('.slick-pause');
            if(IsPlay){
                $Graph.css('animation-play-state', 'running');
            }
            else{
                $Graph.css('animation-play-state', 'paused');
            }
        });
        $newsRightSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3400,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : false,
            pauseOnHover : true,
            pauseOnArrowClick : false,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            asNavFor : $newsLeftSlideList
        });
        //NEWS 슬라이드 끝

        //VR 슬라이드 시작
        var $vrSlideList = $('.vr_slide_wrap .vr_slide_list'),
            $vrSlideItem = $vrSlideList.find('.vr_slide_item'),
            $vrSlideItemClone = $vrSlideItem.clone(),
            $vrBackSlideList = $('.vr_slide_wrap .back_vr_slide_list'),
            $vrPrev = $('.vr_slide_wrap .vr_slide_control .prev'),
            $vrNext = $('.vr_slide_wrap .vr_slide_control .next');
        for(var i=0; i<$vrSlideItem.length; i++){
            $vrBackSlideList.append($vrSlideItemClone[i]);
        }
        $vrSlideList.slick({
            autoplay : false,
            autoplaySpeed : 4000,
            speed : 500,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $vrPrev,
            nextArrow : $vrNext,
            pauseOnHover : true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true,
            asNavFor : $vrBackSlideList
        });
        $vrBackSlideList.slick({
            autoplay : false,
            autoplaySpeed : 4000,
            speed : 1000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : true,
            prevArrow : $vrPrev,
            nextArrow : $vrNext,
            pauseOnHover : true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : false,
            centerMode : true,  //센터모드
            centerPadding : '0px',  //센터모드일때 padding
            asNavFor : $vrSlideList
        });
        //VR 슬라이드 끝

    });
})(jQuery);