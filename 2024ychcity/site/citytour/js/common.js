(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');
        
        //푸터 상단 바로가기 시작
        $('.footer_top button').on('click', function() {
            $('html, body').animate({
                scrollTop : $body.offset().top
            }, 400);
        });
        //푸터 상단 바로가기 끝
        
        //서브 비주얼 아이콘 시작
        $(document).ready(function () {
            var $depItem = $('#header .depth1 .depth1_list .depth1_item'),
                $subItem = $('.sub_visual_box .visual_inner');
            
            // (1) 메뉴 아이템에 순차적으로 type 클래스 추가
            $depItem.each(function (index) {
                $(this).addClass('type' + (index + 1));
            });
            
            // (2) type 클래스 갱신 함수: 클릭/호버 시 모두 사용
            function changeClass($item) {
                var typeClass = $item.attr('class').match(/type\d+/)[0];
                $subItem.attr('class', 'visual_inner ' + typeClass); // type 클래스를 제거 후 새로 추가
            }
            
            // (3) 페이지 로딩 시 .actived 메뉴의 type 클래스 반영
            $(window).on('load', function () {
                var $activedItem = $depItem.filter('.actived');
                if ($activedItem.length) {
                    changeClass($activedItem);
                }
            });
            
            // (4) 메뉴 아이템 클릭 시 .actived 갱신 및 type 클래스 변경
            $depItem.on('click', function () {
                $depItem.removeClass('actived');
                $(this).addClass('actived');
                changeClass($(this));
            });
        });
        //서브 비주얼 아이콘 끝
    });
})(jQuery);