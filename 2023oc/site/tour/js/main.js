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

        //문화관광 전용 풀페이지 처럼 동작 시작
        function htmlScrollTop(){
            $('html').animate({
                scrollTop : 1
            }, 800, 'linear');
        }
        var StartRow2Top = $('.rowgroup2').offset().top;
        function moveScroll(){
            var $tourScrollWrapper = $('#wrapper'),
                IsTourScroll = $tourScrollWrapper.is('.tour_scroll');
            var TourScrollTop = $window.scrollTop();
            var Row2Top = $('.rowgroup2').offset().top;
            if(TourScrollTop > StartRow2Top){
                if(!IsTourScroll){
                    setTimeout(function(){
                        $tourScrollWrapper.addClass('tour_scroll');
                        TourScrollTop = 0;
                        htmlScrollTop();
                    }, 1);
                }
            }
            if(IsTourScroll) {
                $window.on('wheel', function(e){
                    if (e.originalEvent.deltaY < 0) {
                        $('html').stop();
                        if(TourScrollTop === Row2Top){
                            setTimeout(function(){
                                $tourScrollWrapper.removeClass('tour_scroll');
                                Row2Top = StartRow2Top;
                                TourScrollTop = 0;
                                htmlScrollTop();
                            }, 1);
                        }
                    }
                });
            }

            /*
            console.log('초기값로우2탑:',StartRow2Top);
            console.log('변동값로우2탑:',Row2Top);
            console.log('스크롤상단:',TourScrollTop);
            */

            //옥천 관광명소 스크롤 효과 시작
            var $Rowgroup3 = $('.rowgroup3'),
                Row3Top = $Rowgroup3.offset().top;
            if(TourScrollTop >= Row3Top - 250){
                $Rowgroup3.addClass('row3_ani');
            }
            if(TourScrollTop < Row3Top - 250){
                $Rowgroup3.removeClass('row3_ani');
            }
            //옥천 관광명소 스크롤 효과 끝

            //옥천 축제 스크롤 효과 시작
            var $Rowgroup4 = $('.rowgroup4'),
                Row4Top = $Rowgroup4.offset().top;
            if(TourScrollTop >= Row4Top - 600){
                $Rowgroup4.addClass('row4_ani');
            }
            if(TourScrollTop < Row4Top - 600){
                $Rowgroup4.removeClass('row4_ani');
            }
            var $FestivalConcert = $('.festival_wrap .concert_deco');
            if($window.scrollTop() > Row4Top - 200) {
                $FestivalConcert.addClass('concert_ani');
            }
            if($window.scrollTop() < Row4Top - 200) {
                $FestivalConcert.removeClass('concert_ani');
            }
            //옥천 축제 스크롤 효과 끝
        }

        $window.on('scroll', function(){
            var NowWindowState = $.screen.settings.state[0];
            if(NowWindowState == 'wide' || NowWindowState == 'web') {
                moveScroll();
            }
            //옥천 축제 아이템 스크롤 효과 시작
            var $FestivalItem = $('.festival_wrap .f_list .f_item');
            $FestivalItem.each(function(){
                var $this = $(this),
                    FestivalItemTop = $this.offset().top;
                if($window.scrollTop() > FestivalItemTop + 50) {
                    $this.addClass('f_item_ani');
                }
                else {
                    $this.removeClass('f_item_ani');
                }
            });
            //옥천 축제 아이템 스크롤 효과 끝
        });
        //문화관광 전용 풀페이지 처럼 동작 끝

        //비주얼 슬라이드 시작
        var $VisualSlideItem = $('.visual_wrap .visual_slide_wrap .visual_slide_list .visual_slide_item'),
            VisualSlideItemLength = $VisualSlideItem.length,
            $BackDeco = $('.back_deco');
        for(var i=0; i<VisualSlideItemLength; i++){
            $BackDeco.append('<i class="back_deco_item" style="background-image:url('+$VisualSlideItem.eq(i).find('.hidden_img').attr('src')+')"></i>');
        }
        var $VisualSlideList = $('.visual_wrap .visual_slide_wrap .visual_slide_list'),
            $VisualSlideControl = $('.visual_wrap .visual_slide_wrap .visual_slide_control'),
            $VisualPrev = $VisualSlideControl.find('.prev'),
            $VisualNext = $VisualSlideControl.find('.next'),
            $VisualTotal = $VisualSlideControl.find('.total'),
            $VisualCurrent = $VisualSlideControl.find('.current'),
            $VisualAuto = $('.visual_wrap .visual_slide_wrap .visual_scroll_box .auto');
        $VisualSlideList.on('init', function(event, slick, currentSlide) {
            var $crtSlide = $(slick.$slides[0]),
                $crtRows = $crtSlide.find('.slick-rows'),
                $crtVisualSlideItem = $crtRows.find('.visual_slide_item'),
                crtVisualBackData = $crtVisualSlideItem.attr('data-type') - 1,
                $crtBackDecoItem = $BackDeco.find('.back_deco_item').eq(crtVisualBackData),
                $otherBackDecoItem = $crtBackDecoItem.siblings('.back_deco_item');
            $otherBackDecoItem.removeClass('active start_deco');
            $crtBackDecoItem.addClass('active');
            $VisualSlideControl.addClass('active');
            setTimeout(function(){
                $crtBackDecoItem.addClass('start_deco');
            }, 1);
        });
        $VisualSlideList.slick({
            //기본
            autoplay : true,
            speed : 3000,
            autoplaySpeed : 4000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            fade : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite: true,
            arrows : true,
            prevArrow : $VisualPrev,
            nextArrow : $VisualNext,
            autoArrow : $VisualAuto,
            pauseText : '정지',
            playText : '재생',
            total : $VisualTotal,
            current : $VisualCurrent,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            variableWidth : false,
            zIndex : 0,
            responsive : [{}]
        });
        $VisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $nextSlide = $(slick.$slides[nextSlide]),
                $nextRows = $nextSlide.find('.slick-rows'),
                $nextVisualSlideItem = $nextRows.find('.visual_slide_item'),
                nextVisualBackData = $nextVisualSlideItem.attr('data-type') - 1,
                $nextBackDecoItem = $BackDeco.find('.back_deco_item').eq(nextVisualBackData),
                $otherBackDecoItem = $nextBackDecoItem.siblings('.back_deco_item');
            $otherBackDecoItem.removeClass('active start_deco');
            $nextBackDecoItem.addClass('active');
            setTimeout(function(){
                $nextBackDecoItem.addClass('start_deco');
            }, 1);

            $VisualSlideControl.removeClass('active');
            setTimeout(function(){
                $VisualSlideControl.addClass('active');
            }, 1);
        });
        $VisualAuto.on('click', function(){
            var $this = $(this),
                $Bar = $('.visual_wrap .visual_slide_wrap .visual_slide_control .pro_box .bar'),
                IsPlay = $this.is('.slick-pause');
            if(IsPlay){
                $Bar.css('animation-play-state', 'running');
            }
            else{
                $Bar.css('animation-play-state', 'paused');
            }
        });
        //비주얼 슬라이드 끝

        //문화관광 풀페이지 처럼 동작 시 포커스 동작 시작
        $('.visual_quick_wrap .visual_quick_list .visual_quick_item:last-child .visual_quick_link').on('focusin', function(){
            $('#wrapper').removeClass('tour_scroll');
        });
        $('.visual_quick_wrap .visual_quick_list .visual_quick_item:last-child .visual_quick_link').on('focusout', function(){
            $('#wrapper').addClass('tour_scroll');
        });
        $('.visual_quick_wrap .visual_quick_list .visual_quick_item:nth-child(3) .visual_quick_link').on('focusin', function(){
            $('#wrapper').removeClass('tour_scroll');
        });
        $('.service_wrap .service_slide_list .service_slide_item.type01 .service_slide_link').on('focusin', function(){
            $('#wrapper').addClass('tour_scroll');
            $('html').animate({
                scrollTop : 0
            }, 800, 'linear');
        });
        //문화관광 풀페이지 처럼 동작 시 포커스 동작 끝

        //자주찾는 메뉴 슬라이드 시작
        var $ServiceSlideList = $('.service_wrap .service_slide_wrap .service_slide_list');
        $ServiceSlideList.slick({
            //기본
            autoplay : false,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            fade : false,
            slidesToShow : 10,
            slidesToScroll : 1,
            infinite: true,
            arrows : false,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            variableWidth : true,
            zIndex : 0,
            responsive : [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 5,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 551,
                settings : {
                    slidesToShow : 4,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            },{
                breakpoint : 441,
                settings : {
                    slidesToShow : 3,
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true
                }
            }]
        });
        //자주찾는 메뉴 슬라이드 끝

        //옥천관광명소 슬라이드 및 탭 시작
        var $MapSlideList = $('.map_wrap .map_slide .map_slide_inner .map_slide_list'),
            $MapSlidePrev = $('.map_wrap .map_slide .map_slide_inner .map_slide_control .prev'),
            $MapSlideNext = $('.map_wrap .map_slide .map_slide_inner .map_slide_control .next'),
            $MapTextList = $('.map_wrap .map_text .map_text_inner .map_text_list'),
            $MapAreaList = $('.map_wrap .map_area .map_area_inner .map_area_list'),
            $MapDescList = $('.map_wrap .map_slide .map_desc_inner .map_desc_list');

        $MapSlideList.on('init', function(event, slick, currentSlide) {
            var $crtSlide = $(slick.$slides[0]),
                $crtRows = $crtSlide.find('.slick-rows'),
                $crtMapSlide = $crtRows.find('.map_slide_item'),
                crtMapSlideData = $crtMapSlide.attr('data-map-slide');
            setTimeout(function(){
                $MapTextList.find('.map_text_item[data-map-text="'+crtMapSlideData+'"]').addClass('active').find('button.map_text_btn').attr('title', '선택됨');
                $MapAreaList.find('.map_area_item[data-map-area="'+crtMapSlideData+'"]').addClass('active').find('button.map_area_btn').attr('title', '선택됨');
                $MapDescList.find('.map_desc_item[data-map-desc="'+crtMapSlideData+'"]').addClass('active');
            }, 1);
        });
        $MapSlideList.slick({
            //기본
            autoplay : false,
            speed : 800,
            autoplaySpeed : 3600,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            fade : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite: true,
            arrows : true,
            prevArrow : $MapSlidePrev,
            nextArrow : $MapSlideNext,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            variableWidth : false,
            zIndex : 0,
            responsive : [{}]
        });
        $MapSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $nextSlide = $(slick.$slides[nextSlide]),
                $nextRows = $nextSlide.find('.slick-rows'),
                $nextMapSlide = $nextRows.find('.map_slide_item'),
                nextMapSlideData = $nextMapSlide.attr('data-map-slide');
            setTimeout(function(){
                $MapTextList.find('.map_text_item[data-map-text="'+nextMapSlideData+'"]').addClass('active').siblings('.map_text_item').removeClass('active').find('button.map_text_btn').removeAttr('title');
                $MapTextList.find('.map_text_item[data-map-text="'+nextMapSlideData+'"]').addClass('active').find('button.map_text_btn').attr('title', '선택됨');
                $MapAreaList.find('.map_area_item[data-map-area="'+nextMapSlideData+'"]').addClass('active').siblings('.map_area_item').removeClass('active').find('button.map_area_btn').removeAttr('title');
                $MapAreaList.find('.map_area_item[data-map-area="'+nextMapSlideData+'"]').addClass('active').find('button.map_area_btn').attr('title', '선택됨');
                $MapDescList.find('.map_desc_item[data-map-desc="'+nextMapSlideData+'"]').addClass('active').siblings('.map_desc_item').removeClass('active');
            }, 1);
        });

        var $MapTextBtn = $MapTextList.find('.map_text_item button.map_text_btn');
        $MapTextBtn.on('click', function(){
            var $this = $(this),
                $MyTextItem = $this.parent('.map_text_item'),
                MyDataMapText = $MyTextItem.attr('data-map-text'),
                IsActive = $MyTextItem.is('.active'),
                $OtherTextItem = $MapTextList.find('.map_text_item').not($MyTextItem),
                $OtherTextBtn = $OtherTextItem.find('button.map_text_btn'),
                GoMapSlideNum = $MapSlideList.find('.slick-slide').not('.slick-cloned').find('.map_slide_item[data-map-slide="'+MyDataMapText+'"]').parent('.slick-rows').parent('.slick-slide').attr('data-slick-index');
            if(!IsActive){
                setTimeout(function(){
                    $OtherTextItem.removeClass('active');
                    $OtherTextBtn.removeAttr('title');
                    $MyTextItem.addClass('active');
                    $this.attr('title', '선택됨');
                    $MapSlideList.slick('slickPause').slick('slickGoTo', GoMapSlideNum);
                }, 1);
            }
        });
        var $MapAreaBtn = $MapAreaList.find('.map_area_item button.map_area_btn');
        $MapAreaBtn.on('click', function(){
            var $this = $(this),
                $MyAreaItem = $this.parent('.map_area_item'),
                MyDataMapArea = $MyAreaItem.attr('data-map-area'),
                IsActive = $MyAreaItem.is('.active'),
                $OtherAreaItem = $MapAreaList.find('.map_area_item').not($MyAreaItem),
                $OtherAreaBtn = $OtherAreaItem.find('button.map_area_btn'),
                GoMapSlideNum = $MapSlideList.find('.slick-slide').not('.slick-cloned').find('.map_slide_item[data-map-slide="'+MyDataMapArea+'"]').parent('.slick-rows').parent('.slick-slide').attr('data-slick-index');
            if(!IsActive){
                setTimeout(function(){
                    $OtherAreaItem.removeClass('active');
                    $OtherAreaBtn.removeAttr('title');
                    $MyAreaItem.addClass('active');
                    $this.attr('title', '선택됨');
                    $MapSlideList.slick('slickPause').slick('slickGoTo', GoMapSlideNum);
                }, 1);
            }
        });
        //옥천관광명소 슬라이드 및 탭 끝

        //옥천군 SNS 슬라이드 시작
        var $MediaSnsSlideList = $('.media_wrap .sns_slide_wrap .sns_slide_list');
        $MediaSnsSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            fade : false,
            slidesToShow : 2,
            slidesToScroll : 1,
            infinite: true,
            arrows : false,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            variableWidth : false,
            zIndex : 0,
            responsive : [{
                breakpoint : 801,
                settings : {
                    slidesToShow : 1,
                    fade : true
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 2,
                    fade : false
                }
            }]
        });
        //옥천군 SNS 슬라이드 끝

    });
})(jQuery);