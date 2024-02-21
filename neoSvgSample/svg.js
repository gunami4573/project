(function ($) {
    'use strict';

    $(function () {
        // 초기 path 값 변수 담기
        var startD = 'M 0 0 C 71.3333 0 142.6667 0 200 0 C 200 66.6667 200 133.3333 200 200 C 133.3333 200 66.6667 200 0 200 C 0 133.3333 0 66.6667 0 0';
        // 바꿀 path 값 변수 담기
        var enterD = 'M 0 0 C 90 90 110 90 200 0 C 110 90 110 110 200 200 C 110 110 90 110 0 200 C 90 110 90 90 0 0';
        //
        var $svgBox = $('.svg_box');
        $svgBox.each(function () {
            var $this = $(this),
                IsUseImg = $this.is('.use_img'),
                $svg = $this.find('svg'),
                $Path = $svg.find('.path');

            //non_img
            function PathEnter() {
                $Path.attr({
                    d : enterD,
                    fill : '#000'
                }).attr('stroke-width', '0');
            }
            function PathStart() {
                $Path.attr({
                    d : startD,
                    fill : '#f00'
                }).attr('stroke-width', '10');
            }

            //use_img
            function UseImgPathEnter() {
                $Path.attr({
                    d : enterD,
                    stroke : '#00f'
                }).attr('stroke-width', '30');
            }
            function UseImgPathStart() {
                $Path.attr({
                    d : startD,
                    stroke : '#f00'
                }).attr('stroke-width', '10');
            }

            $svg.on('mouseenter', function () {
                if(IsUseImg){
                    //use_img
                    UseImgPathEnter();
                }
                else{
                    //non_img
                    PathEnter();
                }
            });
            $svg.on('mouseleave', function () {
                if(IsUseImg){
                    //use_img
                    UseImgPathStart();
                }
                else{
                    //non_img
                    PathStart();
                }
            });
        });

        // 초기 path 값 변수 담기
        var graStartD = 'M 0 0 C 71.3333 0 142.6667 0 200 0 C 200 66.6667 200 133.3333 200 200 C 133.3333 200 66.6667 200 0 200 C 0 133.3333 0 66.6667 0 0';
        // 바꿀 path 값 변수 담기
        var graEnterD = 'M 200 200 C 0 0 0 0 200 0 C 0 0 100 100 200 200 C 100 100 0 0 0 200 C 0 0 0 0 200 200';
        //
        var $graSvgBox = $('.gra_svg_box');
        $graSvgBox.each(function () {
            var $this = $(this),
                $graSvg = $this.find('svg'),
                $graPath = $graSvg.find('.path');
            function GradientPathEnter() {
                $graPath.attr({
                    d : graEnterD,
                }).attr('stroke-width', '6');
            }
            function GradientPathStart() {
                $graPath.attr({
                    d : graStartD,
                }).attr('stroke-width', '0');
            }

            $graSvg.on('mouseenter', function () {
                GradientPathEnter();
            });
            $graSvg.on('mouseleave', function () {
                GradientPathStart();
            });
        });

    });
})(jQuery);