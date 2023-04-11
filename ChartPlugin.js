Chart.defaults.global.defaultFontFamily = "Notokr", Chart.defaults.global.defaultFontColor = "#777",
    Chart.defaults.global.defaultFontSize = 12, Chart.defaults.global.legend.labels.boxWidth = 20;

var fontTitle = {
    family: Chart.defaults.global.defaultFontFamily,
    size: "16",
    color: "#333",
    style: "600"
}, tooTips = {
    backgroundColor: "#fff",
    borderColor: "#62677a",
    bodyFontColor: "#575c70",
    borderWidth: 1,
    cornerRadius: 0,
    yAlign: "bottom",
    xAlign: "center",
    caretPadding: 5,
    caretSize: 4,
    xPadding: 8,
    yPadding: 4
}, chartColors = {
    blue: "#5486d4",
    red: "#f25f82",
    skyblue: "#20a3c1",
    darkslateblue: "#61648c",
    purple: "#7163c7",
    green: "#48a453",
    grey: "#8893ad",
    royalblue: "#5668d3",
    orange: "#f06f46"
}, chartBorderColors = {
    blue: "#5486d4",
    red: "#d93e63",
    skyblue: "#20a3c1",
    darkslateblue: "#61648c",
    purple: "#7163c7",
    green: "#48a453",
    grey: "#8893ad",
    royalblue: "#5668d3",
    orange: "#f06f46"
};

function addComma(str) {
    value = str;
    var minus = value.substring(0, 1);
    return value = value.replace(/[^\d]+/g, ""), value = value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
    "-" == minus && (value = "-" + value), value;
}

function creatChart(id, type, labels, datasets, options) {
    var ctx = document.getElementById(id).getContext("2d");
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options,
        plugins: chartHsPlugins
    });
}

function updateChart(chartOpject, label, datasets, options) {
    chartOpject.data.labels = label, chartOpject.data.datasets = datasets, chartOpject.options = options,
        chartOpject.update();
}

