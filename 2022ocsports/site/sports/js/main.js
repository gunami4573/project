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

        //메인 전용 좌측 네비 시작(작업예정)
        //메인 전용 좌측 네비 끝(작업예정)

        //임시 디데이 날짜 구하기 시작
        function VisualCounter(){
            var Dday = new Date("Aug 25, 2022").getTime(), //디데이
                NowTime = new Date(), //현재 날짜 가져오기
                Distance = Dday - NowTime,
                LimitDay = Math.floor(Distance / (1000 * 60 * 60 * 24)),
                RealDay = LimitDay+1;
            $('.main_visual .count_time .d_day').empty().html(Math.abs(RealDay));
            $('.main_visual .count_time .d_day').attr('data-count', Math.abs(RealDay));
            if(LimitDay > -1){
                $('.main_visual .count_time').addClass('prev');
                $('.main_visual .count_time .plus_minus').empty().html('D -');
                $('.main_visual .count_time .top_inner .text').empty().html('대회 개최까지 남은시간');
            }
            else if(LimitDay === -1){
                $('.main_visual .count_time').addClass('today');
                $('.main_visual .count_time .plus_minus').empty().html('D -');
                $('.main_visual .count_time .top_inner .text').empty().html('도민체전의 성공적인 개최를 기원합니다!');
            }
            else{
                $('.main_visual .count_time').addClass('next');
                $('.main_visual .count_time .plus_minus').empty().html('D +');
                $('.main_visual .count_time .top_inner .text').empty().html('충북도민체전 대회 '+Math.abs(RealDay)+'일차');
            }
        }
        VisualCounter();
        //임시 디데이 구하기 끝
        //임시 디데이 날짜 카운팅 효과 시작
        $('.count_time .d_day').each(function(){
            var $this = $(this),
                end = $this.attr('data-count');
            setTimeout(function(){
                $({start:0}).animate({
                    start : end
                },{
                    duration:1200,
                    step : function(){
                        if(end < 10){
                            $this.text('0'+Math.floor(this.start));
                        }
                        else{
                            $this.text(Math.floor(this.start));
                        }
                    },
                    complete : function(){
                        if(end < 10){
                            $this.text('0'+this.start);
                        }
                        else{
                            $this.text(this.start);
                        }
                    }
                });
            }, 1600);
        });
        //임시 디데이 날짜 카운팅 효과 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);