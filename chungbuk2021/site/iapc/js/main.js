'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);

            $(function() {
                $window.on('screen:wide screen:web', function(event) {
                    window.mode = 'pc';
                });

                $window.on('screen:tablet screen:phone', function(event) {
                    $('.search_panel').hide();
                    window.mode = 'mobile';
                });

                $('.visual_list a[href="#"]').click(function(e) {
                    e.preventDefault();
                });

                //여기서부터 코드 작성해주세요

                //스크롤 애니메이션 시작
                var $scrollcontent = $('.main_scroll');
                $scrollcontent.each(function(){
                    var $this = $(this),
                        scrollTop = $window.scrollTop(),
                        scrollBottom = scrollTop + $window.height(),
                        contentOffset = $this.offset();
                    if(scrollBottom > contentOffset.top) {
                        $this.addClass('active');
                    }
                });

                $window.on('scroll', function(event) {
                    $scrollcontent.each(function(){
                        var $this = $(this),
                            scrollTop = $window.scrollTop(),
                            scrollBottom = scrollTop + $window.height(),
                            contentOffset = $this.offset();
                        if(scrollBottom > contentOffset.top) {
                            $this.addClass('active');
                        }
                        /*
                        else{
                            $this.removeClass('active');
                        }
                        */
                    });
                });
                //스크롤 애니메이션 끝

                //메인 비주얼 슬릭 시작
                var $slide = $('.rowgroup1 .visual_list');
                $slide.slick({
                    autoplay : true,
                    autoplaySpeed : 5000,
                    dots : false,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    infinite : true,
                    prevArrow : $('.rowgroup1 .visual_control .prev'),
                    nextArrow : $('.rowgroup1 .visual_control .next'),
                    swipe : false,
                    draggable : false,
                    fade : true,
                    responsive: [
                        {
                            breakpoint: 641,
                            settings: {
                                swipe:true,
                                draggable:true
                            }
                        }]
                });
                //메인 비주얼 슬릭 끝

                //스마트 과의존 예방가이드 슬라이드 시작
                var $smart = $('.rowgroup3 .smart_slide_box .slide_list');
                $smart.slick({
                    autoplay : false,
                    autoplaySpeed : 5000,
                    dots : false,
                    slidesToShow : 4,
                    slidesToScroll : 1,
                    infinite : false,
                    swipe : false,
                    swipeToSlide : false,
                    draggable : false,
                    rows: 2, //여러줄
                    variableWidth: true, //width를 css로 제어
                    responsive: [
                        {
                            breakpoint: 641,
                            settings: {
                                arrows : false,
                                slidesToShow : 2,
                                rows : 1,
                                swipe : true,
                                swipeToSlide : true,
                                draggable : true,
                                infinite: true
                            }
                        }]
                });
                //스마트 과의존 예방가이드 슬라이드 끝

                //상담 관련 안내 및 자료실 슬라이드 시작
                var $advice = $('.rowgroup4 .advice .advice_slide');
                $advice.slick({
                    autoplay : false,
                    dots : false,
                    slidesToShow : 5,
                    slidesToScroll : 1,
                    infinite : false,
                    swipe : false,
                    draggable : false,
                    variableWidth: true, //width를 css로 제어
                    responsive: [
                        {
                            breakpoint: 641,
                            settings: {
                                dots : true,
                                slidesToShow : 5,
                                slidesToScroll : 2,
                                draggable : true,
                                swipe: true
                            }
                        },
                        {
                            breakpoint: 596,
                            settings: {
                                dots : true,
                                slidesToShow : 4,
                                slidesToScroll : 2,
                                draggable : true,
                                swipe: true
                            }
                        },
                        {
                            breakpoint: 481,
                            settings: {
                                dots : true,
                                slidesToShow : 3,
                                slidesToScroll : 3,
                                draggable : true,
                                swipe: true
                            }
                        }]
                });
                //상담 관련 안내 및 자료실 슬라이드 끝


            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
