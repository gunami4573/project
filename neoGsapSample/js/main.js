(function ($) {

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
                $Rowgroup5 = $('.rowgroup5'),
                $SectionInnerLeft01 = $('.rowgroup1 .section1 .section1_wrap .wrap_inner .inner.left'),
                $SectionInnerRight01 = $('.rowgroup1 .section1 .section1_wrap .wrap_inner .inner.right'),
                $SectionInnerLeft02 = $('.rowgroup2 .section2 .section2_wrap .wrap_inner .inner.left'),
                $SectionInnerLeft03 = $('.rowgroup3 .section3 .section3_wrap .wrap_inner .inner.left'),
                $Section04 = $('.rowgroup4 .section4'),
                $SectionInnerList05 = $('.rowgroup5 .section5 .section5_wrap .wrap_inner .inner_list');

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
                        top : 'calc(800px + 50px)',
                        ease : 'back.out(1.7)'
                    });
                    gsap.to($SectionInnerList05, {
                        scrollTrigger : {
                            trigger : $Rowgroup5,
                            start : '0%',
                            end : '6690px',
                            pin : true,
                            scrub : 1.05
                        },
                        x : '-100%'
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
                        top : 'calc(40vw + 50px)',
                        ease : 'back.out(1.7)'
                    });
                    gsap.to($SectionInnerList05, {
                        scrollTrigger : {
                            trigger : $Rowgroup5,
                            start : '0%',
                            end : '3900px',
                            pin : true,
                            scrub : 1.05
                        },
                        x : '-100%'
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
                                $SectionInnerRight01.css({'clip-path':'polygon(calc('+clip*300+'%) 0%, 100% 0%, 100% 100%, calc('+clip*300+'%) 100%)'});
                            }
                        }
                    });
                    gsap.to($SectionInnerLeft02, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        x : '100%'
                    });
                    gsap.from($SectionInnerLeft02, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        opacity : '1'
                    });
                    gsap.from($SectionInnerLeft03, {
                        scrollTrigger : {
                            trigger : $Rowgroup1,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        x : '100%',
                        y : '-100%',
                        ease : 'back.out(1.7)'
                    });

                    gsap.to($Section04, {
                        scrollTrigger : {
                            trigger : $Wrapper,
                            start : '0%',
                            end : '100%',
                            scrub : 1.05
                        },
                        scale : '0',
                        rotate : '-720deg',
                        ease : 'slow(0.7,0.7,false)'
                    });

                },

                //@media all and (max-width:1000px)
                '(max-width:1000px)' : function () {
                    ScrollTrigger.saveStyles($SectionInnerLeft01);
                    ScrollTrigger.saveStyles($SectionInnerRight01);
                    ScrollTrigger.saveStyles($SectionInnerLeft02);
                    ScrollTrigger.saveStyles($SectionInnerLeft03);
                    ScrollTrigger.saveStyles($Section04);
                    ScrollTrigger.saveStyles($SectionInnerList05);
                }
            });

            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();


    });
})(jQuery);