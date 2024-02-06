(function ($) {

    'use strict';

    var $window = $(window);

    $(function () {

        var $PrintBox = $('.print_box');
        $PrintBox.each(function () {
            var $this = $(this);
            $window.on('scroll', function () {
                if ($window.scrollTop() >= $this.offset().top) {
                    setTimeout(function(){
                        $this.addClass('blr');
                    }, 1);
                } else {
                    setTimeout(function(){
                        $this.removeClass('blr');
                    }, 1);
                }
            });
        });

        var $PrintBtn = $('button.print_btn');
        $PrintBtn.each(function () {
            var $PrintDesc = $(this).siblings('.print_desc');
            $(this).on('mouseenter', function () {
                setTimeout(function(){
                    $PrintDesc.addClass('blr');
                }, 1);
            }).on('mouseleave', function () {
                setTimeout(function(){
                    $PrintDesc.removeClass('blr');
                }, 1);
            }).on('click', function () {
                
                // 새창 브라우저 너비 값 지정
                var printWindowWidth = 1000;
                // 새창 브라우저 높이 값 지정
                var printWindowHeight = 700;

                // 새창 브라우저 가운데 위치 지정
                // ( ★주의★ 모니터 두개 이상 사용시 메인 모니터 에서만 가운데 정렬 됨 )
                var printWindowTop = (window.screen.height / 2) - (printWindowHeight / 2);
                var printWindowLeft = (window.screen.width / 2) - (printWindowWidth / 2);

                // 새창으로 띄울 브라우저 변수에 담기
                var printWindow = window.open("/", "_blank", 'width='+printWindowWidth+', height='+printWindowHeight+', top='+printWindowTop+', left='+printWindowLeft+'');

                // css, js 복사를 위함
                var $head = $('head').clone();

                // 프린트 할 특정 영역 복사
                var $PrintDescClone = $PrintDesc.clone();

                // html 변환
                var headHtml = $head[0].innerHTML;
                var PrintDescHtml = $PrintDescClone[0].innerHTML;

                // 새창으로 띄울 브라우저 문서 doctype 작성
                printWindow.document.write(
                    '<!DOCTYPE html>'+
                    '<html>'+
                    '<head>'+headHtml+'</head>'+
                    '<body class="new_body">' +
                        '<div class="print_box">' +
                            '<div class="print_desc">'
                                +PrintDescHtml+
                            '</div><!--// print_desc-->' +
                        '</div><!--// print_box-->' +
                        '<div class="loading_print">Loading....</div><!--// loading_print-->' +
                    '</body><!--// new_body-->'+
                    '</html>'
                );
                setTimeout(function(){
                    // 새창으로 띄웠던 브라우저 닫기
                    printWindow.document.close();
                    // 새창으로 띄운 브라우저 포커스 맞추기
                    printWindow.focus();
                }, 1);
                setTimeout(function(){
                    // 새창으로 띄운 브라우저 프린트 도구 시작
                    printWindow.print();
                    // 프린트 도구 닫혔을 경우 팝업 닫기
                    printWindow.close();
                }, 2000);

            });
        });

    });

})(jQuery);