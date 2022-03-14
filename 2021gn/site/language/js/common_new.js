if( !!navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/MISE/i)) {
    $('.attach_file input[type="file"]').on('keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if(keyCode == 13) {
            e.preventDefault();
            $(this).trigger('click');
        }
    });
}

var isPcResizingMenu = false,
    isMobileResizingMenu = false;

function pc_menu(e){ //PC 메뉴
                     //메뉴 변수선언
    var menuWrap = $(".menu_wrap"),
        topMenu = $(".top_menu"),/* topmenu */
        topDepth1 = $(".depth1"),/* 1차메뉴 li */
        topDepth1_ti = $(" .depth1_ti"),/* 1차메뉴 앵커 */
        topDepth2_wrap = $(".top2m"),/* 2차메뉴 wrap */
        topDepth2Menu = $(".depth2"),
        topDepth2_ti = $(".depth2").find(" > li").find(" > a"),
        topLastMenu = $(".top_menu li:last-child div.top2m > ul > li:last-child"),/* 상단메뉴 전체중 맨 마지막 메뉴 변수 */
        lnbBtn = $(".m_menu_btn"),
        gnbLink = $(".gnb_link"),
        mainWrap = $("#container");

    if( isPcResizingMenu ) return;
    isPcResizingMenu = true;
    isMobileResizingMenu = false;

    //스마트기기에서 적용되던 이벤트 제거 및 초기화
    $("html").css({position:"static",overflow:"initial",height:"inherit",width:"inherit"});
    $("body").css({overflow:"initial",height:"inherit"});
    topDepth1.unbind();
    topDepth1_ti.unbind();
    topDepth1_ti.removeClass("on").next(topDepth2_wrap).stop().hide();// 모바일에서 활성화 되었던 메뉴 닫기
    topDepth2_ti.unbind().off();
    lnbBtn.addClass("inactive").removeClass("active").children("em").text("메뉴");
    lnbBtn.unbind().off();
    gnbLink.removeClass("mobile_gnb");
    mainWrap.removeClass("blur");
    menuWrap.show();
    menuStat = true;
    //topDepth1.find(".depth1_323_off").removeClass("depth1_323_off").addClass("depth1_323");
    $(".top2m.depth1_323 .depth2 ul.depth3").hide();

    // 이벤트 제거 및 초기화 끝
    topDepth1_ti.on("mouseenter focusin",function(){
		var topDepth2_height = $(this).next(topDepth2_wrap).height();
		if(mode=='pc'){
			$(this).addClass("on").next(topDepth2_wrap).stop().slideDown(200).find(topDepth2Menu).css({"min-height":topDepth2_height});
			$(this).parent().siblings().children(topDepth1_ti).removeClass("on");
			$(this).parent().siblings().find(topDepth2_wrap).stop().slideUp(100).find(topDepth2Menu).css({"min-height":"inherit"});
		}
    });
    topMenu.on("mouseleave",function(){
		if(mode=='pc'){
			topDepth1_ti.removeClass("on");
			topDepth2_wrap.stop().slideUp(100);
			topDepth2Menu.css({"min-height":"inherit"});
		}
    });
    topLastMenu.on("focusout",function(){
		if(mode=='pc'){
			$(this).parents('.top2m').slideUp(100).siblings().removeClass("on");
			topDepth2Menu.css({"min-height":"inherit"});
		}
    });
    //포커스가 마지막 메뉴를 빠져나왔을 때 펼쳐진 메뉴 가림.
}