!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.pattern = factory();
}(this, function() {
    "use strict";
    "function" == typeof Symbol && Symbol.asyncIterator && (AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
    }), AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
    }, AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
    }, AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
    };
    function AwaitValue(value) {
        this.value = value;
    }
    function AsyncGenerator(gen) {
        var front, back;
        function resume(key, arg) {
            try {
                var result = gen[key](arg), value = result.value;
                value instanceof AwaitValue ? Promise.resolve(value.value).then(function(arg) {
                    resume("next", arg);
                }, function(arg) {
                    resume("throw", arg);
                }) : settle(result.done ? "return" : "normal", result.value);
            } catch (err) {
                settle("throw", err);
            }
        }
        function settle(type, value) {
            switch (type) {
                case "return":
                    front.resolve({
                        value: value,
                        done: !0
                    });
                    break;

                case "throw":
                    front.reject(value);
                    break;

                default:
                    front.resolve({
                        value: value,
                        done: !1
                    });
            }
            (front = front.next) ? resume(front.key, front.arg) : back = null;
        }
        this._invoke = function(key, arg) {
            return new Promise(function(resolve, reject) {
                var request = {
                    key: key,
                    arg: arg,
                    resolve: resolve,
                    reject: reject,
                    next: null
                };
                back ? back = back.next = request : (front = back = request, resume(key, arg));
            });
        }, "function" != typeof gen.return && (this.return = void 0);
    }
    function classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var createClass = function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps),
            Constructor;
    };
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0,
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function inherits(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
    }
    function possibleConstructorReturn(self, call) {
        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !call || "object" != typeof call && "function" != typeof call ? self : call;
    }
    var Shape = function() {
        function Shape() {
            var size = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 16, backgroundColor = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "rgba(100, 100, 100, 0.3)", patternColor = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "rgba(255, 255, 255, 0.2)";
            return classCallCheck(this, Shape), this._canvas = document.createElement("canvas"),
                this._context = this._canvas.getContext("2d"), this._canvas.width = size, this._canvas.height = size,
                this._context.fillStyle = backgroundColor, this._context.fillRect(0, 0, this._canvas.width, this._canvas.height),
                this._size = size, this._patternColor = patternColor, this;
        }
        return createClass(Shape, [ {
            key: "setStrokeProps",
            value: function() {
                this._context.strokeStyle = this._patternColor, this._context.lineWidth = this._size / 10,
                    this._context.lineJoin = "round", this._context.lineCap = "round";
            }
        }, {
            key: "setFillProps",
            value: function() {
                this._context.fillStyle = this._patternColor;
            }
        } ]), Shape;
    }(), Plus = function() {
        function Plus() {
            return classCallCheck(this, Plus), possibleConstructorReturn(this, (Plus.__proto__ || Object.getPrototypeOf(Plus)).apply(this, arguments));
        }
        return inherits(Plus, Shape), createClass(Plus, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawPlus(), this.drawPlus(halfSize, halfSize),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawPlus",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2, quarterSize = size / 4;
                this._context.moveTo(quarterSize + offsetX, 0 + offsetY), this._context.lineTo(quarterSize + offsetX, halfSize + offsetY),
                    this._context.moveTo(0 + offsetX, quarterSize + offsetY), this._context.lineTo(halfSize + offsetX, quarterSize + offsetY),
                    this._context.closePath();
            }
        } ]), Plus;
    }(), Cross = function() {
        function Cross() {
            return classCallCheck(this, Cross), possibleConstructorReturn(this, (Cross.__proto__ || Object.getPrototypeOf(Cross)).apply(this, arguments));
        }
        return inherits(Cross, Shape), createClass(Cross, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawCross(), this.drawCross(halfSize, halfSize),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawCross",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, halfSize = this._size / 2;
                this._context.moveTo(offsetX + 2, offsetY + 2), this._context.lineTo(halfSize - 2 + offsetX, halfSize - 2 + offsetY),
                    this._context.moveTo(offsetX + 2, halfSize - 2 + offsetY), this._context.lineTo(halfSize - 2 + offsetX, offsetY + 2),
                    this._context.closePath();
            }
        } ]), Cross;
    }(), Dash = function() {
        function Dash() {
            return classCallCheck(this, Dash), possibleConstructorReturn(this, (Dash.__proto__ || Object.getPrototypeOf(Dash)).apply(this, arguments));
        }
        return inherits(Dash, Shape), createClass(Dash, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawDash(), this.drawDash(halfSize, halfSize),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawDash",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, halfSize = this._size / 2;
                this._context.moveTo(offsetX + 2, offsetY + 2), this._context.lineTo(halfSize - 2 + offsetX, halfSize - 2 + offsetY),
                    this._context.closePath();
            }
        } ]), Dash;
    }(), CrossDash = function() {
        function CrossDash() {
            return classCallCheck(this, CrossDash), possibleConstructorReturn(this, (CrossDash.__proto__ || Object.getPrototypeOf(CrossDash)).apply(this, arguments));
        }
        return inherits(CrossDash, Shape), createClass(CrossDash, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), new Cross().drawCross.call(this),
                    new Dash().drawDash.call(this, halfSize, halfSize), this._context.stroke(), this._canvas;
            }
        } ]), CrossDash;
    }(), Dot = function() {
        function Dot() {
            return classCallCheck(this, Dot), possibleConstructorReturn(this, (Dot.__proto__ || Object.getPrototypeOf(Dot)).apply(this, arguments));
        }
        return inherits(Dot, Shape), createClass(Dot, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setFillProps(), this.drawDot(), this.drawDot(halfSize, halfSize),
                    this._context.fill(), this._canvas;
            }
        }, {
            key: "drawDot",
            value: function(argument_0, argument_1, argument_2) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, diameter = 2 < arguments.length && void 0 !== argument_2 ? argument_2 : this._size / 10, quarterSize = this._size / 4, x = quarterSize + offsetX, y = quarterSize + offsetY;
                this._context.moveTo(x + quarterSize, y), this._context.arc(x, y, diameter, 0, 2 * Math.PI),
                    this._context.closePath();
            }
        } ]), Dot;
    }(), DotDash = function() {
        function DotDash() {
            return classCallCheck(this, DotDash), possibleConstructorReturn(this, (DotDash.__proto__ || Object.getPrototypeOf(DotDash)).apply(this, arguments));
        }
        return inherits(DotDash, Shape), createClass(DotDash, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), new Dash().drawDash.call(this, halfSize, halfSize),
                    this._context.closePath(), this._context.stroke(), this.setFillProps(), new Dot().drawDot.call(this),
                    this._context.fill(), this._canvas;
            }
        } ]), DotDash;
    }(), Disc = function() {
        function Disc() {
            return classCallCheck(this, Disc), possibleConstructorReturn(this, (Disc.__proto__ || Object.getPrototypeOf(Disc)).apply(this, arguments));
        }
        return inherits(Disc, Dot), createClass(Disc, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2, diameter = this._size / 5;
                return this._context.beginPath(), this.setFillProps(), this.drawDot(0, 0, diameter),
                    this.drawDot(halfSize, halfSize, diameter), this._context.fill(), this._canvas;
            }
        } ]), Disc;
    }(), Ring = function() {
        function Ring() {
            return classCallCheck(this, Ring), possibleConstructorReturn(this, (Ring.__proto__ || Object.getPrototypeOf(Ring)).apply(this, arguments));
        }
        return inherits(Ring, Dot), createClass(Ring, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2, diameter = this._size / 5;
                return this._context.beginPath(), this.setStrokeProps(), this.drawDot(0, 0, diameter),
                    this.drawDot(halfSize, halfSize, diameter), this._context.stroke(), this._canvas;
            }
        } ]), Ring;
    }(), Line = function() {
        function Line() {
            return classCallCheck(this, Line), possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
        }
        return inherits(Line, Shape), createClass(Line, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawLine(), this.drawLine(halfSize, halfSize),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawLine",
            value: function(argument_0, argument_1) {
                var offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, quarterSize = this._size / 4;
                this._context.moveTo(0, quarterSize + offsetY), this._context.lineTo(this._size, quarterSize + offsetY),
                    this._context.closePath();
            }
        } ]), Line;
    }(), VerticalLine = function() {
        function VerticalLine() {
            return classCallCheck(this, VerticalLine), possibleConstructorReturn(this, (VerticalLine.__proto__ || Object.getPrototypeOf(VerticalLine)).apply(this, arguments));
        }
        return inherits(VerticalLine, Line), createClass(VerticalLine, [ {
            key: "drawTile",
            value: function() {
                return this._context.translate(this._size, 0), this._context.rotate(90 * Math.PI / 180),
                    Line.prototype.drawTile.call(this), this._canvas;
            }
        } ]), VerticalLine;
    }(), Weave = function() {
        function Weave() {
            return classCallCheck(this, Weave), possibleConstructorReturn(this, (Weave.__proto__ || Object.getPrototypeOf(Weave)).apply(this, arguments));
        }
        return inherits(Weave, Shape), createClass(Weave, [ {
            key: "drawTile",
            value: function() {
                return this._context.beginPath(), this.setStrokeProps(), this.drawWeave(0, 0), this._context.stroke(),
                    this._canvas;
            }
        }, {
            key: "drawWeave",
            value: function(offsetX, offsetY) {
                var size = this._size, halfSize = size / 2;
                this._context.moveTo(offsetX + 1, offsetY + 1), this._context.lineTo(halfSize - 1, halfSize - 1),
                    this._context.moveTo(1 + halfSize, size - 1), this._context.lineTo(size - 1, 1 + halfSize),
                    this._context.closePath();
            }
        } ]), Weave;
    }(), Zigzag = function() {
        function Zigzag() {
            return classCallCheck(this, Zigzag), possibleConstructorReturn(this, (Zigzag.__proto__ || Object.getPrototypeOf(Zigzag)).apply(this, arguments));
        }
        return inherits(Zigzag, Shape), createClass(Zigzag, [ {
            key: "drawTile",
            value: function() {
                return this._context.beginPath(), this.setStrokeProps(), this.drawZigzag(), this.drawZigzag(this._size / 2),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawZigzag",
            value: function(argument_0) {
                var offsetY = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, size = this._size, quarterSize = size / 4, halfSize = size / 2, tenthSize = size / 10;
                this._context.moveTo(0, tenthSize + offsetY), this._context.lineTo(quarterSize, halfSize - tenthSize + offsetY),
                    this._context.lineTo(halfSize, tenthSize + offsetY), this._context.lineTo(size - quarterSize, halfSize - tenthSize + offsetY),
                    this._context.lineTo(size, tenthSize + offsetY);
            }
        } ]), Zigzag;
    }(), ZigzagVertical = function() {
        function ZigzagVertical() {
            return classCallCheck(this, ZigzagVertical), possibleConstructorReturn(this, (ZigzagVertical.__proto__ || Object.getPrototypeOf(ZigzagVertical)).apply(this, arguments));
        }
        return inherits(ZigzagVertical, Zigzag), createClass(ZigzagVertical, [ {
            key: "drawTile",
            value: function() {
                return this._context.translate(this._size, 0), this._context.rotate(90 * Math.PI / 180),
                    Zigzag.prototype.drawTile.call(this), this._canvas;
            }
        } ]), ZigzagVertical;
    }(), Diagonal = function() {
        function Diagonal() {
            return classCallCheck(this, Diagonal), possibleConstructorReturn(this, (Diagonal.__proto__ || Object.getPrototypeOf(Diagonal)).apply(this, arguments));
        }
        return inherits(Diagonal, Shape), createClass(Diagonal, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawDiagonalLine(),
                    this.drawDiagonalLine(halfSize, halfSize), this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawDiagonalLine",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2;
                this._context.moveTo(halfSize - 1 - offsetX, -1 + offsetY), this._context.lineTo(size + 1 - offsetX, 1 + halfSize + offsetY),
                    this._context.closePath();
            }
        } ]), Diagonal;
    }(), DiagonalRightLeft = function() {
        function DiagonalRightLeft() {
            return classCallCheck(this, DiagonalRightLeft), possibleConstructorReturn(this, (DiagonalRightLeft.__proto__ || Object.getPrototypeOf(DiagonalRightLeft)).apply(this, arguments));
        }
        return inherits(DiagonalRightLeft, Diagonal), createClass(DiagonalRightLeft, [ {
            key: "drawTile",
            value: function() {
                return this._context.translate(this._size, 0), this._context.rotate(90 * Math.PI / 180),
                    Diagonal.prototype.drawTile.call(this), this._canvas;
            }
        } ]), DiagonalRightLeft;
    }(), Square = function() {
        function Square() {
            return classCallCheck(this, Square), possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).apply(this, arguments));
        }
        return inherits(Square, Shape), createClass(Square, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setFillProps(), this.drawSquare(), this.drawSquare(halfSize, halfSize),
                    this._context.fill(), this._canvas;
            }
        }, {
            key: "drawSquare",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2, gap = size / 10;
                this._context.fillRect(offsetX + gap, offsetY + gap, halfSize - 2 * gap, halfSize - 2 * gap),
                    this._context.closePath();
            }
        } ]), Square;
    }(), Box = function() {
        function Box() {
            return classCallCheck(this, Box), possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
        }
        return inherits(Box, Shape), createClass(Box, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawBox(), this.drawBox(halfSize, halfSize),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawBox",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2, gap = size / 20;
                this._context.strokeRect(offsetX + gap, offsetY + gap, halfSize - 4 * gap, halfSize - 4 * gap),
                    this._context.closePath();
            }
        } ]), Box;
    }(), Triangle = function() {
        function Triangle() {
            return classCallCheck(this, Triangle), possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).apply(this, arguments));
        }
        return inherits(Triangle, Shape), createClass(Triangle, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setFillProps(), this.drawTriangle(), this.drawTriangle(halfSize, halfSize),
                    this._context.fill(), this._canvas;
            }
        }, {
            key: "drawTriangle",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2, quarterSize = size / 4;
                this._context.moveTo(quarterSize + offsetX, offsetY), this._context.lineTo(halfSize + offsetX, halfSize + offsetY),
                    this._context.lineTo(offsetX, halfSize + offsetY), this._context.closePath();
            }
        } ]), Triangle;
    }(), TriangleVertical = function() {
        function TriangleVertical() {
            return classCallCheck(this, TriangleVertical), possibleConstructorReturn(this, (TriangleVertical.__proto__ || Object.getPrototypeOf(TriangleVertical)).apply(this, arguments));
        }
        return inherits(TriangleVertical, Triangle), createClass(TriangleVertical, [ {
            key: "drawTile",
            value: function() {
                var size = this._size;
                return this._context.translate(size, size), this._context.rotate(180 * Math.PI / 180),
                    Triangle.prototype.drawTile.call(this), this._canvas;
            }
        } ]), TriangleVertical;
    }(), Diamond = function() {
        function Diamond() {
            return classCallCheck(this, Diamond), possibleConstructorReturn(this, (Diamond.__proto__ || Object.getPrototypeOf(Diamond)).apply(this, arguments));
        }
        return inherits(Diamond, Shape), createClass(Diamond, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setFillProps(), this.drawDiamond(), this.drawDiamond(halfSize, halfSize),
                    this._context.fill(), this._canvas;
            }
        }, {
            key: "drawDiamond",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2, quarterSize = size / 4;
                this._context.moveTo(quarterSize + offsetX, offsetY), this._context.lineTo(halfSize + offsetX, quarterSize + offsetY),
                    this._context.lineTo(quarterSize + offsetX, halfSize + offsetY), this._context.lineTo(offsetX, quarterSize + offsetY),
                    this._context.closePath();
            }
        } ]), Diamond;
    }(), DiamondBox = function() {
        function DiamondBox() {
            return classCallCheck(this, DiamondBox), possibleConstructorReturn(this, (DiamondBox.__proto__ || Object.getPrototypeOf(DiamondBox)).apply(this, arguments));
        }
        return inherits(DiamondBox, Diamond), createClass(DiamondBox, [ {
            key: "drawTile",
            value: function() {
                var halfSize = this._size / 2;
                return this._context.beginPath(), this.setStrokeProps(), this.drawDiamond(), this.drawDiamond(halfSize, halfSize),
                    this._context.stroke(), this._canvas;
            }
        }, {
            key: "drawDiamond",
            value: function(argument_0, argument_1) {
                var offsetX = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : 0, offsetY = 1 < arguments.length && void 0 !== argument_1 ? argument_1 : 0, size = this._size, halfSize = size / 2 - 1, quarterSize = size / 4;
                this._context.moveTo(quarterSize + offsetX, offsetY + 1), this._context.lineTo(halfSize + offsetX, quarterSize + offsetY),
                    this._context.lineTo(quarterSize + offsetX, halfSize + offsetY), this._context.lineTo(offsetX + 1, quarterSize + offsetY),
                    this._context.closePath();
            }
        } ]), DiamondBox;
    }(), shapes = {
        plus: Plus,
        cross: Cross,
        dash: Dash,
        "cross-dash": CrossDash,
        dot: Dot,
        "dot-dash": DotDash,
        disc: Disc,
        ring: Ring,
        line: Line,
        "line-vertical": VerticalLine,
        weave: Weave,
        zigzag: Zigzag,
        "zigzag-vertical": ZigzagVertical,
        diagonal: Diagonal,
        "diagonal-right-left": DiagonalRightLeft,
        square: Square,
        box: Box,
        triangle: Triangle,
        "triangle-inverted": TriangleVertical,
        diamond: Diamond,
        "diamond-box": DiamondBox
    }, deprecatedShapes = {
        circle: shapes.disc,
        "triangle-vertical": shapes["triangle-inverted"],
        "line-horizontal": shapes.line,
        "line-diagonal-lr": shapes.diagonal,
        "line-diagonal-rl": shapes["diagonal-right-left"],
        "zigzag-horizontal": shapes.zigzag,
        "diamond-outline": shapes["diamond-box"]
    }, completeShapesList = [];
    function getRandomShape(argument_0) {
        var excludedShapeTypes = 0 < arguments.length && void 0 !== argument_0 ? argument_0 : [], shapesList = Object.keys(shapes);
        excludedShapeTypes.forEach(function(shapeType) {
            shapesList.splice(shapesList.indexOf(shapeType), 1);
        });
        var randomIndex = Math.floor(Math.random() * shapesList.length);
        return shapesList[randomIndex];
    }
    function draw() {
        var shapeType = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "square", backgroundColor = arguments[1], patternColor = arguments[2], size = arguments[3], patternCanvas = document.createElement("canvas"), patternContext = patternCanvas.getContext("2d"), outerSize = 2 * size, shape = new completeShapesList[shapeType](size, backgroundColor, patternColor), pattern = patternContext.createPattern(shape.drawTile(), "repeat");
        return patternCanvas.width = outerSize, patternCanvas.height = outerSize, pattern.shapeType = shapeType,
            pattern;
    }
    return "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(target) {
            if (null == target) throw new TypeError("Cannot convert undefined or null to object");
            for (var to = Object(target), index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (null != nextSource) for (var nextKey in nextSource) Object.prototype.hasOwnProperty.call(nextSource, nextKey) && (to[nextKey] = nextSource[nextKey]);
            }
            return to;
        },
        writable: !0,
        configurable: !0
    }), Object.assign(completeShapesList, shapes, deprecatedShapes), {
        draw: draw,
        generate: function(colorList) {
            var firstShapeType = void 0, previousShapeType = void 0;
            return colorList.map(function(color, index, list) {
                var shapeType = void 0;
                return 0 === index ? (shapeType = getRandomShape(), firstShapeType = previousShapeType = shapeType) : index === list.length - 1 ? shapeType = getRandomShape([ previousShapeType, firstShapeType ]) : (shapeType = getRandomShape([ previousShapeType ]),
                    previousShapeType = shapeType), draw(shapeType, color);
            });
        }
    };
}), function() {
    "use strict";
    if ("undefined" != typeof Chart) {
        "function" != typeof Object.assign && (Object.assign = function(target, varArgs) {
            if (null == target) throw new TypeError("Cannot convert undefined or null to object");
            for (var to = Object(target), index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (null != nextSource) for (var nextKey in nextSource) Object.prototype.hasOwnProperty.call(nextSource, nextKey) && (to[nextKey] = nextSource[nextKey]);
            }
            return to;
        });
        var SUPPORTED_TYPES = {};
        [ "pie", "doughnut", "polarArea" ].forEach(function(t) {
            SUPPORTED_TYPES[t] = !0;
        }), Label.prototype.setup = function(chart, options) {
            this.chart = chart, this.ctx = chart.ctx, this.args = {}, this.barTotal = {};
            var chartOptions = chart.config.options;
            this.options = Object.assign({
                position: "default",
                precision: 0,
                fontSize: chartOptions.defaultFontSize,
                fontColor: chartOptions.defaultFontColor,
                fontStyle: chartOptions.defaultFontStyle,
                fontFamily: chartOptions.defaultFontFamily,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: "rgba(0,0,0,0.3)",
                shadowBlur: 6,
                images: [],
                outsidePadding: 2,
                textMargin: 2,
                overlap: !0
            }, options), "bar" === chart.config.type && (this.options.position = "default",
                this.options.arc = !1, this.options.overlap = !0);
        }, Label.prototype.render = function() {
            this.labelBounds = [], this.chart.data.datasets.forEach(this.renderToDataset);
        }, Label.prototype.renderToDataset = function(dataset, index) {
            this.totalPercentage = 0, this.total = null;
            var arg = this.args[index];
            arg.meta.data.forEach(function(element, index) {
                this.renderToElement(dataset, arg, element, index);
            }.bind(this));
        }, Label.prototype.renderToElement = function(dataset, arg, element, index) {
            if (this.shouldRenderToElement(arg.meta, element)) {
                this.percentage = null;
                var label = this.getLabel(dataset, element, index);
                if (label) {
                    var ctx = this.ctx;
                    ctx.save(), ctx.font = Chart.helpers.fontString(this.options.fontSize, this.options.fontStyle, this.options.fontFamily);
                    var renderInfo = this.getRenderInfo(element, label);
                    this.drawable(element, label, renderInfo) && (ctx.beginPath(), ctx.fillStyle = this.getFontColor(dataset, element, index),
                        this.renderLabel(label, renderInfo)), ctx.restore();
                }
            }
        }, Label.prototype.renderLabel = function(label, renderInfo) {
            return this.options.arc ? this.renderArcLabel(label, renderInfo) : this.renderBaseLabel(label, renderInfo);
        }, Label.prototype.renderBaseLabel = function(label, position) {
            var ctx = this.ctx;
            if ("object" == typeof label) ctx.drawImage(label, position.x - label.width / 2, position.y - label.height / 2, label.width, label.height); else {
                ctx.save(), ctx.textBaseline = "top", ctx.textAlign = "center", this.options.textShadow && (ctx.shadowOffsetX = this.options.shadowOffsetX,
                    ctx.shadowOffsetY = this.options.shadowOffsetY, ctx.shadowColor = this.options.shadowColor,
                    ctx.shadowBlur = this.options.shadowBlur);
                for (var lines = label.split("\n"), i = 0; i < lines.length; i++) {
                    var y = position.y - this.options.fontSize / 2 * lines.length + this.options.fontSize * i;
                    ctx.fillText(lines[i], position.x, y);
                }
                ctx.restore();
            }
        }, Label.prototype.renderArcLabel = function(label, renderInfo) {
            var ctx = this.ctx, radius = renderInfo.radius, view = renderInfo.view;
            if (ctx.save(), ctx.translate(view.x, view.y), "string" == typeof label) {
                ctx.rotate(renderInfo.startAngle), ctx.textBaseline = "middle", ctx.textAlign = "left";
                var lines = label.split("\n"), max = 0, widths = [], offset = 0;
                "border" === this.options.position && (offset = (lines.length - 1) * this.options.fontSize / 2);
                for (var j = 0; j < lines.length; ++j) {
                    var mertrics = ctx.measureText(lines[j]);
                    mertrics.width > max && (max = mertrics.width), widths.push(mertrics.width);
                }
                for (j = 0; j < lines.length; ++j) {
                    var line = lines[j], y = (lines.length - 1 - j) * -this.options.fontSize + offset;
                    ctx.save();
                    var padding = (max - widths[j]) / 2;
                    ctx.rotate(padding / radius);
                    for (var i = 0; i < line.length; i++) {
                        var char = line.charAt(i);
                        mertrics = ctx.measureText(char), ctx.save(), ctx.translate(0, -1 * radius), ctx.fillText(char, 0, y),
                            ctx.restore(), ctx.rotate(mertrics.width / radius);
                    }
                    ctx.restore();
                }
            } else ctx.rotate((view.startAngle + Math.PI / 2 + renderInfo.endAngle) / 2), ctx.translate(0, -1 * radius),
                this.renderLabel(label, {
                    x: 0,
                    y: 0
                });
            ctx.restore();
        }, Label.prototype.shouldRenderToElement = function(meta, element) {
            return !meta.hidden && !element.hidden && (this.options.showZero || "polarArea" === this.chart.config.type ? 0 !== element._view.outerRadius : 0 !== element._view.circumference);
        }, Label.prototype.getLabel = function(dataset, element, index) {
            var label;
            if ("function" == typeof this.options.render) label = this.options.render({
                label: this.chart.config.data.labels[index],
                value: dataset.data[index],
                percentage: this.getPercentage(dataset, element, index),
                dataset: dataset,
                index: index
            }); else switch (this.options.render) {
                case "value":
                    label = dataset.data[index];
                    break;

                case "label":
                    label = this.chart.config.data.labels[index];
                    break;

                case "image":
                    label = this.options.images[index] ? this.loadImage(this.options.images[index]) : "";
                    break;

                case "percentage":
                default:
                    label = this.getPercentage(dataset, element, index) + "%";
            }
            return "object" == typeof label ? label = this.loadImage(label) : null != label && (label = label.toString()),
                label;
        }, Label.prototype.getFontColor = function(dataset, element, index) {
            var fontColor = this.options.fontColor;
            return "function" == typeof fontColor ? fontColor = fontColor({
                label: this.chart.config.data.labels[index],
                value: dataset.data[index],
                percentage: this.getPercentage(dataset, element, index),
                backgroundColor: dataset.backgroundColor[index],
                dataset: dataset,
                index: index
            }) : "string" != typeof fontColor && (fontColor = fontColor[index] || this.chart.config.options.defaultFontColor),
                fontColor;
        }, Label.prototype.getPercentage = function(dataset, element, index) {
            if (null !== this.percentage) return this.percentage;
            var percentage;
            if ("polarArea" === this.chart.config.type) {
                if (null === this.total) for (var i = this.total = 0; i < dataset.data.length; ++i) this.total += dataset.data[i];
                percentage = dataset.data[index] / this.total * 100;
            } else if ("bar" === this.chart.config.type) {
                if (void 0 === this.barTotal[index]) for (i = this.barTotal[index] = 0; i < this.chart.data.datasets.length; ++i) this.barTotal[index] += this.chart.data.datasets[i].data[index];
                percentage = dataset.data[index] / this.barTotal[index] * 100;
            } else percentage = element._view.circumference / this.chart.config.options.circumference * 100;
            return percentage = parseFloat(percentage.toFixed(this.options.precision)), this.options.showActualPercentages || ("bar" === this.chart.config.type && (this.totalPercentage = this.barTotalPercentage[index] || 0),
                this.totalPercentage += percentage, 100 < this.totalPercentage && (percentage -= this.totalPercentage - 100,
                percentage = parseFloat(percentage.toFixed(this.options.precision))), "bar" === this.chart.config.type && (this.barTotalPercentage[index] = this.totalPercentage)),
                this.percentage = percentage;
        }, Label.prototype.getRenderInfo = function(element, label) {
            return "bar" === this.chart.config.type ? this.getBarRenderInfo(element, label) : this.options.arc ? this.getArcRenderInfo(element, label) : this.getBaseRenderInfo(element, label);
        }, Label.prototype.getBaseRenderInfo = function(element, label) {
            if ("outside" !== this.options.position && "border" !== this.options.position) return element.tooltipPosition();
            var renderInfo, rangeFromCentre, view = element._view, centreAngle = view.startAngle + (view.endAngle - view.startAngle) / 2, innerRadius = view.outerRadius / 2;
            if ("border" === this.options.position ? rangeFromCentre = (view.outerRadius - innerRadius) / 2 + innerRadius : "outside" === this.options.position && (rangeFromCentre = view.outerRadius - innerRadius + innerRadius + this.options.textMargin),
                renderInfo = {
                    x: view.x + Math.cos(centreAngle) * rangeFromCentre,
                    y: view.y + Math.sin(centreAngle) * rangeFromCentre
                }, "outside" === this.options.position) {
                var offset = this.options.textMargin + this.measureLabel(label).width / 2;
                renderInfo.x += renderInfo.x < view.x ? -offset : offset;
            }
            return renderInfo;
        }, Label.prototype.getArcRenderInfo = function(element, label) {
            var radius, view = element._view;
            radius = "outside" === this.options.position ? view.outerRadius + this.options.fontSize + this.options.textMargin : "border" === this.options.position ? (view.outerRadius / 2 + view.outerRadius) / 2 : (view.innerRadius + view.outerRadius) / 2;
            var startAngle = view.startAngle, endAngle = view.endAngle, totalAngle = endAngle - startAngle;
            return startAngle += Math.PI / 2, {
                radius: radius,
                startAngle: startAngle += ((endAngle += Math.PI / 2) - (this.measureLabel(label).width / radius + startAngle)) / 2,
                endAngle: endAngle,
                totalAngle: totalAngle,
                view: view
            };
        }, Label.prototype.getBarRenderInfo = function(element, label) {
            var renderInfo = element.tooltipPosition();
            return renderInfo.y -= this.measureLabel(label).height / 2 + this.options.textMargin,
                renderInfo;
        }, Label.prototype.drawable = function(element, label, renderInfo) {
            if (this.options.overlap) return !0;
            if (this.options.arc) return renderInfo.endAngle - renderInfo.startAngle <= renderInfo.totalAngle;
            var mertrics = this.measureLabel(label), left = renderInfo.x - mertrics.width / 2, right = renderInfo.x + mertrics.width / 2, top = renderInfo.y - mertrics.height / 2, bottom = renderInfo.y + mertrics.height / 2;
            return "outside" === this.options.renderInfo ? this.outsideInRange(left, right, top, bottom) : element.inRange(left, top) && element.inRange(left, bottom) && element.inRange(right, top) && element.inRange(right, bottom);
        }, Label.prototype.outsideInRange = function(left, right, top, bottom) {
            for (var labelBounds = this.labelBounds, i = 0; i < labelBounds.length; ++i) {
                for (var bound = labelBounds[i], potins = [ [ left, top ], [ left, bottom ], [ right, top ], [ right, bottom ] ], j = 0; j < potins.length; ++j) {
                    var x = potins[j][0], y = potins[j][1];
                    if (x >= bound.left && x <= bound.right && y >= bound.top && y <= bound.bottom) return !1;
                }
                potins = [ [ bound.left, bound.top ], [ bound.left, bound.bottom ], [ bound.right, bound.top ], [ bound.right, bound.bottom ] ];
                for (j = 0; j < potins.length; ++j) {
                    x = potins[j][0], y = potins[j][1];
                    if (left <= x && x <= right && top <= y && y <= bottom) return !1;
                }
            }
            return labelBounds.push({
                left: left,
                right: right,
                top: top,
                bottom: bottom
            }), !0;
        }, Label.prototype.measureLabel = function(label) {
            if ("object" == typeof label) return {
                width: label.width,
                height: label.height
            };
            for (var width = 0, lines = label.split("\n"), i = 0; i < lines.length; ++i) {
                var result = this.ctx.measureText(lines[i]);
                result.width > width && (width = result.width);
            }
            return {
                width: width,
                height: this.options.fontSize * lines.length
            };
        }, Label.prototype.loadImage = function(obj) {
            var image = new Image();
            return image.src = obj.src, image.width = obj.width, image.height = obj.height,
                image;
        }, Chart.plugins.register({
            id: "labels",
            beforeDatasetsUpdate: function(chart, options) {
                if (SUPPORTED_TYPES[chart.config.type]) {
                    Array.isArray(options) || (options = [ options ]);
                    var count = options.length;
                    chart._labels && count === chart._labels.length || (chart._labels = options.map(function() {
                        return new Label();
                    }));
                    for (var someOutside = !1, maxPadding = 0, i = 0; i < count; ++i) {
                        var label = chart._labels[i];
                        if (label.setup(chart, options[i]), "outside" === label.options.position) {
                            someOutside = !0;
                            var padding = 1.5 * label.options.fontSize + label.options.outsidePadding;
                            maxPadding < padding && (maxPadding = padding);
                        }
                    }
                    someOutside && (chart.chartArea.top += maxPadding, chart.chartArea.bottom -= maxPadding);
                }
            },
            afterDatasetUpdate: function(chart, args, options) {
                SUPPORTED_TYPES[chart.config.type] && chart._labels.forEach(function(label) {
                    label.args[args.index] = args;
                });
            },
            beforeDraw: function(chart) {
                SUPPORTED_TYPES[chart.config.type] && chart._labels.forEach(function(label) {
                    label.barTotalPercentage = {};
                });
            },
            afterDatasetsDraw: function(chart) {
                SUPPORTED_TYPES[chart.config.type] && chart._labels.forEach(function(label) {
                    label.render();
                });
            }
        });
    } else console.error("Can not find Chart object.");
    function Label() {
        this.renderToDataset = this.renderToDataset.bind(this);
    }
}(), function(Chart) {
    function dataValue(dataPoint, isHorizontal) {
        return function(obj) {
            return "object" == typeof obj && !!obj;
        }(dataPoint) ? isHorizontal ? dataPoint.x : dataPoint.y : dataPoint;
    }
    function reflectData(srcData, datasets) {
        srcData && srcData.forEach(function(data, i) {
            datasets[i].data = data;
        });
    }
    function isHorizontalChart(chartInstance) {
        return "horizontalBar" === chartInstance.config.type;
    }
    var round = function(value, precision) {
        var multiplicator = Math.pow(10, precision);
        return Math.round(100 * value * multiplicator) / multiplicator;
    }, Stacked100Plugin = {
        id: "stacked100",
        beforeInit: function(chartInstance, pluginOptions) {
            if (pluginOptions.enable) {
                var xAxes = chartInstance.options.scales.xAxes, yAxes = chartInstance.options.scales.yAxes, isVertical = "bar" === chartInstance.config.type || "line" === chartInstance.config.type;
                [ xAxes, yAxes ].forEach(function(axes) {
                    axes.forEach(function(hash) {
                        hash.stacked = !0;
                    });
                }), (isVertical ? yAxes : xAxes).forEach(function(hash) {
                    if (!hash.ticks.min) {
                        var hasNegative = chartInstance.data.datasets.some(function(dataset) {
                            return dataset.data.some(function(value) {
                                return value < 0;
                            });
                        });
                        hash.ticks.min = hasNegative ? -100 : 0;
                    }
                    hash.ticks.max || (hash.ticks.max = 100);
                }), pluginOptions.hasOwnProperty("replaceTooltipLabel") && !pluginOptions.replaceTooltipLabel || (chartInstance.options.tooltips.callbacks.label = function(isHorizontal) {
                    return function(tooltipItem, data) {
                        var datasetIndex = tooltipItem.datasetIndex, index = tooltipItem.index, datasetLabel = data.datasets[datasetIndex].label || "", originalValue = data.originalData[datasetIndex][index];
                        return datasetLabel + ": " + data.calculatedData[datasetIndex][index] + "% (" + dataValue(originalValue, isHorizontal) + ")";
                    };
                }(isHorizontalChart(chartInstance)));
            }
        },
        beforeDatasetsUpdate: function(chartInstance, pluginOptions) {
            if (pluginOptions.enable) {
                !function(data) {
                    data.originalData = data.datasets.map(function(dataset) {
                        return function(srcAry) {
                            for (var dstAry = [], length = srcAry.length, i = 0; i < length; i++) dstAry.push(srcAry[i]);
                            return dstAry;
                        }(dataset.data);
                    });
                }(chartInstance.data);
                var precision = function(pluginOptions) {
                    if (!pluginOptions.hasOwnProperty("precision")) return 1;
                    if (!pluginOptions.precision) return 1;
                    var optionsPrecision = Math.floor(pluginOptions.precision);
                    return isNaN(optionsPrecision) ? 1 : optionsPrecision < 0 || 16 < optionsPrecision ? 1 : optionsPrecision;
                }(pluginOptions);
                !function(data, isHorizontal, precision) {
                    var visibles = data.datasets.map(function(dataset) {
                        if (!dataset._meta) return !0;
                        for (var i in dataset._meta) return !dataset._meta[i].hidden;
                    }), datasetDataLength = 0;
                    data && data.datasets && data.datasets[0] && data.datasets[0].data && (datasetDataLength = data.datasets[0].data.length);
                    var totals = Array.apply(null, new Array(datasetDataLength)).map(function(el, i) {
                        return data.datasets.reduce(function(sum, dataset, j) {
                            var key = dataset.stack;
                            return sum[key] || (sum[key] = 0), sum[key] += Math.abs(dataValue(dataset.data[i], isHorizontal)) * visibles[j],
                                sum;
                        }, {});
                    });
                    data.calculatedData = data.datasets.map(function(dataset, i) {
                        return dataset.data.map(function(val, i) {
                            var total = totals[i][dataset.stack], dv = dataValue(val, isHorizontal);
                            return dv && total ? round(dv / total, precision) : 0;
                        });
                    });
                }(chartInstance.data, isHorizontalChart(chartInstance), precision), reflectData(chartInstance.data.calculatedData, chartInstance.data.datasets);
            }
        },
        afterDatasetsUpdate: function(chartInstance, pluginOptions) {
            pluginOptions.enable && reflectData(chartInstance.data.originalData, chartInstance.data.datasets);
        }
    };
    Chart.pluginService.register(Stacked100Plugin);
}.call(this, Chart), function() {
    "use strict";
    if ("undefined" != typeof Chart) {
        var SUPPORTED_TYPES2 = {};
        [ "bar", "line", "horizontalBar" ].forEach(function(t) {
            SUPPORTED_TYPES2[t] = !0;
        });
        var helpers = Chart.helpers, STUB_KEY = "$chartjs_deferred", MODEL_KEY = "$deferred";
        Chart.defaults.global.plugins.deferred = {
            xOffset: 0,
            yOffset: "40%",
            delay: 0
        }, Chart.plugins.register({
            id: "deferred",
            beforeInit: function(chart, options) {
                SUPPORTED_TYPES2[chart.config.type] && (chart[MODEL_KEY] = {
                    options: options,
                    appeared: !1,
                    delayed: !1,
                    loaded: !1,
                    elements: []
                }, function(chart) {
                    for (var stub, charts, parent = chart.chart.canvas.parentElement; parent; ) isScrollable(parent) && (0 === (charts = (stub = parent[STUB_KEY] || (parent[STUB_KEY] = {})).charts || (stub.charts = [])).length && helpers.addEvent(parent, "scroll", onScroll),
                        charts.push(chart), chart[MODEL_KEY].elements.push(parent)), parent = parent.parentElement || parent.ownerDocument;
                }(chart));
            },
            beforeDatasetsUpdate: function(chart, options) {
                if (SUPPORTED_TYPES2[chart.config.type]) {
                    var model = chart[MODEL_KEY];
                    if (!model.loaded) {
                        if (!model.appeared && !chartInViewport(chart)) return !1;
                        if (model.appeared = !0, model.loaded = !0, unwatch(chart), 0 < options.delay) return model.delayed = !0,
                            defer(function() {
                                model.delayed = !1;
                            }, options.delay), !1;
                    }
                    return !model.delayed && void 0;
                }
            },
            destroy: function(chart) {
                unwatch(chart);
            }
        });
    } else console.error("Can not find Chart object.");
    function defer(fn, delay) {
        delay ? window.setTimeout(fn, delay) : helpers.requestAnimFrame.call(window, fn);
    }
    function computeOffset(value, base) {
        var number = parseInt(value, 10);
        return isNaN(number) ? 0 : "string" == typeof value && -1 !== value.indexOf("%") ? number / 100 * base : number;
    }
    function chartInViewport(chart) {
        var options = chart[MODEL_KEY].options, canvas = chart.chart.canvas;
        if (!canvas || null === canvas.offsetParent) return !1;
        var rect = canvas.getBoundingClientRect(), dy = computeOffset(options.yOffset || 0, rect.height), dx = computeOffset(options.xOffset || 0, rect.width);
        return 0 <= rect.right - dx && 0 <= rect.bottom - dy && rect.left + dx <= window.innerWidth && rect.top + dy <= window.innerHeight;
    }
    function onScroll(event) {
        var stub = event.target[STUB_KEY];
        stub.ticking || (stub.ticking = !0, defer(function() {
            var chart, i, charts = stub.charts.slice(), ilen = charts.length;
            for (i = 0; i < ilen; ++i) chartInViewport(chart = charts[i]) && (unwatch(chart),
                chart[MODEL_KEY].appeared = !0, chart.update());
            stub.ticking = !1;
        }));
    }
    function isScrollable(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return node.nodeType === Node.DOCUMENT_NODE;
        var overflowX = helpers.getStyle(node, "overflow-x"), overflowY = helpers.getStyle(node, "overflow-y");
        return "auto" === overflowX || "scroll" === overflowX || "auto" === overflowY || "scroll" === overflowY;
    }
    function unwatch(chart) {
        chart[MODEL_KEY].elements.forEach(function(element) {
            var charts = element[STUB_KEY].charts;
            charts.splice(charts.indexOf(chart), 1), charts.length || (helpers.removeEvent(element, "scroll", onScroll),
                delete element[STUB_KEY]);
        }), chart[MODEL_KEY].elements = [];
    }
}();

