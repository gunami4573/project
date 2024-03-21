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

        //lnb 라인 표출 조건(대표전용) 시작
        var $Depth1LineDecoBox = $('.depth1 .line_deco_box'),
            $Depth1Item = $('.depth1 .depth1_list .depth1_item'),
            $Depth1ItemFst = $('.depth1 .depth1_list .depth1_item:nth-child(1)'),
            $Depth1ItemTrd = $('.depth1 .depth1_list .depth1_item:nth-child(3)');
        $Depth1Item.each(function(){
            var $this = $(this),
                $thisDepth2Item = $this.find('.depth2_item');
            $this.on('mouseover', function(){
                $Depth1LineDecoBox.removeAttr('data-depth');
                if($thisDepth2Item.length == 1){
                    $Depth1LineDecoBox.attr('data-length', 1);
                }
                if($thisDepth2Item.length == 2){
                    $Depth1LineDecoBox.attr('data-length', 2);
                }
                if($thisDepth2Item.length == 3){
                    $Depth1LineDecoBox.attr('data-length', 3);
                }
                if($thisDepth2Item.length == 4){
                    $Depth1LineDecoBox.attr('data-length', 4);
                }
                if($thisDepth2Item.length >= 5){
                    $Depth1LineDecoBox.attr('data-length', 5);
                }
            });
        });
        $Depth1ItemFst.on('mouseover', function(){
            var $thisFst = $(this),
                $thisFstDepth2Item = $thisFst.find('.depth2_item');
            $Depth1LineDecoBox.attr('data-depth', 1);
            if($thisFstDepth2Item.length == 1){
                $Depth1LineDecoBox.attr('data-length', 1);
            }
            if($thisFstDepth2Item.length == 2){
                $Depth1LineDecoBox.attr('data-length', 2);
            }
            if($thisFstDepth2Item.length == 3){
                $Depth1LineDecoBox.attr('data-length', 3);
            }
            if($thisFstDepth2Item.length == 4){
                $Depth1LineDecoBox.attr('data-length', 4);
            }
            if($thisFstDepth2Item.length == 5){
                $Depth1LineDecoBox.attr('data-length', 5);
            }
            if($thisFstDepth2Item.length >= 6){
                $Depth1LineDecoBox.attr('data-length', 6);
            }
        });
        $Depth1ItemTrd.on('mouseover', function(){
            var $thisTrd = $(this),
                $thisTrdDepth2Item = $thisTrd.find('.depth2_item');
            $Depth1LineDecoBox.attr('data-depth', 3);
            if($thisTrdDepth2Item.length == 1){
                $Depth1LineDecoBox.attr('data-length', 1);
            }
            if($thisTrdDepth2Item.length == 2){
                $Depth1LineDecoBox.attr('data-length', 2);
            }
            if($thisTrdDepth2Item.length == 3){
                $Depth1LineDecoBox.attr('data-length', 3);
            }
            if($thisTrdDepth2Item.length >= 4){
                $Depth1LineDecoBox.attr('data-length', 4);
            }
        });
        //lnb 라인 표출 조건(대표전용) 끝

    });
})(jQuery);