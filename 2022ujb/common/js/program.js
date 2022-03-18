/**
 * @preserve
 * HanshinIT program.js
 * version : v1.2.3
 */
$(function() {
    function replaceSvg(img, svg) {
        var $img = img, options = $img.data(), $svg = svg, imgID = $img.attr("id"), imgClass = $img.attr("class"), imgAlt = $img.attr("alt");
        return void 0 !== imgID && ($svg = $svg.attr("id", imgID)), void 0 !== imgClass && ($svg = $svg.attr("class", imgClass + " replaced-svg")),
            ($svg = $svg.removeAttr("xmlns:a")).attr("focusable", "false"), !$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width") && $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width")),
        ($img.attr("height") || $img.attr("width")) && ($img.attr("width") ? $svg.attr("width", $img.attr("width")) : $svg.removeAttr("width"),
            $img.attr("height") ? $svg.attr("height", $img.attr("height")) : $svg.removeAttr("height")),
        imgAlt && $svg.prepend("<title>" + imgAlt + "</title>"), options.svgColor && $svg.find("path").attr("fill", options.svgColor),
            $svg;
    }
    jQuery("img.svg").each(function() {
        var $img = jQuery(this), imgURL = $img.attr("src");
        jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find("svg");
            $svg && (resultSvg = replaceSvg($img, $svg), $img.replaceWith(resultSvg));
        }, "xml");
    }), jQuery("img.svgview").each(function() {
        var $img = jQuery(this), imgURL = $img.attr("src"), svgId = "#" + imgURL.split("#")[1];
        jQuery.get(imgURL, function(data) {
            jQuery(data).find("svg");
            if (jQuery(data).find("view" + svgId)) {
                var $svgTarget = jQuery(data).find("view" + svgId).next("svg");
                resultSvg = replaceSvg($img, $svgTarget), $img.replaceWith(resultSvg);
            }
        }, "xml");
    });
}), $(function() {
    function showToggle(element, options) {
        $element = $(element), this.element = element, this.options = options, $element.on("click mouseenter", $.proxy(this.show, this)),
            $element.on("click.close mouseleave", $.proxy(this.hide, this));
    }
    function showTogglePlugin(option) {
        var $this = $(this), data = $this.data("button"), options = "object" == typeof option && option;
        $this.data("map", data = new showToggle(this, options)), "string" == typeof option && data[option]();
    }
    showToggle.prototype.show = function() {
        $target = $(this.options.target), $target.show();
    }, showToggle.prototype.hide = function() {
        $target = $(this.options.target), $target.hide();
    }, $.fn.showToggle = showTogglePlugin, $(window).on("load", function() {
        $('[data-button="showToggle"]').each(function() {
            var $this = $(this), option = $this.data();
            showTogglePlugin.call($this, option);
        });
    });
});

var toggle = "[data-button='dropdown'], [data-dropdown='true']", Dropdown = function(element) {
    $(element).on("click.p-dropdown", this.toggle);
}, objCal;

function dropdownClear() {
    $(toggle).each(function() {
        var $parent = $(this).parent(), relatedTarget = {
            relatedTarget: $(this)
        };
        $parent.hasClass("open") && $parent.removeClass("open").trigger("hidden.dropdown", relatedTarget);
    });
}

function setDate(date, str) {
    date && (objCal.value = date), $(objCal).removeClass(activeClass).focus(), closeCal();
}

function getAbsTop(obj) {
    return null == obj.offsetParent ? 0 : obj.offsetTop + getAbsTop(obj.offsetParent);
}

function getAbsLeft(obj) {
    return null == obj.offsetParent ? 0 : obj.offsetLeft + getAbsLeft(obj.offsetParent);
}

function findPos(obj) {
    var curLeft = curTop = 0;
    if (obj.offsetParent) for (;curLeft += obj.offsetLeft, curTop += obj.offsetTop,
                                    obj = obj.offsetParent; ) ;
    return {
        left: curLeft,
        top: curTop
    };
}

function addWidget() {
    if (0 === $("body").find("#lWidget").length) {
        '<iframe id="wWidget" name="wWidget" src="about:blank" title="달력"></iframe>', "</div>",
            $("body").append('<div id="lWidget" style="position:absolute;z-index:1000;"><iframe id="wWidget" name="wWidget" src="about:blank" title="달력"></iframe></div>');
    }
}

function closeCal() {
    var elem = document.getElementById("lWidget");
    elem.parentNode.removeChild(elem);
}

function removeActiveClass(obj) {
    $("input[type='text']").not(obj).removeClass(activeClass);
}

Dropdown.prototype.toggle = function(e) {
    var $parent = $(this).parent(), options = $(this).data(), isActive = $parent.hasClass("open");
    if (dropdownClear(), options.position && !$parent.hasClass(options.position) && $parent.addClass(options.position),
    options.arrow && !$parent.hasClass("arrow") && $parent.addClass("arrow"), options.width) {
        var width_target = options.width_target;
        options.width_target || (width_target = "p-dropdown__list"), $parent.find("." + width_target).css("width", options.width);
    }
    if (!isActive) {
        if (e.isDefaultPrevented()) return;
        $parent.toggleClass("open");
    }
    return !1;
}, $(document).on("click.p-dropdown", dropdownClear).on("click.p-dropdown", toggle, Dropdown.prototype.toggle);

var activeClass = "obj-active";

function getCalendar(objName, syear, smonth, str) {
    if (objName) {
        var id, name;
        addWidget(), null != str && null != str && "undefined" != str || (str = "Widget"),
            id = "l" + str, name = "w" + str;
        var win = document.getElementsByName(name)[0];
        with (objCal = objName, document.getElementById(id)) {
            if (removeActiveClass(objName), $(objName).hasClass(activeClass)) return;
            var left = getAbsLeft(objName), top = getAbsTop(objName) + 30;
            win.width = "244", win.height = "320", win.style.width = "244px", win.style.height = "320px",
                $(document).ready(function() {
                    if (document.body.clientWidth < 460) {
                        var term = (document.body.clientWidth - win.width) / 2;
                        left = term;
                    }
                }), style.left = left + "px", style.top = top + "px", null != syear && syear != undefined && "undefined" != syear || (syear = ""),
            null != smonth && smonth != undefined && "undefined" != smonth || (smonth = ""),
                self.eval(name).location.replace("/common/calendar.html?syear=" + syear + "&smonth=" + smonth),
                $(objName).addClass(activeClass);
        }
    } else alert("getCalendar(document.bbsNttForm.start_date)와 같이 입력 필드 정보를 추가 하세요.");
}

