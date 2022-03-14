(function($) {
    'use strict';
    var $window = $(window),
        $document = $(document),
        $html = $('html');

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();
    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie7';

        //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie8';

        //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie9';

        //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie10';

        //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie11';

        //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

        //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

        //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

        //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

        //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }
    window.getBrowser = function() {
        return _browser;
    };
    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function() {
        //월 형태 일정 슬릭 시작
        var $Month = $('.month_box .month_list');
        var $ActiveItem = $Month.find('.month_link.active').parents('.month_item'),
            ActiveIndex = $ActiveItem.index();
        $Month.slick({
            //기본
            autoplay : false,
            dots : false,
            swipe : false,
            draggable : false,
            slidesToShow : 12,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: false,
            arrows : false,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe : true,
                        draggable : true,
                        slidesToShow : 12
                        //swipeToSlide : true
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        swipe : true,
                        draggable : true,
                        slidesToShow : 6,
                        swipeToSlide : true,
                        infinite: true,
                        initialSlide : ActiveIndex
                    }
                }
            ]
        });
        //월 형태 일정 슬릭 끝
        $window.on('responsive', function(event) {
            if(event.state == 'phone') {
                setTimeout(function(){
                    if(ActiveIndex > 5){
                        $Month.slick('slickGoTo', 6);
                    }
                }, 1000);
            };
        });

        //지도 형태 일정 슬릭 시작
        var $Daily = $('.map .daily_box .daily_list');
        $Daily.slick({
            //기본
            dots : true,
            dotsClass : "slick-dots",
            appendDots: $('.map .daily_box .daily_control'),
            customPaging : function(slider, i) {
                return '<button type="button"><span>'+(i + 1)+'번 슬라이드 보기</span></button>';
            },
            swipe : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            slidesPerRow : 1,
            rows: 10,
            infinite: false, //무한반복
            arrows : false,
            responsive: [
                {
                    breakpoint: 1241,
                    settings: {
                        swipe : true,
                        draggable : true
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        swipe : true,
                        draggable : true,
                        slidesToShow : 1,
                        slidesPerRow: 2,
                        rows : 1
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        swipe : true,
                        draggable : true,
                        slidesToShow : 1,
                        slidesPerRow: 1,
                        rows : 1
                    }
                }
            ]
        });
        //지도 형태 일정 슬릭 끝

        //지도 or 달력 타입 선택 시작
        $('#header .type_box .btn_type').on('click', function(){
            var $this = $(this),
                Index = $this.index(),
                $OtherBtn = $this.siblings('.btn_type'),
                IsActive = $this.is('active'),
                $MySection = $('.section').eq(Index),
                $OtherSection = $MySection.siblings('.section');
            if(!IsActive){
                $OtherBtn.removeClass('active').removeAttr('title');
                $this.addClass('active').attr('title', '선택됨');
                $OtherSection.removeClass('active');
                $MySection.addClass('active');
                if(Index == 0){
                    $Daily.slick('setPosition');
                }
            }
        });
        //지도 or 달력 타입 선택 끝

        //달력 리스트 스크롤바 시작
        $('.section.calendar .daily_box .daily_list').scrollbar();
        //달력 리스트 스크롤바 끝

        //달력 일 클릭 시 리스트 선택 여부 시작
        $('.section.calendar .table_box .schedule button.schedule_btn').on('click', function(){
            var $this = $(this),
                IsActive = $this.is('active'),
                $Parents = $this.parent('.schedule td'),
                $OtherParents = $Parents.siblings('td'),
                $OtherBtn = $('.section.calendar .table_box .schedule').find('.schedule_btn'),
                $ScheduleTable = $('.section.calendar .table_box .schedule'),
                $ScheduleBtns = $ScheduleTable.find('.schedule_btn'),
                $DailyList = $('.section.calendar .daily_box .daily_list .scroll-content');
            if(!IsActive){
                $OtherBtn.removeClass('active').removeAttr('title');
                $this.addClass('active').attr('title', '선택됨');
                $.ajax({
                    url : '/project/cwg2020/map/data/list_data.html',
                    success : function (data) {
                        $DailyList.empty().append(data);
                    }
                });
            }
        });
        //달력 일 클릭 시 리스트 선택 여부 끝
    });
    $document.on('ready', function(event) {
        $.responsive({
            range : {
                wide : {
                    horizontal : {
                        from : 9999,
                        to : 1201
                    }
                },
                web : {
                    horizontal : {
                        from : 1200,
                        to : 1001
                    }
                },
                tablet : {
                    horizontal : {
                        from : 1000,
                        to : 641
                    }
                },
                phone : {
                    horizontal : {
                        from : 640,
                        to : 0
                    }
                }
            },
            lowIE : {
                property : ['web']
            },
            inheritClass : false
        });
    });
})(window.jQuery);