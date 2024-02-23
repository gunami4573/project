(function ($) {
    'use strict';

    var $window = $(window);

    $(function () {

        var $bookList = $('.book_total .book_list'),
            $bookItem = $bookList.find('.book_item'),
            $bookPrev = $('.book_total button.prev'),
            $bookNext = $('.book_total button.next');

        var bookListLT = $bookItem.length;
        var bookListPT = $bookList.css('padding-top');
        var bookListPR = $bookList.css('padding-right');

        //로딩 시 z-index , bottom , left 값 초기 실행
        function bookItemPosition(top, right) {
            for( var i=0; i < bookListLT; i++ ) {
                $bookItem.eq(i).css({
                    'z-index' : bookListLT - i,
                    'bottom' : 'calc(('+top+' / 3) * '+i+')',
                    'left' : 'calc(('+right+' / 3) * '+i+')'
                });
            }
        }
        bookItemPosition(bookListPT, bookListPR);

        //다음 버튼 클릭 시 첫 아이템 마지막으로 보냄
        $bookNext.on('click', function(){
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
            }, 500);
        });
        
        //이전 버튼 클릭 시 마지막 아이템 처음으로 보냄
        $bookPrev.on('click', function(){
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
            }, 500);

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