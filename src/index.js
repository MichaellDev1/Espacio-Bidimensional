window.addEventListener('load', function () {
    var canvas = document.getElementById('space');
    var ctx = canvas.getContext('2d');
    var canvasWidth = 900;
    var canvasHeight = 600;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = '#393939';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
});
