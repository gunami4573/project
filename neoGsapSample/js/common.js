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
                }]
            });
        });

        //여기서부터 코드 작성해주세요


    });
})(jQuery);