var menuStat = true;
function mobile_menu(e){ //모바일메뉴
                         //메뉴 변수선언
    var lnbBtn = $(".m_menu_btn"),/* mobile menu active Button */
        menuWrap = $(".menu_wrap"),/* topmenu pc랑 공통 변수 */
        topMenu = $(".top_menu"),
        topDepth1 = $(".depth1"),/* 1차메뉴 li pc랑 공통 변수 */
        topDepth1_ti = $(" .depth1_ti"),/* 1차메뉴 앵커 pc랑 공통 변수 */
        topDepth2_wrap = $(".top2m").css({height:"auto"}),/* 2차메뉴 wrap pc랑 공통 변수 */
        topDepth2Menu = $(".depth2"),/* pc랑 공통 변수 */
        topDepth2_ti = $(".depth2").find(" > li").find(" > a"),
        topDepth3 = $(".depth3"),/* 3차메뉴 */
        topDepth3_ti = $(".depth3").find(" > li").find(" > a"),
        topDepth4 = $(".depth4"),/* 4차메뉴 */
        menuMask = $(".black_wrap"),
        gnbLink = $(".gnb_link"),
        mainWrap = $("#container");/* pc랑 공통 변수*/

    if( isMobileResizingMenu ) return;
    isMobileResizingMenu = true;
    isPcResizingMenu = false;

    //PC적용되던 이벤트 제거
    topDepth1_ti.parent().siblings().children(topDepth1_ti).removeClass("open");
    topDepth2_wrap.hide().removeClass("open").parent().removeClass("open");// 활성화 되었던 메뉴 닫기
    topDepth2Menu.css({height:"inherit"});
    $("body").off("mouseenter",topDepth1_ti,pc_menu);
    menuMask.unbind().off();
    menuWrap.css("display","none").unbind().off();
    topMenu.unbind().off();
    topDepth1_ti.unbind().off();
    topDepth1.unbind().off();
    //topDepth1.find(".depth1_323").removeClass("depth1_323").addClass("depth1_323_off");
    // 이벤트 제거 및 초기화 끝

    // 초기화
    menuStat = true;
    $(this).addClass("inactive").removeClass("active").children("em").text("메뉴");
    $("html,body").css({overflow:"visible",height:"inherit"});
    menuWrap.fadeOut(100);
    topDepth1_ti.removeClass("open");
    topDepth2_wrap.slideUp(100);
    gnbLink.removeClass("mobile_gnb");
    mainWrap.removeClass("blur");

    lnbBtn.click(function(){
        if(menuStat){
            var winHeight = $(window).innerHeight();
            $(this).addClass("active").removeClass("inactive").children("em").text("닫기");
            $("html").css({position:"fixed",overflow:"hidden",height:winHeight,width:"100%"});
            $("body").css({overflow:"hidden",height:winHeight});
            //menuMask.fadeIn(200);
            menuWrap.fadeIn(300);
            gnbLink.addClass("mobile_gnb");
            mainWrap.addClass("blur");
            //srcBtn.css({"z-index":"20"});
            menuStat = false;
        }else if(menuStat == false){
            $(this).addClass("inactive").removeClass("active").children("em").text("메뉴");
            $("html").css({position:"static",overflow:"visible",height:"inherit;",width:"inherit;"});
            $("body").css({overflow:"visible",height:"inherit"});
            menuWrap.fadeOut(100);
            topDepth1_ti.removeClass("open");
            topDepth2_wrap.slideUp(100);
            gnbLink.removeClass("mobile_gnb");
            mainWrap.removeClass("blur");
            //menuMask.fadeOut(200);
            //srcBtn.css({"z-index":"31"});
            menuStat = true;
        }
    });
//  }
    topDepth1_ti.on("click",function(e){
        event.preventDefault();
        if($(this).hasClass("open")){
            $(this).removeClass("open").siblings(topDepth2_wrap).slideUp(100);
        }else{
            menuWrap.not(this).each(function($){
                topDepth1_ti.removeClass("open").siblings(topDepth2_wrap).slideUp(100);
            });
            $(this).addClass("open");
            $(this).siblings(topDepth2_wrap).slideDown(200);
        }
    });
    topDepth2_ti.on("click",function(e){
        var depth3Length = $(this).next(topDepth3).length;
        if(depth3Length > 0){
            event.preventDefault();
            if($(this).hasClass("depth2_open")){
                $(this).removeClass("depth2_open").next(topDepth3).stop().slideUp(100);
            }else{
                menuWrap.not(this).each(function($){
                    topDepth2_ti.removeClass("depth2_open").next(topDepth3).stop().slideUp(100);
                });
                $(this).addClass("depth2_open");
                $(this).next(topDepth3).stop().slideDown(200);
            }
        }
    });
    topDepth3_ti.on("click",function(e){
        var depth4Length = $(this).next(topDepth4).length;
        if(depth4Length > 0){
            event.preventDefault();
            if($(this).hasClass("depth3_open")){
                $(this).removeClass("depth3_open").next(topDepth4).stop().slideUp(100);
            }else{
                menuWrap.not(this).each(function($){
                    topDepth3_ti.removeClass("depth3_open").next(topDepth4).stop().slideUp(100);
                });
                $(this).addClass("depth3_open");
                $(this).next(topDepth4).stop().slideDown(200);
            }
        }
    });
}
function subMenu(e){ //왼쪽메뉴 2차 버튼
    $(".sub_menu ul.sm_3th.on").siblings("a").addClass("on").parent("li").addClass("on");

    var side2Depth = $(".sm_3th").siblings("a").removeClass("link"),//link 클래스 지우는건 효과때문 .. 하위메뉴가 있고 없고에 따라서 아이콘이 달라짐.
        side3Depth = $(".sm_3th");
    side2Depth.on("click",function(){
        if($(this).hasClass("on")){
            event.preventDefault();
            return false;
        }
    });
    side2Depth.not(".on").click(function(){
        event.preventDefault();
        $(this).addClass("open").siblings(side3Depth).addClass("open").parent().addClass("open");
        $(this).next(side3Depth).slideDown(200);
        $(this).parent().siblings(".open").find(side3Depth).slideUp(200);
        $(this).parent().siblings().removeClass("open").children().removeClass("open");
    });
  /*
   side2Depth.on("click",function(){
   //var side2DepthLink = $(this).attr("href"),
   //linkArr = side2DepthLink.split("="),
   //moveLink = linkArr[1];
   // if(moveLink != 3038 || moveLink != 7085 || moveLink != 3025 ){
   //   //특정키번호를 지정하여 지정된 키의 메뉴는 기냥 링크를 실행시킴. ex_컨텐츠 인트로 페이지 같은것들.
   event.preventDefault();
   //alert(moveLink);
   if($(this).hasClass("on")){
   //해당 depth에 on 클래스가 있는 경우 현재 위치해 있는 메뉴이기때문에 아래 소스는 실행시키지 않아야함
   return false;
   }else if($(this).hasClass("on") === false){
   $(this).addClass("open").siblings(side3Depth).addClass("open").parent().addClass("open");
   $(this).next(side3Depth).slideDown(200);
   $(this).parent().siblings(".open").find(side3Depth).slideUp(200);
   $(this).parent().siblings().removeClass("open").children().removeClass("open");
   }
   //}
   });
   */
}
var stat = true;

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
        _browser = 'ie7';

    //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie8';

    //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie9';

    //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie10';

    //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie11';

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
			$lnb = $('#lnb'),
			$lnbBtn = $('.menu_show .menu_button'),
			$lnbClose = $('.lnbbox .menu_hide .menu_button'),
            $container = $('#container'),
            $footer = $('#footer');

        $window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

		//다국어 홈페이지 선택
		$(".language_btn").click(function () {
			$(this).toggleClass("open").next().slideToggle(100);
		});
		//통합검색
		var lnbWrap = $(".lnb_wrap"),
			searchWrap = $(".search_wrap"),
			srcBtn = $(".src_btn"),
			srcArea = $(".search_detail"),
			menuMask = $(".black_wrap");
		//winHeight = $(window).innerHeight();
		srcBtn.click(function(){
			if(stat){
				$(this).addClass("on");
				//$("html,body").css({overflow:"hidden",height:winHeight});
				menuMask.fadeIn(200);
				srcArea.slideDown(200);
				lnbWrap.css({"z-index":"inherit"});
				searchWrap.css({"z-index":"30"});
				$(this).find("span").html("닫기");
				stat = false;
			}else if(stat == false){
				$(this).removeClass("on");
				//$("html,body").css({overflow:"auto",height:"auto"});
				menuMask.fadeOut(200);
				srcArea.slideUp(200);
				lnbWrap.css({"z-index":"30"});
				searchWrap.css({"z-index":"inherit"});
				$(this).find("span").html("열기");
				stat = true;
			}
		});

		srcArea.find('input[type="submit"]').on('focusout', function(event) {
			srcBtn.trigger('click');
		});

		//풋터  - 관련사이트 바로가기
		$(".site_link div.layer").fadeOut("fast");
		$(".site_link h3 button.open").click(function(){
			$(".site_link div.layer").fadeOut("fast");
			$(this).parent().next("div.layer").fadeIn("fast");return false;
		});
		$(".site_link .close").click(function(){
			$(this).parent().fadeOut("fast");return false;
		});
		//상단이동
		$(".top_btn").click(function(){
			$("html, body").animate({scrollTop : 0},400).focus("#rowgroup");
		});
		$(window).scroll(function(){
			var scrollVertical = $(document).scrollTop();
			var cntWrap = $("#contents");
			//console.log(scrollVertical);
			if (scrollVertical >= 300){
				cntWrap.addClass("mobile");
			} else {
				cntWrap.removeClass("mobile");
			}
		});

		//lnb
		var $depth1Menu = $lnb.find('.top_menu'),
			$depth1item = $depth1Menu.children('.depth1'),
			$depth1text = $depth1item.children('.depth1_ti'),
			$depth2box = $depth1item.children('.top2m'),
			$depth2Menu = $depth2box.find('.depth2'),
			$depth2item = $depth2Menu.find('>li'),
			$depth1ListWithDepth2Menu = $depth2item.parents('.depth1'),

			$depth3box = $depth2item.children('.depth3'),
			$depth3Menu = $depth3box.children('.depth3_list'),
			$depth3item = $depth3Menu.find('.depth3_item'),
			$depth2ListWithDepth3Menu = $depth3item.parents('.depth2_item');

		$depth1ListWithDepth2Menu.addClass('has');
		$depth2ListWithDepth3Menu.addClass('has');
		$('#lnb .depth1.has .depth1_ti').on('click', function(event) {
			if(mode === 'mobile') {
				var $this = $(this),
					$MyParent = $this.parent('.depth1'),
					IsActive = $MyParent.is('.active'),
					$OtherParents = $MyParent.siblings('.depth1');
				if(!IsActive){
					$OtherParents.removeClass('active');
					$MyParent.addClass('active');
				} else{
					$MyParent.removeClass('active');
				};
				event.preventDefault();
			};
		});
		$('#lnb .depth2_item.has .depth2_text').on('click', function(event) {
			if(mode === 'mobile') {
				var $this = $(this),
					$MyParent = $this.parent('.depth2_item'),
					IsActive = $MyParent.is('.active'),
					$OtherParents = $MyParent.siblings('.depth2_item');
				if(!IsActive){
					$OtherParents.removeClass('active');
					$MyParent.addClass('active');
				} else{
					$MyParent.removeClass('active');
				};
				event.preventDefault();
			};
		});
		
		$lnbBtn.on('click', function(event) {
			if(mode === 'mobile') {
				var IsOpen = $body.is('.lnb_show');
				if(!IsOpen){
					$body.addClass('lnb_show');
				} else{
					$body.removeClass('lnb_show');
				};
			};
		});
		$lnbClose.on('click', function(event) {
			$body.removeClass('lnb_show');
		});
		

        $window.on('screen:wide screen:web', function(event) {
			
        });

        $window.on('screen:tablet screen:phone', function(event) {
			$depth2box.removeAttr('style');
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
                    to : 1201
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1200,
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


// 동영상 체크
function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 99; //It is not IE
}
/*  게시판 */
function addCellHeader(table) {
    if (!table) {
        return false;
    }
    //console.log(table);
    var trs = table.getElementsByTagName('tr');
    var trsChild;
    var grid = {};
    var cells;

    for (var i = 0, cntI = trs.length; i < cntI; i++) {
        if (!grid[i]) {
            grid[i] = {};
        }
        trsChild = trs.item(i).childNodes;
        cells = 0;
        for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
            if (trsChild[j].nodeType == 1) {
                grid[i][cells++] = trsChild[j];
            }
        }
    }

    var cellHeader = '';
    for (row in grid) {
        if (row == 0) {
            continue;
        }
        for (cell in grid[row]) {
            if (cell == 0) {
                continue;
            }
            //cellHeader = grid[0][cell].innerHTML + ' - ' + grid[row][0].innerHTML
            cellHeader = grid[0][cell].innerHTML + '：' ;
            grid[row][cell].setAttribute('data-cell-header', cellHeader);
        }
    }
}

