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

        //템플릿 프리티프린트 영역 시작
        $('.tab_menu').not($('.prettyprint').children()).each(function () {
            var li_length = $(this).children('ul').find('li').length;
            $(this).addClass('divide' + li_length);
        });
        //템플릿 프리티프린트 영역 끝

        //반응형 테이블 시작
        $('table.table.responsive').not($('.prettyprint').children()).each(function () {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });
        //반응형 테이블 끝

        //1차 ~ 3차 메뉴 선택 시작
        var $VertiDepth = $('.verti_depth_box .verti_depth');
        $VertiDepth.each(function(){
            var $this = $(this),
                $VertiDepthBtn = $this.find('button.verti_depth_btn');
            $VertiDepthBtn.on('click', function(){
                var $Btn = $(this),
                    $MyVertiDepth = $Btn.parent('.verti_depth'),
                    IsActive = $MyVertiDepth.is('.active'),
                    $OtherVertiDepth = $MyVertiDepth.siblings('.verti_depth'),
                    $OtherBtn = $OtherVertiDepth.find('button.verti_depth_btn'),
                    $MyVertiDepthLayer = $Btn.siblings('.verti_depth_layer'),
                    $OtherVertiDepthLayer = $OtherVertiDepth.find('.verti_depth_layer');
                if(!IsActive){
                    $OtherVertiDepth.removeClass('active');
                    $OtherBtn.attr('title', '목록열기');
                    $MyVertiDepth.addClass('active');
                    $Btn.attr('title', '목록닫기');
                    $OtherVertiDepthLayer.slideUp(250, 'linear');
                    $MyVertiDepthLayer.slideDown(250, 'linear');
                }
                else{
                    $MyVertiDepth.removeClass('active');
                    $Btn.attr('title', '목록열기');
                    $MyVertiDepthLayer.slideUp(250, 'linear');
                }
            });
        });
        //1차 ~ 3차 메뉴 선택 끝

        //탭메뉴 모양 시작
        var $CmsTabBox = $('.cms_tab_box');
        $CmsTabBox.each(function(){
            var $this = $(this),
                $CmsTabList = $this.find('.cms_tab_list'),
                $CmsTabItem = $CmsTabList.find('.cms_tab_item'),
                CmsTabItemLength = $CmsTabItem.length;
            if(CmsTabItemLength === 4){
                $this.addClass('cms_depth4');
            }
            if(CmsTabItemLength === 3){
                $this.addClass('cms_depth3');
            }
            if(CmsTabItemLength === 2){
                $this.addClass('cms_depth2');
            }
            if(CmsTabItemLength === 1){
                $this.addClass('cms_depth1');
            }
        });
        //탭메뉴 모양 끝

        //탭메뉴 active 줬다 빼기 시작
        var $CmsTabBoxTempType = $('.cms_tab_box.temp_type');
        $CmsTabBoxTempType.each(function(){
            var $this = $(this),
                $TabList = $this.find('.cms_tab_list'),
                $TabItem = $TabList.find('.cms_tab_item'),
                $TabBtn = $TabItem.find('button.cms_tab_link');
            $TabBtn.on('click', function(){
                var $ThisBtn = $(this),
                    $MyTabItem = $ThisBtn.parent('.cms_tab_item'),
                    $OtherTabItem = $MyTabItem.siblings('.cms_tab_item'),
                    $OtherBtn = $OtherTabItem.find('button.cms_tab_link'),
                    MyIndex = $MyTabItem.index(),
                    IsActive = $MyTabItem.is('.active'),
                    $MyTabList = $MyTabItem.parent('.cms_tab_list'),
                    $MyTabInner = $MyTabList.parent('.cms_tab_inner'),
                    $MyTabBox = $MyTabInner.parent('.cms_tab_box.temp_type'),
                    $TabCtsBox = $MyTabBox.siblings('.tab_cts_box'),
                    $MyTabCts = $TabCtsBox.find('.tab_cts').eq(MyIndex),
                    $OtherTabCts = $MyTabCts.siblings('.tab_cts');
                if(!IsActive){
                    $OtherTabItem.removeClass('active');
                    $OtherBtn.removeAttr('title');
                    $MyTabItem.addClass('active');
                    $ThisBtn.attr('title', '선택됨');
                    $OtherTabCts.removeClass('active');
                    $MyTabCts.addClass('active');
                }
            });
        });
        //탭메뉴 active 줬다 빼기 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);