window.addEventListener('load', function () {
    const canvas: HTMLCanvasElement = document.getElementById('space') as HTMLCanvasElement
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasWidth: number = 900;
    const canvasHeight: number = 600;

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.fillStyle = '#393939'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
})