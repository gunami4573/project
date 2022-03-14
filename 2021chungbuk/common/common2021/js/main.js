'use strict';
try {
    this.mode = '';

    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    if(jQuery) {
        //$ 중복방지
        (function($) {

            var $window = $(window),
                $document = $(document),
                $html = $('html'),
                $body = $('body');

            $(function() {
                $window.on('responsive', function(event) {
                    //태블릿 || 모바일
                    if(event.state == 'tablet' || event.state == 'phone') {
                        
                    };
                });

                //하단 배너 모음 시작
                var $bannerSlide = $('.banner .banner_list'),
                    bannerItemLength = $bannerSlide.find('.banner_item').length;
                $('.banner .total').text(bannerItemLength);
                $bannerSlide.slick({
                    //기본
                    autoplay : true,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 8,
                    slidesToScroll: 1,
                    variableWidth: true,
                    infinite: true,
                    arrows: true,
                    prevArrow : $('.banner .banner_control .prev'),
                    nextArrow : $('.banner .banner_control .next'),
                    dots : false,
                    //추가옵션
                    autoArrow : $('.banner .banner_control .auto'),
                    isRunOnLowIE : false,
                    pauseOnArrowClick : true,
                    pauseOnDirectionKeyPush : true,
                    pauseOnSwipe : true,
                    pauseOnDotsClick : true,
                    pauseText : '정지',
                    playText : '재생',
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe:true,
                                draggable:true
                            }
                        }]
                });
                //하단 배너 모음 끝
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}