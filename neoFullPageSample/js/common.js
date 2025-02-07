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
        _browser = 'edge MS';
    } else if (_browser.indexOf('edg/') > -1) {
        _browser = 'edge chromium_based';
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

        var $Depth1ItemLast = $lnb.find('.depth1_item:last-child'),
            Depth1ItemIsSolo = $Depth1ItemLast.is('.solo');
        if(Depth1ItemIsSolo){
            $Depth1ItemLast.find('>.depth_text').on('focusout', function(event) {
                if(mode === 'pc') {
                    $lnbMenu.height('');
                    $html.removeClass('lnb_open');
                    $lnbDepthItem.removeClass('active active_prev active_next');
                }
            });
        } else{
            var $Depth2ItemLast = $Depth1ItemLast.find('.depth2_item:last-child'),
                Depth2ItemIsSolo = $Depth2ItemLast.is('.solo');
            if(Depth2ItemIsSolo){
                $Depth2ItemLast.find('>.depth_text').on('focusout', function(event) {
                    if(mode === 'pc') {
                        $lnbMenu.height('');
                        $html.removeClass('lnb_open');
                        $lnbDepthItem.removeClass('active active_prev active_next');
                    }
                });
            } else{
                $lnb.find('.depth1_item:last-child .depth:visible:last').find('> .depth_list > .depth_item:last-child .depth_text').on('focusout', function(event) {
                    if(mode === 'pc') {
                        $lnbMenu.height('');
                        $html.removeClass('lnb_open');
                        $lnbDepthItem.removeClass('active active_prev active_next');
                    }
                });
            }
        }

        //여기서부터 코드 작성해주세요

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
        //wrapper, wrap 사이즈에 따라 값 맞출 것
        $screen({
            state: [{
                name: 'wide',
                horizontal: {
                    from: 9999,
                    to: 1601
                }
            }, {
                name: 'web',
                horizontal: {
                    from: 1600,
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
            }, {
                name : 'maxheight',
                vertical : {
                    from : 9999,
                    to : 501
                }
            }, {
                name : 'minheight',
                vertical : {
                    from : 500,
                    to : 0
                }
            }]
        });
    });
})(jQuery);