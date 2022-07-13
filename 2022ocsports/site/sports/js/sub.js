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

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);