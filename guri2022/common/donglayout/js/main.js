(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function(){
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if(LayoutType=='normal'){
            if(scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        } else if(LayoutType=='visualtype'){
            if(scrollTop > ContainerOffset.top-150) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        }
        $window.on('scroll', function(event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if(LayoutType=='normal'){
                if(scrollTop > wrapperOffset.top) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            } else if(LayoutType=='visualtype'){
                if(scrollTop > ContainerOffset.top-150) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            }
        });

        //여기서 부터 코드 작성

        //메인비주얼 사진 슬라이드 영역 시작
        var $MainVisual = $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_list_wrap .visual_list');
        $MainVisual.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 2500,
            speed : 1000,
            dots : false,
            swipe : true,
            swipeToSlide: true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            pauseOnHover : true,
            pauseOnArrowClick : true,
            infinite: true,
            arrows : true,
            prevArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_control_box .prev'),
            nextArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_control_box .next'),
            autoArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_control_box .auto'),
            pauseText : '정지',
            playText : '재생',
            responsive : []
        });
        //메인비주얼 사진 슬라이드 영역 끝

        //메인비주얼 지도 링크 영역 시작
        $('.map_area_wrap .map_img_box img[usemap]').rwdImageMaps();//이미지맵 반응형 실행(반응형일때 사용)
        var ActiveAreaIndex = $('.map_area_wrap .map_img_box #Map area.active').index() + 1,
            ActiveAreaAlt = $('.map_area_wrap .map_img_box #Map area.active').attr('alt');

        $('.map_area_wrap .map_img_box #Map area').hover(function(){
            var AreaIndex = $(this).index(),
                ImgIndex = AreaIndex + 1,
                AreaAlt = $('.map_area_wrap .map_img_box #Map area').eq(AreaIndex).attr('alt');
            $('.mapImg').attr('src', './images/main/dong_map_img'+ImgIndex+'.png');
            $('.mapImg').attr('alt', '구리시 지도 '+AreaAlt+' 선택됨');
        }, function(){
            $('.mapImg').attr('src', './images/main/dong_map_img'+ActiveAreaIndex+'.png');
            $('.mapImg').attr('alt', '구리시 지도 '+ActiveAreaAlt+' 선택됨');
        });
        //메인비주얼 지도 링크 영역 끝

        //빠른민원서비스 슬라이드 영역 시작
        var $QuickSlide = $('.quick_area .quick_area_wrap .quick_slide_wrap .quick_slide_list');
        $QuickSlide.slick({
            //기본
            autoplay : false,
            arrows : false,
            dots : false,
            swipe : false,
            swipeToSlide: false,
            draggable : false,
            slidesToShow : 6,
            slidesToScroll : 1,
            variableWidth : false,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 5,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 951,
                settings : {
                    slidesToShow : 5,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 851,
                settings : {
                    slidesToShow : 4,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 741,
                settings : {
                    slidesToShow : 3,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 6,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 601,
                settings : {
                    slidesToShow : 5,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 491,
                settings : {
                    slidesToShow : 4,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 391,
                settings : {
                    slidesToShow : 3,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide: true,
                    draggable : true,
                    variableWidth : true
                }
            }]
        });
        //빠른민원서비스 슬라이드 영역 끝

        //게시판 탭, 슬라이드 영역 시작
        var $TabSlide = $('.board .board_wrap .board_tab_wrap .tab_slide_wrap .tab_slide');
        $TabSlide.each(function(){
           var $TabSlideList = $(this).find('.tab_slide_list'),
               $TabSlideControlBox = $(this).find('.tab_slide_control_box');
            $TabSlideList.slick({
                autoplay : false,
                arrows : true,
                dots : false,
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                prevArrow : $TabSlideControlBox.find('.prev'),
                nextArrow : $TabSlideControlBox.find('.next'),
                current : $TabSlideControlBox.find('.current'),
                customState : function(state) {
                    //현재 슬라이드 위치가 10보다 작을 때
                    if(state.current < 10) {
                        state.current = '0' + state.current;
                    }
                    return state;
                },
                swipe : true,
                swipeToSlide: true,
                draggable : true,
                variableWidth : false,
                responsive: [{
                    breakpoint : 1401,
                    settings : {
                        slidesToShow : 2
                    }
                },{
                    breakpoint : 641,
                    settings : {
                        variableWidth : true,
                        slidesToShow : 2
                    }
                },{
                    breakpoint : 461,
                    settings : {
                        variableWidth : true,
                        slidesToShow : 1
                    }
                }]
            });
        });
        $('.board .board_wrap .board_tab_wrap .tab_box_wrap .tab_list .tab_item .tab_btn').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.tab_item'),
                IsActive = $MyItem.is('.active'),
                MyIndex = $MyItem.index(),
                $OtherItem = $('.board .board_wrap .board_tab_wrap .tab_box_wrap .tab_list .tab_item').not($MyItem),
                $OtherBtn = $OtherItem.find('.tab_btn'),
                $TabSlideWrap = $('.board .board_wrap .board_tab_wrap .tab_slide_wrap'),
                $TabSlide = $TabSlideWrap.find('.tab_slide').eq(MyIndex),
                $MySlide = $TabSlide.find('.tab_slide_list'),
                $OtherTabSlide = $TabSlideWrap.find('.tab_slide').not($TabSlide);
            if(!IsActive){
                $OtherItem.removeClass('active');
                $OtherBtn.removeAttr('title');
                $OtherTabSlide.removeClass('active');
                $TabSlide.addClass('active');
                $MyItem.addClass('active');
                $this.attr('title', '선택됨');
                $MySlide.slick('setPosition');
            }
        });
        //게시판 탭, 슬라이드 영역 끝

        //팝업존 슬라이드 영역 시작
        var $PopUpSlide = $('.popup .popup_wrap .popup_slide_wrap .popup_slide_box .popup_slide_list'),
            PopUpTotal = $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .count_box .total'),
            PopUpCurrent = $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .count_box .current');
        $PopUpSlide.slick({
            //기본
            autoplay : true,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            prevArrow : $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .btn_box .prev'),
            nextArrow : $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .btn_box .next'),
            autoArrow : $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .btn_box .auto'),
            pauseText : '정지',
            playText : '재생',
            total : PopUpTotal,
            current : PopUpCurrent,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = state.total;
                }
                return state;
            },
            pauseOnArrowClick : true,
            responsive : []
        });
        //팝업존 슬라이드 영역 끝

        //행정복지센터 프로그램 영역 시작
        var $WelFareSlideList = $('.welfare .welfare_wrap .welfare_slide_wrap .welfare_slide_list');
        $WelFareSlideList.slick({
            //기본
            autoplay : false,
            speed : 1000,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            dots : true,
            appendDots: $('.welfare .welfare_wrap .welfare_slide_wrap .welfare_slide_dot_box'),
            dotsClass:'slick-dots clearfix',
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).attr('data-thum');
                return '<button type="button"><span>'+(i + 1)+'번 보기</span></button>';
            },
            slidesToShow : 4,
            slidesToScroll : 4,
            variableWidth: false,
            pauseOnHover: true,
            infinite: false,
            prevArrow : $('.welfare .welfare_wrap .welfare_slide_wrap .welfare_slide_control_box .prev'),
            nextArrow : $('.welfare .welfare_wrap .welfare_slide_wrap .welfare_slide_control_box .next'),
            pauseOnArrowClick : true,
            responsive : [{
                breakpoint : 1401,
                settings : {
                    slidesToShow : 3,
                    slidesToScroll : 3
                }
            },{
                breakpoint : 641,
                settings : {
                    speed : 800,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow : 2,
                    slidesToScroll : 1,
                    infinite: true,
                    variableWidth: true
                }
            },{
                breakpoint : 465,
                settings : {
                    speed : 800,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    infinite: true,
                    variableWidth: true
                }
            }]
        });
        //행정복지센터 프로그램 영역 끝


        $window.on('screen:phone', function(event) {

        });

    });
})(jQuery);