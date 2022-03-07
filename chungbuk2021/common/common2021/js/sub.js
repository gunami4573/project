"use strict";

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            $(function() {
                
                var $window = $(window),
                    $html = $('html'),
                    $container = $('#container'),
                    $footer = $('#footer');

                // 사이드 메뉴 변수 시작
                $('.side_menu').menu({
                    cut : {},
                    event : 'click',
                    namespace : 'side'
                });
                // 사이드 메뉴 변수 끝

                // sns 공유 레이어 시작
                $('.snsbox .sns_item .sns').on('click', function(){
                    var $this = $(this),
                        $Parent = $this.parent('.sns_item'),
                        $Layer = $Parent.find('.layer'),
                        IsActive = $Parent.is('.active');
                    if(!IsActive){
                        $this.attr('title', '하위메뉴 닫기');
                        $Layer.animate({
                            width:"show"
                        }, 200);
                        $Parent.addClass('active');
                    }
                    else{
                        $Parent.removeClass('active');
                        $this.attr('title', '하위메뉴 열기');
                        $Layer.animate({
                            width:"hide"
                        }, 200);
                    }
                });
                // sns 공유 레이어 끝

                //tab 6depth 유무에 따른 스타일 변경
                $(function () {
                    var $tabPanel = $('.tab_panel'),
                        $tabItem = $tabPanel.find('.tab_item'),
                        $tabDepth6 = $tabItem.find('.tab_depth6'),
                        $tabDepth6Item = $tabDepth6.find('.tab_depth6_item');
                    $tabDepth6Item.closest('.tab_item').addClass('has_depth');
                });
                //tab 6depth 유무에 따른 스타일 변경 끝

                /* cms 탭메뉴 */
                var $tabMenu = $container.find('.tab_menu'),
                    $tabSelect = $tabMenu.find('.tab_select');

                $tabSelect.click(function () {
                    var $this = $(this),
                        $ParentTabmenu = $this.parent('.tab_menu'),
                        IsActive = $ParentTabmenu.is('.active');
                    if (!IsActive) {
                        $this.next('.tab_panel').stop().slideDown('250', 'easeOutExpo');
                        $ParentTabmenu.addClass('active');
                    } else {
                        $this.next('.tab_panel').stop().slideUp('250', 'easeOutExpo');
                        $ParentTabmenu.removeClass('active');
                    };

                });
                /* cms 탭메뉴 끝*/

                /* cms 탭메뉴 6차메뉴 자동 높이*/
                function depth6AutoHeight() {
                    var $dep6 = $container.find('.tab_depth6'),
                        $dep6Item = $dep6.find('.tab_depth6_item');

                    if ($(window).width() > 1400) {
                        $dep6Item.removeClass().addClass('tab_depth6_item');
                        for (var i = 0; i < $dep6Item.length; i += 5) {
                            $dep6Item.slice(i, i + 5).addClass('floor' + ((i / 5)));
                        }
                    } else if ($(window).width() > 640){
                        $dep6Item.removeClass().addClass('tab_depth6_item');
                        for (var i = 0; i < $dep6Item.length; i += 4) {
                            $dep6Item.slice(i, i + 4).addClass('floor' + ((i / 4)));
                        }
                    }
                    $dep6.each(function (index, element) {
                        if ($(window).width() > 1400) {
                            var $element = $(element),
                                $elementItem = $element.find('.tab_depth6_item'),
                                elementItemLength = $elementItem.length,
                                elementMax = Math.floor(elementItemLength / 6) + 1;
                        } else if ($(window).width() > 640){
                            var $element = $(element),
                                $elementItem = $element.find('.tab_depth6_item'),
                                elementItemLength = $elementItem.length,
                                elementMax = Math.floor(elementItemLength / 5) + 1;
                        }
                        
                            
                        for (var i = 0; i < elementMax; i++ ) {
                            var $elementItemFloor = $element.find('.floor' + i),
                                highestBox = 0;
                        
                            $($elementItemFloor).each(function (index) {
                                var $this = $(this),
                                    thisIndex = $this.index(),
                                    thisHeight = $this.find('.tab_depth6_anchor').height();


                                if (thisHeight > highestBox) {
                                    highestBox = thisHeight;
                                }
                                // console.log(highestBox);

                            }).height(highestBox);
                        }
                    });
                    
                }
                depth6AutoHeight();
                /* cms 탭메뉴 6차메뉴 자동 높이 끝*/

                
                // $('.container').each(function () {

                //     var highestBox = 0;
                //     $('.EqHeightDiv', this).each(function () {

                //         if ($(this).height() > highestBox)
                //             highestBox = $(this).height();
                //     });

                //     $('.EqHeightDiv', this).height(highestBox);

                // });
                

                /* 컨텐츠 탭메뉴 */
                var $tab = $container.find('.tab');
                           
                $tab.each(function(index, element){
                    var $tabM = $(element).find('.tab_menu'),
                        $tabButton = $(element).find('.tab_button'),
                        tabAllCheck = $tabButton.is('.tab_all'),/*전체보기 탭메뉴 유무*/
                        $tabContent = $(element).find('.tab_content');

                    var li_length = $tabM.find('.tab_item').length;
                    $tabM.not($('.prettyprint').children()).addClass('divide' + li_length);

                    $tabButton.click(function () {
                        var $this = $(this),
                            index = $tabButton.index(this),
                            tabButtonText = $this.text(),
                            IsTabAll = $this.is('.tab_all'),
                            $tab_panel = $this.parents('.tab_panel'),
                            $tab_menu = $this.parents('.tab_menu');
                        $this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
                        $this.parents('.tab').find('.tab_select span').text(tabButtonText);
                        if (tabAllCheck){
                            if (IsTabAll) {
                                $tabContent.addClass('active');
                            } else {
                                $tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
                            };
                        } else if (!tabAllCheck){
                            $tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
                        }
                        if ($window.width() <= 640) {
                            $tab_menu.removeClass('active');
                            $tab_panel.slideUp();
                        };
                        if ($window.width() <= 640 && IsTabAll) {
                            $tab_menu.removeClass('active');
                            $tab_panel.slideUp();
                        };

                    });
                });

                /* 컨텐츠 탭메뉴 끝 */

                /* 테이블 */
                $('table.table.responsive').not($('.prettyprint').children()).each(function () {
                    var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                        TheadExist = $(this).find('thead').length;
                    if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                        $(this).children('tbody').children('tr').find('th, td').each(function () {
                            var ThisIndex = $(this).index(),
                                TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                            $(this).attr('data-content', TheadText);
                        });
                        $(this).children('tfoot').children('tr').find('th, td').each(function () {
                            var ThisIndex = $(this).index(),
                                TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                            $(this).attr('data-content', TheadText);
                        });
                    };
                });

                $('.table_scroll').each(function () {
                    $(this).removeAttr('tabindex');
                });

                $('ol.num').not($('.prettyprint').children()).each(function () {
                    var $this = $(this),
                        $ThisLi = $this.find('>li');
                    $ThisLi.each(function () {
                        var $this = $(this),
                            ThisIndex = $this.index() + 1;
                        $this.prepend('<i class="count">' + ThisIndex + '</i>');
                    });
                });

                //tr_over
                // $('.table').each(function () {
                //     var $this = $(this),
                //         $theadTr = $this.find('thead tr'),
                //         thisIndex = 0;
                //     $theadTr.each(function () {
                //         thisIndex += 1;
                //     });
                //     if (thisIndex > 1) {
                //         $this.addClass('tr_over');
                //     }
                // });
                // var $Tabletrover = $('.table.tr_over');

                // $Tabletrover.each(function (index, element) {
                //     $(element).find('thead tr:first-child th').css('border-bottom', '1px solid #ceded9');
                //     $(element).find('thead tr:nth-child(2) th').css('border-bottom', '0');
                //     $(element).find('thead tr:nth-child(3) th').css('border-top', '1px solid #ceded9');
                //     $(element).find('thead tr:first-child th[rowspan]').css('border-bottom', '1px solid #f6faf9');

                // });

                $('.table_unit').each(function () {
                    var $this = $(this),
                        IsTitle = $this.find('h3,h4,h5,h6').length;
                    console.log(IsTitle);
                    if (!IsTitle){
                        $this.addClass('notitle');
                    }
                });
                /* 테이블 끝 */

                /*인풋 포커스*/
                var selectTarget = $('.sd_input input[type="text"]');
                selectTarget.on({
                    'focus': function () {
                        $(this).parent().addClass('focus');
                    },
                    'blur': function () {
                        $(this).parent().removeClass('focus');
                    }
                });
                /*인풋 포커스 끝*/

                /* 셀렉트박스 디자인 */
                var $select = $container.find('.select_design'),
                    $selectAllButton = $select.find('button', 'a'),
                    $selectAnchor = $select.find('.select_anchor'),
                    $selectPanel = $tab.find('.select_panel');

                $selectAnchor.click(function () {
                    var $this = $(this),
                        selectButtonText = $this.text();

                    $this.attr('title', '선택됨').closest('.select_item').addClass('active').siblings('.select_item').removeClass('active').find('.select_anchor').removeAttr('title');
                    $this.parents('.select_design').find('.select_button span').text(selectButtonText);
                    $selectPanel.addClass('active').siblings().removeClass('active');


                });
                $selectAllButton.click(function () {
                    var $this = $(this),
                        $parentmenu = $this.parents('.select_design'),
                        IsActive = $parentmenu.is('.active');
                    if (!IsActive) {
                        $this.attr('title', '열림');
                        $parentmenu.find('.select_panel').stop().slideDown('250', 'easeOutExpo');
                        $parentmenu.addClass('active');
                    } else {
                        $this.removeAttr('title');
                        $parentmenu.find('.select_panel').stop().slideUp('250', 'easeOutExpo');
                        $parentmenu.removeClass('active');
                    }
                });
                /* 셀렉트박스 디자인 끝 */

                /*Q&A*/
                $('.qnabox .listbox .qnabtn').on('click', function () {
                    var $this = $(this),
                        $MyParent = $this.parent('.listbox'),
                        $MyAnswer = $this.siblings('.answer'),
                        $OterParents = $MyParent.siblings('.listbox'),
                        $OterAnswer = $OterParents.find('.answer'),
                        $OterBtn = $OterParents.find('.qnabtn'),
                        IsActive = $MyParent.is('.active');
                    if (!IsActive) {
                        $OterParents.removeClass('active');
                        $OterAnswer.slideUp();
                        $OterBtn.attr('title', '목록열기');
                        $MyParent.addClass('active');
                        $MyAnswer.slideDown();
                        $this.attr('title', '목록닫기');
                    } else {
                        $MyParent.removeClass('active');
                        $MyAnswer.slideUp();
                        $this.attr('title', '목록열기');
                    };
                });
                /*Q&A 끝*/

                /* 스텝 넘버 */
                $(document).ready(function () {
                    var $step = $container.find('.step.number'),
                        $stepList = $step.find('.step_list');

                    $stepList.each(function (index, element) {
                        var $element = $(element),
                            $elementStepItem = $element.find('.step_item'),
                            $elementItemLevel = $elementStepItem.find('.level');

                        $elementStepItem.each(function (index, obj) {
                            var $index = $(this).index();
                            $elementItemLevel.eq(index).text($index + 1);
                        });
                    });
                });
                /* 스텝 넘버 끝*/

                /* 스텝 자동 높이 */
                function stepAutoHeight() {
                    var $step = $container.find('.step'),
                        $stepList = $step.find('.step_list'),
                        $stepItem = $stepList.find('.step_item');


                    $stepList.each(function (index, element) {
                        var $element = $(element),
                            $elementStepBox = $element.find('.step_box'),
                            $elementStepItem = $element.find('.step_item'),
                            $elementItemLevel = $elementStepItem.find('.level'),
                            height = 0,
                            width = 0,
                            count;

                        if ($element.parents('.step').hasClass('type2')) {
                            $($elementStepItem, element).each(function (index) {
                                var $this = $(this),
                                    $thisContent = $this.find('.step_content'),
                                    IsTitle = $thisContent.children().is('.title'),
                                    $thisText = $thisContent.find('.text');
                                if (IsTitle){
                                    $thisContent.css('display','block');
                                } else if (!IsTitle){
                                    $thisContent.css('display', 'inline-block');
                                }
                            });
                        }


                        if ($element.parents('.step').hasClass('type3')) {
                            if ($(window).width() > 640) {
                                $($elementStepBox, element).each(function (index) {
                                    var $this = $(this),
                                        height = 0,
                                        thisHeight = $this.height(),
                                        thisItemHeight = $this.find('.step_item').height(),
                                        thisProHeight = $this.find('.step_process').height();
                                        /*둘중 큰높이*/
                                        if (thisItemHeight > height) {
                                            height = thisItemHeight;
                                            if (thisProHeight > height){
                                                height = thisProHeight;
                                            }
                                        }
                                        if (thisItemHeight < height) {
                                            $this.find('.step_item').outerHeight(height);
                                        } else{
                                            $this.find('.step_process').height($this.find('.step_item').outerHeight());
                                        }

                                    count = index + 1;
                                });
                            }

                        } else if (!$element.parents('.step').hasClass('type3')) {
                            $($elementStepItem, element).each(function (index) {
                                var $this = $(this),
                                    $thisContent = $this.find('.step_content'),
                                    thisHeight = $this.find('.step_content').height();

                                if (thisHeight > height) {
                                    height = thisHeight;
                                    // $thisContent.height(height);
                                }

                                count = index + 1;
                            }).height(height);
                        }

                        $element.closest('.step').addClass('length' + count);
                    });
                }
                stepAutoHeight();
                /* 스텝 자동 높이 끝*/

                /* 스텝 자동 높이 반응형 */
                $(window).on('resize', function () {
                    depth6AutoHeight();
                    stepAutoHeight();
                    
                });
                /* 스텝 자동 높이 반응형 끝*/

                /*컨텐츠 공통 슬라이드*/ 
                var $SlideBox = $('.slide_type01'),
                    $SlideList = $('.slide_type01 .img_list'),
                    Slidetotal = $('.slide_type01 .countbox .total'),
					Slidecurrent = $('.slide_type01 .countbox .current');
                $SlideList.slick({
                    //기본
                    autoplay: false,
                    dots: false,
                    dotsClass: "slick-dots",
                    // swipe: false,
                    // draggable: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    infinite: true,
                    Arrows: true,
                    current : Slidecurrent,
                    total : Slidetotal,
                    customState : function(state) {
						//현재 슬라이드 위치가 10보다 작을 때
						if(state.current < 10) {
							state.current = '0' + state.current;
						}
                        if(state.total < 10) {
							state.total = '0' + state.total;
						}
						return state;
					},
                    prevArrow: $SlideBox.find('.img_control .prev'),
                    nextArrow: $SlideBox.find('.img_control .next'),
                    

                    //추가 기능
                    responsive: [{
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: false,
                        }
                    }, ],
                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}