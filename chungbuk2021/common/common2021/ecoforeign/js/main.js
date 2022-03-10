'use strict';

function splittingTextDelay (object, speed, delay_speed) {
    var splitLength = $(object).find('.char').length;
    for (var i=0; i<splitLength; i++) {
        if (  $(object).data('css-property') == 'animation' ) {
            $(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
        }else if( $(object).data('css-property') == 'transition' ) {
            $(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
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
                $window.on('responsive', function(event) {
                    if(event.state == 'wide' || event.state == 'web') {

                    }else if(event.state == 'tablet') {

                    }else if(event.state == 'phone') {
                        $('.search_panel').hide();
                    };
                });


                //여기서부터 코드 작성해주세요
                //비주얼 텍스트 에니메이션 플러그인 시작
                Splitting({
                    target: '[data-splitting]',
                    by: 'chars',
                    key: null
                });
                var $splittingTxt = $('.word-split');
                $($splittingTxt).each(function  () {
                    splittingTextDelay($(this),$(this).data('speed'),$(this).data('speed-delay'));
                });
                //비주얼 텍스트 에니메이션 플러그인 끝


                //메인비주얼 슬라이드 시작
                var $MainVisualSlide = $('.rowgroup1 .main_visual_total .visual_total_wrap .visual_list');
                $MainVisualSlide.slick({
                    autoplay : true,
                    dots : true,
                    appendDots: $('.rowgroup1 .main_visual_total .visual_total_wrap .visual_nav_box'),
                    dotsClass:'slick-dots clearfix',
                    customPaging : function(slider, i) {
                        var thumb = $(slider.$slides[i]).attr('data-thum');
                        return '<button type="button"><span>'+(i + 1)+'번(slide count) 보기(look)</span></button>';
                    },
                    autoplaySpeed : 4000,
                    fade : true,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    infinite : true,
                    prevArrow : $('.rowgroup1 .main_visual_total .visual_total_wrap .visual_list_btn_box .prev'),
                    nextArrow : $('.rowgroup1 .main_visual_total .visual_total_wrap .visual_list_btn_box .next'),
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth: false, //width를 css로 제어
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    autoArrow : $('.rowgroup1 .main_visual_total .visual_total_wrap .visual_nav_box .auto_wrap .auto'),
                    pauseOnArrowClick : true,
                    pauseText : '정지',
                    playText : '재생',
                    responsive : []
                });
                //메인비주얼 슬라이드 끝


                //에어로폴리스, 바이오밸리 소개 슬라이드 시작
                var $MapImgSlide = $('.rowgroup2 .eco_info_total .map_slide_box .map_total_slide .map_img_slide .img_slide_list');
                var $MapTextSlide = $('.rowgroup2 .eco_info_total .map_slide_box .map_total_slide .map_text_slide .text_slide_list');
                $MapImgSlide.slick({
                    autoplay : false,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 1,
                    slidesToScroll: 1,
                    speed : 1000,
                    fade: true,
                    infinite: true,
                    dots : false,
                    prevArrow : $('.rowgroup2 .eco_info_total .map_slide_box .map_total_slide .map_img_slide .img_slide_btn_box .btn_wrap .prev'),
                    nextArrow : $('.rowgroup2 .eco_info_total .map_slide_box .map_total_slide .map_img_slide .img_slide_btn_box .btn_wrap .next'),
                    asNavFor : $MapTextSlide,
                    variableWidth: false,
                    responsive : [{
                        breakpoint : 641,
                        settings : {
                            speed : 100,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true
                        }
                    }]
                });
                $MapTextSlide.slick({
                    autoplay : false,
                    swipe : false,
                    draggable : false,
                    slidesToShow : 1,
                    slidesToScroll: 1,
                    speed : 1000,
                    fade: true,
                    infinite: true,
                    dots : true,
                    appendDots: $('.rowgroup2 .eco_info_total .eco_info_wrap .eco_map_box .map_btn_box'),
                    dotsClass:'slick-dots clearfix',
                    customPaging : function(slider, i) {
                        var text = $(slider.$slides[i]).find('.text_box .top_title .info_title').text();
                        return  '<div class="map_area_box num'+i+'">' +
                                    '<button type="button" class="map_btn">' +
                                        '<span class="btn_text_wrap">'+text+'</span>' +
                                    '</button>' +
                                    '<span class="map_hidden">' +
                                        '<span class="line_box">' +
                                            '<i class="line type1"></i>' +
                                            '<i class="line type2"></i>' +
                                            '<i class="line type3"></i>' +
                                            '<i class="circle"></i>' +
                                        '</span>' +
                                        '<span class="hidden_text">'+text+'</span>' +
                                    '</span>' +
                                '</div>';
                    },
                    arrows : false,
                    asNavFor : $MapImgSlide,
                    responsive : [{
                        breakpoint : 641,
                        settings : {
                            speed : 100,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true
                        }
                    }]
                });
                var $SlideHidden = $('.rowgroup2 .eco_info_total .map_slide_box .map_total_slide .map_img_slide .img_slide_hidden'),
                    $SlideHiddenImgWrap = $SlideHidden.find('.img_wrap');
                $MapImgSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    var $EcoInfoTotal = $('.rowgroup2 .eco_info_total');

                    $EcoInfoTotal.attr('data-active', nextSlide);
                    $SlideHiddenImgWrap.eq(currentSlide).addClass('active').siblings().removeClass('active');
                });
                //에어로폴리스, 바이오밸리 소개 슬라이드 끝


                //경제자유구역청 소개 링크 슬라이드 시작
                var $EcoLinkListSlide = $('.rowgroup3 .link_list_total .link_list_wrap .link_list');
                $EcoLinkListSlide.slick({
                    autoplay : false,
                    dots : false,
                    slidesToShow : 6,
                    slidesToScroll : 1,
                    infinite : false,
                    swipe : false,
                    swipeToSlide : false,
                    draggable : false,
                    variableWidth: true, //width를 css로 제어
                    responsive : [{
                        breakpoint : 641,
                        settings : {
                            slidesToShow : 5,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            infinite : true
                        }
                    },
                    {
                        breakpoint : 451,
                        settings : {
                            slidesToShow : 4,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            infinite : true
                        }
                    },
                    {
                        breakpoint : 361,
                        settings : {
                            slidesToShow : 3,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            infinite : true
                        }
                    }]
                });
                //경제자유구역청 소개 링크 슬라이드 끝


                //게시판 탭 슬라이드 시작
                //탭부분 시작
                function tabContent (tabCntWrap, tabButton, tabCnt) {
                    var $tabWrap = $(tabCntWrap),
                        $tabButton = $tabWrap.find(tabButton),
                        $tabContent = $(tabCnt),
                        $tabWrapfirst = $tabWrap.find('li').eq(0);

                    $($tabWrapfirst).addClass('active');
                    $($tabWrapfirst).find(tabButton).addClass('active').attr('title','선택됨');
                    $($tabWrapfirst).siblings().find(tabButton).attr('title','선택안됨');
                    $($tabWrapfirst).find(tabCnt).css({"display":"block"}).addClass('active');

                    $tabButton.on("click", function(){
                        $tabWrap.find(".active").removeClass("active");
                        $tabWrap.find($tabContent).stop().fadeOut(500);
                        $(this).addClass("active").attr('title','선택됨');
                        $(this).parents('li').siblings().find(tabButton).attr('title','선택안됨');
                        $(this).parent().next($tabContent).addClass("active").stop().fadeIn(500);
                        $(this).parents('li').addClass("active");
                        $(this).parents('li').siblings().removeClass("active");

                        if(mode == 'mobile'){
                            $tabWrap.find($tabContent).stop().fadeOut(100);
                            $(this).parent().next($tabContent).addClass("active").stop().fadeIn(100);
                        }
                    });
                }
                tabContent('.board_list','.board_tab_button','.tabcontent');
                //탭부분 끝

                //슬라이드부분 시작
                function boardSlick(){
                    var $board = $('.board .board_list li');
                    $board.each(function(index, element){
                        var boardtotal = $(element).find('.board_control .countbox .total'),
                            boardcurrent = $(element).find('.board_control .countbox .current'),
                            $borardCont = $(element).find('.board_content'),
                            $boardbtn = $(element).find('.board_tab_button');
                        $borardCont.slick({
                            //기본
                            autoplay : false,
                            dots : false,
                            swipe : true,
                            swipeToSlide : true,
                            arrows : true,
                            draggable : true,
                            slidesToShow : 4,
                            slidesToScroll : 1,
                            variableWidth : false,
                            infinite : true,
                            responsive : [{
                                breakpoint : 1401,
                                settings : {
                                    swipe : true,
                                    swipeToSlide : true,
                                    slidesToShow : 3
                                }
                            },
                            {
                                breakpoint : 1001,
                                settings : {
                                    swipe : true,
                                    swipeToSlide : true,
                                    slidesToShow : 3
                                }
                            },
                            {
                                breakpoint : 801,
                                settings : {
                                    swipe : true,
                                    swipeToSlide : true,
                                    slidesToShow : 2
                                }
                            },
                            {
                                breakpoint : 641,
                                settings : {
                                    infinite : true,
                                    swipeToSlide : true,
                                    slidesToShow : 4,
                                    slidesToScroll : 1,
                                    vertical : true,
                                    verticalSwiping : true,

                                }
                            }]
                        });
                        $boardbtn.on('click', function(){
                            $borardCont.slick('setPosition');
                        });
                    });
                }
                boardSlick();
                //슬라이드부분 끝
                //게시판 탭 슬라이드 끝

                $window.on('screen:tablet screen:phone', function(event) {
                    $borardCont
                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}