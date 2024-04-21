class Canvas {
    canvas: null | HTMLCanvasElement
    context = CanvasRenderingContext2D

    constructor() {
        this.canvas = null
    }

    buildCanvas(id: string) {
        const canvas = document.createElement('canvas')
        canvas.id = id
        document.body.appendChild(canvas)
        this.canvas = canvas
        return canvas
    }
}

const createCanvas = (id: string): HTMLCanvasElement => {
    const canvas = new Canvas()
    return canvas.buildCanvas(id)
}

class CoordinateAxes {
    canvasWidth: number
    canvasHeight: number

    constructor(canvasWidth: number = 0, canvasHeight: number = 0) {
        this.canvasHeight = canvasHeight
        this.canvasWidth = canvasWidth
    }

    draw(context: CanvasRenderingContext2D) {
        // Build axe Y
        context.fillStyle = '#1f1f1f'
        context.fillRect(this.canvasWidth / 2, 0, 1, this.canvasHeight)

        // Build axe X
        context.fillStyle = '#1f1f1f'
        context.fillRect(0, this.canvasHeight / 2, this.canvasWidth, 1)
    }
}

window.addEventListener('load', function () {
    const canvas = createCanvas('space')
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasWidth: number = 900;
    const canvasHeight: number = 700;

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.fillStyle = '#393939'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const coordinateAxes = new CoordinateAxes(canvasWidth, canvasHeight)
    coordinateAxes.draw(ctx)
})