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

        //rowgroup 도달 active 클레스 시작
        var $ScrollWrap = $('.scroll_wrap');
        $window.on('scroll', function(event) {
            $ScrollWrap.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top;
                if(ThisOffSetTop < WindowMiddle){
                    $this.addClass('active');
                }
                else{
                    $this.removeClass('active');
                }
            });
        });
        //rowgroup 도달 active 클레스 끝

        //팝업존 슬라이드 영역 시작
        var $PopUpSlide = $('.popup .popup_wrap .popup_slide_wrap .popup_slide_list'),
            PopUpTotal = $('.popup .popup_wrap .popup_control_wrap .countbox .total'),
            PopUpCurrent = $('.popup .popup_wrap .popup_control_wrap .countbox .current');
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
            prevArrow : $('.popup .popup_wrap .popup_control_wrap .btn_box .prev'),
            nextArrow : $('.popup .popup_wrap .popup_control_wrap .btn_box .next'),
            autoArrow : $('.popup .popup_wrap .popup_control_wrap .btn_box .auto'),
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

        //노인복지사업 슬라이드 영역 시작
        var $ServiceSlide = $('.service .service_wrap .service_slide_wrap .service_slide_list');
        $ServiceSlide.slick({
            autoplay : false,
            dots : false,
            slidesToShow : 4,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            draggable : false,
            variableWidth : true, //width를 css로 제어
            responsive : [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 3,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 531,
                settings : {
                    slidesToShow : 2,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 371,
                settings : {
                    slidesToShow : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            }]
        });
        //노인복지사업 슬라이드 영역 끝

        //실버교육 프로그램 슬라이드 영역 시작
        var $SilverConItem = $('.silver_edu .silver_edu_wrap .silver_tab_wrap .silver_con_list .silver_con_item');
        $SilverConItem.each(function(){
            var $SilverSlideList = $(this).find('.silver_slide_list'),
                $SilverSlideControlBox = $(this).find('.silver_slide_control_box');
            $SilverSlideList.slick({
                autoplay : false,
                dots : false,
                slidesToShow : 1,
                slidesToScroll : 1,
                rows : 2,
                slidesPerRow: 2,
                infinite : true,
                prevArrow : $SilverSlideControlBox.find('.prev'),
                nextArrow : $SilverSlideControlBox.find('.next'),
                pauseOnDotsHover : true,
                swipe : true,
                swipeToSlide: false,
                draggable : true,
                variableWidth : false,
                responsive: [{
                    breakpoint : 641,
                    settings : {
                        fade : true,
                        adaptiveHeight : true,
                        slidesPerRow : 1,
                        swipeToSlide : true
                    }
                }]
            });
        });
        //실버교육 tab버튼 시작
        var $TabSlide = $('.silver_edu .silver_edu_wrap .silver_tab_box');
        $TabSlide.slick({
            autoplay : false,
            dots : false,
            slidesToShow : 9,
            slidesToScroll : 1,
            infinite : false,
            pauseOnDotsHover : true,
            swipe : false,
            draggable : false,
            variableWidth : true,
            responsive: [{
                breakpoint : 641,
                settings : {
                    infinite : true,
                    slidesToShow : 7,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 581,
                settings : {
                    infinite : true,
                    slidesToShow : 6,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 497,
                settings : {
                    infinite : true,
                    slidesToShow : 5,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            },{
                breakpoint : 407,
                settings : {
                    infinite : true,
                    slidesToShow : 4,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    variableWidth : true
                }
            }]
        });
        $(document).on('click', '.silver_tab_wrap .silver_tab_box_wrap .silver_hidden_btn_wrap button', function() {
            var $this = $(this),
                IsTrue = $TabSlide.is('[data-slick-true="Y"]');
            if(IsTrue){
                $TabSlide.slick('unslick');
                $TabSlide.attr('data-slick-true', 'N');
                $this.attr('title', '탭닫기');
            }
            else{
                $TabSlide.slick({
                    autoplay : false,
                    dots : false,
                    slidesToShow : 9,
                    slidesToScroll : 1,
                    infinite : false,
                    pauseOnDotsHover : true,
                    swipe : false,
                    draggable : false,
                    variableWidth : true,
                    responsive: [{
                        breakpoint : 641,
                        settings : {
                            infinite : true,
                            slidesToShow : 7,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    },{
                        breakpoint : 581,
                        settings : {
                            infinite : true,
                            slidesToShow : 6,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    },{
                        breakpoint : 497,
                        settings : {
                            infinite : true,
                            slidesToShow : 5,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    },{
                        breakpoint : 407,
                        settings : {
                            infinite : true,
                            slidesToShow : 4,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    }]
                });
                $TabSlide.attr('data-slick-true', 'Y');
                $this.attr('title', '탭열기');
            }
        });

        //실버교육 tab버튼 시작
        $(document).on('click', '.silver_edu .silver_edu_wrap .silver_tab_wrap .silver_tab_box .silver_tab_item .silver_tab_btn', function() {
            var $this = $(this),
                $MyParent = $this.parent('.silver_tab_item'),
                IsActive = $MyParent.is('.active'),
                ParentIndex = $MyParent.attr('data-tab'),
                $SlideList = $this.parents('.silver_tab_box'),
                $OtherSlide = $SlideList.find('.silver_tab_item').not($MyParent),
                $OtherBtn = $OtherSlide.find('.silver_tab_btn'),
                $SilverConList = $('.silver_edu .silver_edu_wrap .silver_tab_wrap .silver_con_list'),
                $SilverConItem = $SilverConList.find('.silver_con_item[data-con="'+ParentIndex+'"]'),
                $OtherSilverConItem = $SilverConItem.siblings('.silver_con_item'),
                $SilverSlideList = $SilverConItem.find('.silver_slide_list');
            if(!IsActive){
                $OtherSlide.removeClass('active');
                $OtherBtn.removeAttr('title');
                $MyParent.addClass('active');
                $this.attr('title', '선택됨');
                $OtherSilverConItem.removeClass('active');
                $SilverConItem.addClass('active');
                $SilverSlideList.slick('setPosition');
            }
        });
        //실버교육 프로그램 슬라이드 영역 끝


        $window.on('screen:wide screen:web screen:tablet', function(event) {
            if(!$TabSlide.hasClass('slick-initialized')){
                $TabSlide.slick({
                    autoplay : false,
                    dots : false,
                    slidesToShow : 9,
                    slidesToScroll : 1,
                    infinite : false,
                    pauseOnDotsHover : true,
                    swipe : false,
                    draggable : false,
                    variableWidth : true,
                    responsive: [{
                        breakpoint : 641,
                        settings : {
                            infinite : true,
                            slidesToShow : 7,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    },{
                        breakpoint : 581,
                        settings : {
                            infinite : true,
                            slidesToShow : 6,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    },{
                        breakpoint : 497,
                        settings : {
                            infinite : true,
                            slidesToShow : 5,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    },{
                        breakpoint : 407,
                        settings : {
                            infinite : true,
                            slidesToShow : 4,
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth : true
                        }
                    }]
                });
                $TabSlide.attr('data-slick-true', 'Y');
            }
        });
        $window.on('screen:phone', function(event) {

        });
    });
})(jQuery);