/* 유튜브 api 시작 */
function onPlayerReady(event) {
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
    }
}
function YoutubePlay(YoutubeID) {
    YoutubeID.playVideo();
}
function YoutubePause(YoutubeID) {
    YoutubeID.pauseVideo();
}
/* 유튜브 api 끝 */
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
            offset : '85%'
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

        //주요일정 탭 및 슬라이드 시작
        var $DayDetailItemBox = $('.slogan_wrap .sgn_daily .day_detail_item_box');
        $DayDetailItemBox.each(function(){
            var $this = $(this),
                $DayDetailSlideList = $this.find('.day_detail_slide_list');
            $DayDetailSlideList.on('init', function(event, slick, currentSlide) {
                var $Currentslide = $(slick.$slides[0]),
                    $InitSlickTrack = $Currentslide.parent('.slick-track'),
                    $InitSlickList = $InitSlickTrack.parent('.slick-list'),
                    $InitDayDetailSlideList = $InitSlickList.parent('.day_detail_slide_list'),
                    $InitDayDetailItemBoxActive = $InitDayDetailSlideList.parent('.day_detail_item_box.active');
                setTimeout(function(){
                    $InitDayDetailItemBoxActive.addClass('box_ani');
                }, 1)
            });
            $DayDetailSlideList.slick({
                //기본
                autoplay : true,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite: true,
                arrows : false,
                isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                vertical : true, //세로모드 유무
                verticalSwiping : true, //세로일때 터치 유무
                responsive : [{
                    breakpoint : 1301,
                    settings : {
                        slidesToShow : 4
                    }
                },{
                    breakpoint : 1001,
                    settings : {
                        slidesToShow : 3
                    }
                },{
                    breakpoint : 801,
                    settings : {
                        slidesToShow : 2
                    }
                },{
                    breakpoint : 641,
                    settings : {
                        slidesToShow : 3
                    }
                }]
            });
            $window.on('screen:wide screen:web', function (event) {
                $DayDetailSlideList.on('wheel', function(e){
                    e.preventDefault();
                    if (e.originalEvent.deltaY < 0) {
                        $(this).slick('slickPrev');
                    } else {
                        $(this).slick('slickNext');
                    }
                });
            });
        });
        $('.slogan_wrap .sgn_daily .day_choice .day_choice_list .day_choice_item button.day_choice_btn').on('click', function(){
            var $this = $(this),
                $MyChoiceItem = $this.parent('.day_choice_item'),
                MyItemIndex = $MyChoiceItem.index(),
                IsActive = $MyChoiceItem.is('.active'),
                $OtherChoiceItem = $MyChoiceItem.siblings('.day_choice_item'),
                $OtherChoiceBtn = $OtherChoiceItem.find('button.day_choice_btn'),
                $DayChoice = $this.parents('.day_choice'),
                $DayDetail = $DayChoice.siblings('.day_detail'),
                $MyDayDetailItemBox = $DayDetail.find('.day_detail_item_box').eq(MyItemIndex),
                $MyDayDetailSlideList = $MyDayDetailItemBox.find('.day_detail_slide_list'),
                $OtherDayDetailItemBox = $MyDayDetailItemBox.siblings('.day_detail_item_box');
            if(!IsActive){
                $OtherChoiceItem.removeClass('active');
                $OtherChoiceBtn.removeAttr('title');
                $OtherDayDetailItemBox.removeClass('active box_ani');
                $MyChoiceItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyDayDetailItemBox.addClass('active');
                setTimeout(function(){
                    $MyDayDetailItemBox.addClass('box_ani');
                }, 1)
                $MyDayDetailSlideList.slick('setPosition');
            }
        });
        //주요일정 탭 및 슬라이드 끝

        //공약사항 슬라이드 시작
        var $pmsSlideList = $('.promise_wrap .pms_slide_wrap .pms_slide_list'),
            pmsSlideItemlength = $pmsSlideList.find('.pms_slide_item').length,
            $pmsPrev = $('.promise_wrap .pms_slide_wrap .pms_slide_control .prev'),
            $pmsNext = $('.promise_wrap .pms_slide_wrap .pms_slide_control .next'),
            $pmsCurrent = $('.promise_wrap .pms_slide_control .current'),
            $pmsTotal = $('.promise_wrap .pms_slide_control .total');
        if(pmsSlideItemlength < 10) {
            pmsSlideItemlength = '0' + pmsSlideItemlength;
        }
        $pmsTotal.text(pmsSlideItemlength);
        $pmsSlideList.slick({
            //기본
            autoplay : false,
            autoplaySpeed : 3500,
            speed : 700,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 4,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $pmsPrev,
            nextArrow : $pmsNext,
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
            responsive : [{
                breakpoint : 1301,
                settings : {
                    slidesToShow : 3
                }
            },{
                breakpoint : 1001,
                settings : {
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true,
                    slidesToShow : 3
                }
            },{
                breakpoint : 801,
                settings : {
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true,
                    slidesToShow : 2
                }
            },{
                breakpoint : 641,
                settings : {
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true,
                    slidesToShow : 1,
                    variableWidth : false,
                    fade : true
                }
            }]
        });
        //공약사항 슬라이드 끝

        //뉴스 슬라이드 시작
        var $NewsSlideList = $('.news_slide_wrap .news_slide_list'),
            $NewsSlidePrev = $('.news_slide_wrap .news_slide_control .prev'),
            $NewsSlideNext = $('.news_slide_wrap .news_slide_control .next');
        $NewsSlideList.slick({
            //기본
            autoplay : false,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : false,
            infinite: false,
            arrows : true,
            prevArrow : $NewsSlidePrev,
            nextArrow : $NewsSlideNext,
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{
                breakpoint : 801,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        //뉴스 슬라이드 끝

        //시정활동 사진 슬라이드 시작
        var $PhotoSlideList = $('.photo_slide_wrap .photo_slide_list'),
            $PhotoSlidePrev = $('.photo_slide_wrap .photo_slide_control .prev'),
            $PhotoSlideNext = $('.photo_slide_wrap .photo_slide_control .next');
        $PhotoSlideList.slick({
            //기본
            autoplay : true,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : false,
            infinite: true,
            arrows : true,
            prevArrow : $PhotoSlidePrev,
            nextArrow : $PhotoSlideNext,
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    fade : true
                }
            }]
        });
        //시정활동 사진 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);