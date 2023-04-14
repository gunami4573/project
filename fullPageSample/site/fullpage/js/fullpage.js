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

        //스크롤 - 풀페이지 시작
        var scrollTimeout;
        function range() {
            var scrollValue = $(window).scrollTop(),
                $full2 = $('.full_group.rowgroup02').offset().top,
                $full3 = $('.full_group.rowgroup03').offset().top,
                $full4 = $('.full_group.rowgroup04').offset().top;
            $(window).on('resize', function(){
                var scrollValue = $(window).scrollTop(),
                    $full2 = $('.full_group.rowgroup02').offset().top,
                    $full3 = $('.full_group.rowgroup03').offset().top,
                    $full4 = $('.full_group.rowgroup04').offset().top;
                return scrollValue;
                return $full2;
                return $full3;
                return $full4;
            });
            if (scrollValue == 0) {
                $('html').attr('data-idx', '1');
                $('.full_group.rowgroup01').attr('data-active', 'on').siblings().attr('data-active', 'off');
                $('.fixed_dots li.full_nav01').attr('data-active', 'on').siblings().attr('data-active', 'off');
            }
            else if (scrollValue > 0 && scrollValue == $full2) {
                $('html').attr('data-idx', '2');
                $('.full_group.rowgroup02').attr('data-active', 'on').siblings().attr('data-active', 'off');
                $('.fixed_dots li.full_nav02').attr('data-active', 'on').siblings().attr('data-active', 'off');
            }
            else if (scrollValue > $full2 && scrollValue == $full3) {
                $('html').attr('data-idx', '3');
                $('.full_group.rowgroup03').attr('data-active', 'on').siblings().attr('data-active', 'off');
                $('.fixed_dots li.full_nav03').attr('data-active', 'on').siblings().attr('data-active', 'off');
            }
            else if (scrollValue > $full3 && scrollValue == $full4) {
                $('html').attr('data-idx', '4');
                $('.full_group.rowgroup04').attr('data-active', 'on').siblings().attr('data-active', 'off');
                $('.fixed_dots li.full_nav04').attr('data-active', 'on').siblings().attr('data-active', 'off');
            }
        }
        range();

        function wheelEvent(event) {
            event.preventDefault();
            var $windowHeight = $(window).height();
            $(window).on('resize', function(){
                var $windowHeight = $(window).height();
                return $windowHeight;
            });
            if (!scrollTimeout && $windowHeight > 840) {
                scrollTimeout = setTimeout(function () {
                    if (event.deltaY < 0) {
                        var $rowActive = $('.full_group[data-active="on"]').index();
                        $('html').stop().animate({
                            scrollTop : ($windowHeight * $rowActive) - $windowHeight
                        }, 500, function () {
                            range();
                        });
                    }
                    else if (event.deltaY > 0) {
                        var $rowActive = $('.full_group[data-active="on"]').index() + 1;
                        $('html').stop().animate({
                            scrollTop : $windowHeight * $rowActive
                        }, 500, function () {
                            range();
                        });
                    }
                    scrollTimeout = null;
                }, 500);
            }
        }

        function checkWidth() {
            var $windowWidth = $(window).width(),
                $windowHeight = $(window).height();

            window.addEventListener('wheel', wheelEvent, {passive:false});
            if ($windowWidth > 1000 && $windowHeight > 840) {
                $('html').attr('data-ctr', 'on');
                $('.full_group').removeClass('h840');
                range();

                $('.fixed_dots li').on('click', function(){
                    var $rowActive = $(this).index();
                    $('html').stop().animate({scrollTop : ($windowHeight) * $rowActive}, 500, function () {
                        range();
                    });
                    return false;
                });
            }
            else if ($windowWidth <= 1000 || $windowHeight <= 840){
                $('html').attr('data-ctr', 'off');
                $('.full_group').addClass('h840');
                window.removeEventListener('wheel', wheelEvent, {passive:true});
                return false;
            }
        }
        checkWidth();
        $(window).resize(checkWidth);
        //스크롤 - 풀페이지 끝



    });
})(jQuery);