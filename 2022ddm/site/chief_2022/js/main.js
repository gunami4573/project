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

        //메인 비주얼 슬라이드 시작
        var $VisualSlideList = $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_list');
        $VisualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 1500,
            dots : true,
            appendDots : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_btn_box .visual_dots_box'),
            dotsClass : 'slick-dots clearfix',
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).attr('data-thum');
                return '<button type="button"><span>'+(i + 1)+'번 비주얼 사진 보기</span></button>';
            },
            pauseOnDotsClick : false,
            pauseOnHover : false,
            arrows : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            variableWidth : false, //width를 css로 제어
            fade : true,
            zIndex : 3,
            responsive : [{}]
        });
        //메인 비주얼 슬라이드 끝

        //스크롤처리 시작
        var $ScrollAni = $('.scroll_ani');
        $ScrollAni.each(function(){
            var $this = $(this),
                scrollTop = $window.scrollTop(),
                scrollBottom = scrollTop + $window.height(),
                contentOffset = $this.offset();
            if(scrollBottom > contentOffset.top) {
                $this.addClass('active');
            }
        });
        $window.on('scroll', function(event) {
            $ScrollAni.each(function(){
                var $this = $(this),
                    scrollTop = $window.scrollTop(),
                    scrollBottom = scrollTop + $window.height(),
                    contentOffset = $this.offset();
                if(scrollBottom > contentOffset.top) {
                    $this.addClass('active');
                }else{
                    $this.removeClass('active');
                }
            });
        });
        //스크롤처리 끝

        //포토갤러리 슬라이드 시작
        var $PGSlideList = $('.photo_gallery .photo_gallery_wrap .p_g_slide_wrap .p_g_slide_list');
        $PGSlideList.slick({
            autoplay : true,
            arrows : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            rows : 2, //여러줄
            slidesPerRow : 2, //여러줄 일 때 한줄의 몇개 출력
            variableWidth : false, //width를 css로 제어
            vertical : false, //세로모드 유무
            verticalSwiping : false, //세로일때 터치 유무
            zIndex : 3,
            responsive : [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 2,
                    slidesToScroll : 1,
                    rows : 1,
                    slidesPerRow : 1,
                    infinite : true,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    vertical : true,
                    verticalSwiping : true
                }
            }]
        });
        //포토갤러리 슬라이드 끝

        //스케줄 슬라이드 시작
        var $ScheduleSlideList = $('.schedule .schedule_wrap .schedule_slide_wrap .slide_inner .schedule_slide_list');
        $ScheduleSlideList.each(function(){
            var $this = $(this);
            $this.slick({
                autoplay : true,
                autoplaySpeed : 3000,
                speed : 1000,
                arrows : false,
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                variableWidth : true, //width를 css로 제어
                vertical : false, //세로모드 유무
                verticalSwiping : false, //세로일때 터치 유무
                zIndex : 3,
                responsive : [{
                    breakpoint : 1671,
                    settings : {
                        slidesToShow : 2,
                        slidesToScroll : 1
                    }
                },{
                    breakpoint : 1281,
                    settings : {
                        slidesToShow : 1,
                        slidesToScroll : 1
                    }
                },{
                    breakpoint : 1001,
                    settings : {
                        variableWidth : false,
                        vertical : true,
                        verticalSwiping : true,
                        slidesToShow : 2,
                        slidesToScroll : 1
                    }
                },{
                    breakpoint : 641,
                    settings : {
                        variableWidth : false,
                        vertical : true,
                        verticalSwiping : true,
                        slidesToShow : 3,
                        slidesToScroll : 1
                    }
                }]
            });
        });
        //스케줄 슬라이드 끝
        //스케줄 일주일 탭버튼 시작
        $('.schedule .schedule_wrap .schedule_week_btn_box .week_list .week_item button.week_btn').on('click', function(){
            var $this = $(this),
                $MyWeekItem = $this.parent('.week_item'),
                IsActive = $MyWeekItem.is('.active'),
                MyWeekItemIndex = $MyWeekItem.index(),
                $OtherWeekItem = $MyWeekItem.siblings('.week_item'),
                $OtherWeekBtn = $OtherWeekItem.find('button.week_btn'),
                $ScheduleSlideInner = $('.schedule .schedule_wrap .slide_inner'),
                $MyScheduleSlideList = $ScheduleSlideInner.find('.schedule_slide_list').eq(MyWeekItemIndex),
                $OtherScheduleSlideList = $MyScheduleSlideList.siblings('.schedule_slide_list'),
                MyWeekNumber = $this.find('.number').text(),
                ScheduleTitleNumber = $('.schedule .schedule_wrap .schedule_title_wrap .text_wrap.right .day .number');
            if(!IsActive){
                $OtherWeekItem.removeClass('active');
                $OtherWeekBtn.removeAttr('title','선택됨');
                $MyWeekItem.addClass('active');
                $this.attr('title', '선택됨');
                $OtherScheduleSlideList.removeClass('active');
                $MyScheduleSlideList.addClass('active').slick('setPosition');
                ScheduleTitleNumber.text(MyWeekNumber);
            }
        });
        //스케줄 일주일 탭버튼 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);