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

        //강좌검색 셀렉트 시작
        $('.search_box .input_select_area .select_area_inner button.select_btn').on('click', function(){
            var $this = $(this),
                $AreaInner = $this.parent('.select_area_inner'),
                IsActive = $AreaInner.is('.active');
            if(!IsActive){
                $this.attr('title', '하위 리스트 닫기');
                $AreaInner.addClass('active');
            }
        });
        $(document).on('click', '.search_box .input_select_area .select_area_inner .select_choice_list .select_choice_item button.select_choice_btn', function(){
            var $this = $(this),
                $ChoiceText = $this.find('em').text(),
                $ChoiceItem = $this.parent('.select_choice_item'),
                $ChoiceList = $ChoiceItem.parent('.select_choice_list'),
                $SelectBtn = $ChoiceList.siblings('button.select_btn'),
                $SelectBtnText = $SelectBtn.find('em'),
                $AreaInner = $ChoiceList.parent('.select_area_inner'),
                IsActive = $AreaInner.is('.active'),
                $OtherChoiceItem = $ChoiceItem.siblings('.select_choice_item'),
                $OtherChoiceBtn = $OtherChoiceItem.find('button.select_choice_btn');
            if(IsActive){
                $AreaInner.removeClass('active')
                $SelectBtn.attr('title', '하위 리스트 열기');
                $OtherChoiceItem.removeClass('active');
                $OtherChoiceBtn.removeAttr('title');
                $ChoiceItem.addClass('active');
                $this.attr('title', '선택됨');
                $SelectBtnText.text($ChoiceText);
            }
        });
        //강좌검색 셀렉트 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);