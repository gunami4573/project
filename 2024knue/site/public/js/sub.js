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
                IsActive = $this.is('.active'),
                ThisIsLink = $this.is('.link');

            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }

                if ($this.children('.depth').length) {
                    if (!ThisIsLink) {
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

        //현재메뉴 데코 시작
        $('.sub_head .head_top .head_title_box').append('<i class="deco"></i>');
        //현재메뉴 데코 끝

        //sub_head 메뉴 시작
        var $PathTabInnerDepth = $('.sub_head .path_box .tab_wrap .inner_depth');
        $PathTabInnerDepth.each(function(){
            var $this = $(this),
                $innerBtn = $this.find('button.inner_btn');
            $innerBtn.on('click', function(){
                var $thisBtn = $(this),
                    $MyinnerDetph = $thisBtn.parent('.inner_depth'),
                    IsActive = $MyinnerDetph.is('.active'),
                    $innerList = $thisBtn.siblings('.inner_list');
                if(!IsActive){
                    $MyinnerDetph.addClass('active');
                    $thisBtn.attr('title', '메뉴 리스트 닫기');
                    $innerList.slideDown('300', 'swing');
                }
                else{
                    $MyinnerDetph.removeClass('active');
                    $thisBtn.attr('title', '메뉴 리스트 열기');
                    $innerList.slideUp('300', 'swing');
                }
            });
        });
        //sub_head 메뉴 끝
        
        //공유하기 리스트 시작
        var $ShareBtn = $('.etc_list .etc_item button.share');
        $ShareBtn.on('click', function(){
            var $this = $(this),
                $MyEtcItem = $this.parent('.etc_item'),
                IsActive = $MyEtcItem.is('.active'),
                $ShareList = $this.siblings('.share_list');
            if(!IsActive){
                $this.attr('title', '공유 리스트 닫기');
                $MyEtcItem.addClass('active');
                $ShareList.slideDown('150', 'swing');
            }
            else{
                $this.attr('title', '공유 리스트 열기');
                $MyEtcItem.removeClass('active');
                $ShareList.slideUp('150', 'swing');
            }
        });
        //공유하기 리스트 끝

        //프린트하기 시작
        $('.etc_list .etc_item button.print').on('click', function(){
            // 프린트 할 영역 선언
            var $printContents = $('#contents');

            // 프린트 할 영역 css 선언 위함
            var $head = $('head').clone();

            // 프린트 할 영역 복사
            var $PrintContentsClone = $printContents.clone();

            // html 변환
            var headHtml = $head[0].innerHTML;
            var PrintContentsHtml = $PrintContentsClone[0].innerHTML;

            // 새창 브라우저 너비 , 높이 ,가운데 위치 값 선언
            // ( ★주의★ 모니터 두개 이상 사용시 메인 모니터 에서만 가운데 정렬 됨 )
            var printWindowWidth = 1000;
            var printWindowHeight = 700;
            var printWindowTop = (window.screen.height / 2) - (printWindowHeight / 2);
            var printWindowLeft = (window.screen.width / 2) - (printWindowWidth / 2);

            // 새창으로 띄울 브라우저 변수에 담은 후 너비 , 높이 , 가운데 위치 값 지정
            var printWindow = window.open("/", "_blank", 'width=' + printWindowWidth + ', height=' + printWindowHeight + ', top=' + printWindowTop + ', left=' + printWindowLeft + '');

            // 새창으로 띄울 브라우저 문서 doctype 작성
            printWindow.document.write(
                '<!DOCTYPE html>' +
                '<html>' +
                    '<head>' +
                        headHtml +
                    '</head>' +
                    '<body id="body" class="print_body">' +
                        PrintContentsHtml +
                    '</body>' +
                '</html>'
            );
            printWindow.focus();
            setTimeout(function(){
                printWindow.print();
                printWindow.close();
            }, 500);
        });
        //프린트하기 끝

        //CMS 탭 type01 메뉴 시작
        var $Type01TabList = $('.tab_box.type01 .tab_list');
        $Type01TabList.each(function(){
            var $this = $(this),
                $thisBox = $this.parent('.tab_box'),
                $thisItem = $this.find('.tab_item'),
                ItemLength = $thisItem.length;
            if(ItemLength == 1){
                $thisBox.attr('data-length', 1);
            }
            if(ItemLength == 2){
                $thisBox.attr('data-length', 2);
            }
            if(ItemLength == 3){
                $thisBox.attr('data-length', 3);
            }
            if(ItemLength == 4){
                $thisBox.attr('data-length', 4);
            }
            if(ItemLength >= 5){
                $thisBox.attr('data-length', 5);
            }
        });

        $(document).on('click', '.tab_box.type01 button.tab_btn', function(){
            var $this = $(this),
                $MyBox = $this.parent('.tab_box'),
                IsActive = $MyBox.is('.active'),
                $MyTabList = $this.siblings('.tab_list');
            if(!IsActive){
                $MyBox.addClass('active');
                $this.attr('title', '탭메뉴 리스트 닫기');
                $MyTabList.slideDown('150', 'swing');
            }
            else{
                $MyBox.removeClass('active');
                $this.attr('title', '탭메뉴 리스트 열기');
                $MyTabList.slideUp('150', 'swing');
            }
        });
        //CMS 탭 type01 메뉴 끝

        //CMS 탭 type02 메뉴 시작
        $(document).on('click', '.tab_box.type02 button.tab_btn', function(){
            var $this = $(this),
                $MyBox = $this.parent('.tab_box'),
                IsActive = $MyBox.is('.active'),
                $MyTabList = $this.siblings('.tab_list');
            if(!IsActive){
                $MyBox.addClass('active');
                $this.attr('title', '탭메뉴 리스트 닫기');
                $MyTabList.slideDown('150', 'swing');
            }
            else{
                $MyBox.removeClass('active');
                $this.attr('title', '탭메뉴 리스트 열기');
                $MyTabList.slideUp('150', 'swing');
            }
        });
        //CMS 탭 type02 메뉴 끝

        //탭 컨텐츠 영역 사용 시작
        var $ctsTotal = $('.cts_total');
        $ctsTotal.each(function(){
            var $this = $(this),
                $tabLink = $this.find('button.tab_link');
            $tabLink.on('click', function(){
                var $thisBtn = $(this),
                    $thisBtnSpan = $thisBtn.find('span'),
                    thisBtnEm = $thisBtnSpan.find('em').text(),
                    $MyTabItem = $thisBtn.parent('.tab_item'),
                    $OtherTabItem = $MyTabItem.siblings('.tab_item'),
                    $OtherTabBtn = $OtherTabItem.find('.tab_link'),
                    MyTabIndex = $MyTabItem.index(),
                    IsActive = $MyTabItem.is('.active'),
                    $MyTabList = $MyTabItem.parent('.tab_list'),
                    $MyTabBox = $MyTabList.parent('.tab_box'),
                    $mobileTabBtn = $MyTabBox.find('button.tab_btn'),
                    $mobileTabBtnSpan = $mobileTabBtn.find('span'),
                    $mobileTabBtnEm = $mobileTabBtnSpan.find('em'),
                    $CtsBox = $MyTabBox.siblings('.cts_box'),
                    $MyCtsItem = $CtsBox.find('.cts_item').eq(MyTabIndex),
                    $OtherCtsItem = $CtsBox.find('.cts_item').not($MyCtsItem);
                if(!IsActive){
                    $mobileTabBtn.attr('title', '탭메뉴 리스트 열기');
                    $mobileTabBtnEm.text(thisBtnEm);
                    $MyTabList.slideUp('150', 'swing');
                    $OtherCtsItem.removeClass('active');
                    $OtherTabItem.removeClass('active');
                    $OtherTabBtn.removeAttr('title');
                    $MyTabBox.removeClass('active');
                    $MyCtsItem.addClass('active');
                    $MyTabItem.addClass('active');
                    $thisBtn.attr('title', '선택됨');
                    $('.waypoint').waypoint(function(direction) {
                        $(this.element)[(direction === 'down') ? 'addClass' : 'removeClass']('active');
                    }, {offset : '100%'});
                }
            });
        });
        //탭 컨텐츠 영역 사용 끝

        //컨텐츠 스크롤 효과 시작
        $('.waypoint').waypoint(function(direction) {
            $(this.element)[(direction === 'down') ? 'addClass' : 'removeClass']('active');
        }, {offset : '100%'});
        //컨텐츠 스크롤 효과 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);