$( document ).ready(function() {
    var bbsTableRwdb   = $("table[data-rwdb='yes']");
    if(bbsTableRwdb.length > 0){
        var thisTable = bbsTableRwdb.attr('class').replace(/ /g, '.');
        if(navigator.appVersion.indexOf("MSIE 7.")==-1 && navigator.appVersion.indexOf("MSIE 8.")==-1) {
            addCellHeader(document.querySelector('.'+ thisTable));
        }
    }
});
// 만족도조사
function fn_validateCntntsEvalHist( frm ) {
    var valiEvl = false;
    for( var i=0; i<frm.cntntsEvlSe.length; i++ ) {
        if( frm.cntntsEvlSe[i].checked == true ) {
            valiEvl = true;
            break;
        }
    }
    if( !valiEvl ) {
        alert("만족도의 등급을 선택하지 않으셨습니다.\n만족도 등급을 선택하여 주세요.");
        fn_setFocus(frm, 'value5');
        return false;
    }
    return true;
}

function checkIE(ver,seletor) {
    var ver = ver,
        seletor = seletor;

    if (GetIEVersion() <= ver) { //IE브라우전 체크 버전보다 작으면
        $(seletor + " video").remove();
    } else{
        $(seletor + " object").remove();
    }
}

// 탭메뉴 공통적으로 사용
//ex) tabOn(1,1);
function tabOn(tabid,a) {
    var tabAllcount = 20;
    for (i=1;i<=tabAllcount;i++) {
        if(i<tabAllcount){inn="0"+i;} else {inn=""+i;}
        tabMenu = document.getElementById("tab"+tabid+"m"+i);
		var $tabMenu = $('#tab'+tabid+'m'+i);
        tabContent = document.getElementById("tab"+tabid+"c"+i);
        tabMore = document.getElementById("tab"+tabid+"more"+i);
        if (tabMenu) { //객체가존재하면
            if (tabMenu.tagName=="BUTTON") {
				tabMenu.className="";
				$tabMenu.removeAttr('title');
			} //버튼일때
            if (tabMenu.tagName=="SPAN") { tabMenu.className=""; } //span 일때
        }
        if (tabContent) {
            tabContent.style.display="none";
            //tabContent.className="";
        }
        if (tabMore) { tabMore.style.display="none"; }
    }
    if(a<tabAllcount){ann="0"+a;} else {ann=""+a;}
    tabMenu = document.getElementById("tab"+tabid+"m"+a);
    tabContent = document.getElementById("tab"+tabid+"c"+a);
    tabMore = document.getElementById("tab"+tabid+"more"+a);
	var $tabMenuA = $('#tab'+tabid+'m'+a);
    if (tabMenu) { //객체가존재하면
        if (tabMenu.tagName=="BUTTON") {
			tabMenu.className="active";
			$tabMenuA.attr('title', '선택됨');
		} //버튼일때
        if (tabMenu.tagName=="SPAN") { tabMenu.className="active"; } //span 일때
    }
    if (tabContent) {
        tabContent.style.display="block";
        //tabContent.className="current";
    }
    if (tabMore) { tabMore.style.display="block"; }
}

