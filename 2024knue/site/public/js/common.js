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

(function ($) {

    //스크롤 자연스럽게 시작
    this.GambitSmoothScroll = function( settings ) {var key;var defaults = {'amount': 50, 'speed': 800};if ( 'undefined' === typeof settings ) settings = {};for ( key in defaults ) if ( ! settings.hasOwnProperty( key ) ) settings[ key ] = defaults[ key ];if ( navigator.userAgent.match( /Mobi|Android/ ) ) return;this.settings = settings;this.startedAsTrackpad = false;this.start();};GambitSmoothScroll.prototype.parent_scroll = function( el ) {var styles;while ( 'BODY' !== el.tagName && 'HTML' !== el.tagName ) {styles = getComputedStyle( el );if ( el.scrollHeight > el.clientHeight && 'hidden' !== styles.overflowY && 'visible' !== styles.overflowY ) return el;el = el.parentNode;}return false;};GambitSmoothScroll.prototype.start = function() {document.addEventListener( 'DOMContentLoaded', function() {window.addEventListener( 'wheel', this.overrideScroll.bind( this ) );}.bind( this ) );};GambitSmoothScroll.prototype.stop = function() {if ( 'undefined' !== typeof this.scrollInterval ) {this.startedAsTrackpad = false;clearInterval( this.scrollInterval );this.scrollInterval = undefined;}};GambitSmoothScroll.prototype.newScroll = function( isDown, scrollableElement, timestamp ) {var multiplier;if ( isDown !== this.isDown && 'undefined' !== typeof this.isDown ) this.stop();this.isDown = isDown;if ( this.prevScrollableElement !== scrollableElement ) this.stop();this.prevScrollableElement = scrollableElement;if ( 'undefined' === typeof this.scrollInterval ) {this.startingSpeed = this.settings.amount;this.scrollInterval = setInterval( function() {var scrollBy = ( this.isDown ? 1 : -1 ) * this.startingSpeed / 15;if ( ! scrollableElement ) {window.scrollBy( 0, scrollBy );} else scrollableElement.scrollTop += scrollBy;this.startingSpeed *= 1 - ( 800 / this.settings.speed ) / 10; /* 0.9; */if ( Math.abs( scrollBy ) < 1 ) this.stop();}.bind( this ), 16.666666667 ); /* 60fps */} else {multiplier = 1 + ( timestamp - this.prevTimestamp ) / 40 * 0.7;this.startingSpeed = Math.max( this.startingSpeed * multiplier, this.settings.amount );this.startingSpeed = Math.min( this.startingSpeed, 300 );}this.prevTimestamp = timestamp;};GambitSmoothScroll.prototype.overrideScroll = function( e ) {var skipFirefoxMacCheck;var delta = e.wheelDelta ? -e.wheelDelta / 120 : ( e.detail || e.deltaY ) / 6;var scrollPercentage, scrollableElement = this.parent_scroll( e.target );var isSafari = ( function( p ) {return '[object SafariRemoteNotification]' === p.toString();} )( ! window.safari || safari.pushNotification );if ( isSafari && ( Math.abs( delta ) < 1 ) ) delta *= 10;skipFirefoxMacCheck = false;if ('undefined' !== typeof window.mozInnerScreenX && navigator.platform.indexOf('Mac') !== -1) {this.startedAsTrackpad = false;skipFirefoxMacCheck = true;if (e.deltaY === parseInt(e.deltaY, 10)) {this.startedAsTrackpad = true;return;}}if ( 'undefined' !== typeof this.trackpadTimeout ) {clearTimeout( this.trackpadTimeout );this.trackpadTimeout = undefined;}if ( ( Math.abs( delta ) < 1 || this.startedAsTrackpad ) && ! skipFirefoxMacCheck ) {this.trackpadTimeout = setTimeout( function() {this.startedAsTrackpad = false;this.trackpadTimeout = undefined;}.bind( this ), 200 );this.startedAsTrackpad = true;return true;}if ( scrollableElement ) {scrollPercentage = ( scrollableElement.scrollTop + scrollableElement.offsetHeight ) / scrollableElement.scrollHeight * 100;if ( scrollableElement.scrollTop <= 0 && delta < 0 ) {scrollableElement = null;} else if ( scrollPercentage >= 100 && delta > 0 ) scrollableElement = null;}this.newScroll( delta > 0, scrollableElement, e.timeStamp );};
    new GambitSmoothScroll();
    //스크롤 자연스럽게 끝

    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    //스크롤 시 인터렉션 시작 ( 유동적 사용 )
    var scrollme=(function(a){var d={};var c=a(document);var b=a(window);d.body_height=0;d.viewport_height=0;d.viewport_top=0;d.viewport_bottom=0;d.viewport_top_previous=-1;d.elements=[];d.elements_in_view=[];d.property_defaults={opacity:1,translatex:0,translatey:0,translatez:0,rotatex:0,rotatey:0,rotatez:0,scale:1,scalex:1,scaley:1,scalez:1};d.scrollme_selector=".scrollme";d.animateme_selector=".animateme";d.update_interval=10;d.easing_functions={linear:function(e){return e},easeout:function(e){return e*e*e},easein:function(e){e=1-e;return 1-(e*e*e)},easeinout:function(e){if(e<0.5){return(4*e*e*e)}else{e=1-e;return 1-(4*e*e*e)}}};d.init_events=["ready","page:load","page:change"];d.init_if=function(){return true};d.init=function(){if(!d.init_if()){return false}d.init_elements();d.on_resize();b.on("resize orientationchange",function(){d.on_resize()});b.load(function(){setTimeout(function(){d.on_resize()},100)});setInterval(d.update,d.update_interval);return true};d.init_elements=function(){a(d.scrollme_selector).each(function(){var e={};e.element=a(this);var f=[];a(this).find(d.animateme_selector).addBack(d.animateme_selector).each(function(){var h={};h.element=a(this);h.when=h.element.data("when");h.from=h.element.data("from");h.to=h.element.data("to");if(h.element.is("[data-crop]")){h.crop=h.element.data("crop")}else{h.crop=true}if(h.element.is("[data-easing]")){h.easing=d.easing_functions[h.element.data("easing")]}else{h.easing=d.easing_functions.easeout}var g={};if(h.element.is("[data-opacity]")){g.opacity=h.element.data("opacity")}if(h.element.is("[data-translatex]")){g.translatex=h.element.data("translatex")}if(h.element.is("[data-translatey]")){g.translatey=h.element.data("translatey")}if(h.element.is("[data-translatez]")){g.translatez=h.element.data("translatez")}if(h.element.is("[data-rotatex]")){g.rotatex=h.element.data("rotatex")}if(h.element.is("[data-rotatey]")){g.rotatey=h.element.data("rotatey")}if(h.element.is("[data-rotatez]")){g.rotatez=h.element.data("rotatez")}if(h.element.is("[data-scale]")){g.scale=h.element.data("scale")}if(h.element.is("[data-scalex]")){g.scalex=h.element.data("scalex")}if(h.element.is("[data-scaley]")){g.scaley=h.element.data("scaley")}if(h.element.is("[data-scalez]")){g.scalez=h.element.data("scalez")}h.properties=g;f.push(h)});e.effects=f;d.elements.push(e)})};d.update=function(){window.requestAnimationFrame(function(){d.update_viewport_position();if(d.viewport_top_previous!=d.viewport_top){d.update_elements_in_view();d.animate()}d.viewport_top_previous=d.viewport_top})};d.animate=function(){var C=d.elements_in_view.length;for(var A=0;A<C;A++){var h=d.elements_in_view[A];var f=h.effects.length;for(var D=0;D<f;D++){var w=h.effects[D];switch(w.when){case"view":case"span":var r=h.top-d.viewport_height;var n=h.bottom;break;case"exit":var r=h.bottom-d.viewport_height;var n=h.bottom;break;default:var r=h.top-d.viewport_height;var n=h.top;break}if(w.crop){if(r<0){r=0}if(n>(d.body_height-d.viewport_height)){n=d.body_height-d.viewport_height}}var g=(d.viewport_top-r)/(n-r);var x=w.from;var j=w.to;var o=j-x;var k=(g-x)/o;var v=w.easing(k);var l=d.animate_value(g,v,x,j,w,"opacity");var t=d.animate_value(g,v,x,j,w,"translatey");var u=d.animate_value(g,v,x,j,w,"translatex");var s=d.animate_value(g,v,x,j,w,"translatez");var B=d.animate_value(g,v,x,j,w,"rotatex");var z=d.animate_value(g,v,x,j,w,"rotatey");var y=d.animate_value(g,v,x,j,w,"rotatez");var E=d.animate_value(g,v,x,j,w,"scale");var q=d.animate_value(g,v,x,j,w,"scalex");var p=d.animate_value(g,v,x,j,w,"scaley");var m=d.animate_value(g,v,x,j,w,"scalez");if("scale" in w.properties){q=E;p=E;m=E}w.element.css({opacity:l,transform:"translate3d( "+u+"px , "+t+"px , "+s+"px ) rotateX( "+B+"deg ) rotateY( "+z+"deg ) rotateZ( "+y+"deg ) scale3d( "+q+" , "+p+" , "+m+" )"})}}};d.animate_value=function(i,h,j,k,n,m){var g=d.property_defaults[m];if(!(m in n.properties)){return g}var e=n.properties[m];var f=(k>j)?true:false;if(i<j&&f){return g}if(i>k&&f){return e}if(i>j&&!f){return g}if(i<k&&!f){return e}var l=g+(h*(e-g));switch(m){case"opacity":l=l.toFixed(2);break;case"translatex":l=l.toFixed(0);break;case"translatey":l=l.toFixed(0);break;case"translatez":l=l.toFixed(0);break;case"rotatex":l=l.toFixed(1);break;case"rotatey":l=l.toFixed(1);break;case"rotatez":l=l.toFixed(1);break;case"scale":l=l.toFixed(3);break;default:break}return l};d.update_viewport_position=function(){d.viewport_top=b.scrollTop();d.viewport_bottom=d.viewport_top+d.viewport_height};d.update_elements_in_view=function(){d.elements_in_view=[];var f=d.elements.length;for(var e=0;e<f;e++){if((d.elements[e].top<d.viewport_bottom)&&(d.elements[e].bottom>d.viewport_top)){d.elements_in_view.push(d.elements[e])}}};d.on_resize=function(){d.update_viewport();d.update_element_heights();d.update_viewport_position();d.update_elements_in_view();d.animate()};d.update_viewport=function(){d.body_height=c.height();d.viewport_height=b.height()};d.update_element_heights=function(){var g=d.elements.length;for(var f=0;f<g;f++){var h=d.elements[f].element.outerHeight();var e=d.elements[f].element.offset();d.elements[f].height=h;d.elements[f].top=e.top;d.elements[f].bottom=e.top+h}};c.on(d.init_events.join(" "),function(){d.init()});return d})(jQuery);
    //스크롤 시 인터렉션 끝 ( 유동적 사용 )


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

        // 스타트 시 효과 주기 위해 시작
        setTimeout(function(){
            $html.addClass('start');
        }, 1);
        // 스타트 시 효과 주기 위해 끝

        //lnb 라인 표출 조건 시작
        var $Depth1LineDecoBox = $('.depth1 .line_deco_box'),
            $Depth1Item = $('.depth1 .depth1_list .depth1_item');
        $Depth1Item.each(function(){
            var $this = $(this),
                $thisDepth2Item = $this.find('.depth2_item');
            $this.on('mouseover', function(){
                if($thisDepth2Item.length == 1){
                    $Depth1LineDecoBox.attr('data-length', 1);
                }
                if($thisDepth2Item.length == 2){
                    $Depth1LineDecoBox.attr('data-length', 2);
                }
                if($thisDepth2Item.length == 3){
                    $Depth1LineDecoBox.attr('data-length', 3);
                }
                if($thisDepth2Item.length == 4){
                    $Depth1LineDecoBox.attr('data-length', 4);
                }
                if($thisDepth2Item.length >= 5){
                    $Depth1LineDecoBox.attr('data-length', 5);
                }
            });
        });
        //lnb 라인 표출 조건 끝

        //40주년 홍보관 링크 마우스 오버 시작
        $('.lnb .menu .depth1 .promotion_box').on('mouseover', function(){
            if (mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active active_prev active_next');
            }
        });
        //40주년 홍보관 링크 마우스 오버 끝

        //와이드 search form 활성화 및 포커스 처리 시작
        var $LastLinkSearchBtn = $('.header_last .last_link_list .last_link_item button.search'),
            $SearchFormBox = $('.header_box .search_form_box'),
            $SearchFormBoxInputFirst = $('.header_box .search_form_box .type_text input'),
            $SearchFormBoxInputLast = $('.header_box .search_form_box .type_submit input');
        $LastLinkSearchBtn.on('click', function(){
            var $this = $(this),
                $thisLinkItem = $this.parent('.last_link_item'),
                IsActive = $thisLinkItem.is('.active');
            if(!IsActive){
                $thisLinkItem.addClass('active');
                $this.attr('title', '닫기');
                $SearchFormBox.addClass('active');
                $('.lnb_curtain').addClass('search_on');
                $('.header_box .last_link_list .last_link_item button.search').parent('.last_link_item').addClass('active');
                $('.header_box .last_link_list .last_link_item button.search').attr('title', '닫기');
            }
            else{
                $thisLinkItem.removeClass('active');
                $this.attr('title', '열기');
                $SearchFormBox.removeClass('active');
                $('.lnb_curtain').removeClass('search_on');
                $('.header_box .last_link_list .last_link_item button.search').parent('.last_link_item').removeClass('active');
                $('.header_box .last_link_list .last_link_item button.search').attr('title', '열기');
            }
        });
        $LastLinkSearchBtn.on('focusout', function(){
            $SearchFormBoxInputFirst.focus();
        });
        $SearchFormBoxInputLast.on('focusout', function(){
            $LastLinkSearchBtn.focus();
        });
        //와이드 search form 활성화 및 포커스 처리 끝

        //모바일 search form 활성화 시작
        $document.on('click', '.header_box .last_link_list .last_link_item button.search', function(){
            var $this = $(this),
                $thisLinkItem = $this.parent('.last_link_item'),
                IsActive = $thisLinkItem.is('.active');
            if(!IsActive){
                $thisLinkItem.addClass('active');
                $this.attr('title', '닫기');
                $SearchFormBox.addClass('active');
                $('.lnb_curtain').addClass('search_on');
                $('.header_last .last_link_list .last_link_item button.search').parent('.last_link_item').addClass('active');
                $('.header_last .last_link_list .last_link_item button.search').attr('title', '닫기');
            }
            else{
                $thisLinkItem.removeClass('active');
                $this.attr('title', '열기');
                $SearchFormBox.removeClass('active');
                $('.lnb_curtain').removeClass('search_on');
                $('.header_last .last_link_list .last_link_item button.search').parent('.last_link_item').removeClass('active');
                $('.header_last .last_link_list .last_link_item button.search').attr('title', '열기');
            }
        });
        //모바일 search form 활성화 끝

        //푸터 관련링크 시작
        var $footerSelectItem = $('.footer_select .select_box .select_item');
        $footerSelectItem.each(function(){
            var $this = $(this),
                $SelectBtn = $this.find('button.select_btn');
            $SelectBtn.on('click', function(){
                var $thisBtn = $(this),
                    $thisItem = $thisBtn.parent('.select_item'),
                    IsActive = $thisItem.is('.active'),
                    $thisSelectLinkList = $thisBtn.siblings('.select_link_list');
                if(!IsActive){
                    $thisItem.addClass('active');
                    $thisBtn.attr('title', '관련 리스트 닫기');
                    $thisSelectLinkList.slideDown('150', 'swing');
                }
                else{
                    $thisItem.removeClass('active');
                    $thisBtn.attr('title', '관련 리스트 열기');
                    $thisSelectLinkList.slideUp('150', 'swing');
                }
            });
        });
        //푸터 관련링크 끝

        //푸터 상단 바로가기 시작
        $('.footer_go .go_btn').on('click', function() {
            $('html, body').animate({
                scrollTop : $body.offset().top
            }, 400);
        });
        //푸터 상단 바로가기 끝

        //fixed_box(유저서비스, 퀵메뉴) 시작
        $('.fixed_go .go_btn').on('click', function() {
            $('html, body').animate({
                scrollTop : $body.offset().top
            }, 400);
        });
        var $fixedBox = $('.fixed_box'),
            $fixedInner = $fixedBox.find('.fixed_inner'),
            $fixedOpen = $fixedInner.find('.fixed_open'),
            $fixedOpenBtn = $fixedOpen.find('button.open_btn');
        $fixedOpenBtn.on('click', function(){
            var $this = $(this),
                IsActive = $fixedBox.is('.active');
            if(!IsActive){
                $fixedBox.addClass('active');
                $this.attr('title', '리스트 닫기');
            }
            else{
                $fixedBox.removeClass('active');
                $this.attr('title', '리스트 열기');
            }
        });
        function fixedScroll(top){
            if(top > 0){
                $fixedBox.addClass('scroll');
            }
            if(top == 0){
                $fixedBox.removeClass('scroll');
            }
        }
        function fixedHidden(footerTop, scrollTop){
            if(scrollTop + 800 > footerTop){
                $fixedBox.addClass('hidden');
            }
            else{
                $fixedBox.removeClass('hidden');
            }
        }
        var windowScrollTopStart = $window.scrollTop();
        var footerTopStart = $footer.offset().top;

        fixedScroll(windowScrollTopStart);
        fixedHidden(footerTopStart, windowScrollTopStart);

        $window.on('scroll', function(e){
            var nowScrollTop = $window.scrollTop();
            fixedScroll(nowScrollTop);
            fixedHidden($footer.offset().top, nowScrollTop);
        });

        //퀵메뉴 레이어 시작
        $('.fixed_box .fixed_inner .fixed_list .fixed_item.quick button.fix_btn').on('click', function(){
            var $this = $(this),
                $thisParent = $this.parent('.quick'),
                IsActive = $thisParent.is('.active');
            if(!IsActive){
                $thisParent.addClass('active');
                $.ajax({
                    cache: false,
                    url : 'https://belugacurtain.github.io/project/2024knue/site/public/quickMenu/quick.html',
                    success : function (data) {
                        $footer.before(data);
                        var $fixedLayer = $('.fixed_layer'),
                            $CloseBtn = $fixedLayer.find('button.close');
                        $fixedLayer.fadeIn('500', 'swing', function(){
                            $CloseBtn.focus();
                            $fixedLayer.addClass('swing');
                        });
                        $CloseBtn.on('click', function(){
                            $fixedLayer.removeClass('swing');
                            $fixedLayer.fadeOut('500', 'swing', function(){
                                $thisParent.removeClass('active');
                                $this.focus();
                                $fixedLayer.remove();
                            });
                        });
                        $('.quick_bottom .quick_cts_list .quick_cts_item .quick_link:last-child').on('focusout', function(){
                            $CloseBtn.focus();
                        });
                        var $LoadingQuickCtsItem = $('.quick_cts_item');
                        $LoadingQuickCtsItem.each(function(){
                            var $this = $(this);
                            if($this.is('.active')){
                                if($this.find('a').length < 15){
                                    $this.parent('.quick_cts_list').removeAttr('tabindex');
                                }
                                else{
                                    $this.parent('.quick_cts_list').attr('tabindex', '0');
                                }
                            }
                        });
                    }
                });
            }
        });
        //퀵메뉴 레이어 끝

        //유저서비스 레이어 시작
        $('.fixed_box .fixed_inner .fixed_list .fixed_item.user button.fix_btn').on('click', function(){
            var $this = $(this),
                $thisParent = $this.parent('.user'),
                IsActive = $thisParent.is('.active');
            if(!IsActive){
                $thisParent.addClass('active');
                $.ajax({
                    cache: false,
                    url : 'https://belugacurtain.github.io/project/2024knue/site/public/userService/user.html',
                    success : function (data) {
                        $footer.before(data);
                        var $fixedLayer = $('.fixed_layer'),
                            $CloseBtn = $fixedLayer.find('button.close'),
                            $userServiceBox = $fixedLayer.find('.user_service_box');
                        $fixedLayer.fadeIn('500', 'swing', function(){
                            $CloseBtn.focus();
                            $fixedLayer.addClass('swing');
                        });
                        $CloseBtn.on('click', function(){
                            $fixedLayer.removeClass('swing');
                            $fixedLayer.fadeOut('500', 'swing', function(){
                                $thisParent.removeClass('active');
                                $this.focus();
                                $fixedLayer.remove();
                            });
                        });
                        var $userServiceInner = $userServiceBox.find('.service_inner'),
                            $userServiceTop = $userServiceInner.find('.service_top'),
                            $userServiceTabWrap = $userServiceTop.find('.service_tab_wrap'),
                            $userServiceTabList = $userServiceTabWrap.find('.service_tab_list'),
                            $userServiceTabItem = $userServiceTabList.find('.service_tab_item'),
                            $userServiceTabBtn = $userServiceTabItem.find('button.service_tab_btn');
                        $userServiceTabBtn.on('click', function(){
                            var $thisServiceTabBtn = $(this),
                                $thisServiceTabItem = $thisServiceTabBtn.parent('.service_tab_item'),
                                $otherServiceTabItem = $thisServiceTabItem.siblings('.service_tab_item'),
                                $otherServiceTabBtn = $otherServiceTabItem.find('button.service_tab_btn'),
                                thisServiceTabItemIndex = $thisServiceTabItem.index(),
                                IsActive = $thisServiceTabItem.is('.active'),
                                $userServiceBottom = $userServiceTop.siblings('.service_bottom'),
                                $userServiceCtsList = $userServiceBottom.find('.service_cts_list'),
                                $thisuserServiceCtsItem = $userServiceCtsList.find('.service_cts_item').eq(thisServiceTabItemIndex),
                                $otheruserServiceCtsItem = $thisuserServiceCtsItem.siblings('.service_cts_item');
                            if(!IsActive){
                                $otheruserServiceCtsItem.removeClass('active');
                                $otherServiceTabItem.removeClass('active');
                                $otherServiceTabBtn.removeAttr('title');
                                $thisuserServiceCtsItem.addClass('active');
                                if($thisuserServiceCtsItem.is('.active')){
                                    if($thisuserServiceCtsItem.find('a').length < 15){
                                        $thisuserServiceCtsItem.parent('.service_cts_list').removeAttr('tabindex');
                                    }
                                    else{
                                        $thisuserServiceCtsItem.parent('.service_cts_list').attr('tabindex', '0');
                                    }
                                }
                                $thisServiceTabItem.addClass('active');
                                $thisServiceTabBtn.attr('title', '선택됨');
                            }
                        });
                        $('.service_bottom .service_cts_list .service_cts_item .service_link:last-child').on('focusout', function(){
                            $CloseBtn.focus();
                        });
                        var $LoadingServiceCtsItem = $('.service_cts_item');
                        $LoadingServiceCtsItem.each(function(){
                            var $this = $(this);
                            if($this.is('.active')){
                                if($this.find('a').length < 15){
                                    $this.parent('.service_cts_list').removeAttr('tabindex');
                                }
                                else{
                                    $this.parent('.service_cts_list').attr('tabindex', '0');
                                }
                            }
                        });
                    }
                });
            }
        });
        //유저서비스 레이어 끝

        //fixed_box(유저서비스, 퀵메뉴) 끝

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
                    to: 1471
                }
            }, {
                name: 'web',
                horizontal: {
                    from: 1470,
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