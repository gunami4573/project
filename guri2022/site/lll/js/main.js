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

        //바로가기 영역 슬라이드 시작
        var $QuickSlide = $('.quick_area .quick_area_wrap .quick_slide_wrap .quick_slide_list');
        $QuickSlide.slick({
            autoplay : false,
            dots : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 6,
            slidesToScroll : 1,
            infinite : true,
            prevArrow : $('.quick_area .quick_area_wrap .quick_slide_wrap .quick_slide_control_box .prev'),
            nextArrow : $('.quick_area .quick_area_wrap .quick_slide_wrap .quick_slide_control_box .next'),
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 5
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 3
                }
            }]
        });
        //바로가기 영역 슬라이드 끝


        //새로운 프로그램 영역 슬라이드 시작
        var $NewProgramSlide = $('.new_program .new_program_wrap .new_program_slide_wrap .new_program_slide_list');
        $NewProgramSlide.slick({
            autoplay : false,
            arrows : false,
            dots : true,
            appendDots: $('.new_program .new_program_wrap .new_program_slide_wrap .new_program_control_box'),
            dotsClass:'slick-dots clearfix',
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).attr('data-thum');
                return '<button type="button"><span>'+(i + 1)+'번 보기</span></button>';
            },
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 4,
            slidesToScroll : 1,
            infinite : true,
            variableWidth : false,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 3,
                    variableWidth : true
                }
            },{
                breakpoint : 871,
                settings : {
                    slidesToShow : 2,
                    variableWidth : true
                }
            },{
                breakpoint : 521,
                settings : {
                    slidesToShow : 1,
                    variableWidth : true
                }
            }]
        });
        //새로운 프로그램 영역 슬라이드 끝

        //팝업존 슬라이드 영역 시작
        var $PopUpSlide = $('.popup .popup_wrap .popup_slide_wrap .popup_slide_list'),
            PopUpTotal = $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .countbox .total'),
            PopUpCurrent = $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .countbox .current');
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
            prevArrow : $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .btnbox .prev'),
            nextArrow : $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .btnbox .next'),
            autoArrow : $('.popup .popup_wrap  .popup_slide_wrap .popup_slide_control_box .btnbox .auto'),
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

        //포토앨범 게시판 슬라이드 영역 시작
        var $PhotoBoardSlide = $('.photo_board .photo_board_wrap .photo_board_slide_wrap .photo_board_slide_list');
        $PhotoBoardSlide.slick({
            autoplay : false,
            arrows : false,
            dots : true,
            appendDots: $('.photo_board .photo_board_wrap .photo_board_slide_wrap .photo_board_slide_control_box'),
            dotsClass:'slick-dots clearfix',
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).attr('data-thum');
                return '<button type="button"><span>'+(i + 1)+'번 보기</span></button>';
            },
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : false,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow : 2
                }
            },{
                breakpoint : 641,
                settings : {
                    variableWidth : true,
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow : 1
                }
            }]
        });
        //포토앨범 게시판 슬라이드 영역 끝

        //구리시 평생학습지도 영역 시작
        var $MapContents = $('.map_area .map_area_wrap .map_area_inner .select_link'),
            MapContentsUrl = $MapContents.attr('href');
        $('.map_real_box img[usemap]').rwdImageMaps();//이미지맵 반응형 실행(반응형일때 사용)
        //지도영역 클릭 시작
        var SelectedMap = 0;
        $('#Map area').click(function(){
            var AreaIndex = $(this).index() + 1,
                AreaAlt = $(this).attr('alt'),
                TabIndex = 0;
            SelectedMap = AreaIndex;
            TabIndex = SelectedMap - 1;
            $('.mapImg').attr('alt', '구리시 지도 '+AreaAlt+' 선택됨');
            $('.mapImg').attr('src', '/project/guri2022/site/lll/images/main/real_map_img'+AreaIndex+'.png');
            $MapContents.attr('href', MapContentsUrl + '&active=' + AreaIndex);
            $('.map_select_box .select_inner .select_btn').empty().text(AreaAlt);
            $('.map_select_box .select_inner').removeClass('active');
            $('.map_select_box .select_inner .map_layer').slideUp(100, 'linear');
            $('.map_select_box .select_inner .map_layer .map_layer_list .map_layer_item .map_layer_btn').removeAttr()
            $('.map_select_box .select_inner .map_layer .map_layer_list .map_layer_item').eq(TabIndex).find('.map_layer_btn').attr('title', '선택됨');
            return false;
        });
        //지도영역 클릭 끝

        //셀렉트영역 열고닫기 시작
        $('.map_area_inner .map_select_box .select_inner .select_btn').on('click', function(){
            var $this = $(this),
                $SelectInner = $this.parent('.select_inner'),
                $MapLayer = $SelectInner.find('.map_layer'),
                IsActive = $SelectInner.is('.active');
            if(!IsActive){
                $this.attr('title', '동 선택 레이어 닫기');
                $SelectInner.addClass('active');
                $MapLayer.slideDown(100, 'linear');
            }
            else{
                $this.attr('title', '동 선택 레이어 열기');
                $SelectInner.removeClass('active');
                $MapLayer.slideUp(100, 'linear');
            }
        });
        //셀렉트영역 열고닫기 끝

        //셀렉트 지도 연동 스크립트 시작
        $('.map_select_box .map_layer .map_layer_list .map_layer_item .map_layer_btn').on('click', function(){
           var $this = $(this),
               ThisText = $this.text(),
               $MapLayerItem = $this.parent('.map_layer_item'),
               $OtherMapLayerItem = $('.map_select_box .map_layer .map_layer_list .map_layer_item').not($MapLayerItem),
               $OtherBtn = $OtherMapLayerItem.find('.map_layer_btn'),
               Index = $MapLayerItem.index(),
               MapIndex = Index + 1,
               $MapSelectBox = $this.parents('.map_select_box'),
               $SelectInner = $MapSelectBox.find('.select_inner'),
               IsActive = $SelectInner.is('.active'),
               $MapLayer = $SelectInner.find('.map_layer'),
               $SelectBtn = $SelectInner.find('.select_btn'),
               $MapRealBox = $MapSelectBox.siblings('.map_real_box'),
               $Map = $MapRealBox.find('#Map'),
               $MapImg = $Map.siblings('.mapImg'),
               MapArea = $Map.find('area').eq(Index).attr('alt');

           $MapImg.attr('alt', '구리시 지도 '+MapArea+' 선택됨');
           $MapImg.attr('src', '/project/guri2022/site/lll/images/main/real_map_img'+MapIndex+'.png');
           if(IsActive){
               $this.attr('title', '선택됨');
               $OtherBtn.removeAttr('title');
               $SelectBtn.empty().text(ThisText);
               $SelectBtn.attr('title', '동 선택 레이어 열기');
               $SelectInner.removeClass('active');
               $MapLayer.slideUp(100, 'linear');
               $MapContents.attr('href', MapContentsUrl + '&active=' + MapIndex);
           }
        });
        //셀렉트 지도 연동 스크립트 끝
        //구리시 평생학습지도 영역 끝




        $window.on('screen:phone', function(event) {

        });

    });
})(jQuery);