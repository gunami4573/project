(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //사이드
        var $container = $('#container'),
            $side = $container.find('.side'),
            $sideDepthItem = $side.find('.depth_item'),
            $sideSpy = $side.find('.spy:last');
        $sideDepthItem.on('click.menu', function (event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target,
                IsActive = $this.is('.active');

            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }

                if ($this.children('.depth').length) {
                    var $Depth = $this.children('.depth'),
                        DepthDisplay = $Depth.css('display');
                    if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
                        if (!IsActive) {
                            $this.removeClass('active_prev active_next');
                            $this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                            $this.prev('.depth_item').addClass('active_prev');
                            $this.next('.depth_item').addClass('active_next');
                        } else {
                            $this.removeClass('active');
                            $this.siblings('.depth_item').removeClass('active_prev active_next');
                        }
                        event.preventDefault();
                    }
                }
            }

            event.stopPropagation();
        }).each(function (index, element) {
            var $element = $(element);
            if ($element.children('.depth').length) {
                $element.addClass('has');
            } else {
                $element.addClass('solo');
            }
        });
        if ($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
            $sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
            $sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
        }

        //여기서부터 코드 작성해주세요

        //서브비주얼 인기검색어 슬라이드 시작
        var $PopSlideList = $('.popular .pop_slide_box .pop_slide_list'),
            $PopPrev = $('.popular .pop_control .pop_btn .prev'),
            $PopNext = $('.popular .pop_control .pop_btn .next');
        $PopSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $PopPrev,
            nextArrow : $PopNext,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            zIndex : 0,
            responsive : [{}]
        });
        //서브비주얼 인기검색어 슬라이드 끝

        //사이드 메뉴 애니메이션 시작
        var $aniSideDepth1List = $('.side .depth1 .depth1_list'),
            $aniSideDepth1Item = $aniSideDepth1List.find('.depth1_item'),
            aniSideDepth1ItemLength = $aniSideDepth1Item.length;
        setTimeout(function(){
            for(var i=0; i<aniSideDepth1ItemLength; i++){
                $aniSideDepth1Item.eq(i).css({'transition-delay':''+(i*100)+'ms'});
            }
        }, 1);
        //사이드 메뉴 애니메이션 끝

        //sns 공유하기 리스트 시작
        $('.sub_head .other_box .other_list .other_item.share button.other_btn').on('click', function(){
            var $this = $(this),
                $Share = $this.parent('.share'),
                IsActive = $Share.is('.active');
            if(!IsActive){
                $this.attr('title', 'sns 공유리스트 닫기');
                $Share.addClass('active');
            }
            else{
                $this.attr('title', 'sns 공유리스트 열기');
                $Share.removeClass('active');
            }
        });
        //sns 공유하기 리스트 끝

        //현재 URL 복사 시작
        function UrlCopy(url){
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(url).select();
            document.execCommand('copy');
            $temp.remove();
            alert('현재 URL이 복사되었습니다.');
        }
        $('.sub_head .other_box .other_list .other_item.copy button.other_btn').on('click', function(e){
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        //현재 URL 복사 끝

        //탭메뉴 시작
        var $ocTab = $('.oc_tab');
        $ocTab.each(function(){
            function FloorCheck(num){
                if(num >= 1 && num <= 5){
                    $ocTab.attr('data-floor', 1);
                }
                if(num >= 6 && num <= 10){
                    $ocTab.attr('data-floor', 2);
                }
                if(num >= 11 && num <= 15){
                    $ocTab.attr('data-floor', 3);
                }
            }
            function LengthCheck(leng){
                $ocTab.attr('data-length', leng);
            }
            var $ocTab = $(this),
                $ocTabInner = $ocTab.find('.oc_tab_inner'),
                $ocTabList = $ocTabInner.find('.oc_tab_list'),
                $ocTabItem = $ocTabList.find('.oc_tab_item'),
                ocTabItemLength = $ocTabItem.length,
                HasActiveArray = [];
            for(var i=0; i<ocTabItemLength; i++){
                HasActiveArray.push($ocTabItem.eq(i).hasClass('active'));
            }
            var HasActiveNum = HasActiveArray.indexOf(true)+1;
            $ocTab.attr('data-has-active', HasActiveNum);
            FloorCheck(HasActiveNum);
            LengthCheck(ocTabItemLength);
            var $StartActiveTabItem = $ocTabList.find('.active'),
                StartActiveTabBtnText = $StartActiveTabItem.find('.oc_tab_btn').text(),
                $StartMobileChoiceBtn = $ocTabList.siblings('button.m_oc_choice').find('span em');
            $StartMobileChoiceBtn.text(StartActiveTabBtnText);
            $ocTabItem.each(function(){
                var $TabItem = $(this),
                    $TabBtn = $TabItem.find('button.oc_tab_btn');
                $TabBtn.on('click', function(){
                    var $MyBtn = $(this),
                        $MyItem = $MyBtn.parent('.oc_tab_item'),
                        MyItemIndex = $MyItem.index()+1,
                        IsActive = $MyItem.is('.active'),
                        MyText = $MyBtn.find('span em').text(),
                        $MyList = $MyItem.parent('.oc_tab_list'),
                        $MyInner = $MyList.parent('.oc_tab_inner'),
                        $OcCts = $MyInner.siblings('.oc_cts'),
                        $MyOcCtsItem = $OcCts.find('.oc_cts_item').eq($MyItem.index()),
                        $OtherOcCtsItem = $MyOcCtsItem.siblings('.oc_cts_item'),
                        $OtherItem = $MyItem.siblings('.oc_tab_item'),
                        $OtherBtn = $OtherItem.find('button.oc_tab_btn'),
                        $MyOcMapBox = $MyOcCtsItem.find('.oc_map_box'),
                        $OtherOcMapBox = $OtherItem.find('.oc_map_box');

                    $StartMobileChoiceBtn.text(MyText);
                    $ocTab.attr('data-has-active', MyItemIndex);
                    FloorCheck(MyItemIndex);
                    if(!IsActive){
                        $OtherOcCtsItem.removeClass('active');
                        $OtherItem.removeClass('active');
                        $OtherBtn.removeAttr('title');
                        $MyOcCtsItem.addClass('active');
                        $MyItem.addClass('active');
                        $MyBtn.attr('title', '선택됨');
                        
                        //탭안에 지도
                        setTimeout(function(){
                            $MyOcMapBox.each(function(){
                                var $this = $(this),
                                    $MyMapInner = $this.find('.map_inner'),
                                    MyTimeStamp = $MyMapInner.attr('data-timestamp'),
                                    MyMapKey = $MyMapInner.attr('data-key'),
                                    $DaumRoughMap = $MyMapInner.find('.root_daum_roughmap');
                                $DaumRoughMap.empty();
                                new daum.roughmap.Lander({
                                    "timestamp" : MyTimeStamp,
                                    "key" : MyMapKey,
                                    "mapWidth" : "",
                                    "mapHeight" : ""
                                }).render();
                            });
                            $OtherOcMapBox.each(function(){
                                var $this = $(this),
                                    $OtherMapInner = $this.find('.map_inner'),
                                    $DaumRoughMap = $OtherMapInner.find('.root_daum_roughmap');
                                $DaumRoughMap.empty();
                            });
                        }, 1);
                    }
                });
            });
        });
        //모바일용 탭메뉴
        $(document).on('click', '.oc_tab .oc_tab_inner button.m_oc_choice', function(){
            var $this = $(this),
                $thisText = $this.find('span em'),
                $TabInner = $this.parent('.oc_tab_inner'),
                IsActive = $TabInner.is('.active'),
                $TabList = $TabInner.find('.oc_tab_list'),
                $TabItem = $TabList.find('.oc_tab_item'),
                $TabBtn = $TabItem.find('button.oc_tab_btn');
            if(!IsActive){
                $TabInner.addClass('active');
                $this.attr('title' , '하위 리스트 닫기');
                $TabList.slideDown(200);
                $TabBtn.on('click', function(){
                    $TabInner.removeClass('active');
                    $this.attr('title' , '하위 리스트 열기');
                    $TabList.slideUp(200);
                });
            }
            else{
                $TabInner.removeClass('active');
                $this.attr('title' , '하위 리스트 열기');
                $TabList.slideUp(200);
            }
        });

        //탭메뉴에 지도 있을 때, 호환성 고려 불필요 속성값 제거
        var $StartOcCtsItem = $('.oc_cts .oc_cts_item');
        $StartOcCtsItem.each(function(){
            var $this = $(this),
                $Script = $(this).find('script');
            $Script.removeAttr('charset');
        });
        //탭메뉴 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);