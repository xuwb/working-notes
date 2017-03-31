'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var canvas = $('#canvas-sky');
    new Starsky(canvas);
});

var Starsky = function () {
    function Starsky(canvas, options) {
        _classCallCheck(this, Starsky);

        this.canvas = canvas;
        this.context = canvas[0].getContext('2d');
        this.options = options || {};

        this.centerPos = {};
        this.pointList = [];
        this.pointInfo = [];
        this.animateAngle = [];
        this.timeCount = 0;
        this.animateHandler = null;

        this.init();
    }

    _createClass(Starsky, [{
        key: 'init',
        value: function init() {
            var options = this.options;

            $(window).resize(this.resizeCanvas);
            this.resizeCanvas();

            this.bindEvent();
            this.drawPoint(options.pointNum);
        }
    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            var w = $(window).get(0).innerWidth,
                h = $(window).get(0).innerHeight;

            this.canvas.attr("width", w);
            this.canvas.attr("height", h);
            this.centerPos = { x: w / 2, y: h / 2 };
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(num) {
            var canvas = this.canvas;
            var context = this.context;
            var pointList = this.pointList;
            var centerPos = this.centerPos;
            var pointInfo = this.pointInfo;
            var animateAngle = this.animateAngle;

            var pointNum = num || 100;

            var cw = canvas.width(),
                ch = canvas.height();

            var radiusLimit = cw > ch ? cw / 2 : ch / 2;

            for (var i = 0; i < pointNum; i++) {
                var r = parseInt(radiusLimit * Math.random(), 10);
                // 去重
                if (pointList.indexOf(r) != -1 || r < 100) {
                    i--;
                    continue;
                }
                pointList.push(r);
            }

            pointList.forEach(function (r) {
                context.beginPath();

                var startAngle = r,
                    alpha = Math.random(),
                    startInfo = {
                    x: centerPos.x + r * Math.cos(startAngle),
                    y: centerPos.y + r * Math.sin(startAngle),
                    r: r,
                    alpha: alpha
                };

                pointInfo.push(startInfo);

                context.strokeStyle = 'rgba(0, 0, 0, ' + 0 + ')';
                context.lineWidth = 1;

                context.moveTo(startInfo.x, startInfo.y);

                context.arc(centerPos.x, centerPos.y, r, startAngle, startAngle + Math.PI / 360);

                context.stroke();

                animateAngle.push({ angle1: startAngle, angle2: r });
            });
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var me = this;
            var timeCount = this.timeCount;
            var animateHandler = this.animateHandler;

            this.canvas.on('mouseenter', function (e) {
                animateHandler && cancelAnimationFrame(animateHandler);
                me.drawArc(1);
            });

            this.canvas.on('mouseout', function (e) {
                timeCount = 0;
                animateHandler && cancelAnimationFrame(animateHandler);
                me.drawArc(-1);
            });
        }
    }, {
        key: 'drawArc',
        value: function drawArc(status) {
            var canvas = this.canvas;
            var context = this.context;
            var timeCount = this.timeCount;
            var pointList = this.pointList;
            var animateAngle = this.animateAngle;
            var animateHandler = this.animateHandler;
            var pointInfo = this.pointInfo;
            var centerPos = this.centerPos;

            var angleInfo = animateAngle.slice();

            pointInfo = pointInfo.map(function (val, i) {
                return {
                    x: centerPos.x + val.r * Math.cos(angleInfo[i].angle1),
                    y: centerPos.y + val.r * Math.sin(angleInfo[i].angle1),
                    alpha: val.alpha
                };
            });

            function draw() {
                context.clearRect(0, 0, canvas.width(), canvas.height());

                timeCount += 2;

                pointList.forEach(function (r, i) {

                    context.beginPath();

                    var angle = status > 0 ? angleInfo[i].angle1 : angleInfo[i].angle2;

                    var endAngle = angle + Math.PI / 360 + timeCount * Math.PI / 720;

                    context.strokeStyle = 'rgba(0, 0, 0, ' + pointInfo[i].alpha + ')';

                    context.moveTo(pointInfo[i].x, pointInfo[i].y);

                    context.arc(centerPos.x, centerPos.y, r, angleInfo[i].angle1, endAngle, status > 0 ? false : true);

                    context.stroke();

                    animateAngle[i] = { angle1: endAngle, angle2: angleInfo[i].angle1 };
                });

                animateHandler = requestAnimationFrame(draw);

                if (status < 0 && animateAngle[0].angle1 - animateAngle[0].angle2 > -0.01) {
                    context.clearRect(0, 0, canvas.width(), canvas.height());
                    cancelAnimationFrame(animateHandler);
                }
            }
            draw();
        }
    }]);

    return Starsky;
}();