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

        //공유하기 버튼 시작
        $('.sub_head .share_box .share_layer button.share_layer_btn').on('click', function(){
            var $this = $(this),
                $ShareLayer = $this.parent('.share_layer'),
                IsShareOpen = $ShareLayer.is('.share_open');
            if(!IsShareOpen){
                $ShareLayer.addClass('share_open');
                $this.attr('title', '목록닫기');
            }
            else{
                $ShareLayer.removeClass('share_open');
                $this.attr('title', '목록열기');
            }
        });
        //공유하기 버튼 끝

        //현재 URL 복사 시작
        function UrlCopy(url){
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(url).select();
            document.execCommand('copy');
            $temp.remove();
            alert('URL이 복사되었습니다.');
        }
        $('button.url_copy').on('click', function(e){
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        //현재 URL 복사 끝

        //반응형 CMS 탭 5차메뉴 열기 버튼 시작
        $('button.tab_depth1_open').on('click', function(){
            var $this = $(this),
                $TabDepth1 = $this.parent('.tab_depth1'),
                IsTabOpen = $TabDepth1.is('.tab_open');
            if(!IsTabOpen){
                $this.attr('title', '목록 닫기');
                $TabDepth1.addClass('tab_open');
            }
            else{
                $this.attr('title', '목록 열기');
                $TabDepth1.removeClass('tab_open');
            }
        });
        //반응형 CMS 탭 5차메뉴 열기 버튼 끝

        //반응형 CMS 탭 6차메뉴 열기 버튼 시작
        $('button.tab_depth2_open').on('click', function(){
            var $Container = $('#container');
            var $this = $(this),
                $TabDepth2 = $this.parent('.tab_depth2'),
                IsTabOpen = $TabDepth2.is('.tab_open');
            if(!IsTabOpen){
                $Container.css('z-index','30');
                $this.attr('title', '목록 닫기');
                $TabDepth2.addClass('tab_open');
            }
            else{
                $Container.css('z-index','29');
                $this.attr('title', '목록 열기');
                $TabDepth2.removeClass('tab_open');
            }
        });
        //반응형 CMS 탭 6차메뉴 열기 버튼 끝

        //컨텐츠 내부 탭메뉴 시작
        $('.temp_tab_box .temp_depth .temp_tab_list .temp_tab_item button.temp_tab_link').on('click', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.temp_tab_item'),
                MyTabIndex = $MyTabItem.index(),
                IsActive = $MyTabItem.is('.active'),
                $OtherTabItem = $MyTabItem.siblings('.temp_tab_item'),
                $OtherTabBtn = $OtherTabItem.find('button.temp_tab_link'),
                $MyTabList = $MyTabItem.parent('.temp_tab_list'),
                $MyTabDepth = $MyTabList.parent('.temp_depth'),
                $MyTabBox = $MyTabDepth.parent('.temp_tab_box'),
                $TempConBox = $MyTabBox.siblings('.temp_con_box'),
                $TempConItem = $TempConBox.find('.temp_con_item').eq(MyTabIndex),
                $OtherTempConItem = $TempConItem.siblings('.temp_con_item');
            if(!IsActive){
                $OtherTabItem.removeClass('active');
                $OtherTabBtn.removeAttr('title');
                $MyTabItem.addClass('active');
                $this.attr('title', '선택됨');
                $OtherTempConItem.removeClass('active');
                $TempConItem.addClass('active');
                $MyTabDepth.removeClass('tab_open');
                $MyTabDepth.find('button.temp_depth1_open').attr('title', '목록 열기');
                var $MyText = $this.find('span em').text();
                $MyTabDepth.find('button.temp_depth1_open span em').text($MyText);
            }
        });
        $('.temp_tab_box .temp_depth button.temp_depth1_open').on('click', function(){
            var $this = $(this),
                $TempDepth1 = $this.parent('.temp_depth1'),
                IsTabOpen = $TempDepth1.is('.tab_open');
            if(!IsTabOpen){
                $this.attr('title', '목록 닫기');
                $TempDepth1.addClass('tab_open');
            }
            else{
                $this.attr('title', '목록 열기');
                $TempDepth1.removeClass('tab_open');
            }
        });
        //컨텐츠 내부 탭메뉴 끝

        //박스 높이 자동 정렬 시작(보류)
        function autoHeight(){
            var $HsgHeightBox = $('.hsg_height_box');
            $HsgHeightBox.each(function(){
                var MyHeightArray = [], i;
                var $this = $(this),
                    $HsgHeight = $this.find('.hsg_height'),
                    HsgHeightLength = $HsgHeight.length;
                for(i=0;i<HsgHeightLength;i++){
                    MyHeightArray.push($HsgHeight.eq(i).outerHeight());
                }
                $HsgHeight.outerHeight(Math.max.apply(null, MyHeightArray));
            });
        }
        //박스 높이 자동 정렬 끝(보류)


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);