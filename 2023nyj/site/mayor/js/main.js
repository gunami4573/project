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

        //그룹 스크롤 효과 시작
        $('.waypoint').waypoint(function(direction) {
            $(this.element)[(direction === 'down') ? 'addClass' : 'removeClass']('active');
        }, {
            offset : '90%'
        });
        //그룹 스크롤 효과 끝

        //비주얼 이미지,텍스트 슬라이드 시작
        var $sgnImgSlideList = $('.slogan_wrap .sgn_total .sgn_img_slide_list'),
            $sgnPrev = $('.slogan_wrap .sgn_total .sgn_control .prev'),
            $sgnNext = $('.slogan_wrap .sgn_total .sgn_control .next'),
            $sgnAuto = $('.slogan_wrap .sgn_total .sgn_control .auto'),
            $sgnCurrent = $('.slogan_wrap .sgn_total .sgn_control .current'),
            $sgnTotal = $('.slogan_wrap .sgn_total .sgn_control .total');
        $sgnImgSlideList.on('init', function(event, slick, currentSlide) {
            var $Currentslide = $(slick.$slides[0]),
                $CurrentSlickRows = $Currentslide.find('.slick-rows'),
                $CurrentImgItem = $CurrentSlickRows.find('.sgn_img_slide_item'),
                CurrentDataImg = $CurrentImgItem.attr('data-img'),
                $sgnTextCmsWrap = $('.slogan_wrap .sgn_total .sgn_text_cms_wrap'),
                $sgnTextCmsList = $sgnTextCmsWrap.find('.sgn_text_cms_list'),
                $MysgnTextCmsItem = $sgnTextCmsList.find('.sgn_text_cms_item[data-text="'+CurrentDataImg+'"]'),
                $OthersgnTextCmsItem = $sgnTextCmsList.find('.sgn_text_cms_item').not($MysgnTextCmsItem);
            $OthersgnTextCmsItem.removeClass('active').removeClass('text_active');
            $MysgnTextCmsItem.addClass('active');
            $sgnImgSlideList.addClass('img_active');
            setTimeout(function(){
                $MysgnTextCmsItem.addClass('text_active');
            }, 1);
        });
        $sgnImgSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 2500,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite: true,
            arrows : true,
            prevArrow : $sgnPrev,
            nextArrow : $sgnNext,
            autoArrow : $sgnAuto,
            pauseText : '정지',
            playText : '재생',
            total : $sgnTotal,
            current : $sgnCurrent,
            customState : function(state) {
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            fade : true,
            responsive : [{}]
        });
        $sgnImgSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $Nextslide = $(slick.$slides[nextSlide]),
                $NextSlickRows = $Nextslide.find('.slick-rows'),
                $NextImgItem = $NextSlickRows.find('.sgn_img_slide_item'),
                NextDataImg = $NextImgItem.attr('data-img'),
                $sgnTextCmsWrap = $('.slogan_wrap .sgn_total .sgn_text_cms_wrap'),
                $sgnTextCmsList = $sgnTextCmsWrap.find('.sgn_text_cms_list'),
                $MysgnTextCmsItem = $sgnTextCmsList.find('.sgn_text_cms_item[data-text="'+NextDataImg+'"]'),
                $OthersgnTextCmsItem = $sgnTextCmsList.find('.sgn_text_cms_item').not($MysgnTextCmsItem);
            $OthersgnTextCmsItem.removeClass('active').removeClass('text_active');
            $MysgnTextCmsItem.addClass('active');
            setTimeout(function(){
                $MysgnTextCmsItem.addClass('text_active');
            }, 500);
        });
        //비주얼 이미지,텍스트 슬라이드 끝

        //공약사항 슬라이드 시작
        var $pmsSlideList = $('.pms_slide_wrap .pms_slide_list'),
            $pmsPrev = $('.pms_slide_wrap .pms_slide_control .prev'),
            $pmsNext = $('.pms_slide_wrap .pms_slide_control .next'),
            $pmsCurrent = $('.pms_slide_wrap .pms_slide_control .current'),
            $pmsTotal = $('.pms_slide_wrap .pms_slide_control .total');
        $pmsSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 3500,
            speed : 700,
            dots : false,
            draggable : false,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 4,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $pmsPrev,
            nextArrow : $pmsNext,
            total : $pmsTotal,
            current : $pmsCurrent,
            customState : function(state) {
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{}]
        });
        //공약사항 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);