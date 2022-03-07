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

                //ASF, FND, AI 버튼효과 시작
                //우측버튼클릭
                $('.fmd_wrap .fmd_btn_box .btn_item .btn_mask').on('click', function(){
                    var $this = $(this),
                        $MyParent = $this.parent('.btn_item'),
                        $MyParentFriend = $MyParent.siblings('.btn_item'),
                        $Friend = $MyParentFriend.find('.btn_mask'),
                        Index = $MyParent.index(),
                        $GrandDiv = $this.parents('.fmd_wrap'),
                        $OtherDiv = $GrandDiv.siblings('.fmd_view_box'),
                        $OtherChilds = $OtherDiv.find('.total_photo_item').eq(Index),
                        $OtherChildsFriend = $OtherChilds.siblings('.total_photo_item'),
                        IsActive = $MyParent.is('.active'),

                        $SmallBtnBox =  $('.fmd_wrap .fmd_small_btn_box'),
                        $MySmallItem = $SmallBtnBox.find('.small_btn_item').eq(Index),
                        $SmallItemFriend = $MySmallItem.siblings('.small_btn_item'),
                        $MySmallBtn = $MySmallItem.find('.small_btn_mask'),
                        $SmallBtnFriend = $SmallItemFriend.find('.small_btn_mask');
                    if(!IsActive){
                        $this.attr('title', '선택됨');
                        $Friend.removeAttr('title');
                        $MyParent.addClass('active mouse_on');
                        $MyParentFriend.removeClass('active mouse_on');
                        $OtherChilds.addClass('active');
                        $OtherChildsFriend.removeClass('active');
                        $MySmallBtn.attr('title', '선택됨');
                        $MySmallItem.addClass('active');
                        $SmallItemFriend.removeClass('active');
                        $SmallBtnFriend.removeAttr('title');
                    }
                });
                //하단버튼클릭
                $('.fmd_wrap .fmd_small_btn_box .small_btn_item .small_btn_mask').on('click', function(){
                    var $this = $(this),
                        $MyParent = $this.parent('.small_btn_item'),
                        $MyParentFriend = $MyParent.siblings('.small_btn_item'),
                        $Friend = $MyParentFriend.find('.small_btn_mask'),
                        Index = $MyParent.index(),
                        $GrandDiv = $this.parents('.fmd_wrap'),
                        $OtherDiv = $GrandDiv.siblings('.fmd_view_box'),
                        $OtherChilds = $OtherDiv.find('.total_photo_item').eq(Index),
                        $OtherChildsFriend = $OtherChilds.siblings('.total_photo_item'),
                        IsActive = $MyParent.is('.active'),
                        $BigBtnBox =  $('.fmd_wrap .fmd_btn_box'),
                        $MyBigItem = $BigBtnBox.find('.btn_item').eq(Index),
                        $BigItemFriend = $MyBigItem.siblings('.btn_item'),
                        $MyBigBtn = $MyBigItem.find('.btn_mask'),
                        $BigBtnFriend = $BigItemFriend.find('.btn_mask');
                    if(!IsActive){
                        $this.attr('title', '선택됨');
                        $MyParentFriend.removeClass('active');
                        $Friend.removeAttr('title');
                        $MyParent.addClass('active');
                        $OtherChilds.addClass('active');
                        $OtherChildsFriend.removeClass('active');
                        $MyBigBtn.attr('title', '선택됨');
                        $MyBigItem.addClass('active mouse_on');
                        $BigItemFriend.removeClass('active mouse_on');
                        $BigBtnFriend.removeAttr('title');
                    }
                });

                //우측마우스오버
                $('.fmd_wrap .fmd_btn_box .btn_item .btn_mask').on('mouseenter', function(){
                    var $this = $(this),
                        $MyParent = $this.parent('.btn_item'),
                        $MyParentFriend = $MyParent.siblings('.btn_item');

                    $MyParentFriend.removeClass('mouse_on');
                    $MyParent.addClass('mouse_on');
                });
                //ASF, FND, AI 버튼효과 끝


            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
