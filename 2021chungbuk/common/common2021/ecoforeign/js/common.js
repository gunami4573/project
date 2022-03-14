'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);

            $(function() {
                $window.on('screen:wide screen:web', function(event) {
                    window.mode = 'pc';
                });

                $window.on('screen:tablet screen:phone', function(event) {
                    $('.search_panel').hide();
                    window.mode = 'mobile';
                });

                $('.visual_list a[href="#"]').click(function(e) {
                    e.preventDefault();
                });

                //여기서부터 코드 작성해주세요
                //language
                $('.language .language_btn').on('click', function(e) {
                    var $this = $(this),
                        $Parent = $this.parent('.language'),
                        IsActive = $Parent.is('.active'),
                        $Layer = $this.siblings('.layer');
                    if(!IsActive){
                        $Parent.addClass('active');
                        $this.attr('title', '언어선택 닫기');
                        $Layer.slideDown(200);
                    } else{
                        $Parent.removeClass('active');
                        $this.attr('title', '언어선택 열기');
                        $Layer.slideUp(200);
                    };
                    e.stopPropagation();
                });
                $window.on('click',function(e){
                    $('.language').removeClass('active');
                    $('.language .language_btn').attr('title', '언어선택 닫기');
                    $('.language .layer').stop().slideUp(200);
                });

                //경제자유구역청 검색레이어 시작
                var $Header = $('#header');
                //1001px 이상용
                $('.nav .add_box button.search').on('click', function(){
                    var $this = $(this),
                        IsSearchOpen = $Header.is('.search_open');
                    if(!IsSearchOpen){
                        $this.attr('title', '선택됨')
                        $Header.addClass('search_open');
                    }
                });
                $('.eco_search_layer_box .search_wrap .button_wrap button.close_btn').on('click', function(){
                    var $this = $(this),
                        $OtherBtn = $('#header .nav .add_box button.search');

                    $OtherBtn.removeAttr('title');
                    $Header.removeClass('search_open');
                    $OtherBtn.focus();
                });

                //1000px
                $('#lnb .lnb_gnb button.search_btn').on('click', function(){
                    var $this = $(this),
                        IsMSearchOpen = $Header.is('.m_search_open');
                    if(!IsMSearchOpen){
                        $this.attr('title', '선택됨')
                        $Header.addClass('m_search_open');
                    }
                });
                $('.m_eco_search_layer_box .search_wrap .button_wrap button.close_btn').on('click', function(){
                    var $this = $(this),
                        $OtherBtn = $('#lnb .lnb_gnb button.search_btn');
                    $OtherBtn.removeAttr('title');
                    $Header.removeClass('m_search_open');
                });
                //경제자유구역청 검색레이어 끝

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}