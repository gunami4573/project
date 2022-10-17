// 탭메뉴 공통적으로 사용
function tabOn(tab, num, img) {
    var $tab, $tab_btn;
    var tabid = tab, n = num - 1, btn_img = img;

    $tab = $(tabid + '> ul > li');
    $tab_btn = $(tabid + '> ul > li > a');

    $tab_btn.siblings().hide();
    $tab.eq(n).addClass('active');
    $tab.eq(n).children('a').siblings().show();

    if (btn_img == 'img') {
        var btn = $tab.eq(n).children('a').find("img");
        btn.attr("src", btn.attr("src").replace("_off", "_on"));
    }

    $tab_btn.on("click", function (event) {
        var realTarget = $(this).attr('href');

        if (realTarget != "#") {
            return
        }
        if (btn_img == 'img') {
            for (var i = 0; i < $tab.size(); i++) {
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src", btn.attr("src").replace("_on", "_off"));
            }
            var active = $(this).parent().attr('class');
            if (active != 'active') {
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src = btn_img_off.src.replace('_off', '_on');
            }
        }
        $tab_btn.siblings().hide();
        $tab_btn.parent().removeClass('active');

        $(this).siblings().show();
        $(this).parent().addClass('active');

        event.preventDefault();
    });
}

function tabOrg(tabid, a, img) {
    var $tab, $tab_btn, $obj, $obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid + ' .tab_item  > li');
    $tab_btn = $(tabid + ' .tab_item > li > a');
    $obj = $(tabid + ' .tab_obj');
    $obj_view = $(tabid + ' .tab_obj.n' + num);

    $tab.eq(num - 1).addClass('active');
    $obj_view.show();

    if (btn_img == 'img') {
        var btn = $tab.eq(num - 1).children('a').find("img");
        btn.attr("src", btn.attr("src").replace("_off", "_on"));
    }

    $tab.bind("click", function (event) {
        if (btn_img == 'img') {
            for (var i = 0; i < $tab.size(); i++) {
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src", btn.attr("src").replace("_on", "_off"));
            }
            var active = $(this).parent().attr('class');
            if (active != 'active') {
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src = btn_img_off.src.replace('_off', '_on');
            }
        }

        var this_eq = $tab.index($(this));
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid + ' .tab_obj.n' + (this_eq + 1)).show();

        event.preventDefault();
    });
}

$(document).ready(function () {
    //이미지 롤오버
    $('.overimg').mouseover(function () {
        var file = $(this).attr('src').split('/');
        var filename = file[file.length - 1];
        var path = '';
        for (i = 0; i < file.length - 1; i++) {
            path = (i == 0) ? path + file[i] : path + '/' + file[i];
        }
        $(this).attr('src', path + '/' + filename.replace('_off.', '_on.'));
    }).mouseout(function () {
        var file = $(this).attr('src').split('/');
        var filename = file[file.length - 1];
        var path = '';
        for (i = 0; i < file.length - 1; i++) {
            path = (i == 0) ? path + file[i] : path + '/' + file[i];
        }
        $(this).attr('src', path + '/' + filename.replace('_on.', '_off.'));
    });
});

/**
 * @author (주)한신정보기술 퍼블리셔팀
 * @since 2019-03-18
 * @version 1.0.0
 */
