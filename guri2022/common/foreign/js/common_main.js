'use strict';

/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현({@link mailto:kjh3859@hanshinit.co.kr})
 * @since 2017-12-18
 * @version 1.0
 */
try {
	//제이쿼리가 있는지 확인
	if(typeof window.jQuery === 'function') {
		//$ 중첩 방지
		(function($) {
			var $window = $(window),
				$document = $(document),
				$html = $('html'),
				$head = $('head'),
				$screen = $.screen,
				$inArray = $.inArray;

			$(function() {
				var $body = $('body'),
					$wrapper = $('#wrapper'),
					$container = $('#container'),
					$header = $('#header');

				$window.on('screen:wide screen:web', function(event) {
					window.mode = 'pc';
				});

				$window.on('screen:tablet screen:phone', function(event) {
					window.mode = 'mobile';
				});

				$window.on('screen:maxheight', function(event) {
					window.Hmode = 'MaxHeight';
					$wrapper.attr('data-hsize', 'maxheight');
				});

				$window.on('screen:minheight', function(event) {
					window.Hmode = 'MinHeight';
					$wrapper.attr('data-hsize', 'minheight');
				});

				setTimeout(function(){
					if(Hmode === 'MinHeight') {
						$wrapper.attr('data-hsize', 'minheight');
					} else if(Hmode === 'MaxHeight'){
						$wrapper.attr('data-hsize', 'maxheight');
					}
				}, 1);
				
				var scrollTop = $window.scrollTop(),
					ContainerOffset = $container.offset(),
					wrapperOffset = $wrapper.offset();
				if(scrollTop > wrapperOffset.top) {
					$wrapper.attr('data-nowtop', 'nontop');
				}else{
					$wrapper.attr('data-nowtop', 'top');
				};
				var scrollBottom = scrollTop + $window.height(),
					footerOffset = $('#footer').offset();

				if(scrollBottom > footerOffset.top) {
					$wrapper.addClass('footeractive');
				}else{
					$wrapper.removeClass('footeractive');
				};

				$window.on('scroll', function(event) {
					var scrollTop = $window.scrollTop(),
						ContainerOffset = $container.offset(),
						wrapperOffset = $wrapper.offset(),
						headerIsActive = $wrapper.is('[data-nowtop="top"]');
					if(mode === 'pc') {
						if(scrollTop > wrapperOffset.top) {
							if(headerIsActive){
								$wrapper.attr('data-nowtop', 'nontop');
							};
						}else{
							$wrapper.attr('data-nowtop', 'top');
						};
						var scrollBottom = scrollTop + $window.height(),
							footerOffset = $('#footer').offset();
						if(scrollBottom > footerOffset.top) {
							$wrapper.addClass('footeractive');
						}else{
							$wrapper.removeClass('footeractive');
						};
					}
				});

				//여기서부터시작

				//메인 비주얼 영역 시작
				var $VisualSlideList = $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_slide_list');
				$VisualSlideList.slick({
					//기본
					autoplay : true,
					autoplaySpeed : 2000,
					speed : 1200,
					arrows : true,
					dots : true,
					appendDots: $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_control_wrap .dots_box'),
					dotsClass:'slick-dots clearfix',
					customPaging : function(slider, i) {
						var thumb = $(slider.$slides[i]).attr('data-thum');
						return '<button type="button"><span>'+(i + 1)+'slide photo show</span></button>';
					},
					swipe : true,
					swipeToSlide : true,
					draggable : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					variableWidth : false,
					infinite: true,
					prevArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_control_wrap .btn_box .prev'),
					nextArrow : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_control_wrap .btn_box .next'),
					total : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_text_wrap .visual_count_wrap .total'),
					current : $('.main_visual .main_visual_wrap .visual_slide_wrap .visual_text_wrap .visual_count_wrap .current'),
					customState : function(state) {
						//현재 슬라이드 위치가 10보다 작을 때
						if(state.current < 10) {
							state.current = '0' + state.current;
						}
						//슬라이드 갯수가 10보다 작을 때
						if(state.total < 10) {
							state.total = '0' + state.total;
						}
						return state;
					},
					pauseOnDotsClick : true,
					pauseOnArrowClick : true,
					fade : true,
					zIndex : 5,
					responsive : [{}]
				});
				//메인 비주얼 영역 끝

				//구리 9경 슬라이드 영역 시작
				var $InfoSlideList = $('.info .info_wrap .info_slide_wrap .info_slide_list');
				$InfoSlideList.slick({
					//기본
					autoplay : false,
					speed : 1000,
					arrows : true,
					swipe : true,
					swipeToSlide : true,
					draggable : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					variableWidth : false,
					infinite: true,
					prevArrow : $('.info .info_wrap .info_slide_wrap .info_slide_control_wrap .control_inner .btn_box .prev'),
					nextArrow : $('.info .info_wrap .info_slide_wrap .info_slide_control_wrap .control_inner .btn_box .next'),
					total : $('.info .info_wrap .info_slide_wrap .info_slide_control_wrap .control_inner .count_box .total'),
					current : $('.info .info_wrap .info_slide_wrap .info_slide_control_wrap .control_inner .count_box .current'),
					customState : function(state) {
						//현재 슬라이드 위치가 10보다 작을 때
						if(state.current < 10) {
							state.current = '0' + state.current;
						}
						//슬라이드 갯수가 10보다 작을 때
						if(state.total < 10) {
							state.total = '0' + state.total;
						}
						return state;
					},
					pauseOnDotsClick : true,
					pauseOnArrowClick : true,
					zIndex : 5,
					responsive : [{
						breakpoint: 1001,
						settings: {
							speed : 600,
							fade : true,
							adaptiveHeight: true
						}
					}]
				});
				//구리 9경 슬라이드 영역 끝

				//스크롤 애니메이션 시작
				var $ScrollAni = $('.scroll_ani');
				$window.on('scroll', function(event) {
					$ScrollAni.each(function(){
						var $this = $(this),
							WindowTop = $window.scrollTop(),
							WindowBottom = WindowTop + $window.height(),
							ThisOffSet = $this.offset(),
							ThisOffSetTop = ThisOffSet.top,
							ThisOffSetBottom = ThisOffSetTop + $this.height();
						if(ThisOffSetTop < WindowBottom){
							$this.addClass('scroll_animation');
						}
						else{
							$this.removeClass('scroll_animation');
						}
					});
				});
				//스크롤 애니메이션 끝

				//주요명소 슬라이드 영역 시작
				var $AttractionSlideList = $('.attraction .attraction_wrap .attraction_inner .attraction_slide_wrap .attraction_slide_inner .attraction_slide_list');
				$AttractionSlideList.slick({
					autoplay : false,
					arrows : false,
					dots : false,
					slidesToShow : 1,
					slidesToScroll : 1,
					infinite : false,
					swipe : false,
					swipeToSlide : false,
					draggable : false,
					rows : 2,
					slidesPerRow : 3,
					variableWidth : false,
					responsive: [{
						breakpoint: 641,
						settings: {
							slidesToShow : 3,
							infinite : true,
							swipe : true,
							swipeToSlide : true,
							draggable : true,
							rows : 1,
							slidesPerRow : 1,
							variableWidth : true
						}
					},{
						breakpoint: 551,
						settings: {
							slidesToShow : 2,
							infinite : true,
							swipe : true,
							swipeToSlide : true,
							draggable : true,
							rows : 1,
							slidesPerRow : 1,
							variableWidth : true
						}
					},{
						breakpoint: 386,
						settings: {
							slidesToShow : 1,
							infinite : true,
							swipe : true,
							swipeToSlide : true,
							draggable : true,
							rows : 1,
							slidesPerRow : 1,
							variableWidth : true
						}
					}]
				});
				//주요명소 슬라이드 영역 끝
				

				$window.on('screen:wide screen:web', function(event) {
					
				});

				$window.on('screen:tablet screen:phone', function(event) {
					
				});

			});

			

		})(jQuery);
	}else{
		throw '제이쿼리가 없습니다.';
	}
}catch(e) {
	console.error(e);
}
