//컨텐츠 영역 프린트 함수(마크업 onclick 직접사용) 시작
function publicPrint(){
    // 프린트 할 영역 선언
    var $printContents = $('#contents');

    // 프린트 할 영역 css 선언 위함
    var $head = $('head').clone();

    // 프린트 할 영역 복사
    var $PrintContentsClone = $printContents.clone();

    // html 변환
    var headHtml = $head[0].innerHTML;
    var PrintContentsHtml = $PrintContentsClone[0].innerHTML;
    console.log(PrintContentsHtml);

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
    }, 1000);
}
//컨텐츠 영역 프린트 함수(마크업 onclick 직접사용) 끝

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

        //데코 gsap 시작
        function gsapInit(){
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                '(min-width:1001px)' : function () {
                    //cloud 시작
                    gsap.to($('.sub_deco_inner .cloud_box .cloud:nth-child(1)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12,
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : 100,
                        yPercent : 200
                    });
                    gsap.to($('.sub_deco_inner .cloud_box .cloud:nth-child(2)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : 50,
                        yPercent : -50
                    });
                    gsap.to($('.sub_deco_inner .cloud_box .cloud:nth-child(3)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : 100
                    });
                    gsap.to($('.sub_deco_inner .cloud_box .cloud:nth-child(4)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -50
                    });
                    //cloud 끝

                    //person 시작
                    gsap.to($('.sub_deco_inner .person_box .person:nth-child(1)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : 1000,
                        scale : 0,
                        rotate : 360
                    });
                    gsap.to($('.sub_deco_inner .person_box .person:nth-child(2)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -300,
                        yPercent : -100,
                        rotate : -20,
                        scale : 0
                    });
                    gsap.to($('.sub_deco_inner .person_box .person:nth-child(3)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -600,
                        skewX : 30,
                        scale : 0
                    });
                    //person 끝

                    //tree 시작
                    gsap.to($('.sub_deco_inner .tree_box .tree'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : 100
                    });
                    //tree 끝

                    //side 시작
                    gsap.to($('.side'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '10% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : -40
                    });
                    gsap.to($('.side .side_menu'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '10% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : -20
                    });
                    //side 끝

                    //space 시작
                    gsap.to($('.side_deco_inner .space_box'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '100% 100%',
                            scrub : 1.12
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -25,
                        yPercent : 3000,
                        scale : 0,
                        rotate : 45,
                        perspective : 1000
                    });
                    //space 끝
                },
                '(max-width:1000px)' : function () {

                }
            });
            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();
        //데코 gsap 끝

        //SNS 공유 레이어 열기 시작
        $('.sub_head .sub_head_top .etc_box .sns_area .share_btn').on('click', function(){
            var $this = $(this),
                $snsArea = $this.parent('.sns_area'),
                IsActive = $snsArea.is('.active'),
                $shareLayer = $snsArea.find('.share_layer');
            if(!IsActive){
                $this.attr('title', '레이어 닫기');
                $snsArea.addClass('active');
                $shareLayer.fadeIn(350, 'linear');
            }
            else{
                $this.attr('title', '레이어 열기');
                $snsArea.removeClass('active');
                $shareLayer.fadeOut(350, 'linear');
            }
        });
        //SNS 공유 레이어 열기 끝

        //현재 URL 복사 시작
        function UrlCopy(url){
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(url).select();
            document.execCommand('copy');
            $temp.remove();
            alert('현재 URL이 복사되었습니다.');
        }
        $(document).on('click', '.sub_head .sub_head_top .etc_box .sns_area .share_layer .layer_item.copy .layer_btn', function(e){
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        //현재 URL 복사 끝

        //공통 탭메뉴 시작
        var $tabBox = $('.tab_box');
        $tabBox.each(function(){
            var $thisTabBox = $(this),
                $thisTabInnerType01 = $thisTabBox.find('.tab_inner.type01'),
                $thisTabInnerType02 = $thisTabBox.find('.tab_inner.type02');
            $thisTabInnerType01.each(function(){
                var $thisInner = $(this),
                    $thisTabOpenBtn = $thisInner.find('button.tab_open_btn');
                $thisTabOpenBtn.on('click', function(){
                    var $this = $(this),
                        $TabInner = $this.parent('.tab_inner'),
                        IsActive = $TabInner.is('.active'),
                        $TabList = $TabInner.find('.tab_list'),
                        $TabItem = $TabList.find('.tab_item'),
                        $TabLink = $TabItem.find('button.tab_link');
                    if(!IsActive){
                        $TabInner.addClass('active');
                        $this.attr('title' , '메뉴 레이어 닫기');
                        $TabList.slideDown(250);
                        $TabLink.on('click', function(){
                            $TabInner.removeClass('active');
                            $this.attr('title' , '메뉴 레이어 열기');
                            $TabList.slideUp(200);
                        });
                    }
                    else{
                        $TabInner.removeClass('active');
                        $this.attr('title' , '메뉴 레이어 열기');
                        $TabList.slideUp(250);
                    }
                });
                var $thisTabLink = $thisInner.find('.tab_list .tab_item button.tab_link');
                $thisTabLink.on('click', function(){
                    var $thisTabBtn = $(this),
                        $thisTabBtnText = $thisTabBtn.find('span em').text(),
                        $thisTabItem = $thisTabBtn.parent('.tab_item'),
                        itemIndex = $thisTabItem.index(),
                        IsActive = $thisTabItem.is('.active'),
                        $thisTabList = $thisTabItem.parent('.tab_list'),
                        $thisTabInner = $thisTabList.parent('.tab_inner'),
                        $thisTabOpenText = $thisTabInner.find('button.tab_open_btn span em'),
                        $thisCtsInner = $thisTabInner.siblings('.cts_inner'),
                        $thisCtsList = $thisCtsInner.find('.cts_list'),
                        $thisCtsItem = $thisCtsList.find('.cts_item').eq(itemIndex),
                        $otherCtsItem = $thisCtsItem.siblings('.cts_item'),
                        $otherTabItem = $thisTabItem.siblings('.tab_item'),
                        $otherTabBtn = $otherTabItem.find('button.tab_link');
                    if(!IsActive){
                        $otherCtsItem.removeClass('active');
                        $otherTabItem.removeClass('active');
                        $otherTabBtn.removeAttr('title');
                        $thisCtsItem.addClass('active');
                        $thisTabItem.addClass('active');
                        $thisTabBtn.attr('title', '선택됨');
                        $thisTabOpenText.text($thisTabBtnText);
                    }
                });
            });
            $thisTabInnerType02.each(function(){
                var $thisInner = $(this),
                    $thisTabLink = $thisInner.find('.tab_list .tab_item button.tab_link');
                $thisTabLink.on('click', function(){
                    var $thisTabBtn = $(this),
                        $thisTabBtnText = $thisTabBtn.find('span em').text(),
                        $thisTabItem = $thisTabBtn.parent('.tab_item'),
                        itemIndex = $thisTabItem.index(),
                        IsActive = $thisTabItem.is('.active'),
                        $thisTabList = $thisTabItem.parent('.tab_list'),
                        $thisTabInner = $thisTabList.parent('.tab_inner'),
                        $thisTabOpenText = $thisTabInner.find('button.tab_open_btn span em'),
                        $thisCtsInner = $thisTabInner.siblings('.cts_inner'),
                        $thisCtsList = $thisCtsInner.find('.cts_list'),
                        $thisCtsItem = $thisCtsList.find('.cts_item').eq(itemIndex),
                        $otherCtsItem = $thisCtsItem.siblings('.cts_item'),
                        $otherTabItem = $thisTabItem.siblings('.tab_item'),
                        $otherTabBtn = $otherTabItem.find('button.tab_link');
                    if(!IsActive){
                        $otherCtsItem.removeClass('active');
                        $otherTabItem.removeClass('active');
                        $otherTabBtn.removeAttr('title');
                        $thisCtsItem.addClass('active');
                        $thisTabItem.addClass('active');
                        $thisTabBtn.attr('title', '선택됨');
                        $thisTabOpenText.text($thisTabBtnText);
                    }
                });
            });
        });
        //공통 탭메뉴 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);