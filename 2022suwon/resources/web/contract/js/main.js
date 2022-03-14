(function($) {
	'use strict';

	var $window = $(window);

	$(function() {

        //여기부터 코드 작성

        //검색영역 가짜셀렉트 스크립트 시작
        $('.form_input_box .form_input_item.select .select_layer button.select_layer_btn').on('click', function(){
            var $this = $(this),
                $FormInputBox = $this.parents('.form_input_box'),
                $SelectView = $FormInputBox.find('.select_view'),
                IsActive = $FormInputBox.is('.active');
            if(!IsActive){
                $this.attr('title', '선택목록 닫기');
                $FormInputBox.addClass('active');
                $SelectView.slideDown(150, 'linear');
            }
            else{
                $this.attr('title', '선택목록 열기');
                $FormInputBox.removeClass('active');
                $SelectView.slideUp(150, 'linear');
            }
        });
        $('.form_input_box .form_input_item.select .select_view .select_view_list .select_view_item button.select_view_btn').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.select_view_item'),
                Index = $MyItem.index(),
                $OtherItem = $MyItem.siblings('.select_view_item'),
                $OtherBtn = $OtherItem.find('button.select_view_btn'),
                $SelectHidden = $('.form_input_box .form_input_item.select .select_hidden'),
                $Select = $SelectHidden.find('select'),
                $Option = $Select.find('option').eq(Index),
                $OtherOption = $Option.siblings('option'),
                $SelectLayerBtn = $('.form_input_box .form_input_item.select .select_layer button.select_layer_btn'),
                $FormInputBox = $('.form_input_box'),
                IsActive = $FormInputBox.is('.active'),
                $SelectView = $FormInputBox.find('.select_view');
            if(IsActive){
                $this.attr('title', '선택됨');
                $OtherBtn.removeAttr('title');
                $SelectLayerBtn.empty().append($this.text());
                $SelectLayerBtn.attr('title', '선택목록 열기');
                $OtherOption.removeAttr('selected');
                $Option.attr('selected', 'selected');
                $FormInputBox.removeClass('active');
                $SelectView.slideUp(150, 'linear');
            }
        });
        //검색영역 가짜셀렉트 스크립트 끝

        //게시판 탭 슬라이드 스크립트 시작
        var $ConBoardSlide = $('.board_slide_wrap .con_board_slide');
        $ConBoardSlide.each(function(){
            var $ConBoardSlideList = $(this).find('.board_slide_list');
            $ConBoardSlideList.slick({
                autoplay : false,
                arrows : false,
                dots : false,
                slidesToShow : 4,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                variableWidth : false,
                zIndex : 4,
                //추가 기능
                isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                responsive: [{
                    breakpoint: 1401,
                    settings: {
                        slidesToShow : 3
                    }
                },{
                    breakpoint: 1001,
                    settings: {
                        slidesToShow : 2,
                        variableWidth : true
                    }
                },{
                    breakpoint: 701,
                    settings: {
                        slidesToShow : 1,
                        variableWidth : true
                    }
                },{
                    breakpoint: 641,
                    settings: {
                        autoplay : true,
                        slidesToShow : 1,
                        variableWidth : false,
                        fade : true,
                        adaptiveHeight : true
                    }
                }]
            });
        });
        $('.board_slide_wrap .tab_box .tab_list .tab_item button.tab_btn').on('click', function(){
            var $this = $(this),
                $MyParent = $this.parent('.tab_item'),
                IsActive = $MyParent.is('.active'),
                ParentIndex = $MyParent.index(),
                $OtherParents = $MyParent.siblings('.tab_item'),
                $OtherBtns = $OtherParents.find('button.tab_btn'),
                $TabContent = $('.board_slide_wrap .tab_content'),
                $MyCon = $TabContent.find('.tab_con').eq(ParentIndex),
                $MySlide = $MyCon.find('.board_slide_list'),
                $OtherCon = $MyCon.siblings('.tab_con');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherBtns.removeAttr('title');
                $MyParent.addClass('active');
                $this.attr('title', '선택됨');
                $OtherCon.removeClass('active');
                $MyCon.addClass('active');
                $MySlide.slick('setPosition');
            };
        });
        //게시판 탭 슬라이드 스크립트 끝


        //배너슬라이드 시작
        var $bannerSlide = $('.rowgroup_banner .banner_list'),
            bannerItemLength = $bannerSlide.find('.banner_item').length;
        $('.rowgroup_banner .total').text(bannerItemLength);
        $bannerSlide.slick({
            //기본
            autoplay : true,
            swipe : false,
            draggable : false,
            slidesToShow : 7,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            arrows: true,
            prevArrow : $('.rowgroup_banner .banner_control .prev'),
            nextArrow : $('.rowgroup_banner .banner_control .next'),
            dots : false,
            //추가 기능
            autoArrow : $('.rowgroup_banner .banner_control .auto'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            pauseText : '정지',
            playText : '재생',
            //total : $('.rowgroup_banner .total'),
            current : $('.rowgroup_banner .current'),
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe:true,
                        draggable:true
                    }
                }]
        });
        //배너슬라이드 끝




    });
})(window.jQuery);
