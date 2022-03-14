'use strict';

function splittingTextDelay (object, speed, delay_speed) {
    var splitLength = $(object).find('.char').length;
    for (var i=0; i < splitLength; i++) {
        if($(object).data('css-property') == 'animation') {
            $(object).find('.char').eq(i).css('animation-delay', delay_speed+(i*speed)+'s');
        }
        else if($(object).data('css-property') == 'transition') {
            $(object).find('.char').eq(i).css('transition-delay', delay_speed+(i*speed)+'s');
        }
    }
}

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;
    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);
            $(function() {
                $window.on('screen:wide screen:web', function(event) {
                    window.mode = 'pc';
                });

                $window.on('screen:tablet screen:phone', function(event) {
                    $('.search_panel').hide();
                    window.mode = 'mobile';
                });

                $('.visual_list a[href="#"]').click(function(e) {
                    e.preventDefault();
                });

                //여기서부터 코드 작성해주세요
                //메인비주얼 텍스트 효과 시작
                Splitting({
                    /* target: String selector, Element, Array of Elements, or NodeList */
                    target: '[data-splitting]',
                    /* by: String of the plugin name */
                    by: 'chars',
                    /* key: Optional String to prefix the CSS variables */
                    key: null
                });
                var $splittingTxt = $('.word-split');
                $($splittingTxt).each(function() {
                    splittingTextDelay($(this), $(this).data('speed'),$(this).data('speed-delay'));
                });
                //메인비주얼 텍스트 효과 끝
                
                //메인비주얼 슬라이드 시작
                var $MainVisualBox = $('.main_visual'),
                    $MainVisual = $('.main_visual .main_visual_box .main_visual_list'),
                    viaualtotal = $('.main_visual .main_visual_box .countbox .total'),
                    viaualcurrent = $('.main_visual .main_visual_box .countbox .current');

                $MainVisual.on('init', function(event, slick, currentSlide){
                    var $currentslide = $(slick.$slides[0]);
                    $MainVisualBox.addClass('active');
                });
                $MainVisual.slick({
                    //기본
                    autoplay : true,
                    dots : false,
                    autoplaySpeed : 4000,
                    speed : 1000,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    variableWidth: false,
                    pauseOnHover: false,    //슬릭영역 마우스 오버시 일시정지 여부
                    infinite: true,
                    prevArrow : $('.main_visual .main_visual_box .visual_control .prev'),
                    nextArrow : $('.main_visual .main_visual_box .visual_control .next'),
                    total : viaualtotal,
                    current : viaualcurrent,
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
                    autoArrow : $('.main_visual .main_visual_box .countbox .auto'),
                    pauseOnArrowClick : true,
                    pauseText : '정지',
                    playText : '재생',
                    fade : true,
                    responsive : [
                        {
                            breakpoint : 1001,
                            settings : {
                                swipe : true,
                                draggable : true,
                            }
                        },
                        {
                            breakpoint : 641,
                            settings : {
                                swipe : true,
                                draggable : true,
                                total : false,
                                current : false,
                                customState : false,
                                autoArrow : false,
                                prevArrow : false,
                                nextArrow : false
                            }
                        }]
                });



                $MainVisual.on('beforeChange', function(event, slick, currentSlide) {
                    var $currentslide = $(slick.$slides[currentSlide]);
                    $MainVisualBox.removeClass('active');
                    setTimeout(function(){
                        $MainVisualBox.addClass('active');
                    }, 1000);
                });

                var $AutoBtn = $('.main_visual .main_visual_box .countbox .auto');
                $AutoBtn.on('click', function(){
                   var $this = $(this),
                       $StopBar = $('.main_visual .main_visual_box .countbox .bar_wrap .pro-bar'),
                       IsPlay = $this.is('.slick-pause');
                   if(IsPlay){
                       $StopBar.css('animation-play-state', 'running');
                   }
                   else{
                       $StopBar.css('animation-play-state', 'paused');
                   }
                });
                //메인비주얼 슬라이드 끝


                //News and Press 슬라이드 시작
                var $BoardSlide = $('.board_total .board_slide');
                $BoardSlide.slick({
                    //기본
                    autoplay : true,
                    dots : false,
                    fade : true,
                    autoplaySpeed : 1500,
                    speed : 800,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    infinite: true,
                    prevArrow : $('.board_total .board_slide_control .prev'),
                    nextArrow : $('.board_total .board_slide_control .next'),
                    autoArrow : $('.board_total .board_slide_control .auto'),
                    pauseOnArrowClick : true,
                    pauseText : '정지',
                    playText : '재생'
                });
                /*
                $window.on('screen:wide screen:web', function(event) {
                    $BoardSlide.slick('setPosition');
                });
                $window.on('screen:tablet screen:phone', function(event) {
                    $BoardSlide.slick('setPosition');
                });
                */
                var $BoardSlideMobile = $('.board_total .mobile');
                $BoardSlideMobile.slick({
                    //기본
                    autoplay : true,
                    dots : false,
                    fade : true,
                    autoplaySpeed : 1500,
                    speed : 800,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    infinite: true,
                    prevArrow : $('.board_total .mobile_control .prev'),
                    nextArrow : $('.board_total .mobile_control .next'),
                    autoArrow : $('.board_total .mobile_control .auto'),
                    pauseOnArrowClick : true,
                    pauseText : '정지',
                    playText : '재생'
                });
                //News and Press 슬라이드 끝


                //R and D 클러스터 슬라이드 시작
                var $Cluster = $('.cluster .cluster_inner .cluster_slide_list');
                $Cluster.slick({
                    //기본
                    autoplay : false,
                    dots : false,
                    autoplaySpeed : 1000,
                    speed : 1000,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 3,
                    slidesToScroll : 1,
                    variableWidth: true,
                    pauseOnHover: true,    //슬릭영역 마우스 오버시 일시정지 여부
                    infinite: true,
                    prevArrow : $('.cluster .cluster_inner .cluster_slide_control .prev'),
                    nextArrow : $('.cluster .cluster_inner .cluster_slide_control .next'),
                    pauseOnArrowClick : true,
                    responsive : [
                        {
                            breakpoint : 1201,
                            settings : {
                                slidesToShow : 2,
                                swipe : true,
                                draggable : true
                            }
                        },
                        {
                            breakpoint : 1001,
                            settings : {
                                slidesToShow : 2,
                                swipe : true,
                                draggable : true
                            }
                        },
                        {
                            breakpoint : 754,
                            settings : {
                                slidesToShow : 1,
                                swipe : true,
                                draggable : true
                            }
                        },
                        {
                            breakpoint : 641,
                            settings : {
                                slidesToShow : 3,
                                swipe : true,
                                draggable : true
                            }
                        },
                        {
                            breakpoint : 601,
                            settings : {
                                slidesToShow : 2,
                                swipe : true,
                                draggable : true
                            }
                        },
                        {
                            breakpoint : 381,
                            settings : {
                                slidesToShow : 1,
                                swipe : true,
                                draggable : true
                            }
                        }]
                });
                //R and D 클러스터 슬라이드 끝

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
