(function ($) {
    'use strict';

    var $window = $(window),
        $html = $('html');
    var fullPageCreated = false;
    $html.attr('data-fpenabled', false);

    function createFullpage() {
        if (fullPageCreated === false) {
            fullPageCreated = true;
            $('#container main').fullpage({
                menu : '.fullpage_navi',
                autoScrolling : true,
                keyboardScrolling : true,
                animateAnchor : true,
                recordHistory : true,
                lazyLoading : true,
                anchors : ['section1', 'section2', 'section3', 'section4', 'section5'],
                navigation : false,
                verticalCentered : false,
                scrollOverflow : false,
                scrollingSpeed : 500,
                css3 : false,
                responsiveWidth : 1001,
                sectionSelector : $('#container [class^="rowgroup"], #footer')
            });
            $html.attr('data-fpenabled', true);
        }
    }

    $(function () {
        //여기서부터 코드 작성해주세요
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container'),
            $header = $('#header');

        // full page setting - S
        $window.on('screen:wide', function () {
            var NowStatevertical = $.screen.settings.state[1];
            if (NowStatevertical == 'maxheight') {
                createFullpage();
            }
        });
        $window.on('screen:web screen:tablet screen:phone', function (event) {
            if (fullPageCreated == true) {
                fullPageCreated = false;
                $.fn.fullpage.destroy('all');
                $html.attr('data-fpenabled', false);
            }
        });
        $window.on('screen:maxheight', function () {
            window.Hmode = 'MaxHeight';
            $wrapper.attr('data-hsize', 'maxheight');
            var NowStatehorizontal = $.screen.settings.state[0];
            if (NowStatehorizontal == 'wide') {
                createFullpage();
            }
        });
        $window.on('screen:minheight', function () {
            window.Hmode = 'MinHeight';
            $wrapper.attr('data-hsize', 'minheight');
            if (fullPageCreated == true) {
                fullPageCreated = false;
                $.fn.fullpage.destroy('all');
                $html.attr('data-fpenabled', false);
            }
        });
        setTimeout(function () {
            var StartStatehorizontal = $.screen.settings.state[1];
            if (StartStatehorizontal === 'minheight') {
                $wrapper.attr('data-hsize', 'minheight');
            } else if (StartStatehorizontal === 'maxheight') {
                $wrapper.attr('data-hsize', 'maxheight');
            }
        }, 1);
        // full page setting - E

    });
})(jQuery);