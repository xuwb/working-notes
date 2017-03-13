$(function(){
    var canvas = $('#canvas-sky'),
        context = canvas[0].getContext('2d');

    var centerPos, 
        pointList = [],
        pointInfo = [];

    $(window).resize(resizeCanvas);  
   
    function resizeCanvas() {  
        var w = $(window).get(0).innerWidth,
            h = $(window).get(0).innerHeight;
        canvas.attr("width", w);  
        canvas.attr("height", h);
        centerPos = {x: w/2, y: h/2};
        // context.fillRect(0, 0, canvas.width(), canvas.height());  
    };

    var animateAngle = [];

    function drawPoint(count) {
        count = count || 100;
        var cw = canvas.width(),
            ch = canvas.height();

        var radiusLimit = cw > ch ? cw/2 : ch/2;

        for(var i = 0; i < count; i++) {
            var r = parseInt(radiusLimit * Math.random(), 10);
            // 去重
            if(pointList.indexOf(r) != -1 || r < 10) {
                i--;
                continue;
            }
            pointList.push(r);
        }

        pointList.forEach(function(r){
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

            context.strokeStyle = 'rgba(0, 0, 0, ' + alpha + ')';

            context.moveTo(startInfo.x, startInfo.y);

            context.arc(centerPos.x, centerPos.y, r, startAngle, startAngle + Math.PI/360);

            context.stroke();

            animateAngle.push({angle1: startAngle, angle2: r});
        });
    }

    var count = 0,
        animateHandler;

    function drawArc(status){

        var angleInfo = animateAngle.slice();

        pointInfo = pointInfo.map(function(val, i){
            return {
                x: centerPos.x + val.r * Math.cos(angleInfo[i].angle1), 
                y: centerPos.y + val.r * Math.sin(angleInfo[i].angle1), 
                alpha: val.alpha
            }
        });

        function draw(){
            context.clearRect(0, 0, canvas.width(), canvas.height());

            count++;

            pointList.forEach(function(r, i){

                context.beginPath();

                var angle = status > 0 ? angleInfo[i].angle1 : angleInfo[i].angle2;

                var endAngle = angle + Math.PI/360 + status * count * Math.PI/720; if(i ==0 ){console.log(endAngle)}

                context.strokeStyle = 'rgba(0, 0, 0, ' + pointInfo[i].alpha + ')';

                context.moveTo(pointInfo[i].x, pointInfo[i].y);

                context.arc(centerPos.x, centerPos.y, r, angleInfo[i].angle1, endAngle, status > 0 ? false : true);

                context.stroke();

                animateAngle[i] = {angle1: endAngle, angle2: angleInfo[i].angle1};
            });
            animateHandler = requestAnimationFrame(draw);
        }
        draw();
    }
    canvas.on('mouseenter', function(e){
        animateHandler && cancelAnimationFrame(animateHandler)
        drawArc(1);
    });

    canvas.on('mouseout', function(e){
        count = 0;
        animateHandler && cancelAnimationFrame(animateHandler)
        drawArc(-1);
    });

    resizeCanvas();
    drawPoint(200);
})
