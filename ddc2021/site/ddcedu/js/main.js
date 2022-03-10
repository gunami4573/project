(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        //여기서부터 코드 작성해주세요

        //메인 비주얼 팝업 시작
        var $MainVisualSlide = $('.visual_total .visual_list');
        $MainVisualSlide.slick({
            //기본
            autoplay : true,
            swipe : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll: 1,
            variableWidth : false,
            infinite : true,
            prevArrow : $('.visual_control .prev'),
            nextArrow : $('.visual_control .next'),
            dots : false,
            //추가옵션
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe:true,
                        draggable:true
                    }
                }]
        });
        //메인 비주얼 팝업 끝

        //공지사항 공통롤링 시작
        var $boardItembox = $('.board .tabitem');
        $boardItembox.each(function(){
            var $boardSlide = $(this).find('.slide_list'),
                $SlideItem = $boardSlide.find('.slide_item'),
                $SlideControl = $boardSlide.siblings('.controlbox');
            $boardSlide.slick({
                autoplay : true,
                dots : false,
                slidesToShow : 2,
                slidesToScroll : 1,
                infinite : true,
                prevArrow : $SlideControl.find('.prev'),
                nextArrow : $SlideControl.find('.next'),
                pauseOnDotsHover : true,
                swipe : false,
                draggable : false,
                variableWidth : true,
                //추가 기능
                isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                responsive: [
                    {
                        breakpoint : 1051,
                        settings : {
                            slidesToShow : 1,
                            infinite : true
                        }
                    },
                    {
                        breakpoint : 1001,
                        settings : {
                            slidesToShow : 4,
                            swipe : true,
                            draggable : true,
                            infinite : true
                        }
                    },
                    {
                        breakpoint : 845,
                        settings : {
                            slidesToShow : 3,
                            swipe : true,
                            draggable : true,
                            infinite : true
                        }
                    },
                    {
                        breakpoint : 641,
                        settings : {
                            slidesToShow : 2,
                            swipe : true,
                            draggable : true,
                            infinite : true
                        }
                    }]
            });
        });
        //공지사항 tab버튼
        $('.board .titlebox .tabbox ul li button.tabbtn').on('click', function(){
            var $this = $(this),
                $MyParent = $this.parent('li'),
                IsActive = $MyParent.is('.active'),
                ParentIndex = $MyParent.index(),
                $OtherParents = $MyParent.siblings('li'),
                $OtherBtns = $OtherParents.find('.tabbtn'),
                $TabContent = $this.parents('.titlebox').siblings('.tab_content'),
                $MyCon = $TabContent.find('.tabitem').eq(ParentIndex),
                $MySlide = $MyCon.find('.slide_list'),
                $OtherCon = $MyCon.siblings('.tabitem');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherBtns.removeAttr('title');
                $MyParent.addClass('active');
                $this.attr('title', '선택됨');
                $OtherCon.removeClass('active');
                $MyCon.addClass('active');
                $MySlide.slick('setPosition');
            };
        });
        //공지사항 공통롤링 끝

        //강좌목록 슬라이드 시작
        var $Lecture = $('.lecture .lecture_box .lecture_slide_list');
        $Lecture.slick({
            autoplay : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            rows : 2, //여러줄
            slidesPerRow : 3, //여러줄 일 때 한줄의 몇개 출력
            variableWidth : false, //width를 css로 제어
            responsive: [
                {
                    breakpoint : 641,
                    settings : {
                        arrows : false,
                        variableWidth : true,
                        slidesToShow : 2,
                        slidesPerRow : 1,
                        rows : 1,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        infinite: true
                    }
                },
                {
                    breakpoint : 401,
                    settings : {
                        arrows : false,
                        variableWidth : true,
                        slidesToShow : 1,
                        slidesPerRow : 1,
                        rows : 1,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        infinite: true
                    }
                }]
        });
        //강좌목록 슬라이드 끝

        //자주찾는 서비스 슬라이드 시작
        var $Service = $('.service .service_slide_box .service_slide_list');
        $Service.slick({
            autoplay : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            rows : 3, //여러줄
            slidesPerRow : 3, //여러줄 일 때 한줄의 몇개 출력
            variableWidth : false, //width를 css로 제어
            prevArrow : $('.service .service_slide_box .service_slide_control .prev'),
            nextArrow : $('.service .service_slide_box .service_slide_control .next'),
            responsive: [
                {
                    breakpoint : 1001,
                    settings : {
                        slidesToShow : 5,
                        slidesPerRow : 1,
                        rows : 1,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        infinite: true
                    }
                },
                {
                    breakpoint : 641,
                    settings : {
                        slidesToShow : 3,
                        slidesPerRow : 1,
                        rows : 1,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        infinite: true
                    }
                }]
        });
        //자주찾는 서비스 슬라이드 끝

        //팝업존 슬라이드 시작
        var $Popup = $('.popup_zone .popup_slide_box .popup_slide_list');
        $Popup.slick({
            autoplay : true,
            dots : false,
            slidesToShow : 2,
            slidesToScroll : 1,
            infinite : true,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            variableWidth : true, //width를 css로 제어
            prevArrow : $('.popup_zone .popup_slide_box .popup_slide_control .prev'),
            nextArrow : $('.popup_zone .popup_slide_box .popup_slide_control .next'),
            //추가 기능
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            responsive: [
                {
                    breakpoint : 681,
                    settings : {
                        slidesToShow : 1,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        infinite: true
                    }
                },
                {
                    breakpoint : 641,
                    settings : {
                        arrows : false,
                        slidesToShow : 2,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        infinite: true
                    }
                }]
        });
        //팝업존 슬라이드 끝

        
        
        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);