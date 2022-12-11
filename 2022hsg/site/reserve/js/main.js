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

        setTimeout(function(){
            $html.addClass('hsg_reserve');
        }, 100);

        //빠른예약서비스 탭 및 슬라이드 시작
        var $SpeedConItem = $('.speed .speed_wrap .speed_con_box .con_list .con_item');
        $SpeedConItem.each(function(){
            var $this = $(this),
                $SpeedSlideWrap = $this.find('.speed_slide_wrap'),
                $SpeedSlideList = $SpeedSlideWrap.find('.speed_slide_list');
            $SpeedSlideList.slick({
                autoplay : true,
                autoplaySpeed : 3500,
                speed : 800,
                dots : false,
                arrows : false,
                slidesToShow : 4,
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
        $('.speed .speed_wrap .speed_tab_box .tab_list .tab_item button.tab_btn').on('click', function(){
            var $this = $(this),
                $MySpeedTabItem = $this.parent('.tab_item'),
                IsActive = $MySpeedTabItem.is('.active'),
                MySpeedTabItemIndex = $MySpeedTabItem.index(),
                $OtherSpeedTabItem = $MySpeedTabItem.siblings('.tab_item'),
                $OtherSpeedTabBtn = $OtherSpeedTabItem.find('button.tab_btn'),
                $SpeedTabList = $MySpeedTabItem.parent('.tab_list'),
                $SpeedTabBox = $SpeedTabList.parent('.speed_tab_box'),
                $SpeedConBox = $SpeedTabBox.siblings('.speed_con_box'),
                $SpeedConList = $SpeedConBox.find('.con_list'),
                $MySpeedConItem = $SpeedConList.find('.con_item').eq(MySpeedTabItemIndex),
                $OtherSpeedConItem = $MySpeedConItem.siblings('.con_item'),
                $MySpeedSlideWrap = $MySpeedConItem.find('.speed_slide_wrap'),
                $MySpeedSlideList = $MySpeedSlideWrap.find('.speed_slide_list');
            if(!IsActive){
                $OtherSpeedTabItem.removeClass('active');
                $MySpeedTabItem.addClass('active');
                $OtherSpeedTabBtn.removeAttr('title');
                $this.attr('title', '선택됨');
                $OtherSpeedConItem.removeClass('active');
                $MySpeedConItem.addClass('active');
                $MySpeedSlideList.slick('setPosition');
            }
        });
        //빠른예약서비스 탭 및 슬라이드 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);