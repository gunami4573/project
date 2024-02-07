(function ($) {

    'use strict';

    var $window = $(window);

    $(function () {

        var $PrintBox = $('.print_box');
        $PrintBox.each(function () {
            var $this = $(this);
            $window.on('scroll', function () {
                if ($window.scrollTop() >= $this.offset().top) {
                    setTimeout(function () {
                        $this.addClass('blr');
                    }, 1);
                } else {
                    setTimeout(function () {
                        $this.removeClass('blr');
                    }, 1);
                }
            });
        });

        // 새창 브라우저를 담을 빈 배열 선언
        var printWindowArray = [];

        var $PrintBtn = $('button.print_btn');
        $PrintBtn.each(function () {
            var $PrintDesc = $(this).siblings('.print_desc');
            $(this).on('mouseenter', function () {
                setTimeout(function () {
                    $PrintDesc.addClass('blr');
                }, 1);
            }).on('mouseleave', function () {
                setTimeout(function () {
                    $PrintDesc.removeClass('blr');
                }, 1);
            }).on('click', function () {

                // 새창 브라우저 너비 , 높이 ,가운데 위치 값 선언
                // ( ★주의★ 모니터 두개 이상 사용시 메인 모니터 에서만 가운데 정렬 됨 )
                var printWindowWidth = 1000;
                var printWindowHeight = 700;
                var printWindowTop = (window.screen.height / 2) - (printWindowHeight / 2);
                var printWindowLeft = (window.screen.width / 2) - (printWindowWidth / 2);

                // 새창으로 띄울 브라우저 변수에 담은 후 너비 , 높이 , 가운데 위치 값 지정
                var printWindow = window.open("/", "_blank", 'width=' + printWindowWidth + ', height=' + printWindowHeight + ', top=' + printWindowTop + ', left=' + printWindowLeft + '');

                // 새창 브라우저를 담을 배열의 길이 값 측정
                var printWindowArrayLength = printWindowArray.length;

                // 새창 브라우저를 담을 배열의 길이가 측정될 때, 0번째 삭제 후 다시 빈 배열로 만들기
                if (printWindowArrayLength) {
                    printWindowArray[0].close();
                    printWindowArray = [];
                }

                // css, js 복사를 위함
                var $head = $('head').clone();

                // 프린트 할 특정 영역 복사
                var $PrintDescClone = $PrintDesc.clone();

                // html 변환
                var headHtml = $head[0].innerHTML;
                var PrintDescHtml = $PrintDescClone[0].innerHTML;

                // 새창으로 띄울 브라우저 문서 doctype 작성
                printWindow.document.write(
                    '<!DOCTYPE html>' +
                    '<html>' +
                        '<head>' +
                            headHtml +
                        '</head>' +
                        '<body id="body" class="new_body">' +
                            '<div class="print_box">' +
                                '<div class="print_desc">'
                                    + PrintDescHtml +
                                '</div><!--// print_desc-->' +
                            '</div><!--// print_box-->' +
                            '<div class="loading">...loading...</div><!--//loading-->' +
                            '<button type="button" title="Print Go!!!" onclick="window.print();window.close();" class="print_start_btn"><em>Print Start Click</em></button><!--//print_btn-->' +
                            '<script>' +
                                'var body = document.getElementById("body");' +
                                'setTimeout(function(){' +
                                    'body.classList.add("hover_use");' +
                                '}, 2500);' +
                            '</script>' +
                        '</body><!--// new_body-->' +
                    '</html>'
                );
                printWindowArray.push(printWindow);
                console.log(printWindowArray);
                setTimeout(function(){}, 1);
            });
        });

    });

})(jQuery);