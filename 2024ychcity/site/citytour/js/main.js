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

        //rowgroup 공통 시작
        function moveScroll(ele, top){
            var cityScrollTop = $window.scrollTop();
            if(cityScrollTop > top - 800){
                ele.addClass('scroll');
            }
            else{
                ele.removeClass('scroll');
            }
        }
        $('.rowgroup').each(function(){
            var $this = $(this),
                toptest;
            setTimeout(function(){
                toptest = $this[0].offsetTop;
                $window.on('scroll', function(){
                    moveScroll($this, toptest);
                });
                moveScroll($this, toptest);
            }, 1);
        });
        //rowgroup 공통 끝

        //비주얼 슬라이드 시작
        var $visualTextSlideList = $('.visual .text_slide .text_slide_list'),
            $visualImgSlideList = $('.visual .img_slide .img_slide_list'),
            $visualCurrent = $('.visual .slide_control .current'),
            $visualPrev = $('.visual .prev'),
            $visualNext = $('.visual .next');
        $visualTextSlideList.slick({
            autoplay : true,
            autoplaySpeed : 6000,
            speed : 3000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : false,
            zIndex : 1,
            fade : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            asNavFor : $visualImgSlideList
        });
        $visualImgSlideList.on('init', function(event, slick, currentSlide) {
            $('.visual').addClass('start_ani');
            $('.visual .progress').addClass('active');
            $('.visual .space_title').text($('.img_slide .slick-current.slick-active img').attr('alt'));
        });
        $visualImgSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.visual .progress').removeClass('active');
            setTimeout(function(){
                $('.visual .progress').addClass('active');
                $('.visual .space_title').text($('.img_slide .slick-current.slick-active img').attr('alt'));
            }, 1);
        });
        $visualImgSlideList.slick({
            autoplay : true,
            autoplaySpeed : 6000,
            speed : 3000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $visualPrev,
            nextArrow : $visualNext,
            current : $visualCurrent,
            zIndex : 1,
            fade : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            asNavFor : $visualTextSlideList
        });
        //비주얼 슬라이드 끝

        //비주얼 실시간 예약하기 버튼 마우스 오버 시작
        $('.visual .live_btn').on('mouseover', function(){
            var $this = $(this);
            $this.find('svg path').attr('d', 'M 0 89 H 355 C 316 89 262 89 220 89 Q 180 89 140 89 C 97 89 39 89 0 89');
        }).on('mouseleave', function(){
            var $this = $(this);
            $this.find('svg path').attr('d', 'M 0 89 H 355 C 316 84 328 56 260 20 Q 180 -20 95 20 C 27 56 39 84 0 89');
        });
        //비주얼 실시간 예약하기 버튼 마우스 오버 끝

        //코스안내 시작
        //탭 슬라이드
        var $courseChoiceSlideList = $('.course .choice_slide_list'),
            $courseChoicePrev = $('.course .choice_slide_control .prev'),
            $courseChoiceNext = $('.course .choice_slide_control .next');
        $courseChoiceSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $nextSlide = $(slick.$slides[nextSlide]);
            $('.course .choice_slide_list .choice_slide_item').removeClass('active');
            $('.course .choice_slide_list .choice_slide_item button.choice_btn').removeAttr('title');
            $('.course .map_slide_box_item').removeClass('active active_ani');
            $('.course .map_line').removeClass('active active_ani');
            $nextSlide.find('.choice_slide_item').addClass('active');
            $nextSlide.find('button.choice_btn').attr('title', '선택됨');
            $('.course .map_slide_box_item[data-course="'+$nextSlide.find('.choice_slide_item').attr('data-course')+'"]').addClass('active');
            setTimeout(function(){
                $('.course .map_slide_box_item[data-course="'+$nextSlide.find('.choice_slide_item').attr('data-course')+'"]').addClass('active_ani');
            }, 1);
            $('.course .map_line[data-course="'+$nextSlide.find('.choice_slide_item').attr('data-course')+'"]').addClass('active');
            setTimeout(function(){
                $('.course .map_line[data-course="'+$nextSlide.find('.choice_slide_item').attr('data-course')+'"]').addClass('active_ani');
            }, 1);
        });
        $courseChoiceSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : false,
            arrows : true,
            prevArrow : $courseChoicePrev,
            nextArrow : $courseChoiceNext,
            zIndex : 1,
            fade : false,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            responsive : [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    variableWidth : false
                }
            }]
        });

        //맵코스 이미지 슬라이드
        var $mapSlideBoxItem = $('.course .map_slide_box_item');
        $mapSlideBoxItem.each(function(){
            var $this = $(this),
                $mapSlideList = $this.find('.map_slide_list');
            $mapSlideList.slick({
                autoplay : false,
                speed : 400,
                dots : true,
                appendDots : $this.find('.dot_nav'),
                dotsClass : 'dot_nav_list',
                customPaging : function(slider, i) {
                    return '<button type="button">' +
                        '<span class="skip">코스의 '+(i + 1)+'번째 순서</span>' +
                        '<span class="nav_text">'+$mapSlideList.find('.map_slide_item[data-text="'+(i + 1)+'"]').find('.view_img').text()+'</span>' +
                    '</button>';
                },
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                variableWidth : true,
                infinite : false,
                arrows : false,
                zIndex : 1,
                fade : false,
                pauseOnArrowClick : true,
                pauseOnSwipe : true
            });
        });

        //탭 슬라이드 안에 탭버튼기능
        $(document).on('click', '.course .choice_slide_list .choice_slide_item button.choice_btn', function() {
            var $this = $(this),
                $myItem = $this.parent('.choice_slide_item'),
                IsActive = $myItem.is('.active'),
                myDataCourse = $myItem.attr('data-course'),
                $otherItem = $('.course .choice_slide_list .choice_slide_item'),
                $otherBtn = $otherItem.find('button.choice_btn');
            if(!IsActive){
                $otherItem.removeClass('active');
                $otherBtn.removeAttr('title');
                $myItem.addClass('active');
                $this.attr('title', '선택됨');
                $('.course .map_slide_box_item').removeClass('active active_ani');
                $('.course .map_slide_box_item[data-course="'+myDataCourse+'"]').addClass('active');
                setTimeout(function(){
                    $('.course .map_slide_box_item[data-course="'+myDataCourse+'"]').addClass('active_ani');
                }, 1);
                $('.course .map_slide_box_item[data-course="'+myDataCourse+'"]').find('.map_slide_list').slick('setPosition');
                $('.course .map_line').removeClass('active active_ani');
                $('.course .map_line[data-course="'+myDataCourse+'"]').addClass('active');
                setTimeout(function(){
                    $('.course .map_line[data-course="'+myDataCourse+'"]').addClass('active_ani');
                }, 1);
            }
        });
        //코스안내 끝

        //자주찾는 메뉴 슬라이드 시작
        var $popularQuickSlideList = $('.popular .quick_slide_list'),
            $popularQuickSlidePrev = $('.popular .quick_slide_control .prev'),
            $popularQuickSlideNext = $('.popular .quick_slide_control .next');
        $popularQuickSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 5,
            rows : 1,
            slidesPerRow : 1,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : false,
            arrows : true,
            prevArrow : $popularQuickSlidePrev,
            nextArrow : $popularQuickSlideNext,
            zIndex : 1,
            fade : false,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            responsive : [{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    rows : 1,
                    slidesPerRow : 3,
                    variableWidth : false,
                    infinite : true
                }
            },{
                breakpoint : 481,
                settings : {
                    slidesToShow : 1,
                    rows : 1,
                    slidesPerRow : 2,
                    variableWidth : false,
                    infinite : true
                }
            }]
        });
        //자주찾는 메뉴 슬라이드 끝

        //데코 gsap 시작
        function gsapInit(){
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                '(min-width:1601px)' : function () {
                    //rowgroup2 시작
                    gsap.from( $('.course .course_total_deco') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : -20,
                        opacity : 0
                    });
                    gsap.from( $('.course .course_tree .tree:nth-child(1)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 1.1,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 100,
                        yPercent : 200,
                        opacity : 0,
                        scale : 0
                    });
                    gsap.from( $('.course .course_tree .tree:nth-child(2)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 1.1,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 100,
                        yPercent : 200,
                        opacity : 0,
                        scale : 0
                    });
                    gsap.from( $('.course .course_tree .tree:nth-child(3)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 1.1,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 100,
                        yPercent : 200,
                        opacity : 0,
                        scale : 0
                    });
                    gsap.from( $('.course .map_line .map_line_inner') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-90% 0%',
                            end : '-30% 0%',
                            scrub : 1.1,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -50
                    });
                    gsap.from( $('.course .map_img .shadow') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 15,
                        yPercent : 15,
                        opacity : 0
                    });
                    gsap.from( $('.course .map_img .gra') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 10,
                        yPercent : 10
                    });
                    gsap.from( $('.course .course_title') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 20,
                        yPercent : -60
                    });
                    gsap.from( $('.course .course_choice') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : -30,
                        yPercent : -100,
                        opacity : 0
                    });
                    gsap.from( $('.course .map_slide_box') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 20,
                        yPercent : 60
                    });
                    gsap.from( $('.course .course_more .more_link') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-40% 0%',
                            end : '20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : 60,
                        opacity : 0,
                    });
                    //rowgroup2 끝

                    //rowgroup3 시작
                    gsap.from( $('.popular .popular_bg') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-40% 0%',
                            end : '20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -10
                    });
                    gsap.from( $('.popular .tree_top .tree:nth-child(1)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-80% 0%',
                            end : '0% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : 60,
                        scale : 0
                    });
                    gsap.from( $('.popular .tree_top .tree:nth-child(2)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-80% 0%',
                            end : '0% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : 60,
                        scale : 0
                    });
                    gsap.from( $('.popular .tree_top .tree:nth-child(3)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-80% 0%',
                            end : '0% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : 60,
                        scale : 0
                    });
                    gsap.from( $('.popular .tree_bottom .tree:nth-child(1)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-30% 0%',
                            end : '20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : 60,
                        scale : 0
                    });
                    gsap.from( $('.popular .tree_bottom .tree:nth-child(2)') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-30% 0%',
                            end : '20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : 60,
                        scale : 0
                    });
                    gsap.from( $('.popular .popular_title') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-80% 0%',
                            end : '-20% 0%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        xPercent : 20,
                        yPercent : -60
                    });
                    gsap.from( $('.popular .quick_slide_item.type01') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-80% 10%',
                            end : '-60% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.from( $('.popular .quick_slide_item.type02') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-90% 10%',
                            end : '-60% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.from( $('.popular .quick_slide_item.type03') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-100% 10%',
                            end : '-60% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.from( $('.popular .quick_slide_item.type04') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-90% 10%',
                            end : '-60% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.from( $('.popular .quick_slide_item.type05') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-80% 10%',
                            end : '-60% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.from( $('.popular .board') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-40% 10%',
                            end : '0% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        yPercent : -10,
                        opacity : 0
                    });
                    gsap.from( $('.popular .ticket_shadow') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '0% 10%',
                            end : '10% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        opacity : 0
                    });
                    gsap.from( $('.popular .left_ticket') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-50% 10%',
                            end : '0% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        rotate : -20
                    });
                    gsap.from( $('.popular .right_ticket') , {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-50% 10%',
                            end : '0% 20%',
                            scrub : 2,
                            markers : false
                        },
                        ease : 'power2.out',
                        rotate : 90
                    });
                    //rowgroup3 끝
                },
                '(max-width:1600px)' : function () {
                    //rowgroup2 시작
                    ScrollTrigger.saveStyles( $('.course .course_total_deco') );
                    ScrollTrigger.saveStyles( $('.course .course_tree .tree:nth-child(1)') );
                    ScrollTrigger.saveStyles( $('.course .course_tree .tree:nth-child(2)') );
                    ScrollTrigger.saveStyles( $('.course .course_tree .tree:nth-child(3)') );
                    ScrollTrigger.saveStyles( $('.course .map_line .map_line_inner') );
                    ScrollTrigger.saveStyles( $('.course .map_img .shadow') );
                    ScrollTrigger.saveStyles( $('.course .map_img .gra') );
                    ScrollTrigger.saveStyles( $('.course .course_title') );
                    ScrollTrigger.saveStyles( $('.course .course_choice') );
                    ScrollTrigger.saveStyles( $('.course .map_slide_box') );
                    ScrollTrigger.saveStyles( $('.course .course_more .more_link') );
                    //rowgroup2 끝

                    //rowgroup3 시작
                    ScrollTrigger.saveStyles( $('.popular .popular_bg') );
                    ScrollTrigger.saveStyles( $('.popular .tree_top .tree:nth-child(1)') );
                    ScrollTrigger.saveStyles( $('.popular .tree_top .tree:nth-child(2)') );
                    ScrollTrigger.saveStyles( $('.popular .tree_top .tree:nth-child(3)') );
                    ScrollTrigger.saveStyles( $('.popular .tree_bottom .tree:nth-child(1)') );
                    ScrollTrigger.saveStyles( $('.popular .tree_bottom .tree:nth-child(2)') );
                    ScrollTrigger.saveStyles( $('.popular .popular_title') );
                    ScrollTrigger.saveStyles( $('.popular .quick_slide_item.type01') );
                    ScrollTrigger.saveStyles( $('.popular .quick_slide_item.type02') );
                    ScrollTrigger.saveStyles( $('.popular .quick_slide_item.type03') );
                    ScrollTrigger.saveStyles( $('.popular .quick_slide_item.type04') );
                    ScrollTrigger.saveStyles( $('.popular .quick_slide_item.type05') );
                    ScrollTrigger.saveStyles( $('.popular .board') );
                    ScrollTrigger.saveStyles( $('.popular .ticket_shadow') );
                    ScrollTrigger.saveStyles( $('.popular .left_ticket') );
                    ScrollTrigger.saveStyles( $('.popular .right_ticket') );
                    //rowgroup3 끝
                }
            });
            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();
        //데코 gsap 끝
    });
})(jQuery);