
/**
 * 전체 옵션
 * text 박스에 숫자만 입력
 * ex) <input type="text" numberonly="true">
 */
$(document).on("keyup focusout", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
$(document).on("keyup focusout", "input:text[numberOnlyMinCmm]", function()	{	$(this).val( $(this).val().replace(/[^-.0-9]/gi,"") ); });
$(document).on("keyup focusout", "input:text[numberOnlyMin]", function()	{	$(this).val( $(this).val().replace(/[^-0-9]/gi,"") ); });


/**
 * 전체 옵션
 * text 박스에 숫자만 입력
 * ex) <input type="text" numberOnlyMinComma="true">
 */
$(document).on("keydown", "input:text[numberOnlyMinComma]", function()	{
	var strVal = $(this).val();

	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;

	if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 )
				|| keyID == 46 || keyID == 8 || keyID == 109
				|| keyID == 189 || keyID == 9
				|| keyID == 37 || keyID == 39){

		if(strVal.length > 1 && (keyID == 109 || keyID == 189)){
			return false;
		}else{
			return;
		}
	}else{
		return false;
	}
});

$(document).on("focusout", "input:text[numberOnlyMinComma]", function()	{
	$(this).val( $(this).val().replace(/[^-\.0-9]/gi,"") );
	$(this).val( $(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
});


var jqueryCmm = (function(){
    var jqueryCmm = {};

    /* 대기화면 시작  */
    jqueryCmm.fn_Lodding = function(){
    		//화면의 높이와 너비를 구한다.
	        var maskHeight = jQuery(document).height();
	        var maskWidth = jQuery(window).width();

	        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
	        jQuery('#maskLoading').css({'width':maskWidth,'height':maskHeight});

	        //애니메이션 효과
	        jQuery('#maskLoading').fadeTo("slow",0.8);
    };

    /* 대기화면 종료 */
    jqueryCmm.fn_Unlodding = function(){
	    	jQuery('#maskLoading').hide();
			jQuery('.window').hide();
    };

    /* 날짜 차이계산 하여 True 반환 */
    jqueryCmm.fn_DateCompare = function(day1, day2){
    		var date1 = jqueryCmm.fn_ReplaceMin(day1);
    		var date2 = jqueryCmm.fn_ReplaceMin(day2);

    		var rtnInt = eval(date2)-eval(date1);

    		if(rtnInt >= 0){
    			return true;
    		}else{
    			return false;
    		}
    };

    jqueryCmm.fn_Replace = function(val, val2){
    	val = val + "";
    	var rtn = val.replace(/,/gi,"");

    	return rtn;
    };

    // Comma Replace
    jqueryCmm.fn_ReplaceMin = function(val){
    	val = val + "";
    	var rtn = val.replace(/-/gi,"");

    	return rtn;
    };

    // Comma Replace
    jqueryCmm.fn_ReplaceComma = function(val){
    	val = val + "";
    	var rtn = val.replace(/,/gi,"");

    	return rtn;
    };

    //숫자에 콤마 추가
    jqueryCmm.fn_ReplaceCommaAdd = function(val){
    	var rtn = "";
    	val = val + "";
    	rtn = val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    	return rtn;
    };

    // 날짜 구하기
    jqueryCmm.fn_GetDate = function(val1, val2){
    	 var yy = parseInt(val1.substr(0, 4), 10);
	     var mm = parseInt(val1.substr(4, 2), 10);
	     var dd = parseInt(val1.substr(6,2), 10);
	     var prevDate = new Date(yy, mm - 1, dd + val2);

	     yy = prevDate.getFullYear();
	     mm = prevDate.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	     dd = prevDate.getDate(); dd = (dd < 10) ? '0' + dd : dd;

	     return  yy+""+mm+""+dd;
    };



    // 두값의 합
    jqueryCmm.fn_Sum = function (val1, val2){
    	var rtn = "";

    	val1 = jqueryCmm.fn_ReplaceComma(val1);
    	val2 = jqueryCmm.fn_ReplaceComma(val2);

    	if(val1 == ""){
    		val1 = "0";
    	}

    	if(val2 == ""){
    		val2 = "0";
    	}

    	if(val1 == "-") return;
    	if(val2 == "-") return;


    	rtn = eval(val1)+eval(val2);
    	//rtn = jqueryCmm.fn_ReplaceCommaAdd(rtn);

    	return rtn;
    };

    // 두값의 차(둘다 플러스 일때)
    jqueryCmm.fn_Min = function (val1, val2){
    	var rtn = "";

    	val1 = jqueryCmm.fn_ReplaceComma(val1);
    	val2 = jqueryCmm.fn_ReplaceComma(val2);

    	if(val1 == ""){
    		val1 = "0";
    	}

    	if(val2 == ""){
    		val2 = "0";
    	}

    	if(val1 == "-") return;
    	if(val2 == "-") return;

    	rtn = eval(val1)-eval(val2);
    	//rtn = jqueryCmm.fn_ReplaceCommaAdd(rtn);

    	return rtn;
    };

    //년,월 일의 마지막 날 가져오기..
    jqueryCmm.getLastDay = function (year, month) {
       var date = new Date(year, month, 0);
       return date.getDate();
    };

    //오늘 년,월,일 가져오기
    jqueryCmm.getNowDay = function(){
    	var st_date = new Date().toISOString().substr(0, 10).replace('T', ' ');

    	return st_date;
    };

    // 세션 체크(관리자)
    jqueryCmm.sessionCheck = function(request, error){
    	if(request.status == "999"){
    		alert("로그인 세션이 종료 되었습니다.\n로그인 페이지로 이동합니다.");
    		location.href = "/www/index.do.do";
    	}else{
    		alert("처리 중 에러가 발생하였습니다. : " + error + " : " + request.status);
    	}
    };

 // 세션 체크(관리자)
    jqueryCmm.sessionPopupCheck = function(request, error){
    	if(request.status == "999"){
    		alert("로그인 세션이 종료 되었습니다.\n로그인 페이지로 이동합니다.");
    		window.close();
    		opener.location.href = "/www/index.do.do";
    	}else{
    		alert("처리 중 에러가 발생하였습니다. : " + error + " : " + request.status);
    	}
    };

    // 세션 체크(사용자)
    jqueryCmm.sessionUserCheck = function(request, error){
    	var rurl = window.location.pathname + location.search;

    	rurl  = encodeURIComponent(rurl);

    	if(request.status == "999"){
    		alert("로그인 정보가 필요한 페이지 입니다.\n로그인 페이지로 이동하겠습니다.");
    		location.href  = "/www/login.do?key=3575&rurl="+rurl;
    	}else{
    		alert("처리 중 에러가 발생하였습니다. : " + error + " : " + request.status);
    	}
    };

    // 팝업 오픈
    jqueryCmm.openPop = function(url, popName, width, height, top, left){
    	var pop_status;
	    var style;
	    style = 'height=' + height + ',width=' + width + ',menubar=no,toolbar=no,location=no,resizable=yes,status=no,scrollbars=yes,top=' + top + ',left=' + left;

	    pop_status = window.open(url, popName, style);
	    pop_status.focus();
	};

    jqueryCmm.isNumberMin = function(input){
    	var chars = "0123456789-";
    	if (!containsCharsOnly(input, chars)) {
    		alert("숫자와 '-' 만 입력가능합니다.");
    		input.value = "";
    	}
    };

    jqueryCmm.isDate = function(input){
    	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    	var str = input.value;

    	if(date_pattern.test(str)) {
    		alert("숫자와 '-' 만 입력가능합니다.");
    		input.value = "";
    	}
    }

    jqueryCmm.checkDate =   function(Obj){
        var strValue = Obj.value;
        var chk1 = /^(19|20)\d{2}-([1-9]|1[012])-([1-9]|[12][0-9]|3[01])$/;
        var chk2 = /^(19|20)\d{2}\/([0][1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;
        //var chk2 = /^(19|20)\d{2}-([0][1-9]|1[012])-([012][1-9]|3[01])$/;
        if (strValue == "")
        { // 공백이면 무시
             return true;
        }

        //-------------------------------------------------------------------------------
        // 유효성 검사- 입력형식에 맞게 들왔는지 // 예) 2000-1-1, 2000-01-01 2가지 형태 지원
        //-------------------------------------------------------------------------------
        if (chk1.test(strValue) == false && chk2.test(strValue) == false)
        { // 유효성 검사에 둘다 성공하지 못했다면
            alert("1999-1-1 형식 또는 \r\n1999-01-01 형식으로 날자를 입력해주세요.");
           Obj.value = "";
           Obj.focus = true;
           return false;
        }

        //-------------------------------------------------------------------------------
        // 존재하는 날자(유효한 날자) 인지 체크
        //-------------------------------------------------------------------------------
        var bDateCheck = true;
        var arrDate = Obj.value.split("-");
        var nYear = Number(arrDate[0]);
        var nMonth = Number(arrDate[1]);
        var nDay = Number(arrDate[2]);

        if (nYear < 1900 || nYear > 3000)
        { // 사용가능 하지 않은 년도 체크
            bDateCheck = false;
        }

        if (nMonth < 1 || nMonth > 12)
        { // 사용가능 하지 않은 달 체크
            bDateCheck = false;
        }

        // 해당달의 마지막 일자 구하기
        var nMaxDay = new Date(new Date(nYear, nMonth, 1) - 86400000).getDate();
        if (nDay < 1 || nDay > nMaxDay)
        { // 사용가능 하지 않은 날자 체크
            bDateCheck = false;
        }

        if(bDateCheck == false)
        {
           alert("존재하지 않은 년월일을 입력하셨습니다. 다시한번 확인해주세요");
           return false;
        }
    };

    return jqueryCmm;
})();


/***************************************/
/* 입력값이 원하는 문자만 들어오는지 체크함 */
/***************************************/
function containsCharsOnly(input,chars) {
    for (var inx = 0; inx < input.value.length; inx++) {
       if (chars.indexOf(input.value.charAt(inx)) == -1)
           return false;
    }
    return true;
}

/**
 * 전체옵션
 * text박스 날짜입력 시 '-' 자동추가
 * ex) <input type="text" data-auto-input="true">
 */
$(document).on("keyup", "input:text[data-auto-input]", function() {
    if( this.value.length > 10){
         this.value = this.value.substr(0, 10);
     }
     var val         = this.value.replace(/\D/g, '');
     var original    = this.value.replace(/\D/g, '').length;
     var conversion  = '';
     for(i=0;i<2;i++){
         if (val.length > 4 && i===0) {
             conversion += val.substr(0, 4) + '-';
             val         = val.substr(4);
         }
         else if(original>6 && val.length > 2 && i===1){
             conversion += val.substr(0, 2) + '-';
             val         = val.substr(2);
         }
     }
     conversion += val;
     this.value = conversion;
 });

/**
 * 전체옵션
 * text박스 날짜입력 시 글자수 체크
 * ex) <input type="text" dateValidation="true">
 */
$(document).on("focusout", "input:text[data-auto-input]", function() {

	var val = this.value.replace(/\D/g, '');
	var year = val.substr(0, 4);
	var month = val.substr(4, 2);
	var day = val.substr(6, 2);
	var lastDay = ( new Date(Number(year), Number(month), 0)).getDate();

	if(this.value.length > 0 || this.value != ''){
		if( this.value.length < 10){
	        alert('날짜 입력이 유효하지 않습니다. \n(\'YYYY-MM-DD\' 형식으로 입력바랍니다.)');
	        this.value = "";
	    } else if (Number(month)>12) {
	    	alert('날짜 입력이 유효하지 않습니다. \n(\'월\'이 잘못 입력되었습니다.)');
	    	this.value = "";
	    } else if (Number(day)>lastDay) {
	    	alert('날짜 입력 시 \'년월일\'을 확인해주세요.\n(\'일\'이 잘못 입력되었습니다.)');
	    	this.value = "";
	    }
	}
});

/**
 * 특수문자 입력 방지
 */
$(document).on("keyup focusout", "input:text[specialExcl]", function() {
	var exclVal = /[~!@\#$%^&*\(){}\-=+_']/gi;
	var val = this.value;

	if(exclVal.test(val)){
		alert("특수문자를 사용할수 없습니다.");
		var textVal = this.value.replace(exclVal, '');
		console.log(textVal);
		this.value = textVal;
	}
});



/**
 * DEXT5 Editor 이미지, 테이블 비율로 정보 가져오기
 */
function fn_DextEditText(editorID){
	// 기준이 될 editor의 가로값. 이 예제에선 가로를 1000px로 설정했다고 가정합니다.
	// (에디터의 좌,우 10px의 빈 공간이 있기 때문에 20px을 빼줍니다.)
	var editorWidth = 1000 - 20;

	// 에디터 작성영역의 document를 가져옵니다.
	var editorDoc = DEXT5.getDext5DocumentDom(editorID);

	// 작성 영역에서 이미지 태그를 가져옵니다.
	var images = editorDoc.getElementsByTagName('img');
	var imagesLength = images.length;
	for (var i = 0; i < imagesLength; i++) {
	           if (images[i].style.width && images[i].style.width.indexOf('px') > -1) {
	                     // 이미지 태그의 가로 값을 에디터의 가로값 기준으로 %값을 구하여 설정해줍니다.
	                     var imgWidth = parseInt(images[i].style.width, 10);

	                     if(imgWidth > 1000){
	                    	 imgWidth = 980;
	                     }

	                     var tempWidth = (imgWidth / editorWidth) * 100;
	                     images[i].style.width = tempWidth + '%';
	                     images[i].style.height = '';
	           }
	}

	// 작성 영역에서 테이블 태그를 가져옵니다.
	var tables = editorDoc.getElementsByTagName('table');
	var tablesLength = tables.length;

	for (var i = 0; i < tablesLength; i++) {
	           //  테이블 태그의 가로 값을 에디터의 가로값 기준으로 %값을 구하여 설정해줍니다.
	           if (tables[i].style.width.indexOf('px') > -1) {
	                     var tableWidth = parseInt(tables[i].style.width, 10);
	                     if(tableWidth > 1000){
	                    	 tableWidth = 980;
	                     }
	                     tables[i].style.width = tableWidth / editorWidth * 100 + '%';
	           }
	}

	return DEXT5.getBodyValue(editorID);

}


function fn_web_accessibility_validation(editorID) {
	// 웹 접근서 검증
    if (DEXT5.getAccessibilityValidation(editorID)) {
        logBox.innerHTML += editorID + ' : 웹 접근성 위반 항목이 없습니다.\n';
        return true;
    } else {
        DEXT5.setAccessibilityValidation(editorID);
        return false;
    }
}


/**
 * 바이트 문자 입력가능 문자수 체크
 *
 * @param id : tag id
 * @param title : tag title
 * @param maxLength : 최대 입력가능 수 (byte)
 * @returns {Boolean}
 */
function maxLengthCheck(id, title, maxLength){
     var obj = $("#"+id);
     if(maxLength == null) {
         maxLength = obj.attr("maxLength") != null ? obj.attr("maxLength") : 1000;
     }

     if(Number(byteCheck(obj)) > Number(maxLength)) {
         alert(title + "이(가) 입력가능문자수를 초과하였습니다.\n(영문, 숫자, 일반 특수문자 : " + maxLength + " / 한글, 한자, 기타 특수문자 : " + parseInt(maxLength/2, 10) + ").");
         obj.focus();
         return false;
     } else {
         return true;
    }
}

/**
 * 바이트수 반환
 *
 * @param el : tag jquery object
 * @returns {Number}
 */
function byteCheck(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.val().length; idx++) {
        var oneChar = escape(el.val().charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}

/**
 * 문자 바이트 체크
 *
 */
function char_length(obj, iSize, sId) {
	 var tmpStr;
	 var temp=0;
	 var onechar;
	 var tcount;
	 tcount = 0;
	 aquery = obj.value;
	 tmpStr = new String(aquery);
	 temp = tmpStr.length;

	 for (k=0;k<temp;k++)
	 {
	   onechar = tmpStr.charAt(k);
	   if (escape(onechar) =='%0D') { } else if (escape(onechar).length > 4) { tcount += 2; } else { tcount++; }
	 }

	 document.getElementById(sId).innerHTML = tcount;

	 if(tcount>iSize) {
	   reserve = tcount-iSize;
	   alert(iSize+"바이트 이상 입력할 수 없습니다.");

	   cutText(obj, iSize, sId);
	   return;
	 }
}

function cutText(obj, iSize, sId){
  var tmpStr;
  var temp=0;
  var onechar;
  var tcount;
  tcount = 0;
  aquery = obj.value;
  tmpStr = new String(aquery);
  temp = tmpStr.length;

  for(k=0;k<temp;k++)
  {
    onechar = tmpStr.charAt(k);

    if(escape(onechar).length > 4) {
      tcount += 2;
    } else {
      // 엔터값이 들어왔을때 값(\r\n)이 두번실행되는데 첫번째 값(\n)이 들어왔을때 tcount를 증가시키지 않는다.
      if(escape(onechar)=='%0A') {
      } else {
        tcount++;
      }
    }

    if(tcount>iSize) {
      tmpStr = tmpStr.substring(0,k);
      break;
    }
  }

  tmpStr.replace(/\r\n/g, "");//엔터제거
  obj.value = tmpStr;

}


var twitterSns = function(title, url) {
	if(title == ""){
		title = $(".btn-twitter").attr("data-title");
	}
	window.open("https://twitter.com/share?text="+encodeURIComponent(title)+"&url="+encodeURIComponent(url), "sns", "width=500,height=300,scrollbars=yes,toolbar=no,menubar=no");
}

var facebookSns = function(title, url) {
	if(title == ""){
		title = $('.btn-facebook').attr("data-title");
	}
	window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url), "sns", "width=500,height=300,scrollbars=yes,toolbar=no,menubar=no");
}

var KakaoStorySns = function(title, url) {
	if(title == ""){
		title = $(this).attr("data-title");
	}
	Kakao.Story.share({
	    url: url,
	    text: title
	});

}

var pholarSns = function(title, url) {
	if(title == ""){
		title = $(this).attr("data-title");
	}
	window.open("http://www.pholar.co/spi/rephol?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title), "sns", "width=500,height=300,scrollbars=yes,toolbar=no,menubar=no");
}

var naverSns = function(title, url) {
	if(title == ""){
		title = $('.btn-naver').attr("data-title");
	}
	window.open("http://blog.naver.com/openapi/share?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title), "sns", "width=500,height=600,scrollbars=yes,toolbar=no,menubar=no");
}

var naverBandSns = function(title, url) {
	if(title == ""){
		title = $('.btn-naver').attr("data-title");
	}
	window.open("http://www.band.us/plugin/share?body="+encodeURIComponent(title)+encodeURIComponent("\n")+encodeURIComponent(url)+"&route="+location.href, "share_band", "width=410, height=540, resizable=no");
}

var naverAllSns = function(title, url) {
	if(title == ""){
		title = $(this).attr("data-title");
	}
	window.open("https://share.naver.com/web/shareView.nhn?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title), "sns", "width=500,height600,scrollbars=yes,toolbar=no,menubar=no");
}



/*프린트*/
function PrintElem(elem, title, offset)
{
    // Title constructor
    title = title || $('title').text();
    // Offset for the print
    offset = offset || 0;
    var CtsClass = elem.attr('class');

    // Loading start
    var dStart = Math.round(new Date().getTime()/1000),
        $html = $('html');
        i = 0;

    // Start building HTML
    var HTML = '<html';

    if(typeof ($html.attr('lang')) !== 'undefined') {
        HTML+=' lang=' + $html.attr('lang');
    }

    if(typeof ($html.attr('id')) !== 'undefined') {
        HTML+=' id=' + $html.attr('id');
    }

    if(typeof ($html.attr('xmlns')) !== 'undefined') {
        HTML+=' xmlns=' + $html.attr('xmlns');
    }

    // Close HTML and start build HEAD
    HTML+='><head>';

    // Get all meta tags
    $('head > meta').each(function(){
        var $this = $(this),
            $meta = '<meta';

        if(typeof ($this.attr('charset')) !== 'undefined') {
            $meta+=' charset=' + $this.attr('charset');
        }

        if(typeof ($this.attr('name')) !== 'undefined') {
            $meta+=' name=' + $this.attr('name');
        }

        if(typeof ($this.attr('http-equiv')) !== 'undefined') {
            $meta+=' http-equiv=' + $this.attr('http-equiv');
        }

        if(typeof ($this.attr('content')) !== 'undefined') {
            $meta+=' content=' + $this.attr('content');
        }

        $meta+=' />';

        HTML+= $meta;
        i++;

    }).promise().done(function(){

        // Insert title
        HTML+= '<title>' + title  + '</title>';

        // Let's pickup all CSS files for the formatting
        $('head > link[rel="stylesheet"]').each(function(){
            HTML+= '<link rel="stylesheet" href="' + $(this).attr('href') + '" />';
            i++;
        }).promise().done(function(){
            // Print setup
            HTML+= '<style>@media print{body{display:block;}}</style>';

            // Finish HTML
            HTML+= '</head><body>';
            HTML+= '<div id="contents" class="'+CtsClass+'">';
            HTML+= elem.html();
            HTML+= '</div>';
            HTML+= '</body></html>';

            // Open new window
            var printWindow = window.open('', 'PRINT', 'height=' + $(window).height() + ',width=' + $(window).width());
            // Append new window HTML
            printWindow.document.write(HTML);

            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10*/

			console.log(printWindow.document);

            /* Make sure that page is loaded correctly */
            $(printWindow).on('load', function(){
                setTimeout(function(){
                    // Open print
                    printWindow.print();

                    // Close on print
                    setTimeout(function(){
                        printWindow.close();
                        return true;
                    }, 3);

                }, (Math.round(new Date().getTime()/1000) - dStart)+i+offset);
            });
        });
	});
}


$(document).on('click', '.print_btn', function() {
	// PrintElem($('#contents'), '');
    // return false;
    window.print();
});