var chartHsPlugins = {
    beforeRender: function(chart) {
        chart.config.options.showAllTooltips && (chart.pluginTooltips = [], chart.config.data.datasets.forEach(function(dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                chart.pluginTooltips.push(new Chart.Tooltip({
                    _chart: chart.chart,
                    _chartInstance: chart,
                    _data: chart.data,
                    _options: chart.options.tooltips,
                    _active: [ sector ]
                }, chart));
            });
        }), chart.options.tooltips.enabled = !1);
    },
    beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
            var ctx = chart.chart.ctx, centerConfig = chart.config.options.elements.center, fontStyle = centerConfig.fontStyle || "Arial", txt = centerConfig.text, color = centerConfig.color || "#000", sidePaddingCalculated = (centerConfig.sidePadding || 20) / 100 * (2 * chart.innerRadius);
            ctx.font = "30px " + fontStyle;
            var stringWidth = ctx.measureText(txt).width, widthRatio = (2 * chart.innerRadius - sidePaddingCalculated) / stringWidth, newFontSize = Math.floor(30 * widthRatio), elementHeight = 2 * chart.innerRadius, fontSizeToUse = Math.min(newFontSize, elementHeight);
            ctx.textAlign = "center", ctx.textBaseline = "middle";
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2, centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.font = fontSizeToUse + "px " + fontStyle, ctx.fillStyle = color, ctx.fillText(txt, centerX, centerY);
        }
        chart.config.options.elements.bottom;
    },
    afterDraw: function(chart, easing) {
        if (chart.config.options.showAllTooltips) {
            if (!chart.allTooltipsOnce) {
                if (1 !== easing) return;
                chart.allTooltipsOnce = !0;
            }
            chart.options.tooltips.enabled = !0, Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                tooltip.initialize(), tooltip.update(), tooltip.pivot(), tooltip.transition(easing).draw();
            }), chart.options.tooltips.enabled = !1;
        }
    },
    beforeInit: function(chart) {
        chart.data.labels.forEach(function(e, i, a) {
            /\n/.test(e) && (a[i] = e.split(/\n/));
        });
    }
};

