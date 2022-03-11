(function($) {
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
        
        //여기서부터 코드 작성

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

        //메인비주얼 영역 시작
        var $MainVisualWrap = $('.main_visual .main_visual_wrap'),
            $MainVisual = $('.main_visual .main_visual_wrap .main_visual_list');
        $MainVisual.on('init', function(event, slick, currentSlide){
            var $currentslide = $(slick.$slides[0]);
            $MainVisualWrap.addClass('active roading');
        });
        $MainVisual.slick({
            //기본
            autoplay : false,
            speed : 1000,
            dots : true,
            appendDots: $('.rowgroup1 .main_visual .main_visual_wrap .main_visual_titlebox .visual_dots_box'),
            dotsClass:'slick-dots clearfix',
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).attr('data-thum');
                return '<button type="button"><span>'+(i + 1)+'</span><span class="skip">번 보기</span></button>';
            },
            swipe : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            pauseOnArrowClick : true,
            fade : true,
            responsive : [{}]
        });
        $MainVisual.on('beforeChange', function(event, slick, currentSlide) {
            var $currentslide = $(slick.$slides[currentSlide]);
            $MainVisualWrap.removeClass('roading');
            setTimeout(function(){
                $MainVisualWrap.addClass('roading');
            }, 500);
        });
        //메인비주얼 영역 끝

        //강좌 및 프로그램 검색 영역 시작
        $('.search_area .select_box .select_form_box .button_wrap button.select_choice_btn').on('click', function(){
           var $this = $(this),
               $SelectFormBox = $('.search_area .select_box .select_form_box'),
               IsActive = $SelectFormBox.is('.active'),
               $ViewSelectBox = $SelectFormBox.find('.view_select_box');

           if(!IsActive){
               $this.attr('title', '선택목록 닫기');
               $SelectFormBox.addClass('active');
               $ViewSelectBox.slideDown(350, 'linear');
           }
           else{
               $this.attr('title', '선택목록 열기');
               $SelectFormBox.removeClass('active');
               $ViewSelectBox.slideUp(350, 'linear');
           }
        });
        $('.search_area .select_box .select_form_box .view_select_box .view_list .view_item button').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.view_item'),
                Index = $MyItem.index(),
                $OtherItem = $MyItem.siblings('.view_item'),
                $OtherBtn = $OtherItem.find('button'),
                $HiddenSelectBox = $('.search_area .select_box .select_form_box .hidden_select_box'),
                $Select = $HiddenSelectBox.find('select'),
                $Option = $Select.find('option').eq(Index),
                $OtherOption = $Option.siblings('option'),
                $SelectChoiceBtn = $('.search_area .select_box .select_form_box .view_select_form .button_wrap .select_choice_btn'),
                $SelectFormBox = $('.search_area .select_box .select_form_box'),
                IsActive = $SelectFormBox.is('.active'),
                $ViewSelectBox = $SelectFormBox.find('.view_select_box');

            if(IsActive){
                $this.attr('title', '선택됨');
                $OtherBtn.removeAttr('title');
                $SelectChoiceBtn.empty().append($this.text());
                $SelectChoiceBtn.attr('title', '선택목록 열기');
                $OtherOption.removeAttr('selected');
                $Option.attr('selected', 'selected');
                $SelectFormBox.removeClass('active');
                $ViewSelectBox.slideUp(350, 'linear');
            }

        });
        $('.search_area .search_wrap .search_box .select_box .input_form_box .input_wrap_box .text_box input[type="text"]').focusin(function(){
            var $InputFormBox = $('.search_area .search_wrap .search_box .select_box .input_form_box');
            $InputFormBox.addClass('active');
        });
        $('.search_area .search_wrap .search_box .select_box .input_form_box .input_wrap_box .text_box input[type="text"]').focusout(function(){
            var $InputFormBox = $('.search_area .search_wrap .search_box .select_box .input_form_box');
            $InputFormBox.removeClass('active');
        });
        //강좌 및 프로그램 검색 영역 끝


        //강좌,교육 슬라이드 영역 시작
        var $EduSlide = $('.edu_area .edu_wrap .edu_slide_box .edu_slide_list');
        $EduSlide.slick({
            //기본
            autoplay : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            prevArrow : $('.edu_area .edu_wrap .edu_slide_box .edu_slide_btn_box .control_btn_box .prev'),
            nextArrow : $('.edu_area .edu_wrap .edu_slide_box .edu_slide_btn_box .control_btn_box .next'),
            pauseOnArrowClick : true,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 2,
                    slidesToScroll : 1
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    slidesToScroll : 1
                }
            }]
        });
        //강좌,교육 슬라이드 영역 끝

        //견학/체험 슬라이드 영역 시작
        var $PlaySlideWrap = $('.play_area .play_area_wrap .play_slide_total_box .play_slide_wrap'),
            $PlaySlide = $('.play_area .play_area_wrap .play_slide_total_box .play_slide_wrap .play_slide_list');

        $PlaySlide.on('init', function(event, slick, currentSlide){
            var $currentslide = $(slick.$slides[0]);
            $PlaySlideWrap.addClass('active');
        });
        $PlaySlide.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 1000,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            prevArrow : $('.play_area .play_area_wrap .play_slide_total_box .play_slide_wrap .play_slide_control_box .prev'),
            nextArrow : $('.play_area .play_area_wrap .play_slide_total_box .play_slide_wrap .play_slide_control_box .next'),
            autoArrow : $('.play_area .play_area_wrap .play_slide_total_box .play_slide_wrap .play_slide_control_box .auto'),
            pauseText : '정지',
            playText : '재생',
            pauseOnArrowClick : true,
            fade : true,
            responsive : []
        });
        $PlaySlide.on('beforeChange', function(event, slick, currentSlide) {
            var $currentslide = $(slick.$slides[currentSlide]);
            $PlaySlideWrap.removeClass('active');
            setTimeout(function(){
                $PlaySlideWrap.addClass('active');
            }, 100);
        });
        //견학/체험 슬라이드 영역 끝

        //새소식 슬라이드 영역 시작
        var $BoardSlide = $('.board .board_wrap .board_slide_wrap .board_slide_list');
        $BoardSlide.slick({
            //기본
            autoplay : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            pauseOnArrowClick : true,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 2,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true
                }
            },{
                breakpoint : 641,
                settings : {
                    variableWidth: true,
                    slidesToShow : 3,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true
                }
            },{
                breakpoint : 545,
                settings : {
                    variableWidth: true,
                    slidesToShow : 2,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true
                }
            },{
                breakpoint : 383,
                settings : {
                    variableWidth: true,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true
                }
            }]
        });
        //새소식 슬라이드 영역 끝

        //팝업존 슬라이드 영역 시작
        var $PopUpSlide = $('.popupzone .popupzone_wrap .popup_slide_wrap .popup_slide_list'),
            PopUpTotal = $('.popupzone .popupzone_wrap .popup_slide_wrap .popup_slide_control_box .countbox .total'),
            PopUpCurrent = $('.popupzone .popupzone_wrap .popup_slide_wrap .popup_slide_control_box .countbox .current');
        $PopUpSlide.slick({
            //기본
            autoplay : true,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            pauseOnHover: true,
            infinite: true,
            prevArrow : $('.popupzone .popupzone_wrap .popup_slide_wrap .popup_slide_control_box .btnbox .prev'),
            nextArrow : $('.popupzone .popupzone_wrap .popup_slide_wrap .popup_slide_control_box .btnbox .next'),
            autoArrow : $('.popupzone .popupzone_wrap .popup_slide_wrap .popup_slide_control_box .btnbox .auto'),
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


        $window.on('screen:web screen:tablet screen:phone', function(event) {
            $MainVisual.slick({
                autoplay : true
            });
        });
    });
})(jQuery);