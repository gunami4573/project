(function($) {
    'use strict';
    var $window = $(window),
        $document = $(document),
        $html = $('html');

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie7';

        //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie8';

        //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie9';

        //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie10';

        //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie11';

        //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

        //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

        //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

        //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

        //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);
    
    $(function() {
        /* 아코디언 열고 닫기 */
        $('.qna_btn').on('click', function(){
            var $this = $(this),
                $Title = $this.parent('.qna_title'),
                $Item = $Title.parent('.qna_top'),
                $ItemBox = $this.parents('.qna_item'),
                $Layer = $Item.siblings('.qna_body'),
                IsActive = 	$ItemBox.is('.active');
            if(!IsActive){
                $this.addClass('active').attr('title', '내용 닫기');
                $ItemBox.addClass('active');
                $Layer.slideDown(300);
            } else{
                $this.removeClass('active').attr('title', '내용 열기');
                $ItemBox.removeClass('active');
                $Layer.slideUp(300);
            }
        });

        /* 반응형 테이블 */
        $('table.table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });

        $(function(){
            $('.popup_box .close').on('click', function(){
                var $this = $(this),
                    $PopupBox = $this.parents('.popup_box');
                $PopupBox.fadeOut(function() {
                    $PopupBox.removeClass('active');
                });
            });
        });

    });

    $(".day").on("click",function(e){
        console.log("fff")
        if(e.keyCode == 13){

            alert("이벤트 발생");

        }

    });

    $(document).ready(function(){
        $('.p-input__item.p-date__icon').on('click',function(){
            $('.p-datepicker__dropdown button.active').focus().prepend('<span class="skip">선택됨</span>');
        });
        $('.p-datepicker__dropdown button.today').prepend('<span class="skip">오늘</span>');

    });
})(window.jQuery);