if (function(factory, jQuery, Zepto) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery || Zepto);
}(function($) {
    "use strict";
    function Mask(el, mask, options) {
        var p = {
            invalid: [],
            getCaret: function() {
                try {
                    var sel, pos = 0, ctrl = el.get(0), dSel = document.selection, cSelStart = ctrl.selectionStart;
                    return dSel && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((sel = dSel.createRange()).moveStart("character", -p.val().length),
                        pos = sel.text.length) : !cSelStart && "0" !== cSelStart || (pos = cSelStart), pos;
                } catch (e) {console.log('error');}
            },
            setCaret: function(pos) {
                try {
                    if (el.is(":focus")) {
                        var range, ctrl = el.get(0);
                        ctrl.setSelectionRange ? ctrl.setSelectionRange(pos, pos) : ((range = ctrl.createTextRange()).collapse(!0),
                            range.moveEnd("character", pos), range.moveStart("character", pos), range.select());
                    }
                } catch (e) {console.log('error');}
            },
            events: function() {
                el.on("keydown.mask", function(e) {
                    el.data("mask-keycode", e.keyCode || e.which), el.data("mask-previus-value", el.val()),
                        el.data("mask-previus-caret-pos", p.getCaret()), p.maskDigitPosMapOld = p.maskDigitPosMap;
                }).on($.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", p.behaviour).on("paste.mask drop.mask", function() {
                    setTimeout(function() {
                        el.keydown().keyup();
                    }, 100);
                }).on("change.mask", function() {
                    el.data("changed", !0);
                }).on("blur.mask", function() {
                    oldValue === p.val() || el.data("changed") || el.trigger("change"), el.data("changed", !1);
                }).on("blur.mask", function() {
                    oldValue = p.val();
                }).on("focus.mask", function(e) {
                    !0 === options.selectOnFocus && $(e.target).select();
                }).on("focusout.mask", function() {
                    options.clearIfNotMatch && !regexMask.test(p.val()) && p.val("");
                });
            },
            getRegexMask: function() {
                for (var translation, pattern, optional, recursive, oRecursive, r, maskChunks = [], i = 0; i < mask.length; i++) (translation = jMask.translation[mask.charAt(i)]) ? (pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, ""),
                    optional = translation.optional, (recursive = translation.recursive) ? (maskChunks.push(mask.charAt(i)),
                    oRecursive = {
                        digit: mask.charAt(i),
                        pattern: pattern
                    }) : maskChunks.push(optional || recursive ? pattern + "?" : pattern)) : maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                return r = maskChunks.join(""), oRecursive && (r = r.replace(new RegExp("(" + oRecursive.digit + "(.*" + oRecursive.digit + ")?)"), "($1)?").replace(new RegExp(oRecursive.digit, "g"), oRecursive.pattern)),
                    new RegExp(r);
            },
            destroyEvents: function() {
                el.off([ "input", "keydown", "keyup", "paste", "drop", "blur", "focusout", "" ].join(".mask "));
            },
            val: function(v) {
                var method = el.is("input") ? "val" : "text";
                return 0 < arguments.length ? (el[method]() !== v && el[method](v), el) : el[method]();
            },
            calculateCaretPosition: function() {
                var oldVal = el.data("mask-previus-value") || "", newVal = p.getMasked(), caretPosNew = p.getCaret();
                if (oldVal !== newVal) {
                    var caretPosOld = el.data("mask-previus-caret-pos") || 0, newValL = newVal.length, oldValL = oldVal.length, maskDigitsBeforeCaret = 0, maskDigitsAfterCaret = 0, maskDigitsBeforeCaretAll = 0, maskDigitsBeforeCaretAllOld = 0, i = 0;
                    for (i = caretPosNew; i < newValL && p.maskDigitPosMap[i]; i++) maskDigitsAfterCaret++;
                    for (i = caretPosNew - 1; 0 <= i && p.maskDigitPosMap[i]; i--) maskDigitsBeforeCaret++;
                    for (i = caretPosNew - 1; 0 <= i; i--) p.maskDigitPosMap[i] && maskDigitsBeforeCaretAll++;
                    for (i = caretPosOld - 1; 0 <= i; i--) p.maskDigitPosMapOld[i] && maskDigitsBeforeCaretAllOld++;
                    if (oldValL < caretPosNew) caretPosNew = 10 * newValL; else if (caretPosNew <= caretPosOld && caretPosOld !== oldValL) {
                        if (!p.maskDigitPosMapOld[caretPosNew]) {
                            var caretPos = caretPosNew;
                            caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll, caretPosNew -= maskDigitsBeforeCaret,
                            p.maskDigitPosMap[caretPosNew] && (caretPosNew = caretPos);
                        }
                    } else caretPosOld < caretPosNew && (caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld,
                        caretPosNew += maskDigitsAfterCaret);
                }
                return caretPosNew;
            },
            behaviour: function(e) {
                e = e || window.event, p.invalid = [];
                var keyCode = el.data("mask-keycode");
                if (-1 === $.inArray(keyCode, jMask.byPassKeys)) {
                    var newVal = p.getMasked(), caretPos = p.getCaret();
                    return setTimeout(function() {
                        p.setCaret(p.calculateCaretPosition());
                    }, $.jMaskGlobals.keyStrokeCompensation), p.val(newVal), p.setCaret(caretPos), p.callbacks(e);
                }
            },
            getMasked: function(skipMaskChars, val) {
                var lastMaskChar, check, lastUntranslatedMaskChar, buf = [], value = void 0 === val ? p.val() : val + "", m = 0, maskLen = mask.length, v = 0, valLen = value.length, offset = 1, addMethod = "push", resetPos = -1, maskDigitCount = 0, maskDigitPosArr = [];
                for (check = options.reverse ? (addMethod = "unshift", offset = -1, lastMaskChar = 0,
                    m = maskLen - 1, v = valLen - 1, function() {
                    return -1 < m && -1 < v;
                }) : (lastMaskChar = maskLen - 1, function() {
                    return m < maskLen && v < valLen;
                }); check(); ) {
                    var maskDigit = mask.charAt(m), valDigit = value.charAt(v), translation = jMask.translation[maskDigit];
                    translation ? (valDigit.match(translation.pattern) ? (buf[addMethod](valDigit),
                    translation.recursive && (-1 === resetPos ? resetPos = m : m === lastMaskChar && m !== resetPos && (m = resetPos - offset),
                    lastMaskChar === resetPos && (m -= offset)), m += offset) : valDigit === lastUntranslatedMaskChar ? (maskDigitCount--,
                        lastUntranslatedMaskChar = void 0) : translation.optional ? (m += offset, v -= offset) : translation.fallback ? (buf[addMethod](translation.fallback),
                        m += offset, v -= offset) : p.invalid.push({
                        p: v,
                        v: valDigit,
                        e: translation.pattern
                    }), v += offset) : (skipMaskChars || buf[addMethod](maskDigit), valDigit === maskDigit ? (maskDigitPosArr.push(v),
                        v += offset) : (lastUntranslatedMaskChar = maskDigit, maskDigitPosArr.push(v + maskDigitCount),
                        maskDigitCount++), m += offset);
                }
                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                maskLen !== valLen + 1 || jMask.translation[lastMaskCharDigit] || buf.push(lastMaskCharDigit);
                var newVal = buf.join("");
                return p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen), newVal;
            },
            mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
                var maskDiff = options.reverse ? newVal.length - valLen : 0;
                p.maskDigitPosMap = {};
                for (var i = 0; i < maskDigitPosArr.length; i++) p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
            },
            callbacks: function(e) {
                function callback(name, criteria, args) {
                    "function" == typeof options[name] && criteria && options[name].apply(this, args);
                }
                var val = p.val(), changed = val !== oldValue, defaultArgs = [ val, e, el, options ];
                callback("onChange", !0 == changed, defaultArgs), callback("onKeyPress", !0 == changed, defaultArgs),
                    callback("onComplete", val.length === mask.length, defaultArgs), callback("onInvalid", 0 < p.invalid.length, [ val, e, el, p.invalid, options ]);
            }
        };
        el = $(el);
        var regexMask, jMask = this, oldValue = p.val();
        mask = "function" == typeof mask ? mask(p.val(), void 0, el, options) : mask, jMask.mask = mask,
            jMask.options = options, jMask.remove = function() {
            var caret = p.getCaret();
            return jMask.options.placeholder && el.removeAttr("placeholder"), el.data("mask-maxlength") && el.removeAttr("maxlength"),
                p.destroyEvents(), p.val(jMask.getCleanVal()), p.setCaret(caret), el;
        }, jMask.getCleanVal = function() {
            return p.getMasked(!0);
        }, jMask.getMaskedVal = function(val) {
            return p.getMasked(!1, val);
        }, jMask.init = function(onlyMask) {
            if (onlyMask = onlyMask || !1, options = options || {}, jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch,
                jMask.byPassKeys = $.jMaskGlobals.byPassKeys, jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation),
                jMask = $.extend(!0, {}, jMask, options), regexMask = p.getRegexMask(), onlyMask) p.events(),
                p.val(p.getMasked()); else {
                options.placeholder && el.attr("placeholder", options.placeholder), el.data("mask") && el.attr("autocomplete", "off");
                for (var i = 0, maxlength = !0; i < mask.length; i++) {
                    var translation = jMask.translation[mask.charAt(i)];
                    if (translation && translation.recursive) {
                        maxlength = !1;
                        break;
                    }
                }
                maxlength && el.attr("maxlength", mask.length).data("mask-maxlength", !0), p.destroyEvents(),
                    p.events();
                var caret = p.getCaret();
                p.val(p.getMasked()), p.setCaret(caret);
            }
        }, jMask.init(!el.is("input"));
    }
    $.maskWatchers = {};
    function HTMLAttributes() {
        var input = $(this), options = {}, mask = input.attr("data-mask");
        if (input.attr("data-mask-reverse") && (options.reverse = !0), input.attr("data-mask-clearifnotmatch") && (options.clearIfNotMatch = !0),
        "true" === input.attr("data-mask-selectonfocus") && (options.selectOnFocus = !0),
            notSameMaskObject(input, mask, options)) return input.data("mask", new Mask(this, mask, options));
    }
    var notSameMaskObject = function(field, mask, options) {
        options = options || {};
        var maskObject = $(field).data("mask"), stringify = JSON.stringify, value = $(field).val() || $(field).text();
        try {
            return "function" == typeof mask && (mask = mask(value)), "object" != typeof maskObject || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
        } catch (e) {console.log('error');}
    };
    $.fn.mask = function(mask, options) {
        options = options || {};
        function maskFunction() {
            if (notSameMaskObject(this, mask, options)) return $(this).data("mask", new Mask(this, mask, options));
        }
        var selector = this.selector, globals = $.jMaskGlobals, interval = globals.watchInterval, watchInputs = options.watchInputs || globals.watchInputs;
        return $(this).each(maskFunction), selector && "" !== selector && watchInputs && (clearInterval($.maskWatchers[selector]),
            $.maskWatchers[selector] = setInterval(function() {
                $(document).find(selector).each(maskFunction);
            }, interval)), this;
    }, $.fn.masked = function(val) {
        return this.data("mask").getMaskedVal(val);
    }, $.fn.unmask = function() {
        return clearInterval($.maskWatchers[this.selector]), delete $.maskWatchers[this.selector],
            this.each(function() {
                var dataMask = $(this).data("mask");
                dataMask && dataMask.remove().removeData("mask");
            });
    }, $.fn.cleanVal = function() {
        return this.data("mask").getCleanVal();
    }, $.applyDataMask = function(selector) {
        ((selector = selector || $.jMaskGlobals.maskElements) instanceof $ ? selector : $(selector)).filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };
    var eventName, isSupported, el, globals = {
        maskElements: "input,td,span,div,time,em",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        keyStrokeCompensation: 10,
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && (eventName = "input",
            el = document.createElement("div"), (isSupported = (eventName = "on" + eventName) in el) || (el.setAttribute(eventName, "return;"),
            isSupported = "function" == typeof el[eventName]), el = null, isSupported),
        watchDataMask: !1,
        byPassKeys: [ 9, 16, 17, 18, 36, 37, 38, 39, 40, 91 ],
        translation: {
            0: {
                pattern: /\d/
            },
            9: {
                pattern: /\d/,
                optional: !0
            },
            "#": {
                pattern: /\d/,
                recursive: !0
            },
            A: {
                pattern: /[a-zA-Z0-9]/
            },
            S: {
                pattern: /[a-zA-Z]/
            }
        }
    };
    $.jMaskGlobals = $.jMaskGlobals || {}, (globals = $.jMaskGlobals = $.extend(!0, {}, globals, $.jMaskGlobals)).dataMask && $.applyDataMask(),
        setInterval(function() {
            $.jMaskGlobals.watchDataMask && $.applyDataMask();
        }, globals.watchInterval);
}, window.jQuery, window.Zepto), function(e, t, n) {
    function o(e, t) {
        return typeof e === t;
    }
    function s(argument_0) {
        return "function" != typeof t.createElement ? t.createElement(argument_0) : x ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", argument_0) : t.createElement.apply(t, arguments);
    }
    function i(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function l(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase();
        }).replace(/^-/, "");
    }
    function c(e, t) {
        return function() {
            return e.apply(t, arguments);
        };
    }
    function d(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase();
        }).replace(/^ms-/, "-ms-");
    }
    function p(t, n, o) {
        var a;
        if ("getComputedStyle" in e) {
            a = getComputedStyle.call(e, t, n);
            var r = e.console;
            if (null !== a) o && (a = a.getPropertyValue(o)); else if (r) {
                r[r.error ? "error" : "log"].call(r, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
            }
        } else a = !n && t.currentStyle && t.currentStyle[o];
        return a;
    }
    function y(e, n, o, a) {
        var r, i, l, c, u = "modernizr", d = s("div"), p = function() {
            var e = t.body;
            return e || ((e = s(x ? "svg" : "body")).fake = !0), e;
        }();
        if (parseInt(o, 10)) for (;o--; ) (l = s("div")).id = a ? a[o] : u + (o + 1), d.appendChild(l);
        return (r = s("style")).type = "text/css", r.id = "s" + u, (p.fake ? p : d).appendChild(r),
            p.appendChild(d), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(t.createTextNode(e)),
            d.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = b.style.overflow,
            b.style.overflow = "hidden", b.appendChild(p)), i = n(d, e), p.fake ? (p.parentNode.removeChild(p),
            b.style.overflow = c, b.offsetHeight) : d.parentNode.removeChild(d), !!i;
    }
    function m(t, o) {
        var a = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (;a--; ) if (e.CSS.supports(d(t[a]), o)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in e) {
            for (var r = []; a--; ) r.push("(" + d(t[a]) + ":" + o + ")");
            return y("@supports (" + (r = r.join(" or ")) + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == p(e, null, "position");
            });
        }
        return n;
    }
    function v(e, t, a, r) {
        function c() {
            d && (delete z.style, delete z.modElem);
        }
        if (r = !o(r, "undefined") && r, !o(a, "undefined")) {
            var u = m(e, a);
            if (!o(u, "undefined")) return u;
        }
        for (var d, p, f, y, v, g = [ "modernizr", "tspan", "samp" ]; !z.style && g.length; ) d = !0,
            z.modElem = s(g.shift()), z.style = z.modElem.style;
        for (f = e.length, p = 0; p < f; p++) if (y = e[p], v = z.style[y], i(y, "-") && (y = l(y)),
        z.style[y] !== n) {
            if (r || o(a, "undefined")) return c(), "pfx" != t || y;
            try {
                z.style[y] = a;
            } catch (h){console.log('error');}
            if (z.style[y] != v) return c(), "pfx" != t || y;
        }
        return c(), !1;
    }
    function g(e, t, n, a, r) {
        var s = e.charAt(0).toUpperCase() + e.slice(1), i = (e + " " + $.join(s + " ") + s).split(" ");
        return o(t, "string") || o(t, "undefined") ? v(i, t, a, r) : function(e, t, n) {
            var a;
            for (var r in e) if (e[r] in t) return !1 === n ? e[r] : o(a = t[e[r]], "function") ? c(a, n || t) : a;
            return !1;
        }(i = (e + " " + k.join(s + " ") + s).split(" "), t, n);
    }
    function h(e, t, o) {
        return g(e, n, n, t, o);
    }
    var w = [], C = [], T = {
        _version: "3.6.0",
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        _q: [],
        on: function(e, t) {
            var n = this;
            setTimeout(function() {
                t(n[e]);
            }, 0);
        },
        addTest: function(e, t, n) {
            C.push({
                name: e,
                fn: t,
                options: n
            });
        },
        addAsyncTest: function(e) {
            C.push({
                name: null,
                fn: e
            });
        }
    }, Modernizr = function() {};
    Modernizr.prototype = T, (Modernizr = new Modernizr()).addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
    var b = t.documentElement, x = "svg" === b.nodeName.toLowerCase();
    Modernizr.addTest("audio", function() {
        var e = s("audio"), t = !1;
        try {
            (t = !!e.canPlayType) && ((t = new Boolean(t)).ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""),
                t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (n){console.log('error');}
        return t;
    }), Modernizr.addTest("canvas", function() {
        var e = s("canvas");
        return !(!e.getContext || !e.getContext("2d"));
    }), Modernizr.addTest("video", function() {
        var e = s("video"), t = !1;
        try {
            (t = !!e.canPlayType) && ((t = new Boolean(t)).ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
                t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""),
                t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""));
        } catch (n){console.log('error');}
        return t;
    });
    var P = s("input"), S = "search tel url email datetime date month week time datetime-local number range color".split(" "), _ = {};
    Modernizr.inputtypes = function(e) {
        for (var o, a, r, s = e.length, l = 0; l < s; l++) P.setAttribute("type", o = e[l]),
        (r = "text" !== P.type && "style" in P) && (P.value = "1)", P.style.cssText = "position:absolute;visibility:hidden;",
            /^range$/.test(o) && P.style.WebkitAppearance !== n ? (b.appendChild(P), r = (a = t.defaultView).getComputedStyle && "textfield" !== a.getComputedStyle(P, null).WebkitAppearance && 0 !== P.offsetHeight,
                b.removeChild(P)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? P.checkValidity && !1 === P.checkValidity() : "1)" != P.value)),
            _[e[l]] = !!r;
        return _;
    }(S);
    var E = "Moz O ms Webkit", $ = T._config.usePrefixes ? E.split(" ") : [];
    T._cssomPrefixes = $;
    var k = T._config.usePrefixes ? E.toLowerCase().split(" ") : [];
    T._domPrefixes = k;
    var N = {
        elem: s("modernizr")
    };
    Modernizr._q.push(function() {
        delete N.elem;
    });
    var z = {
        style: N.elem.style
    };
    Modernizr._q.unshift(function() {
        delete z.style;
    }), T.testAllProps = g, T.testAllProps = h, Modernizr.addTest("cssgridlegacy", h("grid-columns", "10px", !0)),
        Modernizr.addTest("cssgrid", h("grid-template-rows", "none", !0)), Modernizr.addTest("flexbox", h("flexBasis", "1px", !0)),
        function() {
            var e, t, n, a, r, i;
            for (var l in C) if (C.hasOwnProperty(l)) {
                if (e = [], (t = C[l]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (a = o(t.fn, "function") ? t.fn() : t.fn, r = 0; r < e.length; r++) 1 === (i = e[r].split(".")).length ? Modernizr[i[0]] = a : (!Modernizr[i[0]] || Modernizr[i[0]] instanceof Boolean || (Modernizr[i[0]] = new Boolean(Modernizr[i[0]])),
                    Modernizr[i[0]][i[1]] = a), w.push((a ? "" : "no-") + i.join("-"));
            }
        }(), function(e) {
        var t = b.className, n = Modernizr._config.classPrefix || "";
        if (x && (t = t.baseVal), Modernizr._config.enableJSClass) {
            var o = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(o, "$1" + n + "js$2");
        }
        Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), x ? b.className.baseVal = t : b.className = t);
    }(w), delete T.addTest, delete T.addAsyncTest;
    for (var A = 0; A < Modernizr._q.length; A++) Modernizr._q[A]();
    e.Modernizr = Modernizr;
}(window, document),
    /**
     * @preserve
     * Datepicker for Bootstrap
     * version : 1.8.0
     * https://github.com/eternicode/bootstrap-datepicker
     * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
     */
    function(factory) {
        "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "object" == typeof exports ? factory(require("jquery")) : factory(jQuery);
    }(function($, undefined) {
        function UTCDate() {
            return new Date(Date.UTC.apply(Date, arguments));
        }
        function UTCToday() {
            var today = new Date();
            return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
        }
        function isUTCEquals(date1, date2) {
            return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
        }
        function alias(method, deprecationMsg) {
            return function() {
                return deprecationMsg !== undefined && $.fn.datepicker.deprecated(deprecationMsg),
                    this[method].apply(this, arguments);
            };
        }
        function Datepicker(element, options) {
            $.data(element, "datepicker", this), this._process_options(options), this.dates = new DateArray(),
                this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = $(element),
                this.button = $(element).find("button"), this.isInput = this.element.is("input"),
                this.inputField = this.isInput ? this.element : this.element.closest(".p-date").find("input"),
                this.component = !!this.element.hasClass("p-date__icon") && this.element, this.button.length && (this.component = !!this.button.hasClass("p-date__icon") && this.button),
            this.component && 0 === this.component.length && (this.component = !1), this.isInline = !this.component && this.element.is("div"),
                this.picker = $(DPGlobal.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow),
            this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow),
                this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("p-datepicker-inline").appendTo(this.element) : this.picker.addClass("p-datepicker__dropdown dropdown-menu"),
            this.o.rtl && this.picker.addClass("p-datepicker-rtl"), this._process_options({
                startDate: this._o.startDate,
                endDate: this._o.endDate,
                daysOfWeekDisabled: this.o.daysOfWeekDisabled,
                daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
                datesDisabled: this.o.datesDisabled
            }), this._allow_update = !1, this.setViewMode(this.o.startView), this._allow_update = !0,
                this.fillDow(), this.fillMonths(), this.update(), this.isInline && this.show();
        }
        var extras, DateArray = (extras = {
            get: function(i) {
                return this.slice(i)[0];
            },
            contains: function(d) {
                for (var val = d && d.valueOf(), i = 0, l = this.length; i < l; i++) if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 864e5) return i;
                return -1;
            },
            remove: function(i) {
                this.splice(i, 1);
            },
            replace: function(new_array) {
                new_array && ($.isArray(new_array) || (new_array = [ new_array ]), this.clear(),
                    this.push.apply(this, new_array));
            },
            clear: function() {
                this.length = 0;
            },
            copy: function() {
                var a = new DateArray();
                return a.replace(this), a;
            }
        }, function() {
            var a = [];
            return a.push.apply(a, arguments), $.extend(a, extras), a;
        });
        Datepicker.prototype = {
            constructor: Datepicker,
            _resolveViewName: function(view) {
                return $.each(DPGlobal.viewModes, function(i, viewMode) {
                    if (view === i || -1 !== $.inArray(view, viewMode.names)) return view = i, !1;
                }), view;
            },
            _resolveDaysOfWeek: function(daysOfWeek) {
                return $.isArray(daysOfWeek) || (daysOfWeek = daysOfWeek.split(/[,\s]*/)), $.map(daysOfWeek, Number);
            },
            _check_template: function(tmp) {
                try {
                    return tmp !== undefined && "" !== tmp && ((tmp.match(/[<>]/g) || []).length <= 0 || 0 < $(tmp).length);
                } catch (ex) {
                    return !1;
                }
            },
            _process_options: function(opts) {
                this._o = $.extend({}, this._o, opts);
                var o = this.o = $.extend({}, this._o), lang = o.language;
                dates[lang] || (lang = lang.split("-")[0], dates[lang] || (lang = defaults.language)),
                    o.language = lang, o.startView = this._resolveViewName(o.startView), o.minViewMode = this._resolveViewName(o.minViewMode),
                    o.maxViewMode = this._resolveViewName(o.maxViewMode), o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView)),
                !0 !== o.multidate && (o.multidate = Number(o.multidate) || !1, !1 !== o.multidate && (o.multidate = Math.max(0, o.multidate))),
                    o.multidateSeparator = String(o.multidateSeparator), o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
                var format = DPGlobal.parseFormat(o.format);
                o.startDate !== -1 / 0 && (o.startDate ? o.startDate instanceof Date ? o.startDate = this._local_to_utc(this._zero_time(o.startDate)) : o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear) : o.startDate = -1 / 0),
                o.endDate !== 1 / 0 && (o.endDate ? o.endDate instanceof Date ? o.endDate = this._local_to_utc(this._zero_time(o.endDate)) : o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear) : o.endDate = 1 / 0),
                    o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled || []), o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted || []),
                    o.datesDisabled = o.datesDisabled || [], $.isArray(o.datesDisabled) || (o.datesDisabled = o.datesDisabled.split(",")),
                    o.datesDisabled = $.map(o.datesDisabled, function(d) {
                        return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
                    });
                var plc = String(o.orientation).toLowerCase().split(/\s+/g), _plc = o.orientation.toLowerCase();
                if (plc = $.grep(plc, function(word) {
                    return /^auto|left|right|top|bottom$/.test(word);
                }), o.orientation = {
                    x: "auto",
                    y: "auto"
                }, _plc && "auto" !== _plc) if (1 === plc.length) switch (plc[0]) {
                    case "top":
                    case "bottom":
                        o.orientation.y = plc[0];
                        break;

                    case "left":
                    case "right":
                        o.orientation.x = plc[0];
                } else _plc = $.grep(plc, function(word) {
                    return /^left|right$/.test(word);
                }), o.orientation.x = _plc[0] || "auto", _plc = $.grep(plc, function(word) {
                    return /^top|bottom$/.test(word);
                }), o.orientation.y = _plc[0] || "auto"; else ;
                if (o.defaultViewDate instanceof Date || "string" == typeof o.defaultViewDate) o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear); else if (o.defaultViewDate) {
                    var year = o.defaultViewDate.year || new Date().getFullYear(), month = o.defaultViewDate.month || 0, day = o.defaultViewDate.day || 1;
                    o.defaultViewDate = UTCDate(year, month, day);
                } else o.defaultViewDate = UTCToday();
            },
            _events: [],
            _secondaryEvents: [],
            _applyEvents: function(evs) {
                for (var el, ch, ev, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined,
                    ev = evs[i][1]) : 3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.on(ev, ch);
            },
            _unapplyEvents: function(evs) {
                for (var el, ev, ch, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined,
                    ev = evs[i][1]) : 3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.off(ev, ch);
            },
            _buildEvents: function() {
                var events = {
                    keyup: $.proxy(function(e) {
                        -1 === $.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                    }, this),
                    keydown: $.proxy(this.keydown, this),
                    paste: $.proxy(this.paste, this)
                };
                !0 === this.o.showOnFocus && (events.focus = $.proxy(this.show, this)), this.isInput ? this._events = [ [ this.element, events ] ] : this.component && this.inputField.length ? this._events = [ [ this.inputField, events ], [ this.component, {
                    click: $.proxy(this.show, this)
                } ] ] : this._events = [ [ this.element, {
                    click: $.proxy(this.show, this),
                    keydown: $.proxy(this.keydown, this)
                } ] ], this._events.push([ this.element, "*", {
                    blur: $.proxy(function(e) {
                        this._focused_from = e.target;
                    }, this)
                } ], [ this.element, {
                    blur: $.proxy(function(e) {
                        this._focused_from = e.target;
                    }, this)
                } ]), this.o.immediateUpdates && this._events.push([ this.element, {
                    "changeYear changeMonth": $.proxy(function(e) {
                        this.update(e.date);
                    }, this)
                } ]), this._secondaryEvents = [ [ this.picker, {
                    click: $.proxy(this.click, this)
                } ], [ this.picker, ".prev, .next", {
                    click: $.proxy(this.navArrowsClick, this)
                } ], [ this.picker, ".day:not(.disabled)", {
                    click: $.proxy(this.dayCellClick, this)
                } ], [ $(window), {
                    resize: $.proxy(function() {
                        this.hide();
                    }, this)
                } ], [ $(document), {
                    "mousedown touchstart": $.proxy(function(e) {
                        this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline || this.hide();
                    }, this)
                } ] ];
            },
            _attachEvents: function() {
                this._detachEvents(), this._applyEvents(this._events);
            },
            _detachEvents: function() {
                this._unapplyEvents(this._events);
            },
            _attachSecondaryEvents: function() {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
            },
            _detachSecondaryEvents: function() {
                this._unapplyEvents(this._secondaryEvents);
            },
            _trigger: function(event, altdate) {
                var date = altdate || this.dates.get(-1), local_date = this._utc_to_local(date);
                this.element.trigger({
                    type: event,
                    date: local_date,
                    viewMode: this.viewMode,
                    dates: $.map(this.dates, this._utc_to_local),
                    format: $.proxy(function(ix, format) {
                        0 === arguments.length ? (ix = this.dates.length - 1, format = this.o.format) : "string" == typeof ix && (format = ix,
                            ix = this.dates.length - 1), format = format || this.o.format;
                        var date = this.dates.get(ix);
                        return DPGlobal.formatDate(date, format, this.o.language);
                    }, this)
                });
            },
            show: function(e) {
                if (!(this.inputField.prop("disabled") || this.inputField.prop("readonly") && !1 === this.o.enableOnReadonly)) return this.isInline || this.picker.appendTo(this.o.container),
                    this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"),
                (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && $(this.element).blur(),
                this.isInline || this.picker.find(".p-datepicker-" + DPGlobal.viewModes[this.viewMode].clsName + " .p-datepicker-switch").focus(),
                    this;
            },
            hide: function() {
                return this.isInline || !this.picker.is(":visible") || (this.focusDate = null, this.picker.hide().detach(),
                    this._detachSecondaryEvents(), this.setViewMode(this.o.startView), this.o.forceParse && this.inputField.val() && this.setValue(),
                    this._trigger("hide"), this.picker.hide()), this;
            },
            destroy: function() {
                return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(),
                    delete this.element.data().datepicker, this.isInput || delete this.element.data().date,
                    this;
            },
            paste: function(e) {
                var dateString;
                if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && -1 !== $.inArray("text/plain", e.originalEvent.clipboardData.types)) dateString = e.originalEvent.clipboardData.getData("text/plain"); else {
                    if (!window.clipboardData) return;
                    dateString = window.clipboardData.getData("Text");
                }
                this.setDate(dateString), this.update(), e.preventDefault();
            },
            _utc_to_local: function(utc) {
                if (!utc) return utc;
                var local = new Date(utc.getTime() + 6e4 * utc.getTimezoneOffset());
                return local.getTimezoneOffset() !== utc.getTimezoneOffset() && (local = new Date(utc.getTime() + 6e4 * local.getTimezoneOffset())),
                    local;
            },
            _local_to_utc: function(local) {
                return local && new Date(local.getTime() - 6e4 * local.getTimezoneOffset());
            },
            _zero_time: function(local) {
                return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
            },
            _zero_utc_time: function(utc) {
                return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
            },
            getDates: function() {
                return $.map(this.dates, this._utc_to_local);
            },
            getUTCDates: function() {
                return $.map(this.dates, function(d) {
                    return new Date(d);
                });
            },
            getDate: function() {
                return this._utc_to_local(this.getUTCDate());
            },
            getUTCDate: function() {
                var selected_date = this.dates.get(-1);
                return selected_date !== undefined ? new Date(selected_date) : null;
            },
            clearDates: function() {
                this.inputField.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
            },
            setDates: function() {
                var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, args), this._trigger("changeDate"), this.setValue(),
                    this;
            },
            setUTCDates: function() {
                var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.setDates.apply(this, $.map(args, this._utc_to_local)), this;
            },
            setDate: alias("setDates"),
            setUTCDate: alias("setUTCDates"),
            remove: alias("destroy", "Method `remove` 는 사용되지 않습니다. 대신 `destroy` 사용"),
            setValue: function() {
                var formatted = this.getFormattedDate();
                return this.inputField.val(formatted), this;
            },
            getFormattedDate: function(format) {
                format === undefined && (format = this.o.format);
                var lang = this.o.language;
                return $.map(this.dates, function(d) {
                    return DPGlobal.formatDate(d, format, lang);
                }).join(this.o.multidateSeparator);
            },
            getStartDate: function() {
                return this.o.startDate;
            },
            setStartDate: function(startDate) {
                return this._process_options({
                    startDate: startDate
                }), this.update(), this.updateNavArrows(), this;
            },
            getEndDate: function() {
                return this.o.endDate;
            },
            setEndDate: function(endDate) {
                return this._process_options({
                    endDate: endDate
                }), this.update(), this.updateNavArrows(), this;
            },
            setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
                return this._process_options({
                    daysOfWeekDisabled: daysOfWeekDisabled
                }), this.update(), this;
            },
            setDaysOfWeekHighlighted: function(daysOfWeekHighlighted) {
                return this._process_options({
                    daysOfWeekHighlighted: daysOfWeekHighlighted
                }), this.update(), this;
            },
            setDatesDisabled: function(datesDisabled) {
                return this._process_options({
                    datesDisabled: datesDisabled
                }), this.update(), this;
            },
            place: function() {
                if (this.isInline) return this;
                var calendarWidth = this.picker.outerWidth(), calendarHeight = this.picker.outerHeight(), container = $(this.o.container), windowWidth = container.width(), scrollTop = "body" === this.o.container ? $(document).scrollTop() : container.scrollTop(), appendOffset = container.offset(), parentsZindex = [ 0 ];
                this.element.parents().each(function() {
                    var itemZIndex = $(this).css("z-index");
                    "auto" !== itemZIndex && 0 !== Number(itemZIndex) && parentsZindex.push(Number(itemZIndex));
                });
                var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset, offset = this.component ? this.component.parent().offset() : this.element.offset(), height = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), width = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), left = offset.left - appendOffset.left, top = offset.top - appendOffset.top;
                "body" !== this.o.container && (top += scrollTop), this.picker.removeClass("p-datepicker-orient-top p-datepicker-orient-bottom p-datepicker-orient-right p-datepicker-orient-left"),
                    "auto" !== this.o.orientation.x ? (this.picker.addClass("p-datepicker-orient-" + this.o.orientation.x),
                    "right" === this.o.orientation.x && (left -= calendarWidth - width)) : offset.left < 0 ? (this.picker.addClass("p-datepicker-orient-left"),
                        left -= offset.left - 10) : windowWidth < left + calendarWidth ? (this.picker.addClass("p-datepicker-orient-right"),
                        left += width - calendarWidth) : this.o.rtl ? this.picker.addClass("p-datepicker-orient-right") : this.picker.addClass("p-datepicker-orient-left");
                var yorient = this.o.orientation.y;
                if ("auto" === yorient && (yorient = -scrollTop + top - calendarHeight < 0 ? "bottom" : "top"),
                    this.picker.addClass("p-datepicker-orient-" + yorient), "top" === yorient ? top -= calendarHeight + parseInt(this.picker.css("padding-top")) : top += height,
                $(window).width() < 640 && left < -offset.left && (top -= 3, left = -(offset.left - 10)),
                    this.o.rtl) {
                    var right = windowWidth - (left + width);
                    this.picker.css({
                        top: top,
                        right: right,
                        zIndex: zIndex
                    });
                } else this.picker.css({
                    top: top,
                    left: left,
                    zIndex: zIndex
                });
                return this;
            },
            _allow_update: !0,
            update: function() {
                if (!this._allow_update) return this;
                var oldDates = this.dates.copy(), dates = [], fromArgs = !1;
                return arguments.length ? ($.each(arguments, $.proxy(function(i, date) {
                    date instanceof Date && (date = this._local_to_utc(date)), dates.push(date);
                }, this)), fromArgs = !0) : (dates = (dates = this.isInput ? this.element.val() : this.inputField.val() || this.element.data("date")) && this.o.multidate ? dates.split(this.o.multidateSeparator) : [ dates ],
                    delete this.element.data().date), dates = $.map(dates, $.proxy(function(date) {
                    return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
                }, this)), dates = $.grep(dates, $.proxy(function(date) {
                    return !this.dateWithinRange(date) || !date;
                }, this), !0), this.dates.replace(dates), this.o.updateViewDate && (this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate),
                    fromArgs ? (this.setValue(), this.element.change()) : this.dates.length && String(oldDates) !== String(this.dates) && fromArgs && (this._trigger("changeDate"),
                        this.element.change()), !this.dates.length && oldDates.length && (this._trigger("clearDate"),
                    this.element.change()), this.fill(), this;
            },
            fillDow: function() {
                if (this.o.showWeekDays) {
                    var dowCnt = this.o.weekStart, html = "<tr>";
                    for (this.o.calendarWeeks && (html += '<th class="cw">&#160;</th>'); dowCnt < this.o.weekStart + 7; ) html += '<th class="dow',
                    -1 !== $.inArray(dowCnt, this.o.daysOfWeekDisabled) && (html += " disabled"), html += '">' + dates[this.o.language].daysMin[dowCnt++ % 7] + "</th>";
                    html += "</tr>", this.picker.find(".p-datepicker-days thead").append(html);
                }
            },
            fillMonths: function() {
                for (var localDate = this._utc_to_local(this.viewDate), html = "", i = 0; i < 12; i++) html += '<button  type="button" class="month' + (localDate && localDate.getMonth() === i ? " focused" : "") + '">' + dates[this.o.language].monthsShort[i] + "</button>";
                this.picker.find(".p-datepicker-months .table-condensed").html(html);
            },
            setRange: function(range) {
                range && range.length ? this.range = $.map(range, function(d) {
                    return d.valueOf();
                }) : delete this.range, this.fill();
            },
            getClassNames: function(date) {
                var cls = [], year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), today = UTCToday();
                return date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month ? cls.push("old") : (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) && cls.push("new"),
                this.focusDate && date.valueOf() === this.focusDate.valueOf() && cls.push("focused"),
                this.o.todayHighlight && isUTCEquals(date, today) && cls.push("today"), -1 !== this.dates.contains(date) && cls.push("active"),
                this.dateWithinRange(date) || cls.push("disabled"), this.dateIsDisabled(date) && cls.push("disabled", "disabled-date"),
                -1 !== $.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) && cls.push("highlighted"),
                this.range && (date > this.range[0] && date < this.range[this.range.length - 1] && cls.push("range"),
                -1 !== $.inArray(date.valueOf(), this.range) && cls.push("selected"), date.valueOf() === this.range[0] && cls.push("range-start"),
                date.valueOf() === this.range[this.range.length - 1] && cls.push("selected range-end")),
                    cls;
            },
            _fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn) {
                for (var classes, tooltip, before, html = "", step = factor / 10, view = this.picker.find(selector), startVal = Math.floor(year / factor) * factor, endVal = startVal + 9 * step, focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step, selected = $.map(this.dates, function(d) {
                    return Math.floor(d.getUTCFullYear() / step) * step;
                }), currVal = startVal - step; currVal <= endVal + step; currVal += step) classes = [ cssClass ],
                    tooltip = null, currVal === startVal - step ? classes.push("old") : currVal === endVal + step && classes.push("new"),
                -1 !== $.inArray(currVal, selected) && classes.push("active"), (currVal < startYear || endYear < currVal) && classes.push("disabled"),
                currVal === focusedVal && classes.push("focused"), beforeFn !== $.noop && ((before = beforeFn(new Date(currVal, 0, 1))) === undefined ? before = {} : "boolean" == typeof before ? before = {
                    enabled: before
                } : "string" == typeof before && (before = {
                    classes: before
                }), !1 === before.enabled && classes.push("disabled"), before.classes && (classes = classes.concat(before.classes.split(/\s+/))),
                before.tooltip && (tooltip = before.tooltip)), html += '<button type="button" class="' + classes.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ">" + currVal + "</button>";
                var titleText = "이동 없음";
                100 == step ? (view.find(".p-datepicker-switch").text(startVal + dates[this.o.language].yearCentury + " - " + endVal + dates[this.o.language].yearCentury).attr("title", titleText),
                    view.find(".prev").html(dates[this.o.language].centuriesLeftArrow).end().find(".next").html(dates[this.o.language].centuriesRightArrow).end()) : 10 == step ? (3 < this.o.maxViewMode && (titleText = "100년단위 연도 선택 이동"),
                    view.find(".p-datepicker-switch").text(startVal + dates[this.o.language].yearCentury + " - " + endVal + dates[this.o.language].yearCentury).attr("title", titleText),
                    view.find(".prev").html(dates[this.o.language].decadesLeftArrow).end().find(".next").html(dates[this.o.language].decadesRightArrow).end()) : (2 < this.o.maxViewMode && (titleText = "10년단위 연도 선택 이동"),
                    view.find(".p-datepicker-switch").text(startVal + dates[this.o.language].year + " - " + endVal + dates[this.o.language].year).attr("title", titleText),
                    view.find(".prev").html(dates[this.o.language].yearLeftArrow).end().find(".next").html(dates[this.o.language].yearRightArrow).end()),
                    view.find(".table-condensed").html(html);
            },
            fill: function() {
                var tooltip, before, d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, startMonth = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, endYear = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, endMonth = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, todaytxt = dates[this.o.language].today || dates.en.today || "", cleartxt = dates[this.o.language].clear || dates.en.clear || "", closetxt = dates[this.o.language].close || dates.en.close || "", titleFormat = dates[this.o.language].titleFormat || dates.en.titleFormat;
                if (!isNaN(year) && !isNaN(month)) {
                    this.picker.find(".p-datepicker-days .p-datepicker-switch").text(DPGlobal.formatDate(d, titleFormat, this.o.language)).attr("title", "월 선택 이동"),
                        this.picker.find(".p-datepicker-footer  .today").text(todaytxt).css("display", !0 === this.o.todayBtn || "linked" === this.o.todayBtn ? "inline-block" : "none"),
                        this.picker.find(".p-datepicker-footer .clear").text(cleartxt).css("display", !0 === this.o.clearBtn ? "inline-block" : "none"),
                        this.picker.find(".p-datepicker-footer .close").text(closetxt).css("display", !0 === this.o.closeBtn ? "inline-block" : "none"),
                        this.picker.find(".p-datepicker-title").text(this.o.title).css("display", "string" == typeof this.o.title && "" !== this.o.title ? "inline-block" : "none"),
                        this.updateNavArrows(), this.fillMonths();
                    var prevMonth = UTCDate(year, month, 0), day = prevMonth.getUTCDate();
                    prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
                    var nextMonth = new Date(prevMonth);
                    prevMonth.getUTCFullYear() < 100 && nextMonth.setUTCFullYear(prevMonth.getUTCFullYear()),
                        nextMonth.setUTCDate(nextMonth.getUTCDate() + 42), nextMonth = nextMonth.valueOf();
                    for (var weekDay, clsName, html = []; prevMonth.valueOf() < nextMonth; ) {
                        if ((weekDay = prevMonth.getUTCDay()) === this.o.weekStart && (html.push("<tr>"),
                            this.o.calendarWeeks)) {
                            var ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5), th = new Date(Number(ws) + (11 - ws.getUTCDay()) % 7 * 864e5), yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (11 - yth.getUTCDay()) % 7 * 864e5), calWeek = (th - yth) / 864e5 / 7 + 1;
                            html.push('<td class="cw">' + calWeek + "</td>");
                        }
                        (clsName = this.getClassNames(prevMonth)).push("day");
                        var content = prevMonth.getUTCDate();
                        this.o.beforeShowDay !== $.noop && ((before = this.o.beforeShowDay(this._utc_to_local(prevMonth))) === undefined ? before = {} : "boolean" == typeof before ? before = {
                            enabled: before
                        } : "string" == typeof before && (before = {
                            classes: before
                        }), !1 === before.enabled && clsName.push("disabled"), before.classes && (clsName = clsName.concat(before.classes.split(/\s+/))),
                        before.tooltip && (tooltip = before.tooltip), before.content && (content = before.content)),
                            clsName = $.isFunction($.uniqueSort) ? $.uniqueSort(clsName) : $.unique(clsName),
                            html.push('<td><button type="button" class="' + clsName.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ' data-date="' + prevMonth.getTime().toString() + '">' + content + "</button></td>"),
                            tooltip = null, weekDay === this.o.weekEnd && html.push("</tr>"), prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
                    }
                    this.picker.find(".p-datepicker-days tbody").html(html.join(""));
                    var monthsTitle = dates[this.o.language].monthsTitle || dates.en.monthsTitle || "Months", months = this.picker.find(".p-datepicker-months").find(".p-datepicker-switch").text(this.o.maxViewMode < 2 ? monthsTitle + dates[this.o.language].year : year + dates[this.o.language].year).attr("title", "연도 선택으로 이동").end().find("tbody button").removeClass("active").end().find(".prev").html(dates[this.o.language].monthLeftArrow).end().find(".next").html(dates[this.o.language].monthRightArrow).end();
                    if ($.each(this.dates, function(i, d) {
                        d.getUTCFullYear() === year && months.eq(d.getUTCMonth()).addClass("active");
                    }), (year < startYear || endYear < year) && months.addClass("disabled"), year === startYear && months.slice(0, startMonth).addClass("disabled"),
                    year === endYear && months.slice(endMonth + 1).addClass("disabled"), this.o.beforeShowMonth !== $.noop) {
                        var that = this;
                        $.each(months, function(i, month) {
                            var moDate = new Date(year, i, 1), before = that.o.beforeShowMonth(moDate);
                            before === undefined ? before = {} : "boolean" == typeof before ? before = {
                                enabled: before
                            } : "string" == typeof before && (before = {
                                classes: before
                            }), !1 !== before.enabled || $(month).hasClass("disabled") || $(month).addClass("disabled"),
                            before.classes && $(month).addClass(before.classes), before.tooltip && $(month).prop("title", before.tooltip);
                        });
                    }
                    this._fill_yearsView(".p-datepicker-years", "year", 10, year, startYear, endYear, this.o.beforeShowYear),
                        this._fill_yearsView(".p-datepicker-decades", "decade", 100, year, startYear, endYear, this.o.beforeShowDecade),
                        this._fill_yearsView(".p-datepicker-centuries", "century", 1e3, year, startYear, endYear, this.o.beforeShowCentury),
                        this.picker.find("button.disabled").attr("disabled", !0);
                }
            },
            updateNavArrows: function() {
                if (this._allow_update) {
                    var prevIsDisabled, nextIsDisabled, d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, startMonth = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, endYear = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, endMonth = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, factor = 1;
                    switch (this.viewMode) {
                        case 4:
                            factor *= 10;

                        case 3:
                            factor *= 10;

                        case 2:
                            factor *= 10;

                        case 1:
                            prevIsDisabled = Math.floor(year / factor) * factor <= startYear, nextIsDisabled = Math.floor(year / factor) * factor + factor > endYear;
                            break;

                        case 0:
                            prevIsDisabled = year <= startYear && month <= startMonth, nextIsDisabled = endYear <= year && endMonth <= month;
                    }
                    this.picker.find(".prev").toggleClass("disabled", prevIsDisabled), this.picker.find(".next").toggleClass("disabled", nextIsDisabled);
                }
            },
            click: function(e) {
                var target, year, month;
                e.preventDefault(), e.stopPropagation(), (target = $(e.target)).hasClass("p-datepicker-switch") && this.viewMode !== this.o.maxViewMode && this.setViewMode(this.viewMode + 1),
                target.hasClass("today") && !target.hasClass("day") && (this.setViewMode(0), this._setDate(UTCToday(), "linked" === this.o.todayBtn ? null : "view"),
                    this.picker.find(".table-condensed .today").focus());
                target.hasClass("clear") && this.clearDates(), target.hasClass("close") && (this.hide(),
                this.isInput || this.component.focus()), target.hasClass("disabled") || (target.hasClass("month") || target.hasClass("year") || target.hasClass("decade") || target.hasClass("century")) && (this.viewDate.setUTCDate(1),
                    1 === this.viewMode ? (month = target.parent().find("button").index(target), year = this.viewDate.getUTCFullYear(),
                        this.viewDate.setUTCMonth(month)) : (month = 0, year = Number(target.text()), this.viewDate.setUTCFullYear(year)),
                    this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate), this.viewMode === this.o.minViewMode ? this._setDate(UTCDate(year, month, 1)) : (this.setViewMode(this.viewMode - 1),
                    this.fill())), this.picker.is(":visible") && this._focused_from, delete this._focused_from;
            },
            dayCellClick: function(e) {
                var timestamp = $(e.currentTarget).data("date"), date = new Date(timestamp);
                this.o.updateViewDate && (date.getUTCFullYear() !== this.viewDate.getUTCFullYear() && this._trigger("changeYear", this.viewDate),
                date.getUTCMonth() !== this.viewDate.getUTCMonth() && this._trigger("changeMonth", this.viewDate)),
                    this._setDate(date), this.inputField.focus();
            },
            navArrowsClick: function(e) {
                var dir = $(e.currentTarget).hasClass("prev") ? -1 : 1;
                0 !== this.viewMode && (dir *= 12 * DPGlobal.viewModes[this.viewMode].navStep),
                    this.viewDate = this.moveMonth(this.viewDate, dir), this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate),
                    this.fill();
            },
            _toggle_multidate: function(date) {
                var ix = this.dates.contains(date);
                if (date || this.dates.clear(), -1 !== ix ? (!0 === this.o.multidate || 1 < this.o.multidate || this.o.toggleActive) && this.dates.remove(ix) : (!1 === this.o.multidate && this.dates.clear(),
                    this.dates.push(date)), "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
            },
            _setDate: function(date, which) {
                which && "date" !== which || this._toggle_multidate(date && new Date(date)), (!which && this.o.updateViewDate || "view" === which) && (this.viewDate = date && new Date(date)),
                    this.fill(), this.setValue(), which && "view" === which || this._trigger("changeDate"),
                    this.inputField.trigger("change"), !this.o.autoclose || which && "date" !== which || this.hide();
            },
            moveDay: function(date, dir) {
                var newDate = new Date(date);
                return newDate.setUTCDate(date.getUTCDate() + dir), newDate;
            },
            moveWeek: function(date, dir) {
                return this.moveDay(date, 7 * dir);
            },
            moveMonth: function(date, dir) {
                if (!function(d) {
                    return d && !isNaN(d.getTime());
                }(date)) return this.o.defaultViewDate;
                if (!dir) return date;
                var new_month, test, new_date = new Date(date.valueOf()), day = new_date.getUTCDate(), month = new_date.getUTCMonth(), mag = Math.abs(dir);
                if (dir = 0 < dir ? 1 : -1, 1 === mag) test = -1 === dir ? function() {
                    return new_date.getUTCMonth() === month;
                } : function() {
                    return new_date.getUTCMonth() !== new_month;
                }, new_month = month + dir, new_date.setUTCMonth(new_month), new_month = (new_month + 12) % 12; else {
                    for (var i = 0; i < mag; i++) new_date = this.moveMonth(new_date, dir);
                    new_month = new_date.getUTCMonth(), new_date.setUTCDate(day), test = function() {
                        return new_month !== new_date.getUTCMonth();
                    };
                }
                for (;test(); ) new_date.setUTCDate(--day), new_date.setUTCMonth(new_month);
                return new_date;
            },
            moveYear: function(date, dir) {
                return this.moveMonth(date, 12 * dir);
            },
            moveAvailableDate: function(date, dir, fn) {
                do {
                    if (date = this[fn](date, dir), !this.dateWithinRange(date)) return !1;
                    fn = "moveDay";
                } while (this.dateIsDisabled(date));
                return date;
            },
            weekOfDateIsDisabled: function(date) {
                return -1 !== $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled);
            },
            dateIsDisabled: function(date) {
                return this.weekOfDateIsDisabled(date) || 0 < $.grep(this.o.datesDisabled, function(d) {
                    return isUTCEquals(date, d);
                }).length;
            },
            dateWithinRange: function(date) {
                return date >= this.o.startDate && date <= this.o.endDate;
            },
            keydown: function(e) {},
            setViewMode: function(viewMode) {
                this.viewMode = viewMode, this.picker.children("div").hide().filter(".p-datepicker-" + DPGlobal.viewModes[this.viewMode].clsName).show(),
                    this.updateNavArrows(), this._trigger("changeViewMode", new Date(this.viewDate)),
                    this.picker.find(".p-datepicker-" + DPGlobal.viewModes[this.viewMode].clsName + " .p-datepicker-switch").focus();
            }
        };
        function DateRangePicker(element, options) {
            $.data(element, "p-datepicker", this), this.element = $(element), console.log(options.inputs),
                this.inputs = $.map(options.inputs, function(i) {
                    return i.jquery ? i[0] : i;
                }), delete options.inputs, this.keepEmptyValues = options.keepEmptyValues, delete options.keepEmptyValues,
                datepickerPlugin.call($(this.inputs), options).on("changeDate", $.proxy(this.dateUpdated, this)),
                this.pickers = $.map(this.inputs, function(i) {
                    return $.data(i, "datepicker");
                }), this.updateDates();
        }
        DateRangePicker.prototype = {
            updateDates: function() {
                this.dates = $.map(this.pickers, function(i) {
                    return i.getUTCDate();
                }), this.updateRanges();
            },
            updateRanges: function() {
                var range = $.map(this.dates, function(d) {
                    return d.valueOf();
                });
                $.each(this.pickers, function(i, p) {
                    p.setRange(range);
                });
            },
            clearDates: function() {
                $.each(this.pickers, function(i, p) {
                    p.clearDates();
                });
            },
            dateUpdated: function(e) {
                if (!this.updating) {
                    this.updating = !0;
                    var dp = $.data(e.target, "datepicker");
                    if (dp !== undefined) {
                        var new_date = dp.getUTCDate(), keep_empty_values = this.keepEmptyValues, i = $.inArray(e.target, this.inputs), j = i - 1, k = i + 1, l = this.inputs.length;
                        if (-1 !== i) {
                            if ($.each(this.pickers, function(i, p) {
                                p.getUTCDate() || p !== dp && keep_empty_values || p.setUTCDate(new_date);
                            }), new_date < this.dates[j]) for (;0 <= j && new_date < this.dates[j]; ) this.pickers[j--].setUTCDate(new_date); else if (new_date > this.dates[k]) for (;k < l && new_date > this.dates[k]; ) this.pickers[k++].setUTCDate(new_date);
                            this.updateDates(), delete this.updating;
                        }
                    }
                }
            },
            destroy: function() {
                $.map(this.pickers, function(p) {
                    p.destroy();
                }), $(this.inputs).off("changeDate", this.dateUpdated), delete this.element.data().datepicker;
            },
            remove: alias("destroy", "Method `remove` 는 사용되지 않습니다. 대신 `destroy` 사용")
        };
        var datepickerPlugin = function(option) {
            var internal_return, args = Array.apply(null, arguments);
            if (args.shift(), this.each(function() {
                var $this = $(this), data = $this.data("datepicker"), options = "object" == typeof option && option;
                if ($this.parent().hasClass("p-datepicker__wrap") || $this.parents().hasClass("p-date__range") || $this.wrap("<div class='p-datepicker__wrap'></div>"),
                    !data) {
                    this.btn = !!$this.hasClass("p-date__icon") && $this.closest('[data-date="datepicker"]')[0],
                        this.btn ? this.group = this.btn : this.group = this;
                    var elopts = function(el, prefix) {
                        var data = $(el).data(), out = {}, replace = new RegExp("^" + prefix.toLowerCase() + "([A-Z])");
                        function re_lower(_, a) {
                            return a.toLowerCase();
                        }
                        for (var key in prefix = new RegExp("^" + prefix.toLowerCase()), data) prefix.test(key) && (out[key.replace(replace, re_lower)] = data[key]);
                        return out;
                    }(this.group, "date"), locopts = function(lang) {
                        var out = {};
                        if (dates[lang] || (lang = lang.split("-")[0], dates[lang])) {
                            var d = dates[lang];
                            return $.each(locale_opts, function(i, k) {
                                k in d && (out[k] = d[k]);
                            }), out;
                        }
                    }($.extend({}, defaults, elopts, options).language), opts = $.extend({}, defaults, locopts, elopts, options);
                    "body" === opts.container && (opts.container = $this.closest(opts.containerDefaultWrap)),
                        data = $(this.group).hasClass("p-date__range") || opts.inputs ? ($.extend(opts, {
                            inputs: opts.inputs || $(this.group).find(".range").toArray()
                        }), new DateRangePicker(this, opts)) : new Datepicker(this, opts), $this.data("datepicker", data);
                }
                "string" == typeof option && "function" == typeof data[option] && (internal_return = data[option].apply(data, args));
            }), internal_return === undefined || internal_return instanceof Datepicker || internal_return instanceof DateRangePicker) return this;
            if (1 < this.length) return console.log("단일 요소 수집에만 허용 (" + option + ")");
            return internal_return;
        };
        $.fn.datepicker = datepickerPlugin;
        var defaults = $.fn.datepicker.defaults = {
            assumeNearbyYear: !1,
            autoclose: !0,
            beforeShowDay: $.noop,
            beforeShowMonth: $.noop,
            beforeShowYear: $.noop,
            beforeShowDecade: $.noop,
            beforeShowCentury: $.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            closeBtn: !0,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "yyyy-mm-dd",
            keepEmptyValues: !1,
            keyboardNavigation: !0,
            language: "kr",
            minViewMode: 0,
            maxViewMode: 2,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -1 / 0,
            startView: 0,
            todayBtn: !0,
            todayHighlight: !0,
            updateViewDate: !0,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            showOnFocus: !1,
            zIndexOffset: 100,
            container: "body",
            containerDefaultWrap: ".p-datepicker__wrap",
            immediateUpdates: !1,
            title: "",
            templates: {
                leftArrow: "이전 달 이동",
                rightArrow: "다음 달 이동"
            },
            showWeekDays: !0
        }, locale_opts = $.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
        $.fn.datepicker.Constructor = Datepicker;
        var dates = $.fn.datepicker.dates = {
            en: {
                days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                year: "",
                yearCentury: "",
                today: "Today",
                clear: "Clear",
                close: "Close",
                titleFormat: "MM yyyy",
                leftArrow: "move previous month",
                rightArrow: "move next month",
                monthLeftArrow: "move to previous year",
                monthRightArrow: "move to next year",
                yearLeftArrow: "move to previous 10 years",
                yearRightArrow: "move to next 10 years",
                decadesLeftArrow: "move to previous 100 years",
                decadesRightArrow: "move to next 100 years",
                centuriesLeftArrow: "move to previous century",
                centuriesRightArrow: "move to next century",
                caption: "date picker calendar",
                monthCaption: "month picker calendar",
                yearCaption: "year picker calendar",
                decadesCaption: "10-year calendar for year selection",
                centuriesCaption: "100-year calendar for year selection"
            },
            kr: {
                days: [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
                daysShort: [ "일", "월", "화", "수", "목", "금", "토" ],
                daysMin: [ "일", "월", "화", "수", "목", "금", "토" ],
                months: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                monthsShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
                year: "년",
                yearCentury: "년대",
                today: "오늘",
                clear: "clear",
                close: "닫기",
                format: "yyyy-mm-dd",
                titleFormat: "yyyy년 mm월",
                leftArrow: "이전 달 이동",
                rightArrow: "다음 달 이동",
                monthLeftArrow: "이전 연도 이동",
                monthRightArrow: "다음 연도 이동",
                yearLeftArrow: "이전 10년 이동",
                yearRightArrow: "다음 10년 이동",
                decadesLeftArrow: "이전 100년 이동",
                decadesRightArrow: "다음 100년 이동",
                centuriesLeftArrow: "이전 세기 이동",
                centuriesRightArrow: "다음 세기 이동",
                caption: "일자 선택용 달력",
                monthCaption: "월 선택용 달력",
                yearCaption: "연도 선택용 달력",
                decadesCaption: "10년 단위 연도 선택용 달력",
                centuriesCaption: "100년 단위 연도 일자 선택용 달력"
            }
        }, DPGlobal = {
            viewModes: [ {
                names: [ "days", "month" ],
                clsName: "days",
                e: "changeMonth"
            }, {
                names: [ "months", "year" ],
                clsName: "months",
                e: "changeYear",
                navStep: 1
            }, {
                names: [ "years", "decade" ],
                clsName: "years",
                e: "changeDecade",
                navStep: 10
            }, {
                names: [ "decades", "century" ],
                clsName: "decades",
                e: "changeCentury",
                navStep: 100
            }, {
                names: [ "centuries", "millennium" ],
                clsName: "centuries",
                e: "changeMillennium",
                navStep: 1e3
            } ],
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
            parseFormat: function(format) {
                if ("function" == typeof format.toValue && "function" == typeof format.toDisplay) return format;
                var separators = format.replace(this.validParts, "\0").split("\0"), parts = format.match(this.validParts);
                if (!separators || !separators.length || !parts || 0 === parts.length) return console.log("Invalid date format.");
                return {
                    separators: separators,
                    parts: parts
                };
            },
            parseDate: function(date, format, language, assumeNearby) {
                if (!date) return undefined;
                if (date instanceof Date) return date;
                if ("string" == typeof format && (format = DPGlobal.parseFormat(format)), format.toValue) return format.toValue(date, format, language);
                var parts, part, dir, i, fn, fn_map = {
                    d: "moveDay",
                    m: "moveMonth",
                    w: "moveWeek",
                    y: "moveYear"
                }, dateAliases = {
                    yesterday: "-1d",
                    today: "+0d",
                    tomorrow: "+1d"
                };
                if (date in dateAliases && (date = dateAliases[date]), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)) {
                    for (parts = date.match(/([\-+]\d+)([dmwy])/gi), date = new Date(), i = 0; i < parts.length; i++) part = parts[i].match(/([\-+]\d+)([dmwy])/i),
                        dir = Number(part[1]), fn = fn_map[part[2].toLowerCase()], date = Datepicker.prototype[fn](date, dir);
                    return Datepicker.prototype._zero_utc_time(date);
                }
                parts = date && date.match(this.nonpunctuation) || [];
                var val, filtered, parsed = {}, setters_order = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], setters_map = {
                    yyyy: function(d, v) {
                        return d.setUTCFullYear(assumeNearby ? function(year, threshold) {
                            return !0 === threshold && (threshold = 10), year < 100 && (year += 2e3) > new Date().getFullYear() + threshold && (year -= 100),
                                year;
                        }(v, assumeNearby) : v);
                    },
                    m: function(d, v) {
                        if (isNaN(d)) return d;
                        for (v -= 1; v < 0; ) v += 12;
                        for (v %= 12, d.setUTCMonth(v); d.getUTCMonth() !== v; ) d.setUTCDate(d.getUTCDate() - 1);
                        return d;
                    },
                    d: function(d, v) {
                        return d.setUTCDate(v);
                    }
                };
                setters_map.yy = setters_map.yyyy, setters_map.M = setters_map.MM = setters_map.mm = setters_map.m,
                    setters_map.dd = setters_map.d, date = UTCToday();
                var fparts = format.parts.slice();
                function match_part() {
                    var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                    return m.toLowerCase() === p.toLowerCase();
                }
                if (parts.length !== fparts.length && (fparts = $(fparts).filter(function(i, p) {
                    return -1 !== $.inArray(p, setters_order);
                }).toArray()), parts.length === fparts.length) {
                    var cnt, _date, s;
                    for (i = 0, cnt = fparts.length; i < cnt; i++) {
                        if (val = parseInt(parts[i], 10), part = fparts[i], isNaN(val)) switch (part) {
                            case "MM":
                                filtered = $(dates[language].months).filter(match_part), val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;

                            case "M":
                                filtered = $(dates[language].monthsShort).filter(match_part), val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                        }
                        parsed[part] = val;
                    }
                    for (i = 0; i < setters_order.length; i++) (s = setters_order[i]) in parsed && !isNaN(parsed[s]) && (_date = new Date(date),
                        setters_map[s](_date, parsed[s]), isNaN(_date) || (date = _date));
                }
                return date;
            },
            formatDate: function(date, format, language) {
                if (!date) return "";
                if ("string" == typeof format && (format = DPGlobal.parseFormat(format)), format.toDisplay) return format.toDisplay(date, format, language);
                var val = {
                    d: date.getUTCDate(),
                    D: dates[language].daysShort[date.getUTCDay()],
                    DD: dates[language].days[date.getUTCDay()],
                    m: date.getUTCMonth() + 1,
                    M: dates[language].monthsShort[date.getUTCMonth()],
                    MM: dates[language].months[date.getUTCMonth()],
                    yy: date.getUTCFullYear().toString().substring(2),
                    yyyy: date.getUTCFullYear()
                };
                val.dd = (val.d < 10 ? "0" : "") + val.d, val.mm = (val.m < 10 ? "0" : "") + val.m,
                    date = [];
                for (var seps = $.extend([], format.separators), i = 0, cnt = format.parts.length; i <= cnt; i++) seps.length && date.push(seps.shift()),
                    date.push(val[format.parts[i]]);
                return date.join("");
            },
            titleTemplate: '<div class="p-datepicker__head"><button type="button" class="p-datepicker-switch"></button><button type="button" class="prev">&laquo;</button><button type="button" class="next">&raquo;</button></div>',
            headTemplate: '<caption>일자 선택용 달력</caption><thead><tr><th colspan="7" class="p-datepicker-title"></th></tr></thead>',
            contTemplate: '<tr><td colspan="7"></td></tr>',
            footTemplate: '<div class="p-datepicker-footer"><button type="button" class="today" title="오늘로 이동"></button><button type="button" class="clear" title="선택내용 지우기"></button><button type="button" class="close" ></button></div>'
        };
        DPGlobal.template = '<div class="p-datepicker"><div class="p-datepicker-days">' + DPGlobal.titleTemplate + '<table class="table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody></table>" + DPGlobal.footTemplate + '</div><div class="p-datepicker-months">' + DPGlobal.titleTemplate + '<div class="table-condensed">' + DPGlobal.contTemplate + "</div>" + DPGlobal.footTemplate + '</div><div class="p-datepicker-years">' + DPGlobal.titleTemplate + '<div class="table-condensed">' + DPGlobal.contTemplate + "</div>" + DPGlobal.footTemplate + '</div><div class="p-datepicker-decades">' + DPGlobal.titleTemplate + '<div class="table-condensed">' + DPGlobal.contTemplate + "</div>" + DPGlobal.footTemplate + '</div><div class="p-datepicker-centuries">' + DPGlobal.titleTemplate + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + "</table>" + DPGlobal.footTemplate + "</div></div>",
            $.fn.datepicker.DPGlobal = DPGlobal, $(document).on("click", '[data-date="datepicker"] .p-date__icon', function(e) {
            console.log("aaa");
            var $this = $(this);
            $this.data("datepicker") || (e.preventDefault(), datepickerPlugin.call($this, "show"));
        }), $(function() {
            datepickerPlugin.call($('[data-date="datepicker-inline"]'));
        });
    }), -1 == navigator.appVersion.indexOf("MSIE 8.")) {
    $(function() {
        function fileupload(btn, options) {
            $element = $(btn), this.element = btn, this.options = options, this.clearselector = ".clear",
                $region = $element.closest(this.options.parent), $originalinput = $region.find(this.options.original),
                $clearbtn = $region.find(this.clearselector), $originalinput.hide(), $clearbtn.on("click.cancle", $.proxy(this.clear, this)),
                $originalinput.on("change", $.proxy(this.change, this)), $element.on("click", $.proxy(this.click, this));
        }
        function checkFileupload(option) {
            var $this = $(this), data = $this.data("upload"), options = "object" == typeof option && option;
            data || $this.data("upload", data = new fileupload(this, options)), "string" == typeof option && data[option]();
        }
        fileupload.prototype.click = function(event) {
            event.preventDefault();
            var $originalinput = this.element.closest(this.options.parent).find(this.options.original);
            $originalinput.click(), $originalinput.on("change", $.proxy(this.change, this));
        }, fileupload.prototype.change = function() {
            var $region = this.element.closest(this.options.parent), $originalinput = $region.find(this.options.original), $showinput = $region.find(this.options.showfilename), $clearbtn = $region.find(this.clearselector);
            if (window.FileReader) {
                if (filename = this.filestrip($originalinput[0].files[0].name), 1 < $originalinput[0].files.length) var filelength = $originalinput[0].files.length - 1;
            } else filename = $originalinput.val().split("/").pop().split("\\").pop();
            filelength && (filename = filename + " 외 " + filelength + " 건"), $clearbtn.addClass("active"),
                $showinput.html(filename);
        }, fileupload.prototype.filestrip = function(name) {
            var stripNumber, cutRatio, stripWidth = $(this.options.showfilename).width();
            return stripWidth < 600 && 420 <= stripWidth ? (stripNumber = 50, cutRatio = 1.2) : stripWidth < 419 && 300 <= stripWidth ? (stripNumber = 40,
                cutRatio = 2) : stripWidth < 300 && (stripNumber = 30, cutRatio = 3), name.length > stripNumber ? name.substr(0, stripNumber / cutRatio) + " ... " + name.substr(name.length - 4, name.length) : name;
        }, fileupload.prototype.clear = function() {
            var $region = this.element.closest(this.options.parent), $originalinput = $region.find(this.options.original), $showinput = $region.find(this.options.showfilename), $clearbtn = $region.find(this.clearselector);
            $originalinput.replaceWith($originalinput.val("").clone(!0)), $showinput.empty(),
                $clearbtn.removeClass("active");
        }, $(window).on("load", function() {
            $('[data-button="upload"]').each(function() {
                var $this = $(this), option = $this.data();
                checkFileupload.call($this, option);
            });
        }), $(".p-upload__file--hidden").on("focus", function() {
            $(this).closest(".p-upload").addClass("focus");
        }), $(".p-upload__file--hidden").on("blur", function() {
            $(this).closest(".p-upload").removeClass("focus");
        });
        function addFileInput(btn, options) {
            $element = $(btn), this.element = btn, this.options = options, $element.on("click", $.proxy(this.add, this));
        }
        addFileInput.prototype.add = function() {
            if ($(this.options.box).find(".p-upload").length < this.options.count) {
                var random = Math.floor(100 * Math.secureRandom()) + 1, fileOrg = "fileorg" + random, showFileName = "showFileName" + random, template = "<div class='p-upload'>";
                template += "   <div class='p-form-group'>", template += "       <div class='p-input__addon'>",
                    template += "           <button type='button' class='p-button p-button--small primary' data-button='upload' data-parent='.p-upload' data-original='#" + fileOrg + "' data-showfilename='#" + showFileName + "'>파일선택</button>",
                    template += "       </div>", template += "       <div class='p-form-group__upload'>",
                    template += "           <input type='file' name='attachImages[]' accept='image/!*' id='" + fileOrg + "' class='p-upload__file--hidden'>",
                    template += "           <span id='" + showFileName + "' class='p-input disabled'></span>",
                    template += "           <button type='button' class='p-upload__clear clear'>선택한 첨부 제거</button>",
                    template += "       </div>", template += "   </div>", template += '   <input type="text" id="" class="p-input" title="1번 첨부 이미지 대체 텍스트 입력" value="" placeholder="첨부 이미지 대체 텍스트 입력">',
                    template += "</div>", $(this.options.box).append(template), $('[data-button="upload"]').each(function() {
                    var $this = $(this), option = $this.data();
                    checkFileupload.call($this, option);
                });
            } else alert("최대 " + this.options.count + "개 까지만 등록 가능합니다.");
        }, $(window).on("load", function() {
            $('[data-button="addinput"]').each(function() {
                var $this = $(this), option = $this.data();
                (function(option) {
                    var $this = $(this), data = $this.data("addinput"), options = "object" == typeof option && option;
                    data || $this.data("addinput", data = new addFileInput(this, options)), "string" == typeof option && data[option]();
                }).call($this, option);
            });
        });
    });
    var removeInput = function(name) {
        name = "#" + name;
        $(name).closest(".p-upload").remove();
    };
}

