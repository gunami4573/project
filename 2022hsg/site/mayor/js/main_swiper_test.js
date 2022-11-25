(function ($) {
    'use strict';
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {
        $document.on('ready', function (event) {
            $screen({
                state: [{
                    name: 'mayor_wide',
                    horizontal: {
                        from: 9999,
                        to: 1651
                    }
                }, {
                    name: 'mayor_tablet',
                    horizontal: {
                        from: 1000,
                        to: 641
                    }
                }, {
                    name: 'mayor_phone',
                    horizontal: {
                        from: 640,
                        to: 0
                    }
                }]
            });
        });
        //여기서부터 코드 작성해주세요

        var $PromiseSwiper,
            Wview = 'auto',
            Tview = 'auto',
            Mview = 2;
        function SetSwiper(num){
            $PromiseSwiper = new Swiper('.promise .promise_wrap .promise_swiper_wrap .swiper-container', {
                freeMode : false,  //터치 밀었을 떄 하나씩 말고 휙 넘어가는 여부
                slidesPerView : num,  //slick 에서 사용하는 variableWidth 처럼 사용하기 위함, width 지정할 것
                spaceBetween : 0,  //오른쪽 마진값(px), 0으로 놓을 시 css 지정 가능
                touchRatio : true,  //드래그 사용여부
                resistance : true, //슬라이드 터치 저항 여부
                autoplay : {
                    delay : 5000  //자동 넘어가는 시간
                },
                speed : 800,  //넘어가는 속도
                loop : true,  //무한루프
                navigation : {
                    prevEl : '.promise .promise_wrap .swiper_btn_box .swiper_btn.prev',
                    nextEl : '.promise .promise_wrap .swiper_btn_box .swiper_btn.next'
                },
                pagination : {
                    el : '.promise .promise_wrap .swiper_btn_box .number_box',
                    type : 'custom',
                    renderCustom : function (swiper, current, total) {
                        function ZeroOver(number) {
                            return (number < 10) ? '0' + number.toString() : number.toString();
                        }
                        $('.promise .promise_wrap .swiper_btn_box .number_box .current').text(ZeroOver(current));//current 앞에 0 필요시
                        $('.promise .promise_wrap .swiper_btn_box .number_box .total').text(ZeroOver(total));  //total 앞에 0 필요시
                        $('.promise .promise_wrap .swiper_btn_box .progressbar .gauge').css('width', (current / total) * 100 + '%');
                    }
                }
            });
        }
        var $SwiperContainer = $('.swiper-container'),
            IsSwiperContainer = $SwiperContainer.is('.swiper-container-horizontal');
        //1001px 까지
        $window.on('screen:mayor_wide', function(event) {
            if(IsSwiperContainer){
                $PromiseSwiper.destroy(); // 스와이퍼 깨기
            }
            SetSwiper(Wview);
        });
        //1000px 부터
        $window.on('screen:mayor_tablet', function(event) {
            if(IsSwiperContainer){
                $PromiseSwiper.destroy(); // 스와이퍼 깨기
            }
            SetSwiper(Tview);
        });
        //640px 부터
        $window.on('screen:mayor_phone', function (event) {
            if(IsSwiperContainer){
                $PromiseSwiper.destroy(); // 스와이퍼 깨기
            }
            SetSwiper(Mview);
        });

    });
})(jQuery);