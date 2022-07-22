'use strict';
var $html = $('html');

$(function() {

	var $window = $(window),
		$html = $('html'),
		$body = $('body'),
		$header = $('#header'),
		$container = $('#container'),
		$footer = $('#footer');
	console.log(site.id);


	//상단 팝업 통합
	var $headerPop = $('[data-header-pop]'),
		$headerPanel = $headerPop.siblings('[data-header-panel]'),
		$headerLnb = $('[data-header-pop="lnb"]');
	$headerPop.on('click', function(){
		var $this = $(this),
			thisTitle = $this.attr('data-title'),
			thisPop = $this.attr('data-header-pop'),
			$thisPanel = $('[data-header-panel="' + thisPop + '"]');

		if(thisPop !== 'lnb'){
			if($html.attr('data-open') === thisPop){
				$html.removeAttr('data-open');
				$this.attr('title',thisTitle + ' 열기');
				$thisPanel.attr('title',thisTitle + '닫힘');
				if(thisPop == 'myinfo' || thisPop == 'language'){
					$thisPanel.slideUp();

				}
			} else {
				$headerPanel.each(function(){
					var $this = $(this),
						thisPop = $this.attr('data-header-panel'),
						$thisPanel = $('[data-header-panel="' + thisPop + '"]');
					if(thisPop === 'myinfo' || thisPop === 'language'){
						$thisPanel.slideUp();

					}
				});

				$html.attr('data-open',thisPop);
				$this.attr('title',thisTitle + ' 닫기');
				$thisPanel.attr('title',thisTitle + '열림');
				if(thisPop === 'myinfo' || thisPop === 'language'){
					$thisPanel.slideDown();
				}
			}
		}
	});
	$headerLnb.find('.depth1_item').on('mouseenter', function(){
		var $this = $(this),
			thisPop = $this.closest($headerLnb).attr('data-header-pop'),
			thisPopTitle = $this.attr('data-title');
		$headerPanel.each(function(){
			var $this = $(this),
				thisPop = $this.attr('data-header-panel'),
				$thisPanel = $('[data-header-panel="' + thisPop + '"]');
			if(thisPop === 'myinfo' ){
				$thisPanel.slideUp();
				$thisPanel.attr('title', '내 정보 닫힘');
				$thisPanel.siblings('.myinfo_button').attr('title', '내 정보 열기')
			}
			if(thisPop === 'language'){
				$thisPanel.slideUp();
				$thisPanel.attr('title', '외국어 닫힘');
				$thisPanel.siblings('.language_button').attr('title', '외국어 열기')
			}
		});
		$html.attr('data-open',thisPop);
	});
	$headerLnb.find('.depth1_item').on('mouseleave', function(){
		$html.removeAttr('data-open');
	})

	//주요사이트
	var $family = $header.find('.family'),
		$familyBtn = $family.find('.family_open'),
		$familyClose = $family.find('.sitebox_close');
	
	$familyClose.on('click',function(){
		$html.attr('data-open','');
		$familyBtn.attr('title', '주요사이트 열기');
	})


	/* 검색 */

	var $search = $header.find('.search'),
		$searchClose = $search.find('.search_close'),
		$searchPanel = $search.find('.search_panel');

	$searchClose.on('click',function(){
		var $this = $(this);

		$html.attr('data-open','');
		$this.attr('title','닫기');
		$searchPanel.attr('title','닫힘');
	})

	$window.scroll(function(){
		var src_scroll = $window.scrollTop();
		if(src_scroll > 83){
			$search.addClass('on');
		}else{
			$search.removeClass('on');
		}
	});



	//가상키보드

	var nvk = new NeoVirtualKeyboard({keyLayout:'KOREAN', keyLayoutType:'SIMPLE'});
	$(document).on('click', '#openNVK_sj', function(){

		var $this = $(this),
			IsActive = $body.find('div').is('#neoVirtualKeyboard');
		if(!IsActive){
			$this.attr('title', '가상키보드 닫기');
			nvk.showKeyboard(this, {
				inputElement: '#contentSj',
				offset: {
					top: 0,
					left: 0
				}
			});
			$('#neoVirtualKeyboardClose').focus();
		} else {
			$('.web_keyboard').attr('title', '가상키보드 열기').focus();
			nvk.hideKeyboard();
		}
	});
	$(document).on('click', '#neoVirtualKeyboardClose', function(){
		$('.web_keyboard').attr('title', '가상키보드 열기').focus();
	});
	$(document).on('focusout', '#spaceKey', function () {
		$('#neoVirtualKeyboardClose').focus();
	});


	$window.on('screen:tablet screen:phone', function(event) {
		$('.web_keyboard').attr('title', '가상키보드 열기').focus();
	});


	/* 공유 */
	var $share = $container.find('.share'),
		$shareBtn = $share.find('.addons_button');
	$share.on('click', function(event) {
		$share.toggleClass('active');
		if($share.is('.active')){
			$shareBtn.text('공유하기 레이어 닫기')
		}else {
			$shareBtn.text('공유하기')
		}

	});

	//목록제목+텍스트
	var $bu = $container.find('.bu:not(.map_list):not(.width_none)');//map_list 제외 설정(명화,2021-10-03)
	function setListWidth(){
		$bu.each(function (){
			var $this = $(this),
				$buItem = $this.find('> li'),
				$titleText = $buItem.find('.title'),
				$thisText = $buItem.find('.text'),
				width = 0,
				maxWidth = 90,
				err = 2;
			$titleText.each(function (){
				var $this = $(this);
				$this.removeAttr('style');
				var conWidth = $this.width();
				if(conWidth > width && conWidth < maxWidth){
					width = conWidth;
				} else if (conWidth > maxWidth){
					width = 'auto';
				}
			}).css('width',width + 2);

			$thisText.each(function(){
				var $this = $(this);
				$this.removeAttr('style');
				var thisTitleWidth = $this.siblings('.title').width(),
					thisLiWidth = $this.closest('li').width();
				$this.css('width',(thisLiWidth - thisTitleWidth - 17));
			});
		});
	};

	/* cms 탭메뉴 */
	var $tabMenu = $container.find('.tab_menu'),
		$tabPanel =  $tabMenu.find('.tab_depth6'),
		$tabItem =  $tabMenu.find('.tab_anchor'),
		$tabSelect = $tabMenu.find('.tab_select');

	$tabSelect.click(function () {
		var $this = $(this),
			$ParentTabmenu = $this.parent('.tab_menu'),
			IsActive = $ParentTabmenu.is('.active');
		if(!IsActive){
			$this.next('.tab_panel').slideDown('250', 'easeOutExpo');
			$ParentTabmenu.addClass('active');
		} else{
			$this.next('.tab_panel').slideUp('250', 'easeOutExpo');
			$ParentTabmenu.removeClass('active');
		};

	});

	/* 컨텐츠 탭메뉴 */
	var $tab = $container.find('.tab');

	$tab.each(function(index, element){
		var $tabM = $(element).find('.tab_menu'),
			$tabButton = $(element).find('.tab_button'),
			tabAllCheck = $tabButton.is('.tab_all'),/*전체보기 탭메뉴 유무*/
			$tabContent = $(element).find('.tab_content');

		var li_length = $tabM.find('.tab_item').length;
		$tabM.not($('.prettyprint').children()).addClass('divide' + li_length);

		$tabButton.click(function () {
			var $this = $(this),
				index = $tabButton.index(this),
				tabButtonText = $this.text(),
				IsTabAll = $this.is('.tab_all'),
				$tab_panel = $this.parents('.tab_panel'),
				$tab_menu = $this.parents('.tab_menu');
			$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);

			if (tabAllCheck){
				if (IsTabAll) {
					$tabContent.addClass('active');
				} else {
					$tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
				}
			} else if (!tabAllCheck){
				$tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
				setListWidth();
			}
			if ($window.width() <= 640) {
				$tab_menu.removeClass('active');
				$tab_panel.slideUp();
			}
			if ($window.width() <= 640 && IsTabAll) {
				$tab_menu.removeClass('active');
				$tab_panel.slideUp();
			}


		});

	});

	/* 맨위로 */
	var $htmlBody = $('html, body'),
		$wrapper = $('#wrapper'),
		$up = $footer.find('.up'),
		$upButton = $up.find('.up_button');

	$upButton.click(function (event) {
		$htmlBody.animate({
			scrollTop : $wrapper.offset().top
		},{
			duration : 250,
			easing : 'easeOutExpo'
		});
		event.preventDefault();
	});

	$window.scroll(function(){
		var scrollTop = $window.scrollTop();
		if(scrollTop > 1){
			$upButton.addClass('active');
		}else{
			$upButton.removeClass('active');
		}
	});



});

// //쿠키설정
// function setCookie( name, value, expiredays ) {
//     var todayDate = new Date();
//     todayDate.setDate( todayDate.getDate() + expiredays );
//     document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
// }
//
// //쿠키 불러오기
// function getCookie(name) {
// 	var obj = name + "=";
// 	var x = 0;
// 	while ( x <= document.cookie.length )
// 	{
// 		var y = (x+obj.length);
// 		if ( document.cookie.substring( x, y ) == obj )
// 		{
// 			if ((endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
// 				endOfCookie = document.cookie.length;
// 			return unescape( document.cookie.substring( y, endOfCookie ) );
// 		}
// 		x = document.cookie.indexOf( " ", x ) + 1;
//
// 		if ( x == 0 ) break;
// 	}
// 	return "";
// }