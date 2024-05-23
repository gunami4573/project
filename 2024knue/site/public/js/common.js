//
var t,e;t=this,e=function(){function t(t,e,i){return Math.max(t,Math.min(e,i))}class Animate{advance(e){if(!this.isRunning)return;let i=!1;if(this.lerp)this.value=(s=this.value,o=this.to,n=60*this.lerp,l=e,function(t,e,i){return(1-i)*t+i*e}(s,o,1-Math.exp(-n*l))),Math.round(this.value)===this.to&&(this.value=this.to,i=!0);else{this.currentTime+=e;const s=t(0,this.currentTime/this.duration,1);i=s>=1;const o=i?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}var s,o,n,l;this.onUpdate?.(this.value,i),i&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i=.1,duration:s=1,easing:o=(t=>t),onStart:n,onUpdate:l}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=l}}class Dimensions{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(){let s=arguments,o=this;clearTimeout(i),i=setTimeout((function(){t.apply(o,s)}),e)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Emitter{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t](...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}}const e=100/6;class VirtualScroll{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new Emitter,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.touchMultiplier,o=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:i,deltaY:s,deltaMode:o}=t;i*=1===o?e:2===o?this.windowWidth:1,s*=1===o?e:2===o?this.windowHeight:1,i*=this.wheelMultiplier,s*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:t})};onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}return class Lenis{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:i=t,eventsTarget:s=i,smoothWheel:o=!0,syncTouch:n=!1,syncTouchLerp:l=.075,touchInertiaMultiplier:r=35,duration:h,easing:a=(t=>Math.min(1,1.001-Math.pow(2,-10*t))),lerp:c=!h&&.1,infinite:d=!1,orientation:p="vertical",gestureOrientation:u="vertical",touchMultiplier:m=1,wheelMultiplier:g=1,autoResize:v=!0,__experimental__naiveDimensions:S=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:t,deltaY:e,event:i})=>{if(i.ctrlKey)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(this.options.syncTouch&&s&&"touchstart"===i.type&&!this.isStopped&&!this.isLocked)return void this.reset();const n=0===t&&0===e,l="vertical"===this.options.gestureOrientation&&0===e||"horizontal"===this.options.gestureOrientation&&0===t;if(n||l)return;let r=i.composedPath();if(r=r.slice(0,r.indexOf(this.rootElement)),r.find((t=>{var e,i,n,l,r;return(null===(e=t.hasAttribute)||void 0===e?void 0:e.call(t,"data-lenis-prevent"))||s&&(null===(i=t.hasAttribute)||void 0===i?void 0:i.call(t,"data-lenis-prevent-touch"))||o&&(null===(n=t.hasAttribute)||void 0===n?void 0:n.call(t,"data-lenis-prevent-wheel"))||(null===(l=t.classList)||void 0===l?void 0:l.contains("lenis"))&&!(null===(r=t.classList)||void 0===r?void 0:r.contains("lenis-stopped"))})))return;if(this.isStopped||this.isLocked)return void i.preventDefault();if(this.isSmooth=this.options.syncTouch&&s||this.options.smoothWheel&&o,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();i.preventDefault();let h=e;"both"===this.options.gestureOrientation?h=Math.abs(e)>Math.abs(t)?e:t:"horizontal"===this.options.gestureOrientation&&(h=t);const a=s&&this.options.syncTouch,c=s&&"touchend"===i.type&&Math.abs(h)>5;c&&(h=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+h,Object.assign({programmatic:!1},a?{lerp:c?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-t),this.emit()}},window.lenisVersion="1.0.42",t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:i,eventsTarget:s,smoothWheel:o,syncTouch:n,syncTouchLerp:l,touchInertiaMultiplier:r,duration:h,easing:a,lerp:c,infinite:d,gestureOrientation:u,orientation:p,touchMultiplier:m,wheelMultiplier:g,autoResize:v,__experimental__naiveDimensions:S},this.animate=new Animate,this.emitter=new Emitter,this.dimensions=new Dimensions({wrapper:t,content:e,autoResize:v}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=n||o,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new VirtualScroll(s,{touchMultiplier:m,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(e,{offset:i=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:l=this.options.easing,lerp:r=!n&&this.options.lerp,onComplete:h,force:a=!1,programmatic:c=!0}={}){if(!this.isStopped&&!this.isLocked||a){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let t;if("string"==typeof e?t=document.querySelector(e):(null==e?void 0:e.nodeType)&&(t=e),t){if(this.options.wrapper!==window){const t=this.options.wrapper.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=t.getBoundingClientRect();e=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof e){if(e+=i,e=Math.round(e),this.options.infinite?c&&(this.targetScroll=this.animatedScroll=this.scroll):e=t(0,e,this.limit),s)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(null==h||h(this));if(!c){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:n,easing:l,lerp:r,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(t,e)=>{this.isScrolling=!0,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),c&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),null==h||h(this),this.__preventNextScrollEvent=!0,requestAnimationFrame((()=>{delete this.__preventNextScrollEvent})))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;var t,e}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClassName("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClassName("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClassName("lenis-stopped",t))}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClassName("lenis-locked",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClassName(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)}}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Lenis=e();
var lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf);
//

(function ($) {

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