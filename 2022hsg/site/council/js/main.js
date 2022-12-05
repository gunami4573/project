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

        //스크롤 애니메이션 시작
        var $ScrollGroup = $('.scroll_group');
        $window.on('scroll', function(event){
            var ScrollLocation = document.documentElement.scrollTop;
            $ScrollGroup.each(function(){
                var $this = $(this),
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top;
                if(ScrollLocation + 600 > ThisOffSetTop){
                    $this.addClass('scroll_ani');
                }
            });
        });
        //스크롤 애니메이션 끝

        //비주얼 탭 및 슬라이드 시작
        var $VisualConItem = $('.visual .visual_wrap .visual_con_list .visual_con_item');
        $VisualConItem.each(function(){
            var $this = $(this),
                $ImgTypeVisualSlideList = $this.find('.visual_slide_wrap.img_type .visual_slide_list'),
                $PersonTypeVisualSlideList = $this.find('.visual_slide_wrap.person_type .visual_slide_list');
            $ImgTypeVisualSlideList.on('init', function(event, slick, currentSlide){
                var $currentslide = $(slick.$slides[0]);
                setTimeout(function(){
                    $ImgTypeVisualSlideList.addClass('title_loading');
                    $currentslide.addClass('img_scale');
                }, 1);
                setTimeout(function(){
                    $html.addClass('hsg_council');
                }, 200);
            });
            $ImgTypeVisualSlideList.slick({
                autoplay : true,
                autoplaySpeed : 4000,
                speed : 2000,
                dots : true,
                appendDots: $('.visual_slide_wrap.img_type .visual_slide_control .dot_box'),
                dotsClass:'slick-dots clearfix',
                customPaging : function(slider, i) {
                    var thumb = $(slider.$slides[i]).attr('data-thum');
                    return '<button type="button"><span class="text">0'+(i + 1)+'</span><span class="skip">번 보기</span></button>';
                },
                arrows : false,
                autoArrow : $('.visual_slide_wrap.img_type .visual_slide_control .auto'),
                pauseText : '정지',
                playText : '재생',
                slidesToShow : 1,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                fade : true,
                pauseOnHover : true,
                pauseOnFocus : true,
                responsive: [{}]
            });
            $ImgTypeVisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                var $currentslide = $(slick.$slides[currentSlide]),
                    $nextslide = $(slick.$slides[nextSlide]);
                setTimeout(function(){
                    $currentslide.removeClass('img_scale');
                    $nextslide.addClass('img_scale');
                }, 1);
            });

            $PersonTypeVisualSlideList.slick({
                autoplay : true,
                dots : false,
                arrows : false,
                slidesToShow : 1,
                slidesPerRow : 7,
                slidesToScroll : 1,
                infinite : false,
                swipe : false,
                swipeToSlide : false,
                draggable : false,
                zIndex : 1,
                variableWidth : true,
                pauseOnHover : true,
                pauseOnFocus : true,
                responsive: [{
                    breakpoint : 1001,
                    settings : {
                        vertical : true, //세로모드 유무
                        verticalSwiping : true, //세로일때 터치 유무
                        slidesToShow : 4,
                        slidesPerRow : 1,
                        infinite : true,
                        swipe : true,
                        swipeToSlide : true,
                        draggable : true,
                        variableWidth : false
                    }
                }]
            });
        });
        $('.visual .visual_wrap .visual_tab_list .visual_tab_item button.visual_tab_btn').on('click', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.visual_tab_item'),
                IsActive = $MyTabItem.is('.active'),
                MyTabItemIndex = $MyTabItem.index(),
                $OtherTabItem = $MyTabItem.siblings('.visual_tab_item'),
                $OtherTabBtn = $OtherTabItem.find('button.visual_tab_btn'),
                $VisualTabList = $MyTabItem.parent('.visual_tab_list'),
                $VisualConList = $VisualTabList.siblings('.visual_con_list'),
                $MyConItem = $VisualConList.find('.visual_con_item').eq(MyTabItemIndex),
                $OtherConItem = $MyConItem.siblings('.visual_con_item'),
                $MySlideList = $MyConItem.find('.visual_slide_list');
            if(IsActive){
                $OtherTabItem.addClass('active');
                $MyTabItem.removeClass('active');
                $OtherConItem.removeClass('active');
                $OtherConItem.removeClass('ani_active');
                setTimeout(function(){
                    $MyConItem.addClass('ani_active');
                }, 100);
                $MyConItem.addClass('active');
                $MySlideList.slick('setPosition');
            }
        });
        //비주얼 탭 및 슬라이드 끝

        //비주얼 주차 선택 시작
        //초기 옵션값에 텍스트 밀어넣기
        var Index,
            $FakeSelectBox = $('.visual_daily_box .daily_inner .daily_select_box .fake_select_box'),
            $FakeSelectList = $FakeSelectBox.find('.fake_select_list'),
            $FakeSelectItem = $FakeSelectList.find('.fake_select_item'),
            $FakeSelectItemActive = $FakeSelectItem.siblings('.fake_select_item.active'),
            StartFakeSelectItemActiveIndex = $FakeSelectItemActive.index(),
            FakeSelectLength = $FakeSelectItem.length,
            $RealSelect = $FakeSelectBox.find('select'),
            $RealOption = $RealSelect.find('option'),
            $StartRealOption = $RealSelect.find('option').eq(StartFakeSelectItemActiveIndex);
        $StartRealOption.attr('selected', 'selected');
        setTimeout(function(){
            for(Index=0; Index<=FakeSelectLength; Index++){
                $RealOption.eq(Index).empty().append($FakeSelectItem.eq(Index).text());
            }
        }, 1);
        //가짜 셀렉트 목록 열기
        $('.visual_daily_box .daily_inner .daily_select_box .fake_select_box button.fake_select_btn').on('click', function(){
            var $this = $(this),
                $ThisFakeSelectBox = $this.parent('.fake_select_box'),
                $ThisFakeSelectList = $ThisFakeSelectBox.find('.fake_select_list'),
                IsActive = $ThisFakeSelectBox.is('.active');
            if(!IsActive){
                $ThisFakeSelectBox.addClass('active');
                $ThisFakeSelectList.slideDown(250);
                $this.attr('title', '목록닫기');
            }
            else{
                $ThisFakeSelectBox.removeClass('active');
                $ThisFakeSelectList.slideUp(250);
                $this.attr('title', '목록열기');
            }
        });
        //가짜 셀렉트 목록 열린 버튼 클릭시
        $(document).on('click', '.visual_daily_box .daily_inner .daily_select_box .fake_select_box .fake_select_list .fake_select_item button.fake_select_choice', function(){
            var $this = $(this),
                $ThisText = $this.text(),
                $MySelectItem = $this.parent('.fake_select_item'),
                MySelectItemIndex = $MySelectItem.index(),
                IsActive = $MySelectItem.is('.active'),
                $OtherSelectItem = $MySelectItem.siblings('.fake_select_item'),
                $OtherSelectChoice = $OtherSelectItem.find('button.fake_select_choice'),
                $FakeSelectList = $MySelectItem.parent('.fake_select_list'),
                $OpenFakeSelectBox = $FakeSelectList.parent('.fake_select_box'),
                $FakeSelectBtn = $FakeSelectList.siblings('button.fake_select_btn'),
                $FakeSelectBtnText = $FakeSelectBtn.find('em'),
                $MyTagSelect = $OpenFakeSelectBox.find('select'),
                $MyTagOption = $MyTagSelect.find('option').eq(MySelectItemIndex),
                $OtherTagOption = $MyTagOption.siblings('option'),
                $SelectInner = $OpenFakeSelectBox.parent('.select_inner'),
                $DailySelectBox = $SelectInner.parent('.daily_select_box'),
                $DailyCalendarBox = $DailySelectBox.siblings('.daily_calendar_box'),
                $CalendarList = $DailyCalendarBox.find('.calendar_list'),
                $CalendarItem = $CalendarList.find('.calendar_item').eq(MySelectItemIndex),
                $OtherCalendarItem = $CalendarItem.siblings('.calendar_item');
            if(!IsActive){
                $OtherTagOption.removeAttr('selected');
                $MyTagOption.attr('selected', 'selected');
                $OtherSelectItem.removeClass('active');
                $MySelectItem.addClass('active');
                $OtherSelectChoice.removeAttr('title');
                $this.attr('title', '선택됨');
                $OpenFakeSelectBox.removeClass('active');
                $FakeSelectList.slideUp(250);
                $FakeSelectBtn.attr('title', '목록열기');
                $FakeSelectBtnText.empty().text($ThisText);
                $OtherCalendarItem.removeClass('active');
                $CalendarItem.addClass('active');
            }
        });
        //비주얼 주차 선택 끝

        //자주 찾는 서비스 슬라이드 시작
        var $ServiceSlideList = $('.service .service_wrap .service_slide_wrap .service_slide_list');
        $ServiceSlideList.slick({
            autoplay : false,
            autoplaySpeed : 4000,
            speed : 2000,
            arrows : true,
            prevArrow : $('.service .service_wrap .service_slide_wrap .service_slide_control .prev'),
            nextArrow : $('.service .service_wrap .service_slide_wrap .service_slide_control .next'),
            slidesToShow : 1,
            rows : 1,
            slidesPerRow : 8,
            slidesToScroll : 1,
            infinite : true,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            zIndex : 1,
            pauseOnHover : true,
            pauseOnFocus : true,
            variableWidth : true,
            responsive: [{}]
        });
        //자주 찾는 서비스 슬라이드 끝

        //(의회소식, 의정활동, 주간동정)게시판 슬라이드 시작
        var $TotalConItem = $('.board .board_wrap .total_wrap .total_con_list .total_con_item');
        $TotalConItem.each(function(){
            var $this = $(this),
                $TotalSlideWrap = $this.find('.total_slide_wrap'),
                $TotalSlideList = $TotalSlideWrap.find('.total_slide_list');
            $TotalSlideList.slick({
                autoplay : true,
                autoplaySpeed : 4000,
                dots : false,
                arrows : false,
                slidesToShow : 3,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                pauseOnFocus : true,
                vertical : true, //세로모드 유무
                verticalSwiping : true, //세로일때 터치 유무
                responsive: [{}]
            });
            $TotalSlideList.on('wheel', function(e){
                e.preventDefault();
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickPrev');
                } else {
                    $(this).slick('slickNext');
                }
            });
        });
        //(의회소식, 의정활동, 주간동정)게시판 슬라이드 끝

        //(의회소식, 의정활동, 주간동정)게시판 탭메뉴 시작
        $('.board .board_wrap .total_wrap .total_tab_list .total_tab_item button.total_tab_btn').on('click', function(){
            var $this = $(this),
                $MyTotalTabItem = $this.parent('.total_tab_item'),
                IsActive = $MyTotalTabItem.is('.active'),
                MyTotalTabItemIndex = $MyTotalTabItem.index(),
                $OtherTotalTabItem = $MyTotalTabItem.siblings('.total_tab_item'),
                $OtherTotalTabBtn = $OtherTotalTabItem.find('button.total_tab_btn'),
                $TotalTabList = $MyTotalTabItem.parent('.total_tab_list'),
                $TotalConList = $TotalTabList.siblings('.total_con_list'),
                $MyTotalConItem = $TotalConList.find('.total_con_item').eq(MyTotalTabItemIndex),
                $OtherTotalConItem = $MyTotalConItem.siblings('.total_con_item'),
                $MyTotalSlideWrap = $MyTotalConItem.find('.total_slide_wrap'),
                $MyTotalSlideList = $MyTotalSlideWrap.find('.total_slide_list');
            if(!IsActive){
                $OtherTotalTabItem.removeClass('active');
                $MyTotalTabItem.addClass('active');
                $OtherTotalTabBtn.removeAttr('title');
                $this.attr('title', '선택됨');
                $OtherTotalConItem.removeClass('active');
                $MyTotalConItem.addClass('active');
                $MyTotalSlideList.slick('setPosition');
            }
        });
        //(의회소식, 의정활동, 주간동정)게시판 탭메뉴 끝

        //(갤러리)게시판 슬라이드 시작
        var $GallerySlideList = $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_list');
        $GallerySlideList.slick({
            autoplay : false,
            autoplaySpeed : 3000,
            dots : false,
            arrows : true,
            prevArrow : $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control .prev'),
            nextArrow : $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control .next'),
            slidesToShow : 3,
            slidesToScroll : 1,
            infinite : true,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            zIndex : 1,
            pauseOnHover : true,
            pauseOnFocus : true,
            variableWidth : true,
            responsive: [{
                breakpoint : 1451,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1111,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control .prev').on('mouseover', function(){
            $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control').addClass('prev_over');
        });
        $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control .prev').on('mouseleave', function(){
            $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control').removeClass('prev_over');
        });
        $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control .next').on('mouseover', function(){
            $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control').removeClass('prev_over');
        });
        $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control .next').on('mouseleave', function(){
            $('.gallery .gallery_wrap .gallery_slide_wrap .gallery_slide_control').removeClass('prev_over');
        });
        //(갤러리)게시판 슬라이드 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);