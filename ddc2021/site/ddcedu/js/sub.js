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
		//공통 서브레이아웃 영역 시작
		//sns박스 스크립트 시작
		$('.various_box .sns_box button.sns').on('click', function(){
			var $this = $(this),
				$snsBox = $this.parents('.sns_box'),
				$VariousBox = $snsBox.parents('.various_box'),
				IsActive = $VariousBox.is('.active');
			if(!IsActive){
				$this.attr('title', '닫기');
				$VariousBox.addClass('active');
			}
			else{
				$this.attr('title', '열기');
				$VariousBox.removeClass('active');
			}
		});
		$('.various_box .sns_box .sns_list ul .sns_item:last-child button').focusout(function(){
			var $this = $(this),
				$snsBox = $this.parents('.sns_box'),
				$snsBtn = $snsBox.find('.sns'),
				$VariousBox = $this.parents('.various_box');
			$VariousBox.removeClass('active');
			$snsBtn.attr('title', '열기');
		});
		//sns박스 스크립트 끝

		//탭메뉴 시작
		$('.tab_total .tab_list .tab_item button.tab_link').on('click', function(){
			var $this = $(this),
				$TabItem = $this.parent('.tab_item'),
				Index = $TabItem.index(),
				$OtherTabItem = $TabItem.siblings('.tab_item'),
				$OtherBtn = $OtherTabItem.find('button.tab_link'),
				$TabList = $TabItem.parent('.tab_list'),
				IsFunction = $TabList.is('.function'),
				$TabContent = $TabList.siblings('.tab_content'),
				$TabWrap = $TabContent.find('.tab_wrap').eq(Index),
				$OtherTabWrap = $TabWrap.siblings('.tab_wrap'),
				IsActive = $TabItem.is('.active');
			if(!IsActive){
				$this.attr('title', '선택 됨');
				$OtherBtn.removeAttr('title');
				$TabItem.addClass('active');
				$OtherTabItem.removeClass('active');
				if(IsFunction){
					$TabWrap.addClass('active');
					$OtherTabWrap.removeClass('active');
				}
			}
		});
		//탭메뉴 끝
		//공통 서브레이아웃 영역 끝

		//템플릿 영역 시작
		//반응형 테이블 시작
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
		//반응형 테이블 끝
		//템플릿 영역 끝

        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);