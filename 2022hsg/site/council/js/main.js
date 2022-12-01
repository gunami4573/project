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
        var $VisualConItem = $('.visual .visual_wrap .visual_con_list .visual_con_item');
        $VisualConItem.each(function(){
            var $this = $(this),
                $ImgTypeVisualSlideList = $this.find('.visual_slide_wrap.img_type .visual_slide_list'),
                $PersonTypeVisualSlideList = $this.find('.visual_slide_wrap.person_type .visual_slide_list');
            $ImgTypeVisualSlideList.on('init', function(event, slick, currentSlide){
                var $currentslide = $(slick.$slides[0]);
                setTimeout(function(){
                    $ImgTypeVisualSlideList.addClass('title_loading');
                    $currentslide.addClass('img_scale');
                }, 1);
            });
            $ImgTypeVisualSlideList.slick({
                autoplay : true,
                autoplaySpeed : 4000,
                speed : 2000,
                dots : true,
                appendDots: $('.visual_slide_wrap.img_type .visual_slide_control .dot_box'),
                dotsClass:'slick-dots clearfix',
                customPaging : function(slider, i) {
                    var thumb = $(slider.$slides[i]).attr('data-thum');
                    return '<button type="button"><span class="text">0'+(i + 1)+'</span><span class="skip">번 보기</span></button>';
                },
                arrows : false,
                autoArrow : $('.visual_slide_wrap.img_type .visual_slide_control .auto'),
                pauseText : '정지',
                playText : '재생',
                slidesToShow : 1,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                fade : true,
                pauseOnHover : true,
                pauseOnFocus : true,
                responsive: [{}]
            });
            $ImgTypeVisualSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                var $currentslide = $(slick.$slides[currentSlide]),
                    $nextslide = $(slick.$slides[nextSlide]);
                setTimeout(function(){
                    $currentslide.removeClass('img_scale');
                    $nextslide.addClass('img_scale');
                }, 1);
            });

            $PersonTypeVisualSlideList.slick({
                autoplay : false,
                dots : false,
                arrows : false,
                slidesToShow : 1,
                slidesPerRow : 7,
                slidesToScroll : 1,
                infinite : false,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                variableWidth : true,
                pauseOnHover : true,
                pauseOnFocus : true,
                responsive: [{}]
            });
        });
        $('.visual .visual_wrap .visual_tab_list .visual_tab_item button.visual_tab_btn').on('click', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.visual_tab_item'),
                IsActive = $MyTabItem.is('.active'),
                MyTabItemIndex = $MyTabItem.index(),
                $OtherTabItem = $MyTabItem.siblings('.visual_tab_item'),
                $OtherTabBtn = $OtherTabItem.find('button.visual_tab_btn'),
                $VisualTabList = $MyTabItem.parent('.visual_tab_list'),
                $VisualConList = $VisualTabList.siblings('.visual_con_list'),
                $MyConItem = $VisualConList.find('.visual_con_item').eq(MyTabItemIndex),
                $OtherConItem = $MyConItem.siblings('.visual_con_item'),
                $MySlideList = $MyConItem.find('.visual_slide_list');
            if(IsActive){
                $OtherTabItem.addClass('active');
                $MyTabItem.removeClass('active');
                $OtherConItem.removeClass('active');
                $MyConItem.addClass('active');
                $MySlideList.slick('setPosition');
            }
        });


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);