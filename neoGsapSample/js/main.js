(function ($) {

    this.GambitSmoothScroll = function (settings) {
        var key;
        var defaults = {'amount': 150, 'speed': 900};
        if ('undefined' === typeof settings) settings = {};
        for (key in defaults) if (!settings.hasOwnProperty(key)) settings[key] = defaults[key];
        if (navigator.userAgent.match(/Mobi|Android/)) return;
        this.settings = settings;
        this.startedAsTrackpad = false;
        this.start();
    };
    GambitSmoothScroll.prototype.parent_scroll = function (el) {
        var styles;
        while ('BODY' !== el.tagName && 'HTML' !== el.tagName) {
            styles = getComputedStyle(el);
            if (el.scrollHeight > el.clientHeight && 'hidden' !== styles.overflowY && 'visible' !== styles.overflowY) return el;
            el = el.parentNode;
        }
        return false;
    };
    GambitSmoothScroll.prototype.start = function () {
        document.addEventListener('DOMContentLoaded', function () {
            window.addEventListener('wheel', this.overrideScroll.bind(this));
        }.bind(this));
    };
    GambitSmoothScroll.prototype.stop = function () {
        if ('undefined' !== typeof this.scrollInterval) {
            this.startedAsTrackpad = false;
            clearInterval(this.scrollInterval);
            this.scrollInterval = undefined;
        }
    };
    GambitSmoothScroll.prototype.newScroll = function (isDown, scrollableElement, timestamp) {
        var multiplier;
        if (isDown !== this.isDown && 'undefined' !== typeof this.isDown) this.stop();
        this.isDown = isDown;
        if (this.prevScrollableElement !== scrollableElement) this.stop();
        this.prevScrollableElement = scrollableElement;
        if ('undefined' === typeof this.scrollInterval) {
            this.startingSpeed = this.settings.amount;
            this.scrollInterval = setInterval(function () {
                var scrollBy = (this.isDown ? 1 : -1) * this.startingSpeed / 15;
                if (!scrollableElement) {
                    window.scrollBy(0, scrollBy);
                } else scrollableElement.scrollTop += scrollBy;
                this.startingSpeed *= 1 - (900 / this.settings.speed) / 10; /* 0.9; */
                if (Math.abs(scrollBy) < 1) this.stop();
            }.bind(this), 16.666666667); /* 60fps */
        } else {
            multiplier = 1 + (timestamp - this.prevTimestamp) / 40 * 0.7;
            this.startingSpeed = Math.max(this.startingSpeed * multiplier, this.settings.amount);
            this.startingSpeed = Math.min(this.startingSpeed, 300);
        }
        this.prevTimestamp = timestamp;
    };
    GambitSmoothScroll.prototype.overrideScroll = function (e) {
        var skipFirefoxMacCheck;
        var delta = e.wheelDelta ? -e.wheelDelta / 120 : (e.detail || e.deltaY) / 6;
        var scrollPercentage, scrollableElement = this.parent_scroll(e.target);
        var isSafari = (function (p) {
            return '[object SafariRemoteNotification]' === p.toString();
        })(!window.safari || safari.pushNotification);
        if (isSafari && (Math.abs(delta) < 1)) delta *= 10;
        skipFirefoxMacCheck = false;
        if ('undefined' !== typeof window.mozInnerScreenX && navigator.platform.indexOf('Mac') !== -1) {
            this.startedAsTrackpad = false;
            skipFirefoxMacCheck = true;
            if (e.deltaY === parseInt(e.deltaY, 10)) {
                this.startedAsTrackpad = true;
                return;
            }
        }
        if ('undefined' !== typeof this.trackpadTimeout) {
            clearTimeout(this.trackpadTimeout);
            this.trackpadTimeout = undefined;
        }
        if ((Math.abs(delta) < 1 || this.startedAsTrackpad) && !skipFirefoxMacCheck) {
            this.trackpadTimeout = setTimeout(function () {
                this.startedAsTrackpad = false;
                this.trackpadTimeout = undefined;
            }.bind(this), 200);
            this.startedAsTrackpad = true;
            return true;
        }
        if (scrollableElement) {
            scrollPercentage = (scrollableElement.scrollTop + scrollableElement.offsetHeight) / scrollableElement.scrollHeight * 100;
            if (scrollableElement.scrollTop <= 0 && delta < 0) {
                scrollableElement = null;
            } else if (scrollPercentage >= 100 && delta > 0) scrollableElement = null;
        }
        this.newScroll(delta > 0, scrollableElement, e.timeStamp);
    };
    new GambitSmoothScroll();

    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //여기서부터 코드 작성해주세요

        function gsapInit(){
            var $Wrapper = $('#wrapper'),
                $Rowgroup1 = $('.rowgroup1'),
                $SectionInnerLeft01 = $('.rowgroup1 .section1 .section1_wrap .wrap_inner .inner.left'),
                $SectionInnerRight01 = $('.rowgroup1 .section1 .section1_wrap .wrap_inner .inner.right'),
                $SectionInnerLeft02 = $('.rowgroup2 .section2 .section2_wrap .wrap_inner .inner.left'),
                $SectionInnerLeft03 = $('.rowgroup3 .section3 .section3_wrap .wrap_inner .inner.left'),
                $Section04 = $('.rowgroup4 .section4');

            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({

                //@media all and (min-width:1601px)
                '(min-width:1601px)' : function () {
                    gsap.to($SectionInnerLeft01, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        top : 'calc(800px + 50px)'
                    });
                },

                //@media all and (max-width:1600px) and (min-width:1001px)
                '(max-width:1600px) and (min-width:1001px)' : function () {
                    gsap.to($SectionInnerLeft01, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        top : 'calc(40vw + 50px)'
                    });
                },

                //@media all and (min-width:1001px)
                '(min-width:1001px)' : function () {
                    gsap.to($SectionInnerRight01, {
                        scrollTrigger : {
                            trigger : $Wrapper,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05,
                            onUpdate: function(self) {
                                var clip = self.progress;
                                $SectionInnerRight01.css({'clip-path':'polygon(calc('+clip*100+'%) 0%, 100% 0%, 100% 100%, calc('+clip*100+'%) 100%)'});
                            }
                        },
                    });
                    gsap.to($SectionInnerLeft02, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05,
                            onUpdate: function(self) {
                                var opa = self.progress;
                                $SectionInnerLeft02.css('opacity', 1 * opa);
                            }
                        },
                        x : '100%'
                    });
                    gsap.to($SectionInnerLeft03, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05,
                            onUpdate: function(self) {
                                var trans = self.progress;
                                $SectionInnerLeft03.css({'transform':'translate( calc(100% - '+trans * 100+'%),calc(-100% + '+trans * 100+'%) )'});
                            }
                        }
                    });

                    gsap.to($Section04, {
                        scrollTrigger : {
                            trigger : $Wrapper,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        scale : '0',
                        rotate : '-360deg'
                    });

                },

                //@media all and (max-width:1000px)
                '(max-width:1000px)' : function () {
                    ScrollTrigger.saveStyles($SectionInnerLeft01);
                    ScrollTrigger.saveStyles($SectionInnerRight01);
                    ScrollTrigger.saveStyles($SectionInnerLeft02);
                    ScrollTrigger.saveStyles($SectionInnerLeft03);
                    ScrollTrigger.saveStyles($Section04);
                }
            });

            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();


    });
})(jQuery);