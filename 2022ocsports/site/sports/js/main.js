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

        //임시 디데이 날짜 구하기 시작
        function counter(){
            var Dday = new Date("Aug 25, 2022").getTime(), //디데이
                nowtime = new Date(), //현재 날짜 가져오기
                Distance = Dday - nowtime,
                LimitDay = Math.floor(Distance / (1000 * 60 * 60 * 24)),
                RealDay = LimitDay+1;
            $('.gunami_time .d_day').empty().html(Math.abs(RealDay));
            $('.gunami_time .d_day').attr('data-count', Math.abs(RealDay));

            console.log('현재시간:',nowtime);
            console.log('남은일수:',RealDay);
            if(LimitDay > -1){
                $('.gunami_time').addClass('prev');
                $('.gunami_time .plus_minus').empty().html('D디데이 이전 -');
            }
            else if(LimitDay === -1){
                $('.gunami_time').addClass('today');
                $('.gunami_time .plus_minus').empty().html('D디데이 당일 -');
            }
            else{
                $('.gunami_time').addClass('next');
                $('.gunami_time .plus_minus').empty().html('D디데이 이후 +');
            }
        }
        counter();
        //임시 디데이 구하기 끝

        //임시 디데이 날짜 카운팅 효과 시작
        $('.gunami_time .d_day').each(function(){
            var $this = $(this),
                end = $this.attr('data-count');
            console.log('data-count:',end);
            $({start:0}).animate({
                start : end
            },{
                duration:1200,
                step : function(){
                    if(end > 10){
                        $this.text(Math.floor(this.start));
                    }
                    else{
                        $this.text('0'+Math.floor(this.start));
                    }
                },
                complete : function(){
                    if(end > 10){
                        $this.text(this.start);
                    }
                    else{
                        $this.text('0'+this.start);
                    }
                }
            });

        });
        //임시 디데이 날짜 카운팅 효과 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);