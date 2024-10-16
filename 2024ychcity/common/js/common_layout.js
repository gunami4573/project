
// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(document).ready(function(){
	//이미지 롤오버
	$('.overimg').mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));
	}).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	});
});

/**
 * @author (주)한신정보기술 퍼블리셔팀
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie ie7';

    //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie ie8';

    //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie ie9';

    //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie ie10';

    //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie ie11';

    //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

    //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

    //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

    //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

    //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function() {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');


        $window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
			var Iscommonsite = $body.is('.commonsite');
			if(Iscommonsite){
				$('.search_panel').show();
			}

        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';

        });

        //lnb
        var $lnb = $header.find('.lnb'),
            $lnbShow = $header.find('.menu_show'),
            $lnbShowBtn = $lnbShow.find('.menu_button'),
            $lnbHide = $lnb.find('.menu_hide'),
            $lnbHideBtn = $lnbHide.find('.menu_button'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            $lnbSpy = $lnbMenu.find('.spy:last'),
            lnbHeight;

        $lnbSpy.parents('.depth_item').addClass('actived');

        function refreshLnbHeight() {
            lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';

            $lnbMenu.css('transition-property', '');
        }

        $lnbShowBtn.on('click', function(event) {
            //클래스 토글
            $html.toggleClass('lnb_show');
        });

        $lnbHideBtn.on('click', function(event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
		$('.lnb_curtain button,.close_button').on('click', function(event) {
			$('html').removeClass('search_on');
			$('.search_panel').fadeOut(200);
            $html.removeClass('lnb_show');
        });

        $lnbDepthItem.on('mouseover focusin', function(event) {
            if(mode === 'pc') {
                var $this = $(this),
                    $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

                if($lnbMenu.hasClass('pulldown')) {
                    var maxHeight = 0;

                    $lnbDepth2FirstChild.each(function(index, element) {
                        var $element = $(element),
                            outerHeight = $element.outerHeight() || 0;

                        //기존 값 보다 얻은 값이 초과일 때
                        if(outerHeight > maxHeight) {
                            maxHeight = outerHeight;
                        }
                    });

                    $lnbMenu.height(lnbHeight + maxHeight);
                }else if($lnbMenu.hasClass('eachdown')) {
                    $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight() || ''));
                }

                $html.addClass('lnb_open');
                $lnbDepthItem.removeClass('active');
                $this.addClass('active').parents('li').addClass('active');
            }
            event.stopPropagation();
        }).on('click', function(event) {
            if(mode === 'mobile') {
                var $this = $(this),
                    $depthText = $this.children('.depth_text'),
                    eventTarget = event.target;

                if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if($this.hasClass('depth1_item')) {
                        if($this.hasClass('active')) {
                            $html.removeClass('lnb_open');
                        }else{
                            $html.addClass('lnb_open');
                        }
                    }

                    if($this.children('.depth').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        event.preventDefault();
                    }
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

        $lnbMenu.on('mouseleave', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });
		$lnb.find('.depth1_item:last-child .depth2 .depth2_list .depth2_item:last-child .depth2_text').on('focusout', function(event) {
			if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
		});


		//language
		$('.language .language_btn').on('click', function() {
			var $this = $(this),
				$Parent = $this.parent('.language'),
				IsActive = $Parent.is('.active'),
				$Layer = $this.siblings('.layer');
			if(!IsActive){
				$Parent.addClass('active');
				$this.attr('title', '언어선택 닫기');
				$Layer.fadeIn(200);
			} else{
				$Parent.removeClass('active');
				$this.attr('title', '언어선택 열기');
				$Layer.fadeOut(200);
			};
		});
		$('.language .layer .lang_close').on('click', function() {
			var $this = $(this),
				$Parent = $this.parents('.language'),
				$Layer = $this.parent('.layer'),
				$language_btn = $('.language .language_btn');
			$Layer.fadeOut(200, function() {
				$Parent.removeClass('active');
				$language_btn.attr('title', '언어선택 열기').focus();
			});

		});

		//검색창
		$('.menu_show .search_button').on('click', function(evt) {
			var $this = $(this),
				$Parent = $this.parents('html'),
				IsActive = $Parent.is('.search_on'),
				$SearchPanel = $('.search_panel'),
				$SearchSelect = $SearchPanel.find('.search_select select'),
				$SearchQuery = $SearchPanel.find('.search_query');
			if(!IsActive){
				$Parent.addClass('search_on');
				$this.attr('title', '검색창 닫기');
				if(mode === 'pc') {
					$SearchPanel.slideDown(200);
				} else {
					$SearchPanel.show();
				}
				$SearchSelect.focus();

			} else{
				$Parent.removeClass('search_on');
				$this.attr('title', '검색창 열기');
				if(mode === 'pc') {
					$SearchPanel.slideUp(200);
				} else {
					$SearchPanel.hide();
				}

			};
		});

        /*날씨정보 이름*/ 
        $(document).ready(function(){

            var WeatherApi = $('.weather'),
                WeatherIcon = WeatherApi.find('.icon');
            if (WeatherApi.is('.weather1')){
                WeatherIcon.text('맑음');
            }
            if (WeatherApi.is('.weather2')) {
                WeatherIcon.text('구름많음');
            }
            if (WeatherApi.is('.weather3')) {
                WeatherIcon.text('흐림');
            }
            if (WeatherApi.is('.weather4')) {
                WeatherIcon.text('소나기');
            }
            if (WeatherApi.is('.weather5')) {
                WeatherIcon.text('비');
            }
            if (WeatherApi.is('.weather6')) {
                WeatherIcon.text('눈');
            }
            if (WeatherApi.is('.weather7')) {
                WeatherIcon.text('비/눈');
            }
            if (WeatherApi.is('.weather8')) {
                WeatherIcon.text('빗방울');
            }
            if (WeatherApi.is('.weather9')) {
                WeatherIcon.text('눈날림');
            }
        });
        

        

		//검색창 닫기버튼
		$('.search_close_button').on('click', function() {
			var $this = $(this),
				$Parent = $this.parents('html'),
				IsActive = $Parent.is('.search_on'),
				$SearchPanel = $('.search_panel');
			if(IsActive){
				$Parent.removeClass('search_on');
				//$this.attr('title', '검색창 열기');
				if(mode === 'pc'){
					$SearchPanel.slideUp(200);
		            $('.menu_show .search_button').focus();
		        } else {
					$SearchPanel.hide();
				}
			}
		});

		/*맞춤복지서비스*/
		var $service_open = $('.service_button'),
			$service_close = $('.welfare_service .layer_close');
		$('.service_button, .welfare_service .layer_close').on('click', function() {
			var IsOpen = $html.is('.layer_open');

			if(IsOpen){
				$html.removeClass('layer_open');
				$('.welfare_service').fadeOut(300);
				$service_open.focus();
			} else{
				$html.addClass('layer_open');
				$('.welfare_service').fadeIn(300);
				$service_close.focus();
				if(mode === 'mobile'){
					$html.removeClass('search_on');
					$('.search_panel').hide();
				}
			}
		});
		$('.welfare_service .service_list > ul > li:last-child a').on('focusout', function() {
			// $html.removeClass('layer_open');
			// $('.welfare_service').fadeOut(300);
            $service_close.focus();
		});

		/*연천 패밀리 홈*/
		var $family_open = $('.family_button'),
			$family_close = $('.family_home .layer_close');
		$('.family_button, .family_home .layer_close').on('click', function() {
			var IsOpen = $html.is('.layer_open'),
			    max_h = 0;

			if(IsOpen){
				$html.removeClass('layer_open');
				$('.family_home').fadeOut(300);
				$family_open.focus();
			} else{
				$html.addClass('layer_open');
				$('.family_home').fadeIn(300);
				$family_close.focus();
				if(mode === 'mobile'){
					$html.removeClass('search_on');
					$('.search_panel').hide();
				}
			}
		/*높이*/
		if(mode === 'pc') {
		  		$(".family_home .site_list > ul > li").each(function(){
				var h = parseInt($(this).outerHeight() + 10);
				   if(max_h < h){ max_h = h; }
				  });
			  	$(".family_home .site_list > ul > li").each(function(){
				  	$(this).css({height:max_h});
			  	});
        } else if (mode === 'mobile'){
            $(".family_home .site_list > ul > li").css('height','');

        }
		});

		$('.family_home .site_list > ul > li:last-child .list li:last-child a').on('focusout', function() {
			// $html.removeClass('layer_open');
			// $('.family_home').fadeOut(300);
            $family_close.focus();
		});


		//btn_top(맨위로)
		$(function() {
		   $(".btn_top").click(function() {
			   $('html, body').animate({
				   scrollTop : 0
			   }, 200);
			   return false;
		   });
	   });


		//banner
		var $bannerSlide = $('.banner .banner_list'),
			bannerItemLength = $bannerSlide.find('.banner_item').length;
		$('.banner .total').text(bannerItemLength);
		$bannerSlide.slick({
			//기본
			autoplay : true,
			swipe : false,
			draggable : false,
			slidesToShow : 7,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: true,
			arrows: true,
			prevArrow : $('.banner .banner_control .prev'),
			nextArrow : $('.banner .banner_control .next'),
			dots : false,
			//추가옵션
			autoArrow : $('.banner .banner_control .auto'),
			isRunOnLowIE : false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			pauseText : '정지',
			playText : '재생',
			//total : $('.banner .total'),
			current : $('.banner .current'),
			responsive: [
			{
			  breakpoint: 1001,
			  settings: {
				swipe:true,
				draggable:true
			  }
			}]
		});
		$('.banner .more').on('click', function(){
			var $this = $(this),
				$Layer = $this.siblings('.layer');
			$Layer.slideDown();
			searchBanner('','');
		});
		$('.banner .layer .close').on('click', function(){
			var $this = $(this),
				$Layer = $this.parent('.layer');
			$Layer.slideUp();
			$('.banner .more').focus();
		});

		/*새창*/
		var $aBlank = $('a[target=_blank]');

		$aBlank.each(function(index, element){
			var IsTitle = $(element).is('[title]'),
				IsRel = $(element).is('[rel]');
			if(!IsRel){
				$(element).attr('rel','noopener noreferrer');
			}
			if(!IsTitle){
				$(element).attr('title', '새창');
			};
		});

		//여기서부터 코드 작성해주세요

        $window.on('screen:wide screen:web', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
            }
        });

        $window.on('screen:tablet screen:phone', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
            }
        });

        $window.on('screen:phone', function (event) {
            $(".family_home .site_list > ul > li").css('height', '');
        });
    });


    $document.on('ready', function(event) {
        /**
         * @link {https://github.com/JungHyunKwon/screen}
         */
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1601
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1600,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    $window.on('load', function(event) {

        $window.on('screen:resize', function(event) {

        }).triggerHandler('screen:resize');
    });
})(jQuery);
