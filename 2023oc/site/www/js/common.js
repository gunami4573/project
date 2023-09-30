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

        //대표 전용 모바일 퀵메뉴 시작
        $(document).on('click', '.header_box .m_btn_list .menu_quick button.m_btn', function(){
            var $this = $(this),
                $MenuQuick = $this.parent('.menu_quick'),
                IsQuickOpen = $MenuQuick.is('.quick_open'),
                $MenuQuickLayer = $this.siblings('.m_quick_layer');
            if(!IsQuickOpen){
                $MenuQuick.addClass('quick_open');
                setTimeout(function(){
                    $MenuQuick.addClass('quick_ani');
                }, 1);
                $MenuQuickLayer.slideDown(500);
            }
            else{
                $MenuQuick.removeClass('quick_open quick_ani');
                $MenuQuickLayer.slideUp(500);
            }
        });
        $(document).on('click', '.header_box .m_btn_list .menu_quick button.m_quick_close', function(){
            var $this = $(this),
                $MenuQuickLayer = $this.parent('.m_quick_layer'),
                $MenuQuick = $MenuQuickLayer.parent('.menu_quick'),
                IsQuickOpen = $MenuQuick.is('.quick_open');
            if(IsQuickOpen){
                $MenuQuick.removeClass('quick_open quick_ani');
                $MenuQuickLayer.slideUp(500);
            }
        });
        $(document).on('click', '.header_box .m_btn_list button.menu_button', function(){
            var $this = $(this),
                $MenuQuick = $this.siblings('.menu_quick'),
                $MenuQuickLayer = $MenuQuick.find('.m_quick_layer');
            $MenuQuick.removeClass('quick_open quick_ani')
            $MenuQuickLayer.slideUp(500);
        });
        //대표 전용 모바일 퀵메뉴 끝

    });
})(jQuery);