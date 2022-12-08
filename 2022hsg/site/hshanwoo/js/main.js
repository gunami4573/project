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
        var $VisualSlideList = $('.visual .visual_wrap .visual_slide_wrap .visual_slide_list');
        $VisualSlideList.on('init', function(event, slick, currentSlide, nextSlide) {
            setTimeout(function(){
                $('.visual .visual_wrap .visual_deco').addClass('deco_ani');
            }, 100);
            setTimeout(function(){
                $('.visual .visual_wrap').addClass('visual_ani');
            }, 500);
        });
        $VisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $('.visual .visual_wrap').removeClass('visual_ani');
            setTimeout(function(){
                $('.visual .visual_wrap').addClass('visual_ani');
            }, 500);
        });
        $VisualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 1000,
            dots : false,
            arrows : true,
            prevArrow : $('.visual .visual_wrap .visual_slide_control .prev'),
            nextArrow : $('.visual .visual_wrap .visual_slide_control .next'),
            autoArrow : $('.visual .visual_wrap .visual_slide_control .auto'),
            pauseText : '정지',
            playText : '재생',
            total : $('.visual .visual_wrap .visual_slide_control .count_box .total'),
            current : $('.visual .visual_wrap .visual_slide_control .count_box .current'),
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            zIndex : 1,
            fade : true,
            pauseOnHover : true,
            pauseOnFocus : true,
            responsive: [{}]
        });
        //비주얼 슬라이드 끝

        //체험프로그램 탭 및 슬라이드 시작
        var $TotalConItem = $('.play .play_wrap .play_total_wrap .total_con_box .total_con_list .total_con_item');
        $TotalConItem.each(function(){
            var $this = $(this),
                $TotalSlideWrap = $this.find('.total_slide_wrap'),
                $TotalSlideList = $TotalSlideWrap.find('.total_slide_list'),
                $TotalSlideControl = $TotalSlideWrap.find('.total_slide_control'),
                $TotalProgressBar = $TotalSlideControl.find('.progressbar').find('i'),
                percent;
            $TotalSlideList.on('init', function(event, slick, currentSlide, nextSlide) {
                percent = ((slick.currentSlide+1) / (slick.slideCount)) * 100;
                $TotalProgressBar.css('width', percent + '%');
            });
            $TotalSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                percent = ((nextSlide+1) / (slick.slideCount)) * 100;
                $TotalProgressBar.css('width', percent + '%');
            });
            $TotalSlideList.slick({
                autoplay : true,
                autoplaySpeed : 3000,
                speed : 1000,
                dots : false,
                arrows : true,
                prevArrow : $TotalSlideControl.find('.prev'),
                nextArrow : $TotalSlideControl.find('.next'),
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                pauseOnFocus : true,
                variableWidth : true,
                responsive: [{}]
            });
        });
        $('.play .play_wrap .play_total_wrap .total_tab_box .total_tab_list .total_tab_item button.total_tab_btn').on('click', function(){
            var $this = $(this),
                $MyTotalTabItem = $this.parent('.total_tab_item'),
                IsActive = $MyTotalTabItem.is('.active'),
                MyTotalTabItemIndex = $MyTotalTabItem.index(),
                $OtherTotalTabItem = $MyTotalTabItem.siblings('.total_tab_item'),
                $OtherTotalTabBtn = $OtherTotalTabItem.find('button.total_tab_btn'),
                $TotalTabList = $MyTotalTabItem.parent('.total_tab_list'),
                $TotalTabBox = $TotalTabList.parent('.total_tab_box'),
                $TotalConBox = $TotalTabBox.siblings('.total_con_box'),
                $TotalConList = $TotalConBox.find('.total_con_list'),
                $MyTotalConItem = $TotalConList.find('.total_con_item').eq(MyTotalTabItemIndex),
                $OtherTotalConItem = $MyTotalConItem.siblings('.total_con_item'),
                $MyTotalSlideWrap = $MyTotalConItem.find('.total_slide_wrap'),
                $MyTotalSlideList = $MyTotalSlideWrap.find('.total_slide_list');
            if(!IsActive){
                $OtherTotalTabItem.removeClass('active');
                $MyTotalTabItem.addClass('active');
                $OtherTotalTabBtn.removeAttr('title');
                $this.attr('title', '선택됨');
                $OtherTotalConItem.removeClass('active');
                $MyTotalConItem.addClass('active');
                $MyTotalSlideList.slick('setPosition');
            }
        });
        //체험프로그램 탭 및 슬라이드 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);