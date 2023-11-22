(function ($) {
    //비주얼 svg 프로그레스 시작
    var myAnim;
    var myTextAnim;
    var Nowprogress = 0;
    function Loading() {
        Nowprogress = 0;
        var count = $('#count');
        myTextAnim = $({Counter: 0}).animate({Counter: 100}, {
            duration: 5000,
            easing: 'linear',
            step: function () {
                count.text(Math.ceil(this.Counter) + "%");
                Nowprogress = Math.ceil(this.Counter);
            }
        });
        var s = Snap('#animated');
        var progress = s.select('#progress');
        progress.attr({strokeDasharray: '0, 251.2'});
        myAnim = Snap.animate(0, 251.2, function (value) {
            progress.attr({'stroke-dasharray': value + ',251.2'});
        }, 5000);
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
        var NowDegree = (251.2 / 100) * Nowprogress;
        progress.attr({strokeDasharray: NowDegree + ', 251.2'});
        myAnim = Snap.animate(NowDegree, 251.2, function (value) {
            progress.attr({'stroke-dasharray': value + ',251.2'});
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

        //퀵메뉴 시작
        function quickScroll() {
            if($window.scrollTop() > 161) {
                $('html').addClass('youth_move');
                $('.youth_quick').removeClass('active');
                $('.youth_quick .youth_quick_inner button.youth_quick_btn').attr('title', '퀵메뉴 열기');
            }
            if($window.scrollTop() <= 161) {
                $('html').removeClass('youth_move');
                $('.youth_quick').addClass('active');
                $('.youth_quick .youth_quick_inner button.youth_quick_btn').attr('title', '퀵메뉴 닫기');
            }
        }
        $window.scroll(function(){
            quickScroll();
        });
        quickScroll();

        $('.youth_quick .youth_quick_inner button.youth_quick_btn').on('click', function(){
            var $this = $(this),
                $YouthQuick = $this.parents('.youth_quick'),
                IsActive = $YouthQuick.is('.active');
            if(!IsActive){
                $this.attr('title', '퀵메뉴 닫기');
                $YouthQuick.addClass('active');
            }
            else{
                $this.attr('title', '퀵메뉴 열기');
                $YouthQuick.removeClass('active');
            }
        });
        //퀵메뉴 끝

        //비주얼 영역 슬라이드 시작
        var $VisualSlideList = $('.visual_wrap .visual_slide_wrap .visual_slide_list'),
            $VisualSlidePrev = $('.visual_wrap .visual_slide_wrap .visual_slide_control .prev'),
            $VisualSlideNext = $('.visual_wrap .visual_slide_wrap .visual_slide_control .next'),
            $VisualSlideAuto = $('.visual_wrap .visual_slide_wrap .visual_slide_control .auto'),
            $VisualSlideCurrent = $('.visual_wrap .visual_slide_wrap .visual_slide_control .current'),
            $VisualSlideTotal = $('.visual_wrap .visual_slide_wrap .visual_slide_control .total');
        $VisualSlideList.on('init', function(event, slick, currentSlide, nextSlide) {
            Loading();
        });
        $VisualSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 4500,
            speed : 2500,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $VisualSlidePrev,
            nextArrow : $VisualSlideNext,
            autoArrow : $VisualSlideAuto,
            pauseText : '정지',
            playText : '재생',
            total : $VisualSlideTotal,
            current : $VisualSlideCurrent,
            pauseOnArrowClick : true,
            pauseOnHover : false,
            pauseOnSwipe : false,
            pauseOnDotsClick : false,
            zIndex : 1,
            fade : true,
            responsive : [{}]
        });
        $VisualSlideList.on('beforeChange', function(event, slick, currentSlide) {
            var IsAutoplay = $VisualSlideAuto.is('.slick-pause');
            if(IsAutoplay){
                Loading();
            }
        });
        $VisualSlideAuto.on('click', function(){
            var $this = $(this),
                IsPlaying = $this.is('.slick-play');
            if(IsPlaying){
                Loadingpause();
            }else{
                Loadingresume();
            }
        });
        $VisualSlideList.on({
            mousedown: function(){
                var IsPlaying = $VisualSlideAuto.is('.slick-pause');
                if(IsPlaying){
                    $VisualSlideAuto.click();
                }
            }
        });
        //비주얼 영역 슬라이드 끝

        //공지사항 탭메뉴 및 슬라이드 시작
        var $BoardSlideItem = $('.board_wrap .board_slide .board_slide_item');
        $BoardSlideItem.each(function(){
            var $this = $(this),
                $YouthSlideWrap = $this.find('.youth_slide_wrap'),
                $YouthSlideList = $YouthSlideWrap.find('.youth_slide_list'),
                $YouthSlideControl = $YouthSlideWrap.find('.youth_slide_control'),
                $YouthSlidePrev = $YouthSlideControl.find('.prev'),
                $YouthSlideNext = $YouthSlideControl.find('.next');
            $YouthSlideList.slick({
                //기본
                autoplay : false,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : true,
                prevArrow : $YouthSlidePrev,
                nextArrow : $YouthSlideNext,
                pauseOnArrowClick : true,
                pauseOnHover : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                fade : false,
                responsive : [{}]
            });
        });
        $('.board_wrap .board_tab .board_tab_list .board_tab_item button.board_tab_btn').on('click', function(){
            var $this = $(this),
                $MyBoardItem = $this.parent('.board_tab_item'),
                IsActive = $MyBoardItem.is('.active'),
                MyBoardItemData = $MyBoardItem.attr('data-board'),
                $OtherBoardItem = $MyBoardItem.siblings('.board_tab_item'),
                $OtherBoardTabBtn = $OtherBoardItem.find('button.board_tab_btn'),
                $BoardSlideList = $('.board_wrap .board_slide .board_slide_list'),
                $MyBoardSlideItem = $BoardSlideList.find('.board_slide_item[data-board="'+MyBoardItemData+'"]'),
                $MyYouthSlideList = $MyBoardSlideItem.find('.youth_slide_list'),
                $OtherBoardSlideItem = $BoardSlideList.find('.board_slide_item').not($MyBoardSlideItem);
            if(!IsActive){
                $OtherBoardItem.removeClass('active');
                $OtherBoardTabBtn.removeAttr('title');
                $OtherBoardSlideItem.removeClass('active');
                $MyBoardItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyBoardSlideItem.addClass('active');
                $MyYouthSlideList.slick('setPosition');
            }
        });
        //공지사항 탭메뉴 및 슬라이드 끝

    });
})(jQuery);