(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if (_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie ie7';

        //ie8일 때
    } else if (_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie ie8';

        //ie9일 때
    } else if (_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie ie9';

        //ie10일 때
    } else if (_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie ie10';

        //ie11일 때
    } else if (_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie ie11';

        //edge일 때
    } else if (_browser.indexOf('edge') > -1) {
        _browser = 'edge';

        //opera일 때
    } else if (_browser.indexOf('opr') > -1) {
        _browser = 'opera';

        //chrome일 때
    } else if (_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

        //firefox일 때
    } else if (_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

        //safari일 때
    } else if (_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    } else {
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function () {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function () {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');


        $window.on('screen:wide screen:web', function (event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function (event) {
            window.mode = 'mobile';
        });

        //lnb
        var $lnb = $header.find('.lnb'),
            $lnbShow = $header.find('.menu_show'),
            $lnbShowBtn = $lnbShow.find('.menu_button'),
            $lnbHide = $lnb.find('.menu_hide'),
            $lnbHideBtn = $lnbHide.find('.menu_button'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            $lnbSpy = $lnbMenu.find('.spy:last'),
            lnbHeight;
        if (!$lnb.find('.depth2').length) {
            $header.attr('data-depth', 'none');
        }
        $lnbSpy.parents('.depth_item').addClass('actived');
        $lnbSpy.parents('.depth_item').prev('.depth_item').addClass('actived_prev');
        $lnbSpy.parents('.depth_item').next('.depth_item').addClass('actived_next');

        function refreshLnbHeight() {
            lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';

            $lnbMenu.css('transition-property', '');
        }

        $lnbShowBtn.on('click', function (event) {
            //클래스 토글
            $html.toggleClass('lnb_show');
        });

        $lnbHideBtn.on('click', function (event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
        $('.lnb_curtain button').on('click', function (event) {
            $html.removeClass('lnb_show');
        });

        $lnbDepthItem.on('mouseover focusin', function (event) {
            if (mode === 'pc') {
                var $this = $(this),
                    $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');
                if (!$header.is('[data-depth="none"]')) {
                    if ($lnbMenu.hasClass('pulldown')) {
                        var maxHeight = 0;

                        $lnbDepth2FirstChild.each(function (index, element) {
                            var $element = $(element),
                                outerHeight = $element.outerHeight() || 0;

                            //기존 값 보다 얻은 값이 초과일 때
                            if (outerHeight > maxHeight) {
                                maxHeight = outerHeight;
                            }
                        });

                        $lnbMenu.height(lnbHeight + maxHeight);
                    } else if ($lnbMenu.hasClass('eachdown')) {
                        $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight() || ''));
                    }
                }
                $html.addClass('lnb_open');
                $lnbDepthItem.removeClass('active active_prev active_next');
                $this.addClass('active');
                $this.prev('.depth_item').addClass('active_prev');
                $this.next('.depth_item').addClass('active_next');
                $this.parents('li').addClass('active');
                $this.parents('li').prev('.depth_item').addClass('active_prev');
                $this.parents('li').next('.depth_item').addClass('active_next');
            }
            event.stopPropagation();
        }).on('click', function (event) {
            if (mode === 'mobile') {
                var $this = $(this),
                    $depthText = $this.children('.depth_text'),
                    eventTarget = event.target,
                    IsActive = $this.is('.active');

                if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if ($this.hasClass('depth1_item')) {
                        if ($this.hasClass('active')) {
                            $html.removeClass('lnb_open');
                        } else {
                            $html.addClass('lnb_open');
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

        $lnbMenu.on('mouseleave', function (event) {
            if (mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active active_prev active_next');
            }
        });

        $lnb.find('.depth1_item:last-child .depth:visible:last').find('> .depth_list > .depth_item:last-child .depth_text').on('focusout', function (event) {
            if (mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active active_prev active_next');
            }
        });

        //여기서부터 코드 작성해주세요

        //외국어 페이지 선택 시작
        $('.header_gnb .language button.lang_btn').on('click', function(){
            var $this = $(this),
                $Language = $this.parent('.language'),
                IsLangOpen = $Language.is('.lang_open'),
                $LangList = $Language.find('.lang_list');
            if(!IsLangOpen){
                $Language.addClass('lang_open');
                $this.attr('title', '언어선택 닫기');
                $LangList.slideDown(150, 'linear');
            }
            else{
                $Language.removeClass('lang_open');
                $this.attr('title', '언어선택 열기');
                $LangList.slideUp(150, 'linear');
            }
        });
        //외국어 페이지 선택 끝

        //주요사이트 레이어 ajax 시작
        $.ajax({
            url : '/project/2022hsg/site/public/direct/direct_layer.html',
            success : function (data) {
                $header.after(data);
            }
        });
        //주요사이트 레이어 ajax 끝

        //주요사이트 바로가기 레이어 시작
        $('#header .header_gnb .direct_link_wrap .direct .direct_list .direct_item.primary button.direct_link').on('click', function(){
            var $this = $(this),
                $Header = $this.parents('#header'),
                $DirectLayer = $Header.siblings('.direct_layer'),
                IsDirectOpen = $DirectLayer.is('.direct_open'),
                $DirectLayerCloseBtn = $DirectLayer.find('button.direct_layer_close');
            if(!IsDirectOpen){
                $DirectLayer.addClass('direct_open');
                setTimeout(function(){
                    $DirectLayer.addClass('direct_ani');
                }, 100);
                $DirectLayerCloseBtn.focus();
            }
        });
        $(document).on('click', '.direct_layer .layer_btn_box button.direct_layer_close', function(){
            var $this = $(this),
                $LayerBtnBox = $this.parent('.layer_btn_box'),
                $WhiteInner = $LayerBtnBox.parent('.white_inner'),
                $DirectLayer = $WhiteInner.parent('.direct_layer'),
                IsDirectOpen = $DirectLayer.is('.direct_open'),
                $Header = $DirectLayer.siblings('#header'),
                $DirectLinkBtn = $Header.find('button.direct_link');
            if(IsDirectOpen){
                $DirectLayer.removeClass('direct_ani');
                setTimeout(function(){
                    $DirectLayer.removeClass('direct_open');
                }, 1000);
                $DirectLinkBtn.focus();
            }
        });
        //주요사이트 바로가기 레이어 끝

        //배너 슬라이드 시작
        var $BannerList = $('.footer_banner .banner_slide_wrap .banner_list');
        $BannerList.slick({
            //기본
            autoplay : true,
            dots : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 7,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            prevArrow : $('.footer_banner .banner_slide_wrap .banner_control .prev'),
            nextArrow : $('.footer_banner .banner_slide_wrap .banner_control .next'),
            autoArrow : $('.footer_banner .banner_slide_wrap .banner_control .auto'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            pauseText : '정지',
            playText : '재생',
            responsive : [{}]
        });
        //배너 슬라이드 끝

        //푸터 관련기관 열기 시작
        $('#footer .engine_box button.engine_open_btn').on('click', function(){
            var $this = $(this),
                $EngineBox = $this.parent('.engine_box'),
                IsEngineOpen = $EngineBox.is('.engine_open');
            if(!IsEngineOpen){
                $this.attr('title', '목록닫기');
                $EngineBox.addClass('engine_open');
            }
            else{
                $this.attr('title', '목록열기');
                $EngineBox.removeClass('engine_open');
            }
        });
        //푸터 관련기관 열기 끝

        //푸터 상단 바로가기 시작
        $('.footer_top .up_button').on('click', function() {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 400);
        });
        //푸터 상단 바로가기 끝

        $window.on('screen:wide screen:web', function (event) {
            refreshLnbHeight();

            if ($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
                $lnbDepthItem.removeClass('active_prev active_next');
            }
        });

        $window.on('screen:tablet screen:phone', function (event) {
            refreshLnbHeight();

            if ($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
                $lnbSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
                $lnbSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
            }
        });

    });

    $document.on('ready', function (event) {
        /**
         * @link {https://github.com/JungHyunKwon/screen}
         */
        $screen({
            state: [{
                name: 'wide',
                horizontal: {
                    from: 9999,
                    to: 1501
                }
            }, {
                name: 'web',
                horizontal: {
                    from: 1500,
                    to: 1001
                }
            }, {
                name: 'tablet',
                horizontal: {
                    from: 1000,
                    to: 641
                }
            }, {
                name: 'phone',
                horizontal: {
                    from: 640,
                    to: 0
                }
            }]
        });
    });

    $window.on('load', function (event) {

        $window.on('screen:resize', function (event) {

        }).triggerHandler('screen:resize');
    });
})(jQuery);