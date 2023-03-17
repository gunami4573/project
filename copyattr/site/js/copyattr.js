(function ($) {
    'use strict';
    $(function () {
        var $window = $(window),
            $container = $("#container");

        //템플릿 복사 시작
        /* 템플릿 HTML에 하단 마크업 필요
            <textarea id="ClipBoard" style="display:none"></textarea>
            <div class="copy_clone" style="display:none;"></div>
        */
        $("[copy-attr='yes']").on('click', function(){
            var findHtml = $(this).clone();
            $('.copy_clone').append(findHtml);
            $('.copy_clone *').removeAttr('copy-attr style');

            var copyHtml = $('.copy_clone').html();
            $('#ClipBoard').css('display', 'block').val(copyHtml).select();

            var succeed;
            try {
                succeed = document.execCommand("copy");
                $('#ClipBoard').css('display', 'none');
                $('.copy_clone').html('');
            } catch(e) {
                succeed = false;
            }
            if(succeed){
                alert('복사 되었습니다');
            }
            return false;
        });
        //템플릿 복사 끝

        // 스텝 자동 높이 시작
        function stepAutoHeight(){
            var $step = $container.find('.step'),
                $stepList = $step.find('.step_list'),
                $stepItem = $stepList.find('.step_item');

            $stepList.each(function (index, element) {
                if($window.width() > 640){
                    var $element = $(element),
                        $elementStepItem = $element.find('.step_item'),
                        $elementItemLevel = $elementStepItem.find('.level'),
                        height = 0,
                        width = 0,
                        count;
                    if($element.parents('.step')){
                        $($elementStepItem, element).each(function (index){
                            var $this = $(this),
                                thisWidth = $this.find('.step_content').width(),
                                thisHeight = $this.find('.step_content').height();

                            if (thisWidth > width){
                                width = thisWidth;
                            }
                            if (thisHeight > height){
                                height = thisHeight;
                            }

                            count = index + 1;
                        }).height(height);
                    }
                    //$element.closest('.step').addClass('length' + count);
                }
            });
        }
        stepAutoHeight();
        $window.on('resize', function(){
            stepAutoHeight();
        });
        // 스텝 자동 높이 끝

    });
})(jQuery);