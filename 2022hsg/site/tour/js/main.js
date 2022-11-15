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

        //비주얼 시작
        var $VisualSlideList = $('.tour_visual .tour_visual_wrap .visual_slide_wrap .visual_slide_list'),
            $VisualSlideControlWrap = $('.tour_visual .tour_visual_wrap .visual_slide_wrap .visual_slide_control');
        $VisualSlideList.on('init', function(event, slick, currentSlide){
            var $currentslide = $(slick.$slides[0]);
            setTimeout(function(){
                $currentslide.addClass('active_loading');
            }, 1);
            setTimeout(function(){
                $html.addClass('hsg_tour');
                $VisualSlideControlWrap.addClass('pro_ani');
            }, 100);
        });
        $VisualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 4000,
            speed : 3000,
            arrows : true,
            dots : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            pauseOnHover : true,
            infinite : true,
            fade : true,
            zIndex : 5,
            prevArrow : $VisualSlideControlWrap.find('.prev'),
            nextArrow : $VisualSlideControlWrap.find('.next'),
            pauseText : '정지',
            playText : '재생',
            total : $('.tour_visual .tour_visual_wrap .visual_slide_wrap .visual_slide_control .count_box .total'),
            current : $('.tour_visual .tour_visual_wrap .visual_slide_wrap .visual_slide_control .count_box .current'),
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
            responsive : [{}]
        });
        $VisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]),
                $nextslide = $(slick.$slides[nextSlide]);
            $VisualSlideControlWrap.removeClass('pro_ani');
            setTimeout(function(){
                $currentslide.removeClass('active_loading');
                $nextslide.addClass('active_loading');
                $VisualSlideControlWrap.addClass('pro_ani');
            }, 1);
        });
        //비주얼 끝

        //퀵메뉴 시작
        $('.quick_link_box .quick_open_box button.quick_open_btn').on('click', function(){
            var $this = $(this),
                $OpenBox = $this.parent('.quick_open_box'),
                $QuickLinkBox = $OpenBox.parent('.quick_link_box'),
                IsActive = $QuickLinkBox.is('.active');
            if(!IsActive){
                $QuickLinkBox.addClass('active');
                $this.attr('title', '레이어 닫기');
            }
            else{
                $QuickLinkBox.removeClass('active');
                $this.attr('title', '레이어 열기');
            }
        });
        //퀵메뉴 끝

        //스크롤 애니메이션 시작
        var FirstScroll = false;
        var $ScrollGroup = $('.scroll_group');
        $window.on('scroll', function(event){
            var WindowTop = $window.scrollTop(),
                ScrollLocation = document.documentElement.scrollTop,
                $QuickLinkBox = $('.quick_link_box');
            if(FirstScroll == false){
                if(ScrollLocation > 400){
                    $QuickLinkBox.removeClass('active');
                    $QuickLinkBox.find('.quick_open_btn').attr('title','레이어 열기');
                    FirstScroll = true;
                }
                else{
                    $QuickLinkBox.addClass('active');
                    $QuickLinkBox.find('.quick_open_btn').attr('title','레이어 닫기');
                }
            }
            $ScrollGroup.each(function(){
                var $this = $(this),
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top;
                if(ScrollLocation+300 > ThisOffSetTop){
                    $this.addClass('scroll_ani');
                }
            });
        });
        //스크롤 애니메이션 끝

        //추천여행지 지도 슬라이드
        var $MapSlideList = $('.hsg_map .hsg_map_wrap .map_slide_wrap .map_slide_list');
        $MapSlideList.slick({
            autoplay : false,
            arrows :false,
            dots : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 11,
            slidesToScroll : 1,
            variableWidth : true,
            zIndex : 5,
            responsive : []
        });
        var $DescSlideList = $('.hsg_map .hsg_map_wrap .desc_slide_wrap .desc_slide_list');
        $DescSlideList.slick({
            autoplay : false,
            arrows :false,
            dots : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 11,
            slidesToScroll : 1,
            variableWidth : true,
            zIndex : 5,
            responsive : [{}]
        });

        $('.map_slide_wrap button.map_slide_btn').on('click', function(){
            var $this = $(this),
                $MyMapItem = $this.parent('.map_slide_item'),
                IsActive = $MyMapItem.is('.active'),
                MyMapIndex = $MyMapItem.attr('data-map-index'),
                $OtherMapItem = $('.map_slide_wrap').find('.map_slide_item').not($MyMapItem),
                $OtherMapBtn = $('.map_slide_wrap').find('button.map_slide_btn').not($this),
                $MyDescSlideItem = $('.desc_slide_wrap').find('.desc_slide_item[data-desc-index="'+MyMapIndex+'"]'),
                $OtherDescSlideItem =  $('.desc_slide_wrap').find('.desc_slide_item').not($MyDescSlideItem);
            if(!IsActive){
                $OtherMapItem.removeClass('active');
                $OtherMapBtn.removeAttr('title');
                $OtherDescSlideItem.removeClass('active');

                $MyMapItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyDescSlideItem.addClass('active');
            }
        });
        //추천여행지 지도 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);