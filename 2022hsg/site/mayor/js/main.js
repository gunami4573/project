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

        //오늘의 일정 탭 및 슬라이드 시작
        var $DailyConItem = $('.daily_wrap .daily_slide_wrap .daily_con_box .daily_con_item');
        $DailyConItem.each(function(){
            var $this = $(this),
                $DailySlideList = $this.find('.daily_slide_list');
            $DailySlideList.slick({
                autoplay : true,
                dots : false,
                arrows : false,
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                pauseOnFocus : true,
                vertical : true, //세로모드 유무
                verticalSwiping : true, //세로일때 터치 유무
                responsive: [{}]
            });
        });
        $('.daily_wrap .daily_slide_wrap .daily_tab_box .daily_tab_item button.daily_tab_btn').on('click', function(){
            var $this = $(this),
                $MyDailyTabItem = $this.parent('.daily_tab_item'),
                IsActive = $MyDailyTabItem.is('.active'),
                MyDailyTabIemIndex = $MyDailyTabItem.index(),
                $OtherDailyTabItem = $MyDailyTabItem.siblings('.daily_tab_item'),
                $OtherDailyTabBtn = $OtherDailyTabItem.find('button.daily_tab_btn'),
                $DailyTabBox = $MyDailyTabItem.parent('.daily_tab_box'),
                $DailyConBox = $DailyTabBox.siblings('.daily_con_box'),
                $MyDailyConItem = $DailyConBox.find('.daily_con_item').eq(MyDailyTabIemIndex),
                $MyDailySlideList = $MyDailyConItem.find('.daily_slide_list'),
                $OtherDailyConItem = $MyDailyConItem.siblings('.daily_con_item');
            if(!IsActive){
                $OtherDailyTabItem.removeClass('active');
                $OtherDailyTabBtn.removeAttr('title');
                $MyDailyTabItem.addClass('active');
                $this.attr('title','선택됨');
                $OtherDailyConItem.removeClass('active');
                $MyDailyConItem.addClass('active');
                $MyDailySlideList.slick('setPosition');
            }
        });
        //오늘의 일정 탭 및 슬라이드 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);