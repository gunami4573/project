(function ($) {
    'use strict';

    var $window = $(window);

    $(function () {

        //요소 찾기
        var $bookList = $('.book_total .book_list'),
            $bookItem = $bookList.find('.book_item'),
            $bookPrev = $('.book_total button.prev'),
            $bookNext = $('.book_total button.next');

        //로딩 시 갯수 , 패딩상단 , 패딩우측 값 찾기
        var bookListLT = $bookItem.length,
            bookListPT = $bookList.css('padding-top'),
            bookListPR = $bookList.css('padding-right');

        //로딩 시 z-index , bottom , left 값 초기 함수 설정
        function bookItemPosition(top, right) {
            for( var i=0; i < bookListLT; i++ ) {
                $bookItem.eq(i).css({
                    'z-index' : bookListLT - i,
                    'bottom' : 'calc(('+top+' / 3) * '+i+')',
                    'left' : 'calc(('+right+' / 3) * '+i+')'
                });
            }
        }

        //로딩 시 z-index , bottom , left 값 초기 함수 실행
        bookItemPosition(bookListPT, bookListPR);

        //로딩 시 첫번째 아이템 tabindex 값 부여 및 엑티브 클레스 부여 함수 설정
        function bookItemFirstTabIndex() {
            $('.book_list').find('.book_item').attr('tabindex', '-1').removeClass('book_active');
            $('.book_list').find('.book_item').find('.book_item_link').attr('tabindex', '-1');
            $('.book_list').find('.book_item:first-child').removeAttr('tabindex').addClass('book_active');
            $('.book_list').find('.book_item:first-child').find('.book_item_link').removeAttr('tabindex');
        }

        //로딩 시 첫번째 아이템 tabindex 값 부여 및 엑티브 클레스 부여 함수 실행
        bookItemFirstTabIndex();

        //Next 동작 첫 아이템 마지막으로 보냄(버튼 클릭 및 반응형 터치에 사용)
        function bookNext(){
            $bookList.find('.book_item:first-child').addClass('right_move');
            $bookItem.each(function(){
                var $this = $(this),
                    thisIndex = $this.index(),
                    $PrevItem = $this.prev('.book_item'),
                    prevBottom = $PrevItem.css('bottom'),
                    prevLeft = $PrevItem.css('left');
                $this.css({
                    'z-index' : bookListLT - thisIndex + 1,
                    'bottom' : 'calc('+prevBottom+')',
                    'left' : 'calc('+prevLeft+')'
                });
            });
            var lastBottom = $bookList.find('.book_item:last-child').css('bottom'),
                lastLeft = $bookList.find('.book_item:last-child').css('left');
            setTimeout(function(){
                $bookList.append($bookList.find('.book_item:first-child').css({'z-index': 1, 'bottom' : lastBottom, 'left' : lastLeft}));
                $bookList.find('.book_item:last-child').removeClass('right_move');

                bookItemFirstTabIndex();
            }, 500);
        }
        $bookNext.on('click', function(){
            bookNext();
        });

        //Prev 동작 첫 아이템 마지막으로 보냄(버튼 클릭 및 반응형 터치에 사용)
        function bookPrev(){
            $bookItem.each(function(){
                var $this = $(this),
                    thisIndex = $this.index(),
                    $NextItem = $this.next('.book_item'),
                    nextBottom = $NextItem.css('bottom'),
                    nextLeft = $NextItem.css('left');
                $this.css({
                    'z-index' : bookListLT - thisIndex - 1,
                    'bottom' : 'calc('+nextBottom+')',
                    'left' : 'calc('+nextLeft+')'
                });
            });
            var firstBottom = $bookList.find('.book_item:first-child').css('bottom'),
                firstLeft = $bookList.find('.book_item:first-child').css('left');
            $bookList.prepend($bookList.find('.book_item:last-child').css({'z-index': bookListLT, 'bottom' : firstBottom, 'left' : firstLeft}));
            $bookList.find('.book_item:first-child').addClass('left_move');
            setTimeout(function(){
                $bookList.find('.book_item:first-child').removeClass('left_move');

                bookItemFirstTabIndex();
            }, 500);
        }
        $bookPrev.on('click', function(){
            bookPrev();
        });

        //모바일에서 터치로 prev, next 동작
        var touchStart;
        $('.book_list').bind('touchstart', function (e){
            touchStart = e.originalEvent.touches[0].clientX;
        });
        $('.book_list').bind('touchend', function (e){
            var touchEnd = e.originalEvent.changedTouches[0].clientX;
            if(touchStart > touchEnd + 5){
                bookPrev();
            }else if(touchStart < touchEnd - 5){
                bookNext();
            }
        });

        //윈도우 리사이즈 마다 , css에서 박스 padding-top , padding-right 값 추출하기
        $window.on('resize', function () {
            var resizeBookListPT = $('.book_list').css('padding-top');
            var resizeBookListPR = $('.book_list').css('padding-right');

            for( var i=0; i < bookListLT; i++ ) {
                $('.book_list .book_item').eq(i).css({
                    'bottom' : 'calc(('+resizeBookListPT+' / 3) * '+i+')',
                    'left' : 'calc(('+resizeBookListPR+' / 3) * '+i+')'
                });
            }
        });

    });
})(jQuery);