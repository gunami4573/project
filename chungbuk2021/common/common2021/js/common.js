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

'use strict';
try {
	this.mode = '';
	
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	if(jQuery) {
		//$ 중복방지
		(function($) {

			var $window = $(window),
				$document = $(document),
				$html = $('html'),
				$body = $('body');

			$(function() {

				var $nav = $('.nav'),
					navMenuType = parseInt($nav.attr('data-menu-type'), 10) || 1,
					navOption = {
						cut : {},
						namespace : 'menu'
					};

				$window.on('responsive.common', function(event) {
					//wide, web, tablet, phone분기에 걸렸을때
					if($.inArray(event.state, event.setting.rangeProperty) > -1) {
						var menuEvent = 'click',
							menuType = 4;

						//wide 또는 web일때
						if(event.state === 'wide' || event.state === 'web') {
							menuEvent = 'mouse';
							menuType = navMenuType;
						}
						
						//현재 메뉴 이벤트와 분기에 따른 메뉴 이벤트가 다를때
						if(navOption.event !== menuEvent) {
							//메뉴가 셋팅되어 있을때 파괴
							if($nav.hasClass('menu_initialized')) {
								$nav.menu('destroy');
							}
							
							//메뉴 이벤트 변경
							navOption.event = menuEvent;

							//data-menu-type변경하고 새로운메뉴 생성 후 data-menu-type복귀
							$nav.attr('data-menu-type', menuType).menu(navOption).attr('data-menu-type', navMenuType);
						}
					}

					if(event.state == 'wide' || event.state == 'web') {
						mode = 'pc';

					}else if(event.state == 'tablet') {
						mode = 'tablet';
					}else if(event.state == 'phone') {
						mode = 'mobile';
					};

					//태블릿 || 모바일
					if(event.state == 'tablet' || event.state == 'phone') {

					};
				});

				//푸터 맨위로 버튼 시작
				$('.top_go .up_button').on('click', function() {
					$('html, body').animate({
						scrollTop: $('body').offset().top
					}, 400);
				});
				//푸터 맨위로 버튼 끝

				//푸터 패밀리 사이트 시작
				$('.family_box .family_btn').on('click', function(){
					var $this = $(this),
						$FamilyList = $this.siblings('.family_list'),
						IsActive = $this.is('.active');
					if(!IsActive){
						$this.attr('title', '패밀리사이트 목록 닫기');
						$this.addClass('active');
						$FamilyList.addClass('active').slideDown(200);
					}
					else{
						$this.attr('title', '패밀리사이트 목록 열기');
						$this.removeClass('active');
						$FamilyList.removeClass('active').slideUp(200);
					}
				});
				//푸터 패밀리 사이트 끝
			});

			$document.on('ready.common', function(event) {
			   $.responsive({
					range : {
						wide : {
							horizontal : {
								from : 9999,
								to : 1401
							}
						},
						web : {
							horizontal : {
								from : 1400,
								to : 1001
							}
						},
						tablet : {
							horizontal : {
								from : 1000,
								to : 641
							}
						},
						phone : {
							horizontal : {
								from : 640,
								to : 0
							}
						}
					},
					lowIE : {
						property : ['web']
					},
					inheritClass : false
				});
			});

			

		})(jQuery);
	}
}catch(e) {
	console.error(e);
}


