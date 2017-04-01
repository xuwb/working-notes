'use strict';

$(function () {
    let canvas = $('#canvas-sky');
    new Starsky(canvas);
});
class Starsky {
    constructor(canvas, options) {
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
    init() {
        let options = this.options;

        $(window).resize(this.resizeCanvas);
        this.resizeCanvas();

        this.bindEvent();
        this.drawPoint(options.pointNum);
    }
    resizeCanvas() {
        let w = $(window).get(0).innerWidth,
            h = $(window).get(0).innerHeight;

        this.canvas.attr("width", w);
        this.canvas.attr("height", h);
        this.centerPos = { x: w / 2, y: h / 2 };
    }
    drawPoint(num) {
        let canvas = this.canvas;
        let context = this.context;
        let pointList = this.pointList;
        let centerPos = this.centerPos;
        let pointInfo = this.pointInfo;
        let animateAngle = this.animateAngle;

        let pointNum = num || 100;

        let cw = canvas.width(),
            ch = canvas.height();

        let radiusLimit = cw > ch ? cw / 2 : ch / 2;

        for (let i = 0; i < pointNum; i++) {
            let r = parseInt(radiusLimit * Math.random(), 10);
            // 去重
            if (pointList.indexOf(r) != -1 || r < 100) {
                i--;
                continue;
            }
            pointList.push(r);
        }

        pointList.forEach(function (r) {
            context.beginPath();

            let startAngle = r,
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
    bindEvent() {
        let me = this;
        let timeCount = this.timeCount;
        let animateHandler = this.animateHandler;

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
    drawArc(status) {
        let canvas = this.canvas;
        let context = this.context;
        let timeCount = this.timeCount;
        let pointList = this.pointList;
        let animateAngle = this.animateAngle;
        let animateHandler = this.animateHandler;
        let pointInfo = this.pointInfo;
        let centerPos = this.centerPos;

        let angleInfo = animateAngle.slice();

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

                let angle = status > 0 ? angleInfo[i].angle1 : angleInfo[i].angle2;

                let endAngle = angle + Math.PI / 360 + timeCount * Math.PI / 720;

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
}