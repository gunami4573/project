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

        //언어선택 시작
        var $LangChoice = $('#header .header_login .lang_choice'),
            $LangChoiceOpen = $LangChoice.find('button.lang_choice_open'),
            $LangLayer = $LangChoiceOpen.siblings('.lang_layer');
        $LangChoiceOpen.on('click', function(){
            var $this = $(this),
                IsActive = $LangChoice.is('.active');
            if(!IsActive){
                $this.attr('title', 'language list close');
                $LangChoice.addClass('active');
                $LangLayer.slideDown(350);
            }
            else{
                $this.attr('title', 'language list open');
                $LangChoice.removeClass('active');
                $LangLayer.slideUp(350);
            }
        });
        //언어선택 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);