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

        //비주얼 슬라이드 시작
        var $VisualSlideList = $('.edu_visual .visual_slide_wrap .visual_slide_list'),
            $VisualPrev = $('.edu_visual .visual_slide_wrap .visual_slide_control .prev'),
            $VisualNext = $('.edu_visual .visual_slide_wrap .visual_slide_control .next'),
            $VisualAuto = $('.edu_visual .visual_slide_nav .auto'),
            $VisualCurrent = $('.edu_visual .visual_slide_nav .num_box .current'),
            $VisualTotal = $('.edu_visual .visual_slide_nav .num_box .total');
        $VisualSlideList.on('init', function(){
            $('.edu_visual .visual_slide_wrap').addClass('active');
        });
        $VisualSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 4000,
            speed : 1500,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite: true,
            arrows : true,
            prevArrow : $VisualPrev,
            nextArrow : $VisualNext,
            autoArrow : $VisualAuto,
            pauseText : '정지',
            playText : '재생',
            total : $VisualTotal,
            current : $VisualCurrent,
            customState : function(state) {
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            fade : true,
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{}]
        });
        //비주얼 슬라이드 끝

        //강좌검색 셀렉트 시작
        $('.search_box .input_select_area .select_area_inner button.select_btn').on('click', function(){
            var $this = $(this),
                $AreaInner = $this.parent('.select_area_inner'),
                IsActive = $AreaInner.is('.active');
            if(!IsActive){
                $this.attr('title', '하위 리스트 닫기');
                $AreaInner.addClass('active');
            }
        });
        $(document).on('click', '.search_box .input_select_area .select_area_inner .select_choice_list .select_choice_item button.select_choice_btn', function(){
            var $this = $(this),
                $ChoiceText = $this.find('em').text(),
                $ChoiceItem = $this.parent('.select_choice_item'),
                $ChoiceList = $ChoiceItem.parent('.select_choice_list'),
                $SelectBtn = $ChoiceList.siblings('button.select_btn'),
                $SelectBtnText = $SelectBtn.find('em'),
                $AreaInner = $ChoiceList.parent('.select_area_inner'),
                IsActive = $AreaInner.is('.active'),
                $OtherChoiceItem = $ChoiceItem.siblings('.select_choice_item'),
                $OtherChoiceBtn = $OtherChoiceItem.find('button.select_choice_btn');
            if(IsActive){
                $AreaInner.removeClass('active')
                $SelectBtn.attr('title', '하위 리스트 열기');
                $OtherChoiceItem.removeClass('active');
                $OtherChoiceBtn.removeAttr('title');
                $ChoiceItem.addClass('active');
                $this.attr('title', '선택됨');
                $SelectBtnText.text($ChoiceText);
            }
        });
        //강좌검색 셀렉트 끝

        //강좌 카라테고리 별 슬라이드 시작
        //카테고리 슬라이드
        var $TopSlideList = $('.edu_schedule .top_slide_wrap .top_slide_list');
        $TopSlideList.slick({
            //기본
            autoplay : false,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 5,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: false,
            arrows : false,
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            zIndex : 1,
            responsive : [{}]
        });
        //강좌 슬라이드
        var $BottomSlideWrapItem = $('.edu_schedule .bottom_slide_wrap .bottom_wrap_item');
        $BottomSlideWrapItem.each(function(){
            var $this = $(this),
                StartActive = $this.is('.active'),
                $BottomSlideList = $this.find('.bottom_slide_list'),
                $BottomSlideControl = $this.find('.bottom_slide_control'),
                $BottomSlidePrev = $BottomSlideControl.find('.prev'),
                $BottomSlideNext = $BottomSlideControl.find('.next');
            if(StartActive){
                setTimeout(function(){
                    $this.addClass('active_ani');
                }, 1);
            }
            $BottomSlideList.slick({
                //기본
                autoplay : false,
                speed : 800,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                rows : 2,
                slidesPerRow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite: true,
                arrows : true,
                prevArrow : $BottomSlidePrev,
                nextArrow : $BottomSlideNext,
                isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                zIndex : 1,
                responsive : [{}]
            });
        });


        //카테고리 버튼 클릭 active
        $(document).on('click', '.edu_schedule .top_slide_wrap .top_slide_list .top_slide_item button.top_slide_btn', function(){
            var $this = $(this),
                $MyItem = $this.parent('.top_slide_item'),
                IsActive = $MyItem.is('.active'),
                $MyRows = $MyItem.parent('.slick-rows'),
                $MySlideItem = $MyRows.parent('.slick-slide'),
                MySlideIndex = $MySlideItem.attr('data-slick-index'),
                $OtherSlideItem = $MySlideItem.siblings('.slick-slide'),
                $OtherItem = $OtherSlideItem.find('.top_slide_item'),
                $OtherBtn = $OtherItem.find('button.top_slide_btn'),
                $TopSlideWrap = $this.parents('.top_slide_wrap'),
                $BottomSlideWrap = $TopSlideWrap.siblings('.bottom_slide_wrap'),
                $MyBottomSlideItem = $BottomSlideWrap.find('.bottom_wrap_item').eq(MySlideIndex),
                $MyBottomSlideList = $MyBottomSlideItem.find('.bottom_slide_list'),
                $OtherBottomSlideItem = $BottomSlideWrap.find('.bottom_wrap_item').not($MyBottomSlideItem);
            if(!IsActive){
                $OtherItem.removeClass('active');
                $OtherBtn.removeAttr('title');
                $OtherBottomSlideItem.removeClass('active active_ani');
                $MyItem.addClass('active');
                $this.attr('title', '선택됨');
                $MyBottomSlideItem.addClass('active');
                setTimeout(function(){
                    $MyBottomSlideItem.addClass('active_ani');
                }, 1);
                $MyBottomSlideList.slick('setPosition');
            }
        });
        //강좌 카라테고리 별 슬라이드 끝



        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);