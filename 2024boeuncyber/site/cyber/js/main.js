(function ($) {

    //비주얼 svg 프로그레스 시작
    var myAnim;
    var myTextAnim;
    var Nowprogress = 0;
    function Loading() {
        Nowprogress = 0;
        var count = $('#count');
        myTextAnim = $({Counter: 0}).animate({Counter: 100}, {
            duration: 5900,
            easing: 'linear',
            step: function () {
                count.text(Math.ceil(this.Counter) + "%");
                Nowprogress = Math.ceil(this.Counter);
            }
        });
        var s = Snap('#animated');
        var progress = s.select('#progress');
        progress.attr({strokeDasharray: '0, 341.4'});
        myAnim = Snap.animate(0, 341.4, function (value) {
            progress.attr({'stroke-dasharray': value + ',341.4'});
        }, 5900);
    }
    function Loadingpause() {
        myAnim.pause();
        myTextAnim.stop(true, false);
        Nowprogress = myTextAnim[0].Counter;
        $('#count').text(myTextAnim[0].Counter + '%');
    }
    function Loadingresume() {
        var Nowduration = 30 * (100 - Nowprogress);
        var count = $('#count');
        myTextAnim = $({Counter: Nowprogress}).animate({Counter: 100}, {
            duration: Nowduration,
            easing: 'linear',
            step: function () {
                count.text(Math.ceil(this.Counter) + "%");
            }
        });
        var s = Snap('#animated');
        var progress = s.select('#progress');
        var NowDegree = (341.4 / 100) * Nowprogress;
        progress.attr({strokeDasharray: NowDegree + ', 341.4'});
        myAnim = Snap.animate(NowDegree, 341.4, function (value) {
            progress.attr({'stroke-dasharray': value + ',341.4'});
        }, Nowduration, function () {

        });
    }
    //비주얼 svg 프로그레스 끝

    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //여기서부터 코드 작성해주세요

        //스타트 애니메이션 클레스 시작
        setTimeout(function(){
            $html.addClass('start_ani');
        }, 1);
        //스타트 애니메이션 클레스 종료

        //비주얼 이미지 슬라이드 시작
        var $visualImgList = $('.visual .img_s_list'),
            $visualAuto = $('.visual .img_s_control .svg_wrap .auto');
        $visualImgList.on('init', function(event, slick, currentSlide, nextSlide) {
            Loading();
        });
        $visualImgList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var IsAutoplay = $visualAuto.is('.slick-pause');
            if(IsAutoplay){
                Loading();
            }
            //이미지의 url 읽은 후 button.auto background 깔기 시작
            var $nextSlide = $(slick.$slides[nextSlide]);
            var nextBackgroundImageUrl = $nextSlide.find('.view_img').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
            function siteStrings(input) {
                var regex = /\/site\/.*/g;
                var matches = input.match(regex);

                return matches || [];
            }
            var urlText = siteStrings(nextBackgroundImageUrl);
            $visualAuto.attr('style', 'background-image:url(../..'+urlText+')');
            $visualAuto.removeClass('active_ani');
            setTimeout(function(){
                $visualAuto.addClass('active_ani');
            }, 100);
            //이미지의 url 읽은 후 button.auto background 깔기 끝
        });
        $visualImgList.slick({
            autoplay : true,
            autoplaySpeed : 5800,
            speed : 3500,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            autoArrow : $visualAuto,
            pauseText : '정지',
            playText : '재생',
            zIndex : 1,
            fade : true,
            pauseOnHover : false,
            pauseOnFocus : false,
            pauseOnArrowClick : false,
            pauseOnSwipe : false,
            pauseOnClick : false,
            pauseOnDotsHover : false,
        });
        $visualAuto.on('click', function(){
            var $this = $(this),
                IsPlaying = $this.is('.slick-play');
            if(IsPlaying){
                Loadingpause();
            }else{
                Loadingresume();
            }
        });
        //비주얼 이미지 슬라이드 종료

        //퀵 메뉴 시작
        var donutCount = 1;
        var $donut = $('.visual .quick_inner .donut');
        $('.visual .quick_inner button.quick_layer_btn').on('click', function(){
            var $this = $(this),
                $quickInner = $this.parent('.quick_inner'),
                IsActive = $quickInner.is('.active');
            if(!IsActive){
                $this.attr('title', '퀵 메뉴 레이어 닫기');
                $quickInner.addClass('active');
            }
            else{
                $this.attr('title', '퀵 메뉴 레이어 열기');
                $quickInner.removeClass('active');
            }
            donutCount++;
            $donut.css({'transform':'rotate(calc(-180deg * '+donutCount+'))'});
        });
        //퀵 메뉴 종료

        //1000px 이하 모바일 회원증 레이어 시작
        $(document).on('click', 'button.member_open_btn', function(){
            var $this = $(this),
                $memberFixClone = $this.siblings('.member_fix').clone();
            $('#wrapper').before($memberFixClone);
            $('body').find('> .member_fix').addClass('active');
            setTimeout(function(){
                $('html, body').addClass('hidden');
                $('body').find('> .member_fix').addClass('active_ani');
            }, 1);
        });
        $(document).on('click', 'button.member_close_btn', function(){
            var $this = $(this),
                $memberFixClone = $('body').find('> .member_fix');
            $('html, body').removeClass('hidden');
            $memberFixClone.addClass('add');
            $memberFixClone.fadeOut(1500, function(){
                $(this).remove();
            });
        });
        //1000px 이하 모바일 회원증 레이어 종료
        
        //1000px 이하 모바일 회원증 가족회원 확인 시작
        $(document).on('click', 'button.family_open_btn', function(){
            var $this = $(this),
                $familyInner = $this.siblings('.family_inner'),
                $familyBox = $this.parent('.family_box'),
                IsActive = $familyBox.is('.active');
            if(!IsActive){
                $this.attr('title', '가족 회원 리스트 닫기');
                $familyBox.addClass('active');
                $familyInner.slideDown(500);
            }
            else{
                $this.attr('title', '가족 회원 리스트 열기');
                $familyBox.removeClass('active');
                $familyInner.slideUp(500);
            }
        });
        //1000px 이하 모바일 회원증 가족회원 확인 종료

        //관광지 데코 tilt 시작
        $window.on('screen:wide', function (event) {
            var $tourEleDeco = $('.tour .tour_ele_deco .ele_deco .deco');
            $tourEleDeco.each(function(){
                var $this = $(this);
                $this.tilt({
                    maxTilt : 120,
                    perspective : 1200,
                    scale : 1.2,
                    speed : 1500,
                    disableAxis : null,
                    reset : true,
                    glare : false,
                    maxGlare : 1,
                    easing : 'cubic-bezier(.19, 1, .22, 1)'
                });
            });
        });
        //관광지 데코 tilt 종료

        //관광지 슬라이드 및 탭 시작
        var $tourBookSlideItem = $('.tour .book_s_list .book_s_item');
        $tourBookSlideItem.each(function(){
            var $this = $(this),
                $bookSlideList = $this.find('.slide_wrap .slide_list'),
                $bookSlideItem = $bookSlideList.find('.slide_item'),
                bookSlideItemTourIndex = $bookSlideItem.parents('.book_s_item').attr('data-tour'),
                $bookSlidePrev = $this.find('.slide_wrap .slide_control .control_inner .prev'),
                $bookSlideNext = $this.find('.slide_wrap .slide_control .control_inner .next'),
                $bookSlideCurrent = $this.find('.slide_wrap .slide_control .control_inner .count .current'),
                $bookSlideTotal = $this.find('.slide_wrap .slide_control .control_inner .count .total');
            for(var i=1; i < $bookSlideItem.length+1; i++){
                $('.map_marker_item[data-tour="'+bookSlideItemTourIndex+'"]').append('' +
                    '<button type="button" data-marker="'+bookSlideItemTourIndex+'-'+i+'" class="marker_btn">' +
                        '<em class="btn_title">'+$bookSlideList.find('.slide_item[data-marker="'+bookSlideItemTourIndex+'-'+i+'"]').find('.title').text()+' 보기</em>' +
                    '</button>    <!--//marker_btn-->' +
                '');
            }
            $('.marker_btn:first-child').attr('title', '선택됨').addClass('active');
            $bookSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                var $nextSlide = $(slick.$slides[nextSlide]);
                $('.marker_btn[data-marker="'+$nextSlide.find('.slide_item').attr('data-marker')+'"]').siblings('.marker_btn').removeClass('active').removeAttr('title');
                $('.marker_btn[data-marker="'+$nextSlide.find('.slide_item').attr('data-marker')+'"]').addClass('active').attr('title', '선택됨');
            });
            $bookSlideList.slick({
                autoplay : false,
                speed : 500,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : false,
                arrows : true,
                prevArrow : $bookSlidePrev,
                nextArrow : $bookSlideNext,
                current : $bookSlideCurrent,
                total : $bookSlideTotal,
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
                zIndex : 1,
                fade : false
            });
        });
        $('.tour .book_t_list .book_t_item button.book_t_btn').on('click', function(){
            var $this = $(this),
                $myBookItem = $this.parent('.book_t_item'),
                IsActive = $myBookItem.is('.active'),
                myBookData = $myBookItem.attr('data-tour');
            if(!IsActive){
                $('.tour .book_t_list .book_t_item').removeClass('active active_ani');
                $('.tour .book_t_list .book_t_item button.book_t_btn').removeAttr('title');
                $('.tour .book_s_list .book_s_item').removeClass('active active_ani');
                $('.tour .map_marker_list .map_marker_item').removeClass('active active_ani');
                $('.tour .map_bg').removeClass('active_ani');

                $myBookItem.addClass('active');
                $this.attr('title', '선택됨');
                $('.tour .book_s_list .book_s_item[data-tour="'+myBookData+'"]').addClass('active');
                $('.tour .book_s_list .book_s_item[data-tour="'+myBookData+'"] .slide_wrap .slide_list').slick('setPosition');
                $('.tour .map_marker_list .map_marker_item[data-tour="'+myBookData+'"]').addClass('active');
                setTimeout(function(){
                    $myBookItem.addClass('active_ani');
                    $('.tour .book_s_list .book_s_item[data-tour="'+myBookData+'"]').addClass('active_ani');
                    $('.tour .map_marker_list .map_marker_item[data-tour="'+myBookData+'"]').addClass('active_ani');
                    $('.tour .map_bg').addClass('active_ani');
                }, 1);
            }
        });
        $(document).on('click', '.marker_btn', function(){
            var $this = $(this),
                thisDataMarker = $this.attr('data-marker'),
                mapMarkerItemDataTour = $this.parent('.map_marker_item').attr('data-tour');
            $('.book_s_item[data-tour="'+mapMarkerItemDataTour+'"]').find('.slide_list').slick('slickGoTo', $('.book_s_item[data-tour="'+mapMarkerItemDataTour+'"]').find('.slide_item[data-marker="'+thisDataMarker+'"]').parents('.slick-slide').attr('data-slick-index'));
        });
        //관광지 슬라이드 및 탭 종료

        //보은군민 소식 탭 시작
        $('.board_tab .tab_list .tab_item button.tab_btn').on('click', function(){
            var $this = $(this),
                $myTabItem = $this.parent('.tab_item'),
                IsActive = $myTabItem.is('.active'),
                myTabBoard = $myTabItem.attr('data-board');
            if(!IsActive){
                $('.board_tab .tab_list .tab_item').removeClass('active active_ani');
                $('.board_tab .tab_list .tab_item button.tab_btn').removeAttr('title');
                $myTabItem.addClass('active');
                setTimeout(function(){
                    $myTabItem.addClass('active_ani');
                }, 1);
                $this.attr('title', '선택됨');

                $('.board_cts .cts_list .cts_item').removeClass('active active_ani');
                $('.board_cts .cts_list .cts_item[data-board="'+myTabBoard+'"]').addClass('active');
                setTimeout(function(){
                    $('.board_cts .cts_list .cts_item[data-board="'+myTabBoard+'"]').addClass('active_ani');
                }, 1);
            }
        });
        //보은군민 소식 탭 종료

        //보은군민 팝업 슬라이드 시작
        var $popupSlideList = $('.popup_slide_wrap .popup_slide_list'),
            $popupSlideItem = $popupSlideList.find('.popup_slide_item'),
            $popupSlidePrev = $('.popup_slide_wrap .popup_slide_control .prev'),
            $popupSlideNext = $('.popup_slide_wrap .popup_slide_control .next'),
            $popupSlideAuto = $('.popup_slide_wrap .popup_slide_control .auto'),
            $popupSlideCurrent = $('.popup_slide_wrap .popup_slide_control .current'),
            $popupSlideTotal = $('.popup_slide_wrap .popup_slide_control .total');
        $popupSlideTotal.text($popupSlideItem.length);
        $popupSlideList.slick({
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : true,
            pauseText : '정지',
            playText : '재생',
            prevArrow : $popupSlidePrev,
            nextArrow : $popupSlideNext,
            autoArrow : $popupSlideAuto,
            current : $popupSlideCurrent,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = state.current;
                }

                return state;
            },
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1531,
                settings : {
                    variableWidth : false
                }
            },{
                breakpoint : 1001,
                settings : {
                    variableWidth : true
                }
            },{
                breakpoint : 781,
                settings : {
                    variableWidth : false
                }
            },{
                breakpoint : 641,
                settings : {
                    variableWidth : true
                }
            }]
        });
        //보은군민 팝업 슬라이드 종료

        //데코 gsap 시작
        function gsapInit(){
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                '(min-width:1531px)' : function () {
                    //rowgroup1 시작
                    gsap.to($('.visual .visual_wrap .barcode_inner .phone_deco .phone_white.top'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup1'),
                            start : '5% 0%',
                            end : '40% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '80px'
                    });
                    gsap.to($('.visual .visual_wrap .barcode_inner .text_box .text_item.top'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup1'),
                            start : '5% 0%',
                            end : '40% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '80px'
                    });
                    gsap.to($('.visual .visual_wrap .barcode_inner .text_box .text_item.bottom'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup1'),
                            start : '5% 0%',
                            end : '40% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '-30px'
                    });
                    gsap.to($('.visual .visual_wrap .barcode_inner .hand_deco .hand.right'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup1'),
                            start : '5% 0%',
                            end : '40% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '-100px'
                    });
                    gsap.to($('.visual .visual_wrap .barcode_inner .hand_deco .hand.left'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup1'),
                            start : '5% 0%',
                            end : '40% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '30px'
                    });
                    //rowgroup1 종료

                    //rowgroup2 시작
                    gsap.to($('.tour .tour_bg_deco .back_wave .wave_color'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-60% 0%',
                            end : '10% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '-350px'
                    });
                    gsap.to($('.tour .tour_bg_deco .back_wave .wave_shadow'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-60% 0%',
                            end : '10% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '-350px'
                    });
                    gsap.to($('.tour .tour_bg_deco .back_wave .wave_color .blue_river'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-60% 0%',
                            end : '10% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '350px'
                    });
                    gsap.to($('.tour .tour_wrap .tour_wrap_inner .tour_map .map_bg .bg_deco.color'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-85% 0%',
                            end : '-70% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        opacity : 1,
                        y : '0px',
                        x : '0px'
                    });
                    gsap.to($('.tour .tour_wrap .tour_wrap_inner .tour_map .map_bg .bg_deco.shadow'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-85% 0%',
                            end : '-70% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        y : '0px',
                        x : '0px'
                    });
                    gsap.to($('.tour .tour_wrap .tour_wrap_inner .tour_map .map_marker_list'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-85% 0%',
                            end : '-70% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        opacity : 1,
                        y : '0px'
                    });
                    gsap.to($('.tour .tour_wrap .tour_wrap_inner .tour_book .book_title'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-95% 0%',
                            end : '-75% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        opacity : 1,
                        y : '0px'
                    });
                    gsap.to($('.tour .tour_wrap .tour_wrap_inner .tour_book .book_white_box'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-85% 0%',
                            end : '-75% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        opacity : 1,
                        y : '0px'
                    });
                    //rowgroup2 종료

                    //rowgroup3 시작
                    gsap.to($('.board .board_bg_deco .wave_color'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-240% 0%',
                            end : '-90% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        left : '0px'
                    });
                    gsap.to($('.board .board_bg_deco .wave_shadow'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-240% 0%',
                            end : '-90% 0%',
                            scrub : 3,
                            markers : false
                        },
                        ease : 'power2.in',
                        left : '0px'
                    });
                    gsap.to($('.board .board_bg_deco .back_green_bg'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-240% 0%',
                            end : '-90% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        bottom : '0px'
                    });
                    gsap.to($('.board .board_bg_deco .back_bg'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-240% 0%',
                            end : '-90% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power2.in',
                        bottom : '0px'
                    });
                    gsap.to($('.board .board_wrap .left_inner'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-160% 0%',
                            end : '-120% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power4.in',
                        y : '0px',
                        opacity : 1
                    });
                    gsap.to($('.board .board_wrap .right_inner'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-150% 0%',
                            end : '-120% 0%',
                            scrub : 1.5,
                            markers : false
                        },
                        ease : 'power4.in',
                        y : '0px',
                        opacity : 1
                    });
                    //rowgroup3 종료
                },
                '(max-width:1530px)' : function () {

                }
            });
            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();
        //데코 gsap 종료
    });
})(jQuery);