(function ($) {
    'use strict';
    function splittingTextDelay (object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i=0; i<splitLength; i++) {
            if (  $(object).data('css-property') == 'animation' ) {
                $(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
            }else if( $(object).data('css-property') == 'transition' ) {
                $(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
            }
        }
    }

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요

        //텍스트 에니메이션 플러그인 시작
        Splitting({
            target: '[data-splitting]',
            by: 'chars',
            key: null
        });
        var $splittingTxt = $('.word-split');
        $($splittingTxt).each(function  () {
            splittingTextDelay($(this),$(this).data('speed'),$(this).data('speed-delay'));
        });
        //텍스트 에니메이션 플러그인 끝

        //rowgroup 스크롤엑티브 시작
        var $ScrollAni = $('.scroll_ani');
        $ScrollAni.each(function(){
            var $this = $(this),
                scrollTop = $window.scrollTop(),
                scrollBottom = scrollTop + $window.height(),
                contentOffset = $this.offset();
            if(scrollBottom > contentOffset.top) {
                $this.addClass('scroll_active');
            }
        });
        $window.on('scroll', function(event) {
            $ScrollAni.each(function(){
                var $this = $(this),
                    scrollTop = $window.scrollTop(),
                    scrollBottom = scrollTop + $window.height(),
                    contentOffset = $this.offset();
                if(scrollBottom > contentOffset.top) {
                    $this.addClass('scroll_active');
                }
                else{
                    $this.removeClass('scroll_active');
                }
            });
        });
        //rowgroup 스크롤엑티브 끝

        //메인 비주얼 슬라이드 시작
        var $MidongSlideList = $('.main_visual .main_visual_wrap .visual_inner_box .wrap_box .midong_slide_wrap .midong_slide_list'),
            $MidongSlidePrev = $('.main_visual .main_visual_wrap .visual_inner_box .wrap_box .midong_slide_wrap .midong_slide_control .prev'),
            $MidongSlideNext = $('.main_visual .main_visual_wrap .visual_inner_box .wrap_box .midong_slide_wrap .midong_slide_control .next');
        $MidongSlideList.slick({
            autoplay : true,
            autoplaySpeed : 4000,
            speed : 1200,
            dots : false,
            arrows : true,
            prevArrow : $MidongSlidePrev,
            nextArrow : $MidongSlideNext,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            zIndex : 4,
            pauseOnHover : true,
            responsive: [{}]
        });
        //메인 비주얼 슬라이드 끝

        //프로그램 슬라이드 및 탭 시작
        var $TabSlideItem = $('.service .service_wrap .service_tab .tab_slide_box .tab_slide_item');
        $TabSlideItem.each(function(){
            var $this = $(this),
                $ServiceSlideWrap = $this.find('.service_slide_wrap'),
                $ServiceSlideList = $ServiceSlideWrap.find('.service_slide_list'),
                $ServiceSlideControl = $ServiceSlideList.siblings('.service_slide_control'),
                $ArrowBar = $ServiceSlideControl.find('.arrow_bar'),
                percent;
            $ServiceSlideList.on('init', function(event, slick, currentSlide, nextSlide) {
                percent = ((slick.currentSlide+1) / (slick.slideCount)) * 100;
                $ArrowBar.css('width', percent + '%');
            });
            $ServiceSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                percent = ((nextSlide+1) / (slick.slideCount)) * 100;
                $ArrowBar.css('width', percent + '%');
            });
            $ServiceSlideList.slick({
                autoplay : false,
                autoplaySpeed : 1500,
                speed : 1500,
                dots : false,
                arrows : true,
                prevArrow : $ServiceSlideControl.find('.prev'),
                nextArrow : $ServiceSlideControl.find('.next'),
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                variableWidth : false,
                responsive: [{
                    breakpoint : 1001,
                    settings : {
                        variableWidth : true,
                        slidesToShow : 3
                    }
                }]
            });
        });
        $('.service .service_wrap .service_tab .tab_box .tab_box_list .tab_box_item button.tab_box_btn').on('click', function(){
            var $this = $(this),
                $MyTabBoxItem = $this.parent('.tab_box_item'),
                IsActive = $MyTabBoxItem.is('.active'),
                MyTabBoxIndex = $MyTabBoxItem.index(),
                $OtherTabBoxItem = $MyTabBoxItem.siblings('.tab_box_item'),
                $OtherTabBoxBtn = $OtherTabBoxItem.find('button.tab_box_btn'),
                $MyTabBoxList = $MyTabBoxItem.parent('.tab_box_list'),
                $TabBox = $MyTabBoxList.parent('.tab_box'),
                $TabSlideBox = $TabBox.siblings('.tab_slide_box'),
                $MyTabSlideItem = $TabSlideBox.find('.tab_slide_item').eq(MyTabBoxIndex),
                $OtherTabSlideItem = $MyTabSlideItem.siblings('.tab_slide_item'),
                $MySlideWrap = $MyTabSlideItem.find('.service_slide_wrap'),
                $MySlideList = $MySlideWrap.find('.service_slide_list');
            if(!IsActive){
                $OtherTabBoxItem.removeClass('active');
                $OtherTabBoxBtn.removeAttr('title');
                $MyTabBoxItem.addClass('active');
                $this.attr('title', '선택됨');
                $OtherTabSlideItem.removeClass('active');
                $MyTabSlideItem.addClass('active');
                $MySlideList.slick('setPosition');
            }
        });
        //프로그램 슬라이드 및 탭 끝

        //공지사항 슬라이드 및 탭 시작
        var $NoticeTabSlideItem = $('.notice .notice_wrap .notice_tab .tab_slide_box .tab_slide_item');
        $NoticeTabSlideItem.each(function(){
            var $this = $(this),
                $NoticeSlideWrap = $this.find('.notice_slide_wrap'),
                $NoticeSlideList = $NoticeSlideWrap.find('.notice_slide_list'),
                $NoticeSlideControl = $NoticeSlideList.siblings('.notice_slide_control');
            $NoticeSlideList.slick({
                autoplay : false,
                dots : false,
                arrows : true,
                prevArrow : $NoticeSlideControl.find('.prev'),
                nextArrow : $NoticeSlideControl.find('.next'),
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                vertical : false,
                verticalSwiping : false,
                responsive: [{
                    breakpoint : 1431,
                    settings : {
                        slidesToShow : 2
                    }
                },{
                    breakpoint : 1001,
                    settings : {
                        slidesToShow : 2,
                        vertical : true,
                        verticalSwiping : true,
                    }
                }]
            });
        });
        $('.notice .notice_wrap .notice_tab .tab_box .tab_box_list .tab_box_item button.tab_box_btn').on('click', function(){
            var $this = $(this),
                $MyTabBoxItem = $this.parent('.tab_box_item'),
                IsActive = $MyTabBoxItem.is('.active'),
                MyTabBoxIndex = $MyTabBoxItem.index(),
                $OtherTabBoxItem = $MyTabBoxItem.siblings('.tab_box_item'),
                $OtherTabBoxBtn = $OtherTabBoxItem.find('button.tab_box_btn'),
                $MyTabBoxList = $MyTabBoxItem.parent('.tab_box_list'),
                $TabBox = $MyTabBoxList.parent('.tab_box'),
                $TabSlideBox = $TabBox.siblings('.tab_slide_box'),
                $MyTabSlideItem = $TabSlideBox.find('.tab_slide_item').eq(MyTabBoxIndex),
                $OtherTabSlideItem = $MyTabSlideItem.siblings('.tab_slide_item'),
                $MySlideWrap = $MyTabSlideItem.find('.notice_slide_wrap'),
                $MySlideList = $MySlideWrap.find('.notice_slide_list');
            if(!IsActive){
                $OtherTabBoxItem.removeClass('active');
                $OtherTabBoxBtn.removeAttr('title');
                $MyTabBoxItem.addClass('active');
                $this.attr('title', '선택됨');
                $OtherTabSlideItem.removeClass('active');
                $MyTabSlideItem.addClass('active');
                $MySlideList.slick('setPosition');
            }
        });
        //공지사항 슬라이드 및 탭 끝

        //장소소개 슬라이드 시작
        var $PlaceArea = $('.place .place_wrap .place_area');
        $PlaceArea.each(function(){
            var $this = $(this),
                $PlaceSlideWrap = $this.find('.place_slide_wrap'),
                $PlaceSlideList = $PlaceSlideWrap.find('.place_slide_list'),
                $PlaceSlideControl = $PlaceSlideWrap.find('.place_slide_control');
            $PlaceSlideList.slick({
                autoplay : true,
                dots : false,
                arrows : true,
                prevArrow : $PlaceSlideControl.find('.prev'),
                nextArrow : $PlaceSlideControl.find('.next'),
                slidesToShow : 1,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                responsive: [{}]
            });
        });
        //장소소개 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);