!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory(require("chart.js")) : "function" == typeof define && define.amd ? define([ "chart.js" ], factory) : (global = global || self).ChartStyle = factory(global.Chart);
}(this, function(Chart) {
    "use strict";
    var helpers = (Chart = Chart && Chart.hasOwnProperty("default") ? Chart.default : Chart).helpers, optionsHelpers = helpers.options || {}, optionsHelpers$1 = helpers.extend(optionsHelpers, {
        resolve: optionsHelpers.resolve || function(inputs, context, index) {
            var i, ilen, value;
            for (i = 0, ilen = inputs.length; i < ilen; ++i) if (void 0 !== (value = inputs[i]) && (void 0 !== context && "function" == typeof value && (value = value(context)),
            void 0 !== index && helpers.isArray(value) && (value = value[index]), void 0 !== value)) return value;
        }
    }), helpers$1 = Chart.helpers, resolve = optionsHelpers$1.resolve;
    function isColorOption(key) {
        return -1 !== key.indexOf("Color");
    }
    var styleHelpers = {
        styleKeys: [ "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "bevelWidth", "bevelHighlightColor", "bevelShadowColor", "innerGlowWidth", "innerGlowColor", "outerGlowWidth", "outerGlowColor", "backgroundOverlayColor", "backgroundOverlayMode" ],
        lineStyleKeys: [ "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "outerGlowWidth", "outerGlowColor" ],
        pointStyleKeys: [ "pointShadowOffsetX", "pointShadowOffsetY", "pointShadowBlur", "pointShadowColor", "pointBevelWidth", "pointBevelHighlightColor", "pointBevelShadowColor", "pointInnerGlowWidth", "pointInnerGlowColor", "pointOuterGlowWidth", "pointOuterGlowColor", "pointBackgroundOverlayColor", "pointBackgroundOverlayMode" ],
        hoverStyleKeys: [ "hoverShadowOffsetX", "hoverShadowOffsetY", "hoverShadowBlur", "hoverShadowColor", "hoverBevelWidth", "hoverBevelHighlightColor", "hoverBevelShadowColor", "hoverInnerGlowWidth", "hoverInnerGlowColor", "hoverOuterGlowWidth", "hoverOuterGlowColor", "hoverBackgroundOverlayColor", "hoverBackgroundOverlayMode" ],
        pointHoverStyleKeys: [ "pointHoverShadowOffsetX", "pointHoverShadowOffsetY", "pointHoverShadowBlur", "pointHoverShadowColor", "pointHoverBevelWidth", "pointHoverBevelHighlightColor", "pointHoverBevelShadowColor", "pointHoverInnerGlowWidth", "pointHoverInnerGlowColor", "pointHoverOuterGlowWidth", "pointHoverOuterGlowColor", "pointHoverBackgroundOverlayColor", "pointHoverBackgroundOverlayMode" ],
        drawBackground: function(view, drawCallback) {
            var borderWidth = view.borderWidth;
            view.borderWidth = 0, drawCallback(), view.borderWidth = borderWidth;
        },
        drawBorder: function(view, drawCallback) {
            var backgroundColor = view.backgroundColor;
            view.borderWidth && (view.backgroundColor = "rgba(0, 0, 0, 0)", drawCallback(),
                view.backgroundColor = backgroundColor);
        },
        drawShadow: function(chart, options, drawCallback, backmost) {
            var ctx = chart.ctx, pixelRatio = chart.currentDevicePixelRatio;
            ctx.save(), ctx.shadowOffsetX = (options.shadowOffsetX + 1e6) * pixelRatio, ctx.shadowOffsetY = options.shadowOffsetY * pixelRatio,
                ctx.shadowBlur = options.shadowBlur * pixelRatio, ctx.shadowColor = options.shadowColor,
            backmost && (ctx.globalCompositeOperation = "destination-over"), ctx.translate(-1e6, 0),
                drawCallback(), ctx.restore();
        },
        setPath: function(ctx, drawCallback) {
            ctx.save(), ctx.beginPath(), ctx.clip(), drawCallback(), ctx.restore();
        },
        drawBevel: function(chart, options, drawCallback) {
            var shadowOffset, offset, ctx = chart.ctx, pixelRatio = chart.currentDevicePixelRatio, shadowWidthFactor = 5 * pixelRatio / 6, width = options.bevelWidth * shadowWidthFactor, borderWidth = options.borderWidth, parsedBorderWidth = options.parsedBorderWidth;
            width && (shadowOffset = this.opaque(options.borderColor) ? parsedBorderWidth ? {
                top: width + parsedBorderWidth.top * pixelRatio,
                left: width + parsedBorderWidth.left * pixelRatio,
                bottom: width + parsedBorderWidth.bottom * pixelRatio,
                right: width + parsedBorderWidth.right * pixelRatio
            } : {
                top: offset = width + (0 < borderWidth ? borderWidth : 0) * pixelRatio / 2,
                left: offset,
                bottom: offset,
                right: offset
            } : {
                top: width,
                left: width,
                bottom: width,
                right: width
            }, ctx.save(), this.setPath(ctx, drawCallback), ctx.clip(), ctx.translate(-1e6, 0),
                this.setPath(ctx, drawCallback), ctx.rect(0, 0, chart.width, chart.height), ctx.fillStyle = "black",
                ctx.shadowOffsetX = 1e6 * pixelRatio - shadowOffset.right, ctx.shadowOffsetY = -shadowOffset.bottom,
                ctx.shadowBlur = width, ctx.shadowColor = options.bevelShadowColor, navigator && navigator.userAgent.match("Windows.+Firefox") || (ctx.globalCompositeOperation = "source-atop"),
                ctx.fill("evenodd"), ctx.shadowOffsetX = 1e6 * pixelRatio + shadowOffset.left, ctx.shadowOffsetY = shadowOffset.top,
                ctx.shadowColor = options.bevelHighlightColor, ctx.fill("evenodd"), ctx.restore());
        },
        drawGlow: function(chart, options, drawCallback, isOuter) {
            var ctx = chart.ctx, width = isOuter ? options.outerGlowWidth : options.innerGlowWidth, borderWidth = options.borderWidth, pixelRatio = chart.currentDevicePixelRatio;
            width && (ctx.save(), this.setPath(ctx, drawCallback), isOuter && ctx.rect(0, 0, chart.width, chart.height),
                ctx.clip("evenodd"), ctx.translate(-1e6, 0), this.setPath(ctx, drawCallback), isOuter || ctx.rect(0, 0, chart.width, chart.height),
                ctx.lineWidth = borderWidth, ctx.strokeStyle = "black", ctx.fillStyle = "black",
                ctx.shadowOffsetX = 1e6 * pixelRatio, ctx.shadowBlur = width * pixelRatio, ctx.shadowColor = isOuter ? options.outerGlowColor : options.innerGlowColor,
                ctx.fill("evenodd"), borderWidth && ctx.stroke(), ctx.restore());
        },
        drawInnerGlow: function(chart, options, drawCallback) {
            this.drawGlow(chart, options, drawCallback);
        },
        drawOuterGlow: function(chart, options, drawCallback) {
            this.drawGlow(chart, options, drawCallback, !0);
        },
        drawBackgroundOverlay: function(chart, options, drawCallback) {
            var ctx = chart.ctx, color = options.backgroundOverlayColor;
            color && (ctx.save(), this.setPath(ctx, drawCallback), ctx.fillStyle = color, ctx.globalCompositeOperation = options.backgroundOverlayMode,
                ctx.fill(), ctx.restore());
        },
        opaque: function(color) {
            return 0 < helpers$1.color(color).alpha();
        },
        getHoverColor: function(color) {
            return void 0 !== color ? helpers$1.getHoverColor(color) : color;
        },
        mergeStyle: function(target, source) {
            if (void 0 !== target && void 0 !== source) return this.styleKeys.forEach(function(key) {
                target[key] = source[key];
            }), target;
        },
        setHoverStyle: function(target, source) {
            var i, ilen, keys = this.styleKeys, hoverKeys = this.hoverStyleKeys;
            if (void 0 !== target && void 0 !== source) {
                for (i = 0, ilen = keys.length; i < ilen; ++i) target[keys[i]] = source[hoverKeys[i]];
                return target;
            }
        },
        saveStyle: function(element) {
            var model = element._model, previousStyle = element.$previousStyle;
            previousStyle && this.mergeStyle(previousStyle, model);
        },
        resolveStyle: function(controller, element, index, options) {
            var i, ilen, key, value, chart = controller.chart, dataset = chart.data.datasets[controller.index], custom = element.custom || {}, keys = this.styleKeys, hoverKeys = this.hoverStyleKeys, values = {}, context = {
                chart: chart,
                dataIndex: index,
                dataset: dataset,
                datasetIndex: element._datasetIndex
            };
            for (i = 0, ilen = keys.length; i < ilen; ++i) values[key = keys[i]] = value = resolve([ custom[key], dataset[key], options[key] ], context, index),
                values[key = hoverKeys[i]] = resolve([ custom[key], dataset[key], options[key], isColorOption(key) ? this.getHoverColor(value) : value ], context, index);
            return values;
        },
        resolveLineStyle: function(controller, element, options) {
            var i, ilen, key, chart = controller.chart, dataset = chart.data.datasets[controller.index], custom = element.custom || {}, keys = this.lineStyleKeys, values = {}, context = {
                chart: chart,
                dataset: dataset,
                datasetIndex: element._datasetIndex
            };
            for (i = 0, ilen = keys.length; i < ilen; ++i) values[key = keys[i]] = resolve([ custom[key], dataset[key], options[key] ], context);
            return values;
        },
        resolvePointStyle: function(controller, element, index, options) {
            var i, ilen, key, value, me = this, chart = controller.chart, dataset = chart.data.datasets[controller.index], custom = element.custom || {}, keys = me.styleKeys, hoverKeys = me.hoverStyleKeys, pointKeys = me.pointStyleKeys, pointHoverKeys = me.pointHoverStyleKeys, values = {}, context = {
                chart: chart,
                dataIndex: index,
                dataset: dataset,
                datasetIndex: element._datasetIndex
            };
            for (i = 0, ilen = keys.length; i < ilen; ++i) values[key = keys[i]] = value = resolve([ custom[key], dataset[pointKeys[i]], dataset[key], options[key] ], context, index),
                values[key = hoverKeys[i]] = resolve([ custom[key], dataset[pointHoverKeys[i]], options[key], isColorOption(key) ? me.getHoverColor(value) : value ], context, index);
            return values;
        }
    }, helpers$2 = Chart.helpers;
    function mergeOpacity(colorString, opacity) {
        if (void 0 === opacity) return colorString;
        var color = helpers$2.color(colorString);
        return color.alpha(opacity * color.alpha()).rgbaString();
    }
    var Tooltip = Chart.Tooltip, StyleTooltip = Tooltip.extend({
        initialize: function() {
            Tooltip.prototype.initialize.apply(this, arguments), styleHelpers.mergeStyle(this._model, this._options);
        },
        update: function() {
            return Tooltip.prototype.update.apply(this, arguments), styleHelpers.mergeStyle(this._model, this._options),
                this;
        },
        drawBackground: function(pt, vm, ctx, tooltipSize, opacity) {
            function drawCallback() {
                Tooltip.prototype.drawBackground.apply(me, args);
            }
            var me = this, args = arguments, chart = me._chart, options = helpers$2.extend({}, vm, {
                bevelHighlightColor: mergeOpacity(vm.bevelHighlightColor, opacity),
                bevelShadowColor: mergeOpacity(vm.bevelShadowColor, opacity),
                innerGlowColor: mergeOpacity(vm.innerGlowColor, opacity),
                outerGlowColor: mergeOpacity(vm.outerGlowColor, opacity)
            });
            styleHelpers.drawShadow(chart, vm, drawCallback), styleHelpers.opaque(vm.backgroundColor) && (styleHelpers.drawBackground(vm, drawCallback),
                styleHelpers.drawBevel(chart, options, drawCallback)), styleHelpers.drawInnerGlow(chart, options, drawCallback),
                styleHelpers.drawOuterGlow(chart, options, drawCallback), styleHelpers.drawBorder(vm, drawCallback);
        }
    }), Rectangle = Chart.elements.Rectangle, StyleRectangle = Rectangle.extend({
        draw: function() {
            function drawCallback() {
                Rectangle.prototype.draw.apply(me, args);
            }
            function setPathCallback() {
                me.setPath();
            }
            var me = this, args = arguments, chart = me._chart, vm = me._view;
            styleHelpers.drawShadow(chart, vm, drawCallback, !0), styleHelpers.opaque(vm.backgroundColor) && (styleHelpers.drawBackground(vm, drawCallback),
                styleHelpers.drawBackgroundOverlay(chart, vm, setPathCallback), styleHelpers.drawBevel(chart, vm, setPathCallback)),
                styleHelpers.drawInnerGlow(chart, vm, setPathCallback), styleHelpers.drawOuterGlow(chart, vm, setPathCallback),
                styleHelpers.drawBorder(vm, drawCallback);
        },
        setPath: function() {
            var x, y, width, height, ctx = this._chart.ctx, vm = this._view;
            height = void 0 !== vm.width ? (x = vm.x - vm.width / 2, width = vm.width, y = Math.min(vm.y, vm.base),
                Math.abs(vm.y - vm.base)) : (x = Math.min(vm.x, vm.base), width = Math.abs(vm.x - vm.base),
                y = vm.y - vm.height / 2, vm.height), ctx.rect(x, y, width, height);
        }
    }), extend = Chart.helpers.extend;
    function swap(orig, v1, v2) {
        return orig === v1 ? v2 : orig === v2 ? v1 : orig;
    }
    function parseBorderWidth(vm) {
        var maxW, maxH, t, r, b, l, value = vm.borderWidth, skip = function(vm) {
            var edge = vm.borderSkipped, res = {};
            return edge && (vm.horizontal ? vm.base > vm.x && (edge = swap(edge, "left", "right")) : vm.base < vm.y && (edge = swap(edge, "bottom", "top")),
                res[edge] = !0), res;
        }(vm);
        return maxH = void 0 !== vm.width ? (maxW = vm.width / 2, Math.abs(vm.y - vm.base) / 2) : (maxW = Math.abs(vm.x - vm.base) / 2,
        vm.height / 2), null !== value && "[object Object]" === Object.prototype.toString.call(value) ? (t = +value.top || 0,
            r = +value.right || 0, b = +value.bottom || 0, l = +value.left || 0) : t = r = b = l = +value || 0,
            {
                top: skip.top || t < 0 ? 0 : maxH < t ? maxH : t,
                right: skip.right || r < 0 ? 0 : maxW < r ? maxW : r,
                bottom: skip.bottom || b < 0 ? 0 : maxH < b ? maxH : b,
                left: skip.left || l < 0 ? 0 : maxW < l ? maxW : l
            };
    }
    var BarController = Chart.controllers.bar, StyleBarController = BarController.extend({
        dataElementType: StyleRectangle,
        updateElement: function(rectangle, index) {
            var options = styleHelpers.resolveStyle(this, rectangle, index, this.chart.options.elements.rectangle), model = {};
            Object.defineProperty(rectangle, "_model", {
                configurable: !0,
                get: function() {
                    return model;
                },
                set: function(value) {
                    extend(model, value, options);
                }
            }), BarController.prototype.updateElement.apply(this, arguments), delete rectangle._model,
                rectangle._model = extend(model, {
                    parsedBorderWidth: parseBorderWidth(model)
                }), rectangle._styleOptions = options;
        },
        setHoverStyle: function(element) {
            BarController.prototype.setHoverStyle.apply(this, arguments), styleHelpers.saveStyle(element),
                styleHelpers.setHoverStyle(element._model, element._styleOptions);
        },
        removeHoverStyle: function(element) {
            element.$previousStyle || styleHelpers.mergeStyle(element._model, element._styleOptions),
                BarController.prototype.removeHoverStyle.apply(this, arguments);
        }
    }), isPointInArea = Chart.helpers.canvas._isPointInArea || function(point, area) {
        return point.x > area.left - 1e-6 && point.x < area.right + 1e-6 && point.y > area.top - 1e-6 && point.y < area.bottom + 1e-6;
    }, Point = Chart.elements.Point, StylePoint = Point.extend({
        draw: function(chartArea) {
            function drawCallback() {
                Point.prototype.draw.apply(me, args);
            }
            var me = this, args = arguments, chart = me._chart, vm = me._view;
            vm.skip || void 0 !== chartArea && !isPointInArea(vm, chartArea) || (styleHelpers.drawShadow(chart, vm, drawCallback, !0),
            styleHelpers.opaque(vm.backgroundColor) && (styleHelpers.drawBackground(vm, drawCallback),
                styleHelpers.drawBackgroundOverlay(chart, vm, drawCallback), styleHelpers.drawBevel(chart, vm, drawCallback)),
                styleHelpers.drawInnerGlow(chart, vm, drawCallback), styleHelpers.drawOuterGlow(chart, vm, drawCallback),
                styleHelpers.drawBorder(vm, drawCallback));
        }
    }), extend$1 = Chart.helpers.extend, BubbleController = Chart.controllers.bubble, StyleBubbleController = BubbleController.extend({
        dataElementType: StylePoint,
        updateElement: function(point, index) {
            var options = styleHelpers.resolveStyle(this, point, index, this.chart.options.elements.point), model = {};
            Object.defineProperty(point, "_model", {
                configurable: !0,
                get: function() {
                    return model;
                },
                set: function(value) {
                    extend$1(model, value, options);
                }
            }), BubbleController.prototype.updateElement.apply(this, arguments), delete point._model,
                point._model = model, point._styleOptions = options;
        },
        setHoverStyle: function(element) {
            BubbleController.prototype.setHoverStyle.apply(this, arguments), styleHelpers.saveStyle(element),
                styleHelpers.setHoverStyle(element._model, element._styleOptions);
        },
        removeHoverStyle: function(element) {
            element.$previousStyle || styleHelpers.mergeStyle(element._model, element._styleOptions),
                BubbleController.prototype.removeHoverStyle.apply(this, arguments);
        }
    }), helpers$6 = Chart.helpers, Arc = Chart.elements.Arc, StyleArc = Arc.extend({
        draw: function() {
            function drawCallback() {
                Arc.prototype.draw.apply(me, args);
            }
            var me = this, args = arguments, chart = me._chart, vm = me._view;
            styleHelpers.drawShadow(chart, vm, drawCallback, !0), styleHelpers.opaque(vm.backgroundColor) && (styleHelpers.drawBackground(vm, drawCallback),
                styleHelpers.drawBackgroundOverlay(chart, vm, drawCallback), styleHelpers.drawBevel(chart, "inner" === vm.borderAlign ? helpers$6.extend({}, vm, {
                borderWidth: 2 * vm.borderWidth
            }) : vm, drawCallback)), styleHelpers.drawInnerGlow(chart, vm, drawCallback), styleHelpers.drawOuterGlow(chart, vm, drawCallback),
                styleHelpers.drawBorder(vm, drawCallback);
        }
    }), defaults = Chart.defaults, extend$2 = Chart.helpers.extend, resolve$1 = optionsHelpers$1.resolve;
    defaults.doughnut.legend.labels.generateLabels = defaults.pie.legend.labels.generateLabels = function(chart) {
        var data = chart.data;
        return data.labels.length && data.datasets.length ? data.labels.map(function(label, i) {
            var meta = chart.getDatasetMeta(0), ds = data.datasets[0], arc = meta.data[i] || {}, custom = arc.custom || {}, arcOpts = chart.options.elements.arc, fill = resolve$1([ custom.backgroundColor, ds.backgroundColor, arcOpts.backgroundColor ], void 0, i), stroke = resolve$1([ custom.borderColor, ds.borderColor, arcOpts.borderColor ], void 0, i), bw = resolve$1([ custom.borderWidth, ds.borderWidth, arcOpts.borderWidth ], void 0, i);
            return extend$2({
                text: label,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                index: i
            }, styleHelpers.resolveStyle(meta.controller, arc, i, arcOpts));
        }) : [];
    };
    var DoughnutController = Chart.controllers.doughnut, StyleDoughnutController = DoughnutController.extend({
        dataElementType: StyleArc,
        updateElement: function(arc, index) {
            var options = styleHelpers.resolveStyle(this, arc, index, this.chart.options.elements.arc), model = {};
            Object.defineProperty(arc, "_model", {
                configurable: !0,
                get: function() {
                    return model;
                },
                set: function(value) {
                    extend$2(model, value, options);
                }
            }), DoughnutController.prototype.updateElement.apply(this, arguments), delete arc._model,
                arc._model = model, arc._styleOptions = options;
        },
        setHoverStyle: function(element) {
            DoughnutController.prototype.setHoverStyle.apply(this, arguments), styleHelpers.saveStyle(element),
                styleHelpers.setHoverStyle(element._model, element._styleOptions);
        },
        removeHoverStyle: function(element) {
            element.$previousStyle || styleHelpers.mergeStyle(element._model, element._styleOptions),
                DoughnutController.prototype.removeHoverStyle.apply(this, arguments);
        }
    }), StyleHorizontalBarController = StyleBarController.extend({
        _getValueScaleId: function() {
            return this.getMeta().xAxisID;
        },
        _getIndexScaleId: function() {
            return this.getMeta().yAxisID;
        },
        getValueScaleId: function() {
            return this.getMeta().xAxisID;
        },
        getIndexScaleId: function() {
            return this.getMeta().yAxisID;
        }
    }), Line = Chart.elements.Line, StyleLine = Line.extend({
        draw: function() {
            function drawCallback() {
                Line.prototype.draw.apply(me, args);
            }
            var me = this, args = arguments, chart = me._chart, vm = me._view;
            styleHelpers.drawShadow(chart, vm, drawCallback), styleHelpers.drawShadow(chart, {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: vm.outerGlowWidth,
                shadowColor: vm.outerGlowColor
            }, drawCallback), styleHelpers.drawBorder(vm, drawCallback);
        }
    }), extend$3 = Chart.helpers.extend, LineController = Chart.controllers.line, StyleLineController = LineController.extend({
        datasetElementType: StyleLine,
        dataElementType: StylePoint,
        update: function() {
            var line = this.getMeta().dataset, options = styleHelpers.resolveLineStyle(this, line, this.chart.options.elements.line), model = {};
            Object.defineProperty(line, "_model", {
                configurable: !0,
                get: function() {
                    return model;
                },
                set: function(value) {
                    extend$3(model, value, options);
                }
            }), LineController.prototype.update.apply(this, arguments), delete line._model,
                line._model = model, line._styleOptions = options;
        },
        updateElement: function(point, index) {
            var options = styleHelpers.resolvePointStyle(this, point, index, this.chart.options.elements.point);
            LineController.prototype.updateElement.apply(this, arguments), extend$3(point._model, options),
                point._styleOptions = options;
        },
        setHoverStyle: function(element) {
            LineController.prototype.setHoverStyle.apply(this, arguments), styleHelpers.saveStyle(element),
                styleHelpers.setHoverStyle(element._model, element._styleOptions);
        },
        removeHoverStyle: function(element) {
            element.$previousStyle || styleHelpers.mergeStyle(element._model, element._styleOptions),
                LineController.prototype.removeHoverStyle.apply(this, arguments);
        }
    }), extend$4 = Chart.helpers.extend, resolve$2 = optionsHelpers$1.resolve;
    Chart.defaults.polarArea.legend.labels.generateLabels = function(chart) {
        var data = chart.data;
        return data.labels.length && data.datasets.length ? data.labels.map(function(label, i) {
            var meta = chart.getDatasetMeta(0), ds = data.datasets[0], arc = meta.data[i] || {}, custom = arc.custom || {}, arcOpts = chart.options.elements.arc, fill = resolve$2([ custom.backgroundColor, ds.backgroundColor, arcOpts.backgroundColor ], void 0, i), stroke = resolve$2([ custom.borderColor, ds.borderColor, arcOpts.borderColor ], void 0, i), bw = resolve$2([ custom.borderWidth, ds.borderWidth, arcOpts.borderWidth ], void 0, i);
            return extend$4({
                text: label,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                index: i
            }, styleHelpers.resolveStyle(meta.controller, arc, i, arcOpts));
        }) : [];
    };
    var PolarAreaController = Chart.controllers.polarArea, StylePolarAreaController = PolarAreaController.extend({
        dataElementType: StyleArc,
        updateElement: function(arc, index) {
            var options = styleHelpers.resolveStyle(this, arc, index, this.chart.options.elements.arc), model = {};
            Object.defineProperty(arc, "_model", {
                configurable: !0,
                get: function() {
                    return model;
                },
                set: function(value) {
                    extend$4(model, value, options);
                }
            }), PolarAreaController.prototype.updateElement.apply(this, arguments), delete arc._model,
                arc._model = model, arc._styleOptions = options;
        },
        setHoverStyle: function(element) {
            PolarAreaController.prototype.setHoverStyle.apply(this, arguments), styleHelpers.saveStyle(element),
                styleHelpers.setHoverStyle(element._model, element._styleOptions);
        },
        removeHoverStyle: function(element) {
            element.$previousStyle || styleHelpers.mergeStyle(element._model, element._styleOptions),
                PolarAreaController.prototype.removeHoverStyle.apply(this, arguments);
        }
    }), extend$5 = Chart.helpers.extend, RadarController = Chart.controllers.radar, StyleRadarController = RadarController.extend({
        datasetElementType: StyleLine,
        dataElementType: StylePoint,
        update: function() {
            var line = this.getMeta().dataset, options = styleHelpers.resolveLineStyle(this, line, this.chart.options.elements.line), model = {};
            Object.defineProperty(line, "_model", {
                configurable: !0,
                get: function() {
                    return model;
                },
                set: function(value) {
                    extend$5(model, value, options);
                }
            }), RadarController.prototype.update.apply(this, arguments), delete line._model,
                line._model = model, line._styleOptions = options;
        },
        updateElement: function(point, index) {
            var options = styleHelpers.resolvePointStyle(this, point, index, this.chart.options.elements.point);
            RadarController.prototype.updateElement.apply(this, arguments), extend$5(point._model, options),
                point._styleOptions = options;
        },
        setHoverStyle: function(element) {
            RadarController.prototype.setHoverStyle.apply(this, arguments), styleHelpers.saveStyle(element),
                styleHelpers.setHoverStyle(element._model, element._styleOptions);
        },
        removeHoverStyle: function(element) {
            element.$previousStyle || styleHelpers.mergeStyle(element._model, element._styleOptions),
                RadarController.prototype.removeHoverStyle.apply(this, arguments);
        }
    }), defaults$1 = Chart.defaults, helpers$b = Chart.helpers, valueAtIndexOrDefault = (Chart.layouts || Chart.layoutService,
    helpers$b.valueOrDefault || helpers$b.getValueOrDefault, helpers$b.valueAtIndexOrDefault || helpers$b.getValueAtIndexOrDefault), extend$6 = (helpers$b.mergeIf,
        helpers$b.extend);
    defaults$1.global.legend.labels.generateLabels = function(chart) {
        var data = chart.data, options = chart.options.legend || {}, usePointStyle = options.labels && options.labels.usePointStyle;
        return helpers$b.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
            var element, styleOptions, meta = chart.getDatasetMeta(i), controller = meta.controller, elementOpts = chart.options.elements;
            return styleOptions = usePointStyle ? (element = meta.data[0] || {}, styleHelpers.resolvePointStyle(controller, element, i, elementOpts.point)) : meta.dataset ? (element = meta.dataset,
                styleHelpers.resolveLineStyle(controller, element, elementOpts.line)) : (element = meta.data[0] || {},
                styleHelpers.resolveStyle(controller, element, i, meta.bar ? elementOpts.rectangle : elementOpts.point)),
                extend$6({
                    text: dataset.label,
                    fillStyle: valueAtIndexOrDefault(dataset.backgroundColor, 0),
                    hidden: !chart.isDatasetVisible(i),
                    lineCap: dataset.borderCapStyle,
                    lineDash: dataset.borderDash,
                    lineDashOffset: dataset.borderDashOffset,
                    lineJoin: dataset.borderJoinStyle,
                    lineWidth: dataset.borderWidth,
                    strokeStyle: dataset.borderColor,
                    pointStyle: dataset.pointStyle,
                    datasetIndex: i
                }, styleOptions);
        }, this) : [];
    };
    Chart.Legend.extend({});
    var helpers$c = Chart.helpers, plugins = (Chart.layouts || Chart.layoutService,
        Chart.plugins), styleControllers = {
        bar: StyleBarController,
        bubble: StyleBubbleController,
        doughnut: StyleDoughnutController,
        horizontalBar: StyleHorizontalBarController,
        line: StyleLineController,
        polarArea: StylePolarAreaController,
        pie: StyleDoughnutController,
        radar: StyleRadarController,
        scatter: StyleLineController
    };
    function buildOrUpdateControllers() {
        var me = this, newControllers = [];
        return helpers$c.each(me.data.datasets, function(dataset, datasetIndex) {
            var meta = me.getDatasetMeta(datasetIndex), type = dataset.type || me.config.type;
            if (meta.type && meta.type !== type && (me.destroyDatasetMeta(datasetIndex), meta = me.getDatasetMeta(datasetIndex)),
                meta.type = type, meta.controller) meta.controller.updateIndex(datasetIndex), meta.controller.linkScales(); else {
                var ControllerClass = styleControllers[meta.type];
                if (void 0 === ControllerClass) throw new Error('"' + meta.type + '" is not a chart type.');
                meta.controller = new ControllerClass(me, datasetIndex), newControllers.push(meta.controller);
            }
        }, me), newControllers;
    }
    function initToolTip() {
        var me = this;
        me.tooltip = new StyleTooltip({
            _chart: me,
            _chartInstance: me,
            _data: me.data,
            _options: me.options.tooltips
        }, me);
    }
    var descriptors = plugins.descriptors;
    plugins.descriptors = function(chart) {
        var style = chart._style;
        if (style) {
            var cache = chart.$plugins || chart._plugins || (chart.$plugins = chart._plugins = {});
            if (cache.id === this._cacheId) return cache.descriptors;
            var result, p = this._plugins;
            this._plugins = p.map(function(plugin) {
                return plugin.id, plugin;
            });
        }
        return result = descriptors.apply(this, arguments), style && (this._plugins = p),
            result;
    };
    var StylePlugin = {
        id: "style",
        beforeInit: function(chart) {
            "outlabeledPie" !== chart.config.type && (chart._style = {}, chart.buildOrUpdateControllers = buildOrUpdateControllers,
                chart.initToolTip = initToolTip, delete chart.$plugins, delete chart._plugins, plugins.descriptors(chart));
        }
    };
    return Chart.plugins.register(StylePlugin), StylePlugin;
});