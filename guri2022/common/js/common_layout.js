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
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

		$window.on('screen:maxheight', function(event) {
            window.Hmode = 'MaxHeight';
        });

		$window.on('screen:minheight', function(event) {
            window.Hmode = 'MinHeight';
        });

		setTimeout(function(){
			//console.log(mode);
		}, 1);

		

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
		$('.lnb_curtain button').on('click', function(event) {
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

		$lnb.find('.depth2_item.has').addClass('open');

		//pc버전 2차메뉴클릭시 3차메뉴표출
		/*
		var $lnbDepth2Text = $lnb.find('.depth2_item.has').find('.depth2_text');
		$lnbDepth2Text.attr('title', '하위메뉴 열기');
		$lnbDepth2Text.on('click', function(event) {
			var $this = $(this),
				$MyParent = $this.parent('.depth2_item'),
				IsOpen = $MyParent.is('.open');
			if(mode === 'pc') {
				if(!IsOpen){
					$MyParent.addClass('open');
					$this.attr('하위메뉴 닫기');
				} else{
					$MyParent.removeClass('open');
					$this.attr('하위메뉴 열기');
				}
				var $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

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
				event.preventDefault();
			}
		});
		*/

		//여기서부터 코드 작성해주세요
		//동행정복지
		$('.site_link ul .link_item.dongbox .linkbtn').on('click', function() {
			var $this = $(this),
				$Parent = $this.parent('.link_item'),
				IsActive = $Parent.is('.active'),
				$Layer = $this.siblings('.layer');
			if(!IsActive){
				$Parent.addClass('active');
				$this.attr('title', '하위메뉴닫기');
				$Layer.slideDown();
			} else{
				$Parent.removeClass('active');
				$this.attr('title', '하위메뉴열기');
				$Layer.slideUp();
			};
		});
		//language
		$('.lnb_gnb .language .language_btn').on('click', function() {
			var $this = $(this),
				$Parent = $this.parent('.language'),
				IsActive = $Parent.is('.active'),
				$Layer = $this.siblings('.layer');
			if(!IsActive){
				$Parent.addClass('active');
				$this.attr('title', '언어선택 닫기');
				$Layer.slideDown();
			} else{
				$Parent.removeClass('active');
				$this.attr('title', '언어선택 열기');
				$Layer.slideUp();
			};
		});
		$('.search_btn').on('click', function() {
			var $this = $(this),
				$searchbox = $('.searchbox'),
				IsActive = $searchbox.is('.active');
			$html.addClass('search_open');
			$('.searchbox_curtain').fadeIn();
			$searchbox.addClass('active').fadeIn();
			$('.searchbox .total_search').focus();
		});

		$('.searchbox_curtain').on('click', function() {
			var $this = $(this),
				$search_btn = $('.search_btn'),
				$searchbox = $('.searchbox');
			$html.removeClass('search_open');
			$this.fadeOut();
			$searchbox.removeClass('active').fadeOut();
			$search_btn.focus();
		});
		$('.searchbox .search_close').on('click', function() {
			var $this = $(this),
				$search_btn = $('.search_btn'),
				$searchbox = $('.searchbox');
			$html.removeClass('search_open');
			$('.searchbox_curtain').fadeOut();
			$searchbox.removeClass('active').fadeOut();
			$search_btn.focus();
		});

		//family
		$('.lnb .lnb_topbox .lnb_gnb').append('<div class="familybtnbox"><button type="button" class="familybtn_m">주요서비스</button></div>');
		$(document).on('click', '.lnb_gnb .familybtn_m, .familybtn', function() {
			var $this = $(this),
				$familybtn = $('.familybtn'),
				IsLoaded = $familybtn.is('.loaded');
			if(!IsLoaded){
				$.ajax({
					url : '/project/guri2022/common/family.html',
					success : function (data) {
						$header.after(data);
						var $family_layer = $('.family_layer'),
							$CloseBtn = $family_layer.find('.close');
						$family_layer.fadeIn();
						$CloseBtn.focus();
						$familybtn.addClass('loaded');
					}
				});
			} else{
				var $family_layer = $('.family_layer'),
					$CloseBtn = $family_layer.find('.close');
				$family_layer.fadeIn();
				$CloseBtn.focus();
			}
		});
		$(document).on('click', '.family_layer .layerbox .close', function() {
			var $this = $(this),
				$family_layer = $('.family_layer'),
				$familybtn = $('.familybtn'),
				NowState = $.screen.settings.state[0];
			$family_layer.fadeOut();
			if(NowState=='wide' || NowState=='web'){
				$familybtn.focus();
			}
		});
		$(document).on('click', '.family_layer .item_btn', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.item'),
				IsActive = $MyParent.is('.active'),
				$MyLayer = $this.siblings('.layer'),
				$OtherParents = $MyParent.siblings('li.item'),
				$OtherLayer = $OtherParents.find('.layer'),
				$OtherBtn = $OtherParents.find('.item_btn');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherLayer.slideUp();
				$OtherBtn.attr('title', '목록열기');
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
		});

		//배너
		var $banner = $('.footer_banner .banner .banner_list');
		$banner.slick({
			//기본
			autoplay : false,
			dots : false,
			swipe : false,
			draggable : false,
			slidesToShow : 8,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: true,
			prevArrow : $('.footer_banner .banner .banner_control .prev'),
			nextArrow : $('.footer_banner .banner .banner_control .next'),

			//추가 기능
			autoArrow : $('.footer_banner .banner .banner_control .auto'),
			isRunOnLowIE : false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			pauseText : '정지',
			playText : '재생',
			responsive: [
			{
			  breakpoint: 1401,
			  settings: {
				slidesToShow : 5
			  }
			}]
		});
		//site link
		$('.footer_link ul li.list .site_btn').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				MyParentIsActive = $MyParent.is('.active'),
				$MyLayer = $this.siblings('.layer'),
				$OtherParents = $MyParent.siblings('li.list'),
				$OtherLayer = $OtherParents.find('.layer'),
				$OtherBtn = $OtherParents.find('.site_btn');
			if(!MyParentIsActive){
				$OtherParents.removeClass('active');
				$OtherLayer.slideUp();
				$OtherBtn.attr('title', '목록열기');
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
		});

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
                    to : 1401
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1400,
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
            }, {
                name : 'maxheight',
                vertical : {
                    from : 9999,
                    to : 821
                }
            }, {
                name : 'minheight',
                vertical : {
                    from : 820,
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