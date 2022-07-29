//파라미터 읽기 시작
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//파라미터 읽기 끝

(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {
        var active = getParameterByName('active');

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

        $('.tab_menu').not($('.prettyprint').children()).each(function () {
            var li_length = $(this).children('ul').find('li').length;
            $(this).addClass('divide' + li_length);
        });

        //컨텐츠 탭메뉴 시작
        $('.cts_tab_menu_box .tab_menu_list .tab_menu_item button.tab_menu_link').on('click', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.tab_menu_item'),
                IsActive = $MyTabItem.is('.cts_active'),
                Index = $MyTabItem.index(),
                $OtherTabItem = $MyTabItem.siblings('.tab_menu_item'),
                $OtherBtn = $OtherTabItem.find('button.tab_menu_link'),
                $TabMenuList = $MyTabItem.parent('.tab_menu_list'),
                $CtsTabMenuBox = $TabMenuList.parent('.cts_tab_menu_box'),
                $CtsTabContentBox = $CtsTabMenuBox.siblings('.cts_tab_content_box'),
                $TabContentList = $CtsTabContentBox.find('.tab_content_list'),
                $TabContentItem = $TabContentList.find('.tab_content_item').eq(Index),
                $OtherTabContentItem = $TabContentItem.siblings('.tab_content_item');
            if(!IsActive){
                $OtherTabItem.removeClass('cts_active');
                $OtherBtn.removeAttr('title');
                $OtherTabContentItem.removeClass('cts_active');

                $MyTabItem.addClass('cts_active');
                $this.attr('title','선택됨');
                $TabContentItem.addClass('cts_active');
            }
        });
        //컨텐츠 탭메뉴 끝

        //반응형 테이블 시작
        $('table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });
        //반응형 테이블 끝

        //컨텐츠 스크롤 효과 시작
        $('.waypoint').waypoint(function(direction) {
            $(this.element)[(direction === 'down') ? 'addClass' : 'removeClass']('active');
        }, {
            offset : '90%'
        });
        //컨텐츠 스크롤 효과 끝

        //play_tab_menu_box 자동높이설정
        var activeBox = $('.play_content.active'),
            activeHeight = activeBox.height(),
            tabHeight = $('.play_tab_menu_box .inner').height();
        $('.play_tab_menu_box').height(activeHeight + tabHeight);

        var lastWidth = $(window).width();
        $(window).resize(function() {
            var result = Math.abs(lastWidth - $(window).width());
            if(result > 50) {
                var activeBox = $('.play_content.active'),
                    activeHeight = activeBox.height(),
                    tabHeight = $('.play_tab_menu_box .inner').height();
                $('.play_tab_menu_box').height(activeHeight + tabHeight);
                lastWidth = $(window).width();
            }
        });
        //play_tab_menu_box 자동높이설정 끝

        //경기종목 전용 탭메뉴 리뉴얼 시작
        var $PlayTabInner = $('.play_tab_menu_box .inner'),
            $PlayTabMobileBtn = $PlayTabInner.find('.play_m_tab_btn');
        $PlayTabMobileBtn.on('click', function(){
            var $this = $(this),
                $PlayTabInner = $this.parent('.inner'),
                IsActive = $PlayTabInner.is('.active');
            if (!IsActive) {
                $this.next('.hidden_layer').stop().slideDown('250', 'easeOutExpo');
                $PlayTabInner.addClass('active');
            } else {
                $this.next('.hidden_layer').stop().slideUp('250', 'easeOutExpo');
                $PlayTabInner.removeClass('active');
            };
        });
        var $PlayTabMenuBox = $('.play_tab_menu_box');
        $PlayTabMenuBox.each(function(index, element){
            var $PlayTabMenuButton = $(element).find('.play_tab_btn'),
                $PlayTabMenuContent = $(element).find('.play_content');
            $PlayTabMenuButton.on('click', function(){
                var $this = $(this),
                    index = $PlayTabMenuButton.index(this),
                    TabButtonText = $this.text(),
                    IsTabAll = $this.is('.tab_all'),
                    $HiddenLayer = $this.parents('.hidden_layer'),
                    $PlayTabMenuBox_menu = $this.parents('.inner');
                $this.attr('title', '선택됨').closest('.play_tab_item').addClass('active').siblings('.play_tab_item').removeClass('active').find('.play_tab_btn').removeAttr('title');
                $this.parents('.play_tab_menu_box').find('.play_m_tab_btn').attr('title','탭 메뉴 열기');
                $this.parents('.play_tab_menu_box').find('.play_m_tab_btn .text').text(TabButtonText);
                $PlayTabMenuContent.eq(index).addClass('active').siblings('.play_content').removeClass('active');

                var activeBox = $('.play_content.active'),
                    activeHeight = activeBox.height(),
                    tabHeight = $('.play_tab_menu_box .inner').height();
                $('.play_tab_menu_box').height(activeHeight + tabHeight);

                var $PlayTabMenuContentMap = $PlayTabMenuContent.eq(index).find('.map_area'),
                    $OtherPlayTabMenuContentMap = $PlayTabMenuContent.eq(index).siblings('.play_content').find('.map_area');

                if($OtherPlayTabMenuContentMap.length){
                    $OtherPlayTabMenuContentMap.empty();
                }
                if($PlayTabMenuContentMap.length){
                    $PlayTabMenuContentMap.each(function(){
                        var $this = $(this),
                            MyMapLat = $this.attr('data-lat'),
                            MyMapLng = $this.attr('data-lng');
                        $this.empty();
                        $this.checkMap({
                            lat : MyMapLat,
                            lng : MyMapLng
                        });
                    });
                }
                if ($window.width() <= 1000) {
                    $PlayTabMenuBox_menu.removeClass('active');
                    $HiddenLayer.slideUp();
                };
                if ($window.width() <= 1000 && IsTabAll) {
                    $PlayTabMenuBox_menu.removeClass('active');
                    $HiddenLayer.slideUp();
                };
            });
        });
        if(active){
            $('.play_tab_menu_box .inner .play_tab_list .play_tab_item').eq(active-1).find('button.play_tab_btn').click();
        }
        //경기종목 전용 탭메뉴 리뉴얼 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);