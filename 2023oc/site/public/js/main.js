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

        /* 공통 팝업 슬라이드 시작 */
        var $ocPopup = $('.oc_popup');
        $ocPopup.each(function(){
            var $this = $(this),
                $ocPopupList = $this.find('.oc_popup_list'),
                $ocPopupPrev = $this.find('.prev'),
                $ocPopupNext = $this.find('.next'),
                $ocPopupAuto = $this.find('.auto'),
                $ocPopupCurrent = $this.find('.current'),
                $ocPopupTotal = $this.find('.total');
            $ocPopupList.slick({
                //기본
                autoplay : true,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : true,
                prevArrow : $ocPopupPrev,
                nextArrow : $ocPopupNext,
                autoArrow : $ocPopupAuto,
                pauseText : '정지',
                playText : '재생',
                total : $ocPopupTotal,
                current : $ocPopupCurrent,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                fade : false
            });
        });
        /* 공통 팝업 슬라이드 끝 */

    });
})(jQuery);