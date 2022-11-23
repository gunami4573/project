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
        var $ScrollGroup = $('.scroll_group');
        $window.on('scroll', function(event){
            var ScrollLocation = document.documentElement.scrollTop;
            $ScrollGroup.each(function(){
                var $this = $(this),
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top;
                if(ScrollLocation+400 > ThisOffSetTop){
                    $this.addClass('scroll_ani');
                }
            });
        });
        //스크롤 애니메이션 끝

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
            $DailySlideList.on('wheel', function(e){
                e.preventDefault();
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickPrev');
                } else {
                    $(this).slick('slickNext');
                }
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

        //민선8기 100대 공약 슬라이드 시작
        var $PromiseSwiper = new Swiper('.promise .promise_wrap .promise_swiper_wrap .swiper-container', {
            freeMode : false,  //터치 밀었을 떄 하나씩 말고 휙 넘어가는 여부
            slidesPerView : 'auto',  //slick 에서 사용하는 variableWidth 처럼 사용하기 위함, width 지정할 것
            resistance : false,
            spaceBetween : 60,  //오른쪽 마진값(px)
            touchRatio : true,  //드래그 사용여부
            autoplay : {
                delay : 4000
            },
            speed : 1000,
            loop : true,  //무한루프
            navigation : {
                prevEl : '.promise .promise_wrap .promise_swiper_wrap .swiper_btn_box .swiper_btn.prev',
                nextEl : '.promise .promise_wrap .promise_swiper_wrap .swiper_btn_box .swiper_btn.next',
            },
            pagination : {
                el : '.promise .promise_wrap .promise_swiper_wrap .swiper_btn_box .number_box',
                type : 'custom',
                renderCustom: function (swiper, current, total) {
                    function ZeroOver(number) {
                        return (number < 10) ? '0' + number.toString() : number.toString();
                    }
                    $('.promise .promise_wrap .promise_swiper_wrap .swiper_btn_box .number_box .current').text(ZeroOver(current));//current 앞에 0 필요시
                    $('.promise .promise_wrap .promise_swiper_wrap .swiper_btn_box .number_box .total').text(ZeroOver(total));  //total 앞에 0 필요시
                }
            },
            on : {
                activeIndexChange : function () {
                    $('.promise .promise_wrap .promise_swiper_wrap .swiper_btn_box .progressbar').empty().append(this.realIndex+1);
                }
            }
        });


        //민선8기 100대 공약 슬라이드 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);