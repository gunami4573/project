(function($) {
	'use strict';

	var $window = $(window);

	$(function() {
		var $html = $('html'),
			$body = $('body'),
			$wrapper = $('#wrapper');
		$window.on('screen:wide screen:web', function(event) {
			window.mode = 'pc';
		});

		$window.on('screen:tablet screen:phone', function(event) {
			window.mode = 'mobile';
		});
		
		//여기서부터 작성해주세요

		//비주얼
		var $Visual = $('.main_visual .visual_list');
		$Visual.slick({
			//기본
			autoplay : true,
			swipe : false,
			draggable : false,
			slidesToShow : 1,
			slidesToScroll : 1,
			variableWidth : false,
			infinite : true,
			prevArrow : $('.main_visual .visual_control .prev'),
			nextArrow : $('.main_visual .visual_control .next'),
			dots : true,
			appendDots : $('.main_visual .controlbox .thumnailbox'),
			dotsClass :'slick-dots',
			customPaging : function(slider, i) {
				return '<button type="button"><span>'+(i + 1)+'번 슬라이드 보기</span></button>';
			},

			//추가 기능
			fade: true,
			autoArrow : $('.main_visual .controlbox .auto'),
			isRunOnLowIE : false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			pauseText : 'stop',
			playText : 'play',
			responsive: [
				{
					breakpoint: 1001,
					settings : {
						swipe : true,
						draggable : true,
						slidesToShow : 1,
						slidesToScroll : 1,
						variableWidth : false
					}
				}]
		});

		$Visual.on('beforeChange', function(event, slick, currentSlide) {
			var $currentslide = $(slick.$slides[currentSlide]),
				IsPlaying = $currentslide.find('.visual_item').is('.playing');
			if(IsPlaying){
				var $video = $currentslide.find('video'),
					IsPaused = $video.get(0).paused;
				if(!IsPaused){
					$video.get(0).pause();
				};
			};
		});

		$Visual.find('video').on('play', function () {
			$Visual.slick('slickPause');
			$('.visual .controlbox .auto').removeClass('slick-pause').addClass('slick-play').text('재생');
			$(this).parents('.visual_item').addClass('playing');
		});
		$Visual.find('video').on('pause', function () {
			$(this).parents('.visual_item').removeClass('playing');
		});


		//축제(Festival) 슬라이드 시작
		var festival = $('.rowgroup4 .festival .festival_slide');
		festival.slick({
			autoplay : false,
			dots : false,
			slidesToShow : 3,
			slidesToScroll : 1,
			swipeToSlide : false,
			infinite : false,
			swipe : false,
			draggable : false,
			variableWidth: true, //width를 css로 제어
			responsive: [
				{
					breakpoint: 641,
					settings: {
						arrows : false,
						slidesToShow : 1,
						slidesToScroll : 1,
						swipe: true,
						swipeToSlide : true,
						draggable : true
					}
				}]
		});
		//축제(Festival) 슬라이드 끝

		//투어(Tourism) 슬라이드 시작
		var festival = $('.rowgroup5 .tourism .tourism_slide');
		festival.slick({
			autoplay : false,
			dots : false,
			slidesToShow : 5,
			slidesToScroll : 1,
			infinite : false,
			swipe : false,
			draggable : false,
			variableWidth: true, //width를 css로 제어
			responsive: [
				{
					breakpoint: 641,
					settings: {
						arrows : false,
						slidesToShow : 4,
						slidesToScroll : 1,
						swipe: true,
						swipeToSlide : true,
						draggable : true
					}
				},
				{
					breakpoint: 551,
					settings: {
						arrows : false,
						slidesToShow : 3,
						slidesToScroll : 1,
						swipe: true,
						swipeToSlide : true,
						draggable : true
					}
				},
				{
					breakpoint: 421,
					settings: {
						arrows : false,
						slidesToShow : 2,
						slidesToScroll : 1,
						swipe: true,
						swipeToSlide : true,
						draggable : true
					}
				}]
		});
		//투어(Tourism) 슬라이드 끝

		//스크롤처리 시작
		var $scrollcontent = $('.scroll_content');

		$scrollcontent.each(function(){
			var $this = $(this),
				scrollTop = $window.scrollTop(),
				scrollBottom = scrollTop + $window.height(),
				contentOffset = $this.offset();
			if(scrollBottom > contentOffset.top) {
				$this.addClass('active');
			}
		});

		$window.on('scroll', function(event) {
			$scrollcontent.each(function(){
				var $this = $(this),
					scrollTop = $window.scrollTop(),
					scrollBottom = scrollTop + $window.height(),
					contentOffset = $this.offset();
				if(scrollBottom > contentOffset.top) {
					$this.addClass('active');
				}else{
					$this.removeClass('active');
				}
			});
		});
		//스크롤처리 끝

	});
})(window.jQuery);