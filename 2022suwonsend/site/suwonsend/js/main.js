(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        //여기서부터 코드 작성해주세요

        $('.video_box button.video_btn').on('click', function(){
            var $this = $(this),
                $Video = $this.siblings('video'),
                $Videobox = $this.parent('.video_box'),
                IsActive = $Videobox.is('.active');
            if(!IsActive){
                $this.attr('title' , '정지');
                $Videobox.addClass('active');
                $Video.get(0).play();
            }
            else{
                $this.attr('title' , '재생');
                $Videobox.removeClass('active');
                $Video.get(0).pause();
            }
            $Video.on('ended', function(){
                $this.attr('title' , '재생');
                $Videobox.removeClass('active');
            });
        });






        $window.on('screen:tablet screen:phone', function(event) {


        });
    });
})(jQuery);