//배너 롤링
$(document).ready(function(){
    var bn_length = $(".banner li").length;
    if (bn_length > 7)
    {
        var bannerAuto=null;
        var bannerDirect="left";

        function rightBanner(){
            $(".banner ul").stop().animate(
                {left:"-=130px"},0,function(){
                    var $bannerObj=$(".banner ul li:first").clone(true);
                    $(".banner ul li:first").remove();
                    $(".banner ul").css("left",0);
                    $(".banner ul").append($bannerObj);
                }
            );
            if(bannerAuto)clearTimeout(bannerAuto);
            bannerAuto=setTimeout(rightBanner,3000)
        }

        function leftBanner(){
            $(".banner ul").stop().animate(
                {left:"0px"},0,function(){
                    var $bannerObj=$(".banner ul li:last").clone(true);
                    $(".banner ul li:last").remove();
                    $(".banner ul").css("left","0");
                    $(".banner ul").prepend($bannerObj);
                }
            );
            if(bannerAuto)clearTimeout(bannerAuto);
            bannerAuto=setTimeout(rightBanner,3000)
        }

        $(document).ready(function(){

            bannerAuto=setTimeout(rightBanner,3000);

            $rightB=$(".banner_controller .banner_next");
            $leftB=$(".banner_controller .banner_prev");
            $pauseB=$(".banner_controller .banner_ctrl");
            var bPlay = false;

            $leftB.click(function(){
                bannerDirect="left";
                clearTimeout(bannerAuto);
                leftBanner();
                return false;
              /*}*/
            });

            $rightB.click(function(){
                bannerDirect="right";
                clearTimeout(bannerAuto);
                rightBanner();
                return false;
              /*}*/
            });


            $pauseB.click(function(){
                if (bPlay == false){
                    clearTimeout(bannerAuto);
                    $pauseB.addClass("play").text("배너 롤링 재생하기");
                    bPlay = true;
                }else{
                    bPlay = false;
                    $pauseB.removeClass("play").text("배너 롤링 일시정지하기");
                    bannerAuto=setTimeout(rightBanner,1500)
                }
            });

            $(".banner ul li a").on("mouseover focusin", function(){
                clearTimeout(bannerAuto);
            });
            $(".banner ul li a").on("mouseleave focusout", function(){
                bPlay = false;
            });
        });
    }
});
$.fn.accordionMenu = function(options) {
    var settings = {
        accordionBtn: '',
        accordionContent: ''
    };
    $.extend(settings, options);
    settings.accordionBtn = $(settings.accordionBtn);
    settings.accordionContent = $(settings.accordionContent);

    settings.accordionBtn.on("click", function(){
        $(this).siblings(settings.accordionContent).slideToggle();
        $(this).parent().siblings().find(settings.accordionContent).slideUp();
        $(this).parent().siblings().children().removeClass("open")
        $(this).toggleClass("open");
    });
};
// 좌우 슬라이딩
$.fn.horizonSlide = function(options){
    var settings = {
        slidePrev : '',
        slideNext : '',
        slideContent : '',
        slideElement : '',
        slideIndex : '',
        slideWidth : '',
        slideView : '',
        countTotal : '',
        countCurrent : ''
    };
    $.extend(settings, options);
    settings.slidePrev = $(settings.slidePrev);
    settings.slideNext = $(settings.slideNext);
    settings.slideContent = $(settings.slideContent);
    settings.slideElement = $(settings.slideElement);
    settings.countTotal = $(settings.countTotal);
    settings.countCurrent = $(settings.countCurrent);
    var slideSize = settings.slideElement.size(),
        slideIndex = settings.slideIndex,
        slideTotal = settings.slideElement.length,
        slideWidth = settings.slideElement.width(),
        slideAllwidth = slideWidth * slideTotal,
        slideView = settings.slideView,
        countTotal = settings.countTotal,
        countCurrent = settings.countCurrent,
        slidePst = 0;
    settings.slideContent.css("width",slideAllwidth);
    countTotal.html(slideTotal);
    countCurrent.html("1");
    if( slideSize > slideView){
        settings.slidePrev.on("click",function(e) {
            if( slideIndex > 1 ) {
                slidePst = slidePst - slideWidth;
                settings.slideContent.animate({left:-slidePst},400);
                slideIndex--;
                countCurrent.html(slideIndex);
            } else {
                //
            }
        });

        settings.slideNext.on("click",function(e) {
            if( slideIndex <= slideSize-slideView ) {
                slidePst = slidePst + slideWidth;
                settings.slideContent.animate({"left":-slidePst},400);
                slideIndex++;
                countCurrent.html(slideIndex);
            } else {
                //
            }
        });
    }
};
// 탭 컨텐츠
$.fn.tabContent = function(options){
    var settings = {
        tabGroup : '',
        tabBtn : '',
        tabCnt : ''
    };
    $.extend(settings, options);
    settings.tabGroup = $(settings.tabGroup);
    settings.tabBtn = $(settings.tabBtn);
    settings.tabCnt = $(settings.tabCnt);
    settings.tabBtn.on("click",function(e){
//if(settings.tabBtn.hasClass("open")){
//console.log("test");
        settings.tabGroup.not(this).each(function($){
            settings.tabBtn.removeClass("open").siblings(settings.tabCnt).hide(100);
        });
        $(this).addClass("open");
        $(this).siblings(settings.tabCnt).show();
//}
    });
};
// 새창 팝업
function popWindow( url, name, style) {
    window.open(url, name, style);
}
/* function accordionVertical(e){ //수직 슬라이드
 var accordionOpen = $(".accordion_btn"),//link 클래스 지우는건 효과때문 .. 하위메뉴가 있고 없고에 따라서 아이콘이 달라짐.
 accordContents = $(".accordion_detail"),
 accordionClose = $(".accordion_close");
 accordionOpen.on("click",function(){
 //alert(moveLink);
 if($(this).hasClass("open") === true){
 return false;
 }else{
 $(this).addClass("open").siblings(accordContents).addClass("open").parent().addClass("open");
 $(this).next(accordContents).slideDown(200);
 $(this).parent().siblings(".open").find(accordContents).slideUp(200);
 $(this).parent().siblings().removeClass("open").children().removeClass("open");
 }
 });
 accordionClose.on("click",function(){
 $(this).parent(accordContents).slideUp(200).removeClass("open");
 $(this).parent().parent().removeClass("open");
 $(this).parent().siblings().removeClass("open");
 });
 } */
/*
 var bookmarkURL = window.location.href;
 function copyThisURL() {
 var IE=(document.all)?true:false;

 if (IE) {
 if(confirm("이 글의 주소를 클립보드에 복사하시겠습니까?"))
 window.clipboardData.setData("Text", bookmarkURL);
 } else {
 temp = prompt("이 글의 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", bookmarkURL);
 }

 return false;
 }
 */
//배너모음
/*
 function bannerRolling{}
 var bannerAuto=null;
 var bannerDirect="left";

 function rightBanner(){
 $(".banner_img").stop().animate(
 {left:"-=164px"},"fast",function(){
 var $bannerObj=$(".banner_img li:first").clone(true);
 $(".banner_img li:first").remove();
 $(".banner_img").css("left",0);
 $(".banner_img").append($bannerObj);
 }
 )
 if(bannerAuto)clearTimeout(bannerAuto);
 bannerAuto=setTimeout(rightBanner,3000);
 };
 function leftBanner(){
 var $bannerObj=$(".banner_img li:last").clone(true);
 $(".banner_img li:last").remove();
 $(".banner_img").css("left","-164px");
 $(".banner_img").prepend($bannerObj);
 $(".banner_img").stop().animate({left:"0px"},"fast");
 if(bannerAuto)clearTimeout(bannerAuto);
 bannerAuto=setTimeout(rightBanner,3000);
 };

 $(document).ready(function(){
 bannerAuto=setTimeout(rightBanner,3000)
 $leftB=$(".banner_control .prev_banner a");
 $rightB=$(".banner_control .next_banner a");
 $pauseB=$(".banner_control .pause_banner a");
 $bannerP_btn=$(".banner_control .pause_banner a img");
 var bPlay = false;

 $leftB.click(function(){
 bannerDirect="left"
 leftBanner();
 return false;
 });

 $rightB.click(function(){
 bannerDirect="right"
 rightBanner();
 return false;
 });

 $pauseB.click(function(){
 if (bPlay == false){
 clearTimeout(bannerAuto);
 $bannerP_btn.attr("src","images/common/banner_play.gif");
 $bannerP_btn.attr("alt","바로가기 재생");
 bPlay = true;
 }else{
 bPlay = false;
 $bannerP_btn.attr("src","images/common/banner_stop.gif");
 $bannerP_btn.attr("alt","바로가기 정지");
 bannerAuto=setTimeout(rightBanner,1500);
 };
 return false;
 });
 });
 */
/*
 var global1 = {
 _value: '',
 setValue: function(){this._value = $(".lnb_wrap");},
 getValue: function(){return this._value;}
 },global2 = {
 _value: '',
 setValue: function(){this._value = $(".top_menu");},
 getValue: function(){return this._value;}
 };

 // 값 설정
 global1.setValue();
 global2.setValue();

 // 함수1
 function aaa() {
 console.log(global1.getValue());
 console.log(global2.getValue());
 }

 // 함수2
 function bbb() {
 console.log(global2.getValue());
 }

 aaa();
 bbb();
 */

function fn_search(frm) {

    if( !frm.searchTerm.value ) {
        alert("검색어를 입력하여 주세요.");
        return false;
    }

    return true;

}