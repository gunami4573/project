//게시판 소스 수정(추후 문제 시 사용 예정) 시작
/*
$(document).ready(function(){
    $('.p-media--gallery .p-media-list .p-media .p-media__link .p-media__image .p-media__image-wrap img').each(function (){
        var $this = $(this),
            thissrc = $this.attr('src');

        if(thissrc == '/thumb/t_'){
            $this.parent('.p-media__image-wrap').addClass('no-image').append('<em class="skip">이미지없음</em>');
            $this.remove();
        }
    });
});
*/
//게시판 소스 수정(추후 문제 시 사용 예정) 끝

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        //사이드
        var $container = $('#container'),
            $side = $container.find('.side'),
            $sideDepthItem = $side.find('.depth_item'),
            $sideSpy = $side.find('.spy:last');

        $sideDepthItem.on('click.menu', function(event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target;

            if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if($this.hasClass('depth1_item')) {
                    if($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    }else{
                        $html.addClass('side_open');
                    }
                }

                if($this.children('.depth').length) {
                    $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                    event.preventDefault();
                }
            }

            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if($element.children('.depth').length) {
                $element.addClass('has');
            }else{
                $element.addClass('solo');
            }
        });

        if($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
        }

        //여기서부터 코드 작성해주세요


        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);