$(function() {
    function checkedall(el, options) {
        $element = $(el), this.element = el, this.options = options, this.checkBtn = $element.find(this.options.checkallid),
            this.checkItemName = 'input[name="' + this.options.checkname + '"]', this.checkItem = $element.find(this.checkItemName),
            this.checkItemNum = this.checkItem.length, this.checkBtn.on("change", $.proxy(this.changeall, this)),
            this.checkItem.on("change", $.proxy(this.changeitem, this));
    }
    checkedall.prototype.changeall = function() {
        this.checkItem.prop("checked", this.checkBtn.prop("checked"));
        var checkItemStatus = $(this.checkItem).is(":checked");
        this.options.visibletarget && this.displayTarget(checkItemStatus);
    }, checkedall.prototype.changeitem = function() {
        this.checkedItem = $(this.element).find(this.checkItemName + ":checked").length,
        !1 === this.checkItem.prop("checked") && this.checkBtn.prop("checked", !1), 0 < this.checkedItem && this.checkedItem < this.checkItemNum ? (this.checkBtn.prop("checked", !1),
            this.targetStatus = !0) : this.checkedItem === this.checkItemNum ? (this.checkBtn.prop("checked", !0),
            this.targetStatus = !0) : (this.checkBtn.prop("checked", !1), this.targetStatus = !1),
        this.options.visibletarget && this.displayTarget(this.targetStatus);
    }, checkedall.prototype.displayTarget = function(visible) {
        var visibleStatus = $(this.options.visibletarget).is(":visible");
        !0 === visible ? visibleStatus || $(this.options.visibletarget).show() : visibleStatus && $(this.options.visibletarget).hide();
    }, $(window).on("load", function() {
        $('[data-select="checkall"]').each(function() {
            var $this = $(this), option = $this.data();
            (function(option) {
                var $this = $(this), data = $this.data("select"), options = "object" == typeof option && option;
                data && $this.data("select", data = new checkedall(this, options)), "string" == typeof option && data[option]();
            }).call($this, option);
        });
    });
}), $(function() {
    function CreateMap(element, options) {
        this.init(element, options);
    }
    function checkMapPlugin(option) {
        var $this = $(this), data = $this.data("map"), options = $.extend({}, CreateMap.DEFAULTS, $this.data(), "object" == typeof option && option);
        $this.data("map", data = new CreateMap(this, options)), "string" == typeof option && data[option]();
    }
    CreateMap.DEFAULTS = {
        level: 3,
        draggable: !0,
        zoomable: !0,
        typecontrol: !1,
        markersrc: "/common/images/program/map_marker.png",
        markersize: "34,42",
        markerpoint: "17,39",
        markerzindex: "0",
        map: "",
        mask: !1,
        overlays: [],
        bounds: "",
        swLatLng: "",
        neLatLng: "",
        sw: "",
        nw: "",
        rectangleBounds: ""
    }, CreateMap.prototype.init = function(element, options) {
        this.element = $(element), this.options = options, this.options.lat *= 1, this.options.lng *= 1,
            this.addMarker();
    }, CreateMap.prototype.addMarker = function() {
        var mapContainer = this.element[0], mapOption = {
            center: new kakao.maps.LatLng(this.options.lat, this.options.lng),
            level: this.options.level
        };
        if (this.options.map = new kakao.maps.Map(mapContainer, mapOption), this.options.map.setDraggable(this.options.draggable),
            this.options.map.setZoomable(this.options.zoomable), this.options.typecontrol) {
            var mapTypeControl = new kakao.maps.MapTypeControl();
            this.options.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
            var zoomControl = new kakao.maps.ZoomControl();
            this.options.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        }
        var markerpoint = this.options.markerpoint.split(","), imageSrc = this.options.markersrc, imageSize = new kakao.maps.Size(this.options.markersize), imageOption = {
            offset: new kakao.maps.Point(markerpoint[0], markerpoint[1])
        }, markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption), markerPosition = new kakao.maps.LatLng(this.options.lat, this.options.lng);
        if (new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
            zIndex: this.options.markerzindex
        }).setMap(this.options.map), this.options.title || this.options.info) {
            var customOverlay = new kakao.maps.CustomOverlay({
                position: markerPosition
            }), content = document.createElement("div");
            content.className = "p-map-info";
            var title = document.createElement("div");
            if (title.className = "p-map-info__title", title.appendChild(document.createTextNode(this.options.title)),
                content.appendChild(title), this.options.info) {
                var info = document.createElement("div");
                info.className = "p-map-info__content", info.appendChild(document.createTextNode(this.options.info)),
                    content.appendChild(info), content.className = "p-map-info p-map-info--multi";
            }
            customOverlay.setContent(content), customOverlay.setMap(this.options.map);
        }
        var that = this;
        this.options.mask && (this.addMarkeraaa(that), kakao.maps.event.addListener(this.options.map, "zoom_changed", function() {
            that.addMarkeraaa(that);
        }), kakao.maps.event.addListener(this.options.map, "dragend", function() {
            that.addMarkeraaa(that);
        }));
    }, CreateMap.prototype.addMarkeraaa = function(that) {
        for (var len = that.options.overlays.length, i = 0; i < len; i++) that.options.overlays[i].setMap(null);
        that.options.overlays = [], that.options.bounds = that.options.map.getBounds(),
            that.options.swLatLng = that.options.bounds.getSouthWest(), that.options.neLatLng = that.options.bounds.getNorthEast(),
            that.options.sw = new kakao.maps.LatLng(that.options.swLatLng.Ha, that.options.swLatLng.Ga),
            that.options.ne = new kakao.maps.LatLng(this.options.neLatLng.Ha, that.options.neLatLng.Ga),
            that.options.rectangleBounds = new kakao.maps.LatLngBounds(that.options.sw, that.options.ne),
            that.options.rectangle = new kakao.maps.Rectangle({
                bounds: that.options.rectangleBounds,
                strokeWeight: 0,
                strokeColor: "#000",
                strokeOpacity: 0,
                strokeStyle: "solid",
                fillColor: "#000",
                fillOpacity: .1
            }), that.options.rectangle.setMap(that.options.map), that.options.overlays.push(that.options.rectangle);
    }, $.fn.checkMap = checkMapPlugin, $(window).on("load", function() {
        $('[data-map="map"]').each(function() {
            var $this = $(this), option = $this.data();
            checkMapPlugin.call($this, option);
        });
    });
}), $(function() {
    function OpenWindow(element, options) {
        this.init(element, options);
    }
    function openwindowPlugin(option) {
        var $this = $(this), data = $this.data("openwindow"), options = $.extend({}, OpenWindow.DEFAULTS, $this.data(), "object" == typeof option && option);
        $this.data("openwindow", data = new OpenWindow(this, options)), "string" == typeof option && data[option]();
    }
    OpenWindow.DEFAULTS = {
        resizable: "no",
        scrollbars: "yes",
        status: "yes",
        width: 1e3,
        height: 650
    }, OpenWindow.prototype.init = function(element, options) {
        var setWindow, windowLeft, windowTop;
        if (this.element = $(element), this.options = options, this.options.url ? this.href = this.options.url : this.href = this.element.attr("href"),
            this.options.left) windowLeft = this.options.left; else {
            var popWidth = this.options.width, winWidth = window.innerWidth || document.body.clientWidth;
            windowLeft = (window.screenX || window.screenLeft || 0) + (winWidth - popWidth) / 2;
        }
        if (this.options.top) windowTop = this.options.top; else {
            var popHeight = this.options.height, winHeight = window.innerHeight || document.body.clientHeight;
            windowTop = (window.screenY || window.screenTop || 0) + (winHeight - popHeight) / 2;
        }
        setWindow = "menubar=no, ", setWindow += "location=no, ", setWindow += "resizable=" + this.options.resizable + ", ",
            setWindow += "scrollbars=" + this.options.scrollbars + ", ", setWindow += "status=" + this.options.status + ", ",
            setWindow += "width=" + this.options.width + ", ", setWindow += "height=" + this.options.height + ", ",
            setWindow += "left=" + windowLeft + ", ", setWindow += "top=" + windowTop, windowObjectReference = window.open(this.href, "", setWindow);
    }, $.fn.checkOpenWindow = openwindowPlugin, $(document).on("click", "[data-button='openwindow']", function(e) {
        e.preventDefault();
        var $this = $(this), option = $this.data();
        ($this.is("button") || $this.is("a")) && e.preventDefault(), openwindowPlugin.call($this, option);
    });
}), $(function() {
    var Modal = function(btn, options) {
        this.options = options, this.$body = $(document.body), this.$button = $(btn), this.href = this.$button.attr("href"),
            this.$element = $(this.options.target || this.href && this.href.replace(/.*(?=#[^\s]+$)/, "")),
            this.backdropselector = "modal__backdrop", this.widthtselector = "modal__body",
            this.heightselector = "modal__content", this.isShown = null;
    };
    function modalPlugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("modal"), href = $this.attr("href"), $target = $(option.target || href && href.replace(/.*(?=#[^\s]+$)/, "")), options = $.extend({}, Modal.DEFAULTS, $this.data(), $target.data(), "object" == typeof option && option), btn = option.parentbtn || this;
            data || $this.data("modal", data = new Modal(btn, options)), "string" == typeof option ? data[option]() : options.show && data.show();
        });
    }
    function modalRemotePlugin(option) {
        var $this = $(this);
        option.container ? $.ajax({
            type: "GET",
            url: option.remote,
            dataType: "text",
            async: !1,
            error: function() {
                alert("파일을 호출하지 못했습니다.");
            },
            success: function(data) {
                console.log("a"), checkData = data.split("\n");
                checkData.indexOf("<body>");
                data = /<body[\s\S]*?>([\s\S]*?)<\/body>/.exec(data)[1];
                var $target = $(option.target), $container = $(option.container);
                $btn = $(option.parentbtn), $container.html(data), $target.addClass("loaded"), $btn.trigger("loaded.modal"),
                    modalPlugin.call($this, option);
            }
        }) : console.log("외부 파일을 넣을 컨텐이너가 없습니다.");
    }
    Modal.DEFAULTS = {
        backdrop: !0,
        show: !0,
        keyboard: !0,
        width: 600
    }, Modal.prototype.show = function() {
        var element = this.$element, e = $.Event("show.modal");
        this.$button.trigger(e), this.isShown || (this.isShown = !0, this.$body.addClass("modal__open"),
            $("html").addClass("modal__open"), this.setSize(), element.show(), element.hasClass("fade") && element[0].offsetWidth,
            element.addClass("active"), this.options.backdrop && this.backdrop(), element.on("click.close", "[data-close='modal']", $.proxy(this.hide, this)),
            $(document).off("focusin.modal").on("focusin.modal", function(e) {
                element[0] === e.target || element.has(e.target).length || element.trigger("focus");
            }), this.escape(), this.resize(), this.$button.trigger("shown.modal"));
    }, Modal.prototype.hide = function(e) {
        var element = this.$element, backdrop = "." + this.backdropselector, modalbtn = this.$button;
        e = $.Event("hide.modal"), this.$button.trigger(e), this.isShown && (this.isShown = !1,
        e && e.preventDefault(), element.hide().removeClass("active"), $(document.body).removeClass("modal__open"),
            $("html").removeClass("modal__open"), element.find(backdrop).remove(), modalbtn.trigger("focus"),
            this.escape(), this.$button.trigger("hidden.modal"), this.$button.removeData("modal"));
    }, Modal.prototype.backdrop = function() {
        var element = this.$element;
        $("<div class='" + this.backdropselector + "'></div>").prependTo(element).css("height", 0).css("height", element[0].scrollHeight).on("click", $.proxy(this.hide, this));
    }, Modal.prototype.adjustBackdrop = function() {
        this.$element.find("." + this.backdropselector).css("height", 0).css("height", this.$element[0].scrollHeight);
    }, Modal.prototype.setSize = function(width, height) {
        var element = this.$element, modalWidth = this.options.width, modalHeight = this.options.height;
        modalWidth > $(window).width() && (modalWidth = $(window).width() - 50), element.find("." + this.widthtselector).css({
            width: modalWidth
        }), modalHeight && element.find("." + this.heightselector).css({
            height: modalHeight
        });
    }, Modal.prototype.resize = function() {
        this.isShown ? $(window).on("resize.modal", $.proxy(this.adjustBackdrop, this)) : $(window).off("resize.modal");
    }, Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup", $.proxy(function(e) {
            27 == e.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown");
    }, $.fn.modalPop = modalPlugin, $.fn.modalRemotePop = modalRemotePlugin, $(document).on("click.modal", "[data-button='modal']", function(e) {
        e.preventDefault();
        var $this = $(this), option = $this.data();
        $this.attr("href");
        ($this.is("button") || $this.is("a")) && e.preventDefault(), option.remote && !$(option.target).hasClass("loaded") ? modalRemotePlugin.call($this, option) : modalPlugin.call($this, option, this);
    });
}), $(function() {
    function createProgress(el, options) {
        this.element = el, this.options = $.extend({}, {
            percent: "0",
            duration: 1e3,
            color: "#fff"
        }, options), this.animated(this.element);
    }
    function progressPlugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("progress"), options = "object" == typeof option && option;
            data && $this.data("progress", data = new createProgress(this, options));
        });
    }
    createProgress.prototype.animated = function(el) {
        this.element = $(el), this.element.animate({
            width: this.options.percent + "%"
        }, this.options.duration, function() {});
    }, $.fn.barAnimated = progressPlugin, $(window).on("load", function(e) {
        $('[data-progress="animated"]').each(function() {
            var allprogress = $(this), data = allprogress.data();
            progressPlugin.call(allprogress, data);
        });
    });
}), $(function() {
    function createChartCircle(el, options) {
        this.element = el, this.firstChild = el.firstChild, this.options = $.extend({}, {
            percent: 0,
            size: 100,
            svgclassname: "chart-circle__item",
            emptyclassName: "chart-circle__background",
            emptyfill: "#e9e9e9",
            valueclassname: "chart-circle__value",
            valuefill: "#00acc1",
            viewbox: "0 0 33.83098862 33.83098862",
            cx: "16.91549431",
            strokewidth: 3,
            r: "15.91549431"
        }, options), this.createSvg(), this.createCircle(this.options.emptyclassName, this.options.emptyfill),
            this.createCircle(this.options.valueclassname, this.options.valuefill, this.options.percent - this.options.strokewidth);
    }
    function setAttributes(el, attrs) {
        for (var key in attrs) el.setAttribute(key, attrs[key]);
    }
    function ChartCirclePlugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("chart-circle"), options = "object" == typeof option && option;
            data || $this.data("chart-circle", data = new createChartCircle(this, options));
        });
    }
    createChartCircle.prototype.createSvg = function() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), setAttributes(this.svg, {
            class: this.options.svgclassname,
            width: "100%",
            height: "100%",
            viewBox: this.options.viewbox
        }), this.element.insertBefore(this.svg, this.firstChild);
    }, createChartCircle.prototype.createCircle = function(classname, color, percent) {
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
            setAttributes(this.circle, {
                class: classname,
                "stroke-width": this.options.strokewidth,
                stroke: color,
                cx: this.options.cx,
                cy: this.options.cx,
                r: this.options.cx - this.options.strokewidth / 2
            }), percent && setAttributes(this.circle, {
            "stroke-dasharray": percent + ", 100"
        }), this.svg.appendChild(this.circle);
    }, $.fn.ChartCircle = ChartCirclePlugin, $(".chart-circle").length && $('[data-progress="circle"]').each(function() {
        var allChartCircle = $(this), data = allChartCircle.data();
        ChartCirclePlugin.call(allChartCircle, data);
    });
}), function(root, factory) {
    "function" == typeof define && define.amd ? define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    function embed(parent, svg, target) {
        if (target) {
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            viewBox && svg.setAttribute("viewBox", viewBox);
            for (var clone = target.cloneNode(!0); clone.childNodes.length; ) fragment.appendChild(clone.firstChild);
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
                var cachedDocument = xhr._cachedDocument;
                cachedDocument || ((cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = xhr.responseText,
                    xhr._cachedTarget = {}), xhr._embeds.splice(0).map(function(item) {
                    var target = xhr._cachedTarget[item.id];
                    target = target || (xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
                        embed(item.parent, item.svg, target);
                });
            }
        }, xhr.onreadystatechange();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) ;
        return svg;
    }
    return function(rawopts) {
        var polyfill, opts = Object(rawopts), inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 || /\bEdge\/.(\d+)\b/.test(navigator.userAgent) && inIframe;
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        polyfill && function oninterval() {
            for (var index = 0; index < uses.length; ) {
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)),
                svg && src) {
                    if (polyfill) if (!opts.validate || opts.validate(src, svg, use)) {
                        parent.removeChild(use);
                        var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                        if (url.length) {
                            var xhr = requests[url];
                            xhr || ((xhr = requests[url] = new XMLHttpRequest()).open("GET", url), xhr.send(),
                                xhr._embeds = []), xhr._embeds.push({
                                parent: parent,
                                svg: svg,
                                id: id
                            }), loadreadystatechange(xhr);
                        } else embed(parent, svg, document.getElementById(id));
                    } else ++index, ++numberOfSvgUseElementsToBypass;
                } else ++index;
            }
            (!uses.length || 0 < uses.length - numberOfSvgUseElementsToBypass) && requestAnimationFrame(oninterval, 67);
        }();
    };
}), $(function() {
    svg4everybody();
}), $(function() {
    function tab(element) {
        this.element = $(element);
    }
    tab.prototype.show = function() {
        var $target, $targetGroup, $this = this.element, $ul = $this.closest("ul"), selector = $this.attr("href");
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""), $this.parent("li").hasClass("active") || ($target = $(selector),
            $targetGroup = $(selector).parent().closest("div"), this.activate($this.closest("li"), $ul, "> .active", "nav"),
            this.activate($target, $targetGroup, ".active"));
    }, tab.prototype.activate = function(element, container, cts, area) {
        var $active = container.find(cts);
        $active.hasClass("p-tab__body--slide") ? ($active.stop().hide().removeClass("active").end(),
            element.stop().slideDown(500, function() {
                $(this).addClass("active");
            })) : $active.hasClass("fade") ? ($active.stop().hide().removeClass("active").end(),
            element.stop().fadeIn(300, function() {
                $(this).addClass("active");
            })) : ($active.removeClass("active").end(), element.addClass("active")), "nav" === area && ($active.find("a, button").attr("title", ""),
            element.find("a, button").attr("title", "선택됨")), "nav" !== area && ($active.attr("title", "내용 숨김"),
            element.attr("title", "내용 열림"));
    }, $(document).on("click", "[data-button='tab']", function(e) {
        $(this).data("url") || (e.preventDefault(), $(this).each(function() {
            var $this, data;
            (data = ($this = $(this)).data("tab")) || $this.data("tab", data = new tab(this)),
                data.show(), this.options = $this.data(), this.options.dropdown && Dropdown();
        }));
    });
}), $(function() {
    function Accordion(element, option, options) {
        this.element = $(element), this.option = option, this.options = options;
    }
    Accordion.prototype.show = function() {
        var $this = this.element, selector = $this.attr("href"), $target = $(selector);
        if (this.options.arange) this.openToggle(this.options.arange); else {
            if ($this.hasClass("active")) return this.disabled($this), void this.disabled($target, "display");
            this.activate($this), this.activate($target, "display");
        }
    }, Accordion.prototype.activate = function(element, display) {
        element.addClass("active"), element.attr("title", "내용 열림"), element.attr("aria-expanded", "true"),
        display && element.show();
    }, Accordion.prototype.disabled = function(element, display) {
        element.removeClass("active"), element.attr("title", "내용 숨김"), element.attr("aria-expanded", "false"),
        display && element.hide();
    }, Accordion.prototype.openToggle = function(status) {
        $(this.options.parent).find("[data-accordion]").each(function() {
            var active = $(this).attr("href");
            "open" === status ? ($(this).addClass("active"), $(active).addClass("active").show().attr("title", "내용 열림")) : ($(this).removeClass("active"),
                $(active).removeClass("active").hide().attr("title", "내용 숨김"));
        });
    }, $(document).on("click", "[data-accordion]", function(e) {
        e.preventDefault(), $(this).each(function() {
            var $this = $(this), data = $this.data("accordion"), options = $this.data();
            data || $this.data("accordion", data = new Accordion(this, "show", options)), data.show(),
                this.options = $this.data();
        });
    });
}), $(function() {
    function tableElement(table, options) {
        var setDefault = {
            tabletype: "scroll",
            breakparent: "#container",
            addheadelement: "add-head",
            addwrapclass: "table-responsive",
            target: window,
            breakpoint: 640,
            breakstatus: !1
        };
        this.element = $(table), this.options = $.extend({}, setDefault, options), this.element.addClass(this.options.tabletype),
            this.$target = $(this.options.target).on("resize", $.proxy(this.tableCheck, this)),
            this.tableCheck();
    }
    function tableRwd(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("rwd"), options = "object" == typeof option && option;
            data || $this.data("rwd", data = new tableElement(this, options));
        });
    }
    tableElement.prototype.getState = function() {
        return $(window).innerWidth() > this.options.breakpoint ? "notRwd" : "applyRwd";
    }, tableElement.prototype.getWidth = function() {
        this.element.css("width", this.options.breakpoint).closest("." + this.options.addwrapclass).addClass("active").addClass("mobile"),
            this.options.breakstatus = !0;
    }, tableElement.prototype.removeWidth = function() {
        this.element.css("width", "").closest("." + this.options.addwrapclass).removeClass("active").removeClass("mobile"),
            this.options.breakstatus = !1;
    }, tableElement.prototype.getWrap = function(classname) {
        var wrapElement = this.element, wrapClassName = classname;
        wrapClassName = wrapClassName || this.options.addwrapclass, wrapElement.closest("." + wrapClassName)[0] || wrapElement.wrap("<div class='" + wrapClassName + "' />");
    }, tableElement.prototype.getIcon = function() {
        addClassTarget = this.element.closest("." + this.options.addwrapclass);
        var hasClassName = this.hasClassName(addClassTarget, this.options.scrollguide);
        if (this.options.scrollguide) {
            var scrollBottomPosition = this.element.offset().top - $(window).outerHeight() <= $(window).scrollTop(), scrollTopPosition = this.element.offset().top >= $(window).scrollTop();
            scrollBottomPosition && scrollTopPosition ? hasClassName || (addClassTarget.removeClass("bounceout").addClass("bouncein " + this.options.scrollguide),
                bounceTime = setTimeout($.proxy(function() {
                    this.bounceIcon();
                }, this), 3e3)) : this.removeIcon();
        }
    }, tableElement.prototype.bounceIcon = function() {
        addClassTarget = this.element.closest("." + this.options.addwrapclass), this.options.scrollguide && addClassTarget.removeClass("bouncein").addClass("bounceout");
    }, tableElement.prototype.removeIcon = function() {
        this.options.scrollguide && (addClassTarget = this.element.closest("." + this.options.addwrapclass),
        this.hasClassName(addClassTarget, this.options.scrollguide) && addClassTarget.removeClass(this.options.scrollguide));
    }, tableElement.prototype.hasClassName = function(el, className) {
        return el.hasClass(className);
    }, tableElement.prototype.getSimple = function() {
        var trsChild, cells, trs = this.element.find("tr"), grid = {};
        trs.each(function(index, item) {
            grid[index] || (grid[index] = {}), trsChild = item.childNodes;
            for (var j = cells = 0, cntJ = trsChild.length; j < cntJ; j++) grid[index][cells++] = trsChild[j];
            $(item).find("td").wrapInner("<span class='tds'></span>");
        });
        var cellHeader = "";
        for (row in grid) if (0 != row) for (cell in grid[row]) if (0 != cell) {
            cellHeader = $(grid[0][cell]).html();
            var insertCellHeader = this.options.addheadelement;
            insertCellHeader = "<span class=" + this.options.addheadelement + ">" + cellHeader + "</span>";
            $(insertCellHeader).prependTo(grid[row][cell]);
        }
    }, tableElement.prototype.removeSimple = function() {
        this.element.find("." + this.options.addheadelement).remove(), this.element.find(".tds").contents().unwrap(".tds");
    }, tableElement.prototype.tableCheck = function() {
        var tableStatus = this.getState();
        if (this.tableStatus !== tableStatus) switch (this.tableStatus = tableStatus, this.options.tabletype) {
            case "simple":
                "applyRwd" === this.tableStatus ? (this.getSimple(), this.element.addClass("mobile")) : (this.removeSimple(),
                    this.element.removeClass("mobile"));
                break;

            case "block":
                "applyRwd" === this.tableStatus ? this.element.addClass("mobile") : this.element.removeClass("mobile");
                break;

            default:
                this.getWrap(), "applyRwd" === this.tableStatus ? (this.getWidth(), this.getIcon(),
                    $(window).on("scroll", $.proxy(this.getIcon, this))) : (this.removeWidth(), this.removeIcon());
        }
    }, $.fn.tableRwd = tableRwd, -1 === navigator.appVersion.indexOf("MSIE 8.") && $(window).on("load", function(e) {
        $('[data-table="rwd"]').each(function() {
            var allTableRwd = $(this), data = allTableRwd.data();
            tableRwd.call(allTableRwd, data);
        });
    });
}), $(function() {
    var manageButton = {
        body: $("tr"),
        buttons: $(".manage__show, .manage__body"),
        activeClass: "active"
    };
    manageButton.buttons.each(function(i) {
        var area = manageButton.buttons.eq(i).closest(manageButton.body), buttonHeight = area.outerHeight();
        $(this).css({
            height: buttonHeight - 1
        }), $(this).hover(function() {
            area.stop(!0, !0).addClass(manageButton.activeClass);
        }, function() {
            area.stop(!0, !0).removeClass(manageButton.activeClass);
        });
    });
}), $(function() {
    function Tooltip(element, options) {
        this.init("tooltip", element, options);
    }
    function tooltipPlugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("tooltip"), options = "object" == typeof option && option;
            data || $this.data("tooltip", data = new Tooltip(this, options));
        });
    }
    Tooltip.DEFAULTS = {
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, Tooltip.prototype.init = function(type, element, options) {
        this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options),
            this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
        for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if ("manual" !== trigger) {
                var eventIn = "hover" === trigger ? "mouseenter" : "focusin", eventOut = "hover" === trigger ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)),
                    this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }, Tooltip.prototype.getOptions = function(options) {
        return options = $.extend({}, this.getDefaults(), this.$element.data(), options);
    }, Tooltip.prototype.getDelegateOptions = function() {
        var options = {}, defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
            defaults[key] !== value && (options[key] = value);
        }), options;
    }, Tooltip.prototype.enter = function(obj) {
        var self = $(obj.currentTarget).data(this.type);
        (self.hoverState = "in") === self.hoverState && self.show();
    }, Tooltip.prototype.leave = function(obj) {
        var self = $(obj.currentTarget).data(this.type);
        (self.hoverState = "out") === self.hoverState && self.hide();
    }, Tooltip.prototype.show = function() {
        $.Event("show." + this.type);
        if (this.hasContent() && this.enabled) {
            var $tip = this.tip(), tipId = this.getUID(this.type);
            this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId);
            var placement = this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data(this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
            var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement, $container = this.options.container ? $(this.options.container) : this.$element.parent(), containerDim = this.getPosition($container);
                placement = "bottom" === placement && pos.bottom + actualHeight > containerDim.bottom ? "top" : "top" === placement && pos.top - actualHeight < containerDim.top ? "bottom" : "right" === placement && pos.right + actualWidth > containerDim.width ? "left" : "left" === placement && pos.left - actualWidth < containerDim.left ? "right" : placement,
                    $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
        }
    }, Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, marginTop = parseInt($tip.css("margin-top"), 10), marginLeft = parseInt($tip.css("margin-left"), 10);
        isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top = offset.top + marginTop,
            offset.left = offset.left + marginLeft, $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0), $tip.addClass("active");
        var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
        "top" === placement && actualHeight !== height && (offset.top = offset.top + height - actualHeight);
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        delta.left ? offset.left += delta.left : offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement), arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight, arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
    }, Tooltip.prototype.replaceArrow = function(delta, dimension, isHorizontal) {
        this.arrow().css(isHorizontal ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isHorizontal ? "top" : "left", "");
    }, Tooltip.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle();
        $tip.find(".tooltip-inner").text(title), $tip.removeClass("fade in top bottom left right active"),
        this.options.maxwidth && $tip.find(".tooltip-inner").css({
            maxWidth: this.options.maxwidth
        });
    }, Tooltip.prototype.hide = function(callback) {
        var that = this, $tip = this.tip(), e = $.Event("hide." + this.type);
        if (this.$element.trigger(e), !e.isDefaultPrevented()) return $tip.removeClass("active"),
        "in" !== that.hoverState && $tip.detach(), that.$element.removeAttr("aria-describedby").trigger("hidden." + that.type),
        callback && callback(), this.hoverState = null, this;
    }, Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        !$e.attr("title") && "string" == typeof this.options.original_title || $e.attr("data-original_title", $e.attr("title") || "").attr("title", "");
    }, Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }, Tooltip.prototype.getPosition = function($element) {
        var el = ($element = $element || this.$element)[0], isBody = "BODY" === el.tagName, elRect = el.getBoundingClientRect();
        null == elRect.width && (elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
        }));
        var elOffset = isBody ? {
            top: 0,
            left: 0
        } : $element.offset(), scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }, outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
    }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" === placement ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "top" === placement ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "left" === placement ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0, viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll, bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset);
        } else {
            var leftEdgeOffset = pos.left - viewportPadding, rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.width && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset);
        }
        return delta;
    }, Tooltip.prototype.getTitle = function() {
        return this.$element.attr("data-original_title") || this.options.original_title;
    }, Tooltip.prototype.getUID = function(prefix) {
        for (;prefix += ~~(1e6 * Math.secureRandom()), document.getElementById(prefix); ) ;
        return prefix;
    }, Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template);
    }, Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && ((self = $(e.currentTarget).data(this.type)) || (self = new this.constructor(e.currentTarget),
            $(e.currentTarget).data(this.type, self))), self.tip().hasClass("active") ? self.leave(self) : self.enter(self);
    }, $.fn.tooltip = tooltipPlugin, $.fn.tooltip.Constructor = Tooltip;
    function Popover(element, options) {
        this.init("popover", element, options);
    }
    if (!$.fn.tooltip) return console.log("Popover requires tooltip.js");
    function popoverPulgin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("popover"), options = "object" == typeof option && option;
            data || $this.data("popover", data = new Popover(this, options)), "string" == typeof option && data[option]();
        });
    }
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "hover focus",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>'
    }), ((Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)).constructor = Popover).prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }, Popover.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
        $tip.find(".popover-title").text(title), $tip.find(".popover-content").children().detach().end().text(content),
            $tip.removeClass("fade top bottom left right in active"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide(),
        this.options.maxwidth && $tip.css({
            maxWidth: this.options.maxwidth
        });
    }, Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, Popover.prototype.getContent = function() {
        var $e = this.$element;
        return $e.attr("data-content") || ("function" == typeof this.options.content ? this.options.content.call($e[0]) : this.options.content);
    }, Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, Popover.prototype.tip = function() {
        return this.$tip || (this.$tip = $(this.options.template)), this.$tip;
    }, $.fn.popover = popoverPulgin, $.fn.popover.Constructor = Popover, $(window).on("load", function(e) {
        $('[data-button="tooltip"]').each(function() {
            $(this).is("a") && $(this).on("click", function(e) {
                e.preventDefault();
            });
            var allTooltip = $(this), data = allTooltip.data();
            tooltipPlugin.call(allTooltip, data);
        });
    }), $(window).on("load", function(e) {
        $('[data-button="popover"]').each(function() {
            $(this).is("a") && $(this).on("click", function(e) {
                e.preventDefault();
            });
            var allPopover = $(this), data = allPopover.data();
            popoverPulgin.call(allPopover, data);
        });
    });
});