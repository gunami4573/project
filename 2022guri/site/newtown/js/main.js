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

        //공지사항 슬라이드 및 탭버튼 시작
        var $TabSlide = $('.board_total .board_total_wrap .tab_slide_wrap .tab_slide');
        $TabSlide.each(function(){
           var $TabSlideList = $(this).find('.tab_slide_list');
            $TabSlideList.slick({
                autoplay : true,
                autoplaySpeed : 3000,
                arrows : false,
                dots : false,
                slidesToShow : 2,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide: true,
                draggable : true,
                variableWidth : false,
                vertical : true, //세로모드 유무
                verticalSwiping : true, //세로일때 터치 유무
                responsive: [{}]
            });
        });
        $('.board_total .board_total_wrap .tab_box_wrap .tab_list .tab_item .tab_btn').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.tab_item'),
                IsActive = $MyItem.is('.active'),
                MyIndex = $MyItem.index(),
                $OtherItem = $('.board_total .board_total_wrap .tab_box_wrap .tab_list .tab_item').not($MyItem),
                $OtherBtn = $OtherItem.find('.tab_btn'),
                $TabSlideWrap = $('.board_total .board_total_wrap .tab_slide_wrap'),
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
        //공지사항 슬라이드 및 탭버튼 끝

        //팝업존 슬라이드 영역 시작
        var $PopUpSlide = $('.popup .popup_wrap .popup_slide_wrap .popup_slide_list'),
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





        $window.on('screen:phone', function(event) {

        });

    });
})(jQuery);