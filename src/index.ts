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

const DISTANCE_BETWEEN = 45

class CoordinateAxes {
    canvasWidth: number
    canvasHeight: number
    coordinates: {
        x: number, y: number, value: number, type: 'X' | 'Y' | '0'
    }[]

    constructor(canvasWidth: number = 0, canvasHeight: number = 0) {
        this.canvasHeight = canvasHeight
        this.canvasWidth = canvasWidth
        this.coordinates = []
    }

    draw(context: CanvasRenderingContext2D, distanceBetween: number = DISTANCE_BETWEEN) {
        // Build axe Y
        context.fillStyle = '#1f1f1f'
        context.fillRect(this.canvasWidth / 2, 0, 1, this.canvasHeight)

        // Build axe X
        context.fillStyle = '#1f1f1f'
        context.fillRect(0, this.canvasHeight / 2, this.canvasWidth, 1)

        this.#buildCoordinates(context, distanceBetween)
    }

    // Distance between coordinates = 25
    #buildCoordinates(context: CanvasRenderingContext2D, distanceBetween: number = DISTANCE_BETWEEN) {
        const halfCanvasWidth = this.canvasWidth / 2
        const halfCanvasHeight = this.canvasHeight / 2
        // halfCanvasWidth = 450 
        // halfCanvasWidth / distanceBetween = 18. 
        // 18 coordinates points - and +
        
        const coordinates: Array<{ x: number, y: number, value: number, type: 'X' | 'Y' | '0', }> = [{
            value: 0,
            x: halfCanvasWidth,
            type: '0',
            y: halfCanvasHeight
        }]

        const createPointCoortinate = (points: number, type: 'Y' | 'X') => {
            let pointsCreateds = 0;
            const isAxeX = type == 'X'

            while (pointsCreateds <= points) {
                pointsCreateds++
                const axeDistance = (pointsCreateds * distanceBetween)

                coordinates.push({
                    x: isAxeX ? halfCanvasWidth - axeDistance : halfCanvasWidth,
                    y: isAxeX ? halfCanvasHeight : (halfCanvasHeight + axeDistance),
                    type,
                    value: -pointsCreateds
                })

                coordinates.push({
                    x: isAxeX ? axeDistance + halfCanvasWidth : halfCanvasWidth,
                    y: isAxeX ? halfCanvasHeight : (halfCanvasHeight - axeDistance),
                    type,
                    value: pointsCreateds
                })
            }
        }

        createPointCoortinate((halfCanvasWidth / distanceBetween), 'X')
        createPointCoortinate((halfCanvasHeight / distanceBetween), 'Y')

        this.coordinates = coordinates

        const lineWidth = 10
        this.coordinates.forEach(({ type, value, x, y }) => {
            if (type === '0') return;

            context.font = `12px Arial`
            context.fillStyle = '#fff'

            const isAxeX = type === 'X'
            const text = `${value}`
            const fM = context.measureText(text)    
            const textWidth = fM.width
            const textHeigth = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent;

            const realXPosition = x - textWidth

            const positionX = isAxeX ? (x - textWidth / 2) : (realXPosition) - lineWidth - 3
            const positionY = isAxeX ? y - (lineWidth + 3) : (y + textHeigth / 2)

            context.fillText(`${value}`, positionX, positionY)

            context.fillStyle = '#1f1f1f'
            const [linePositionX, linePositionY, lineX, lineY] = [x, y - lineWidth, 1, lineWidth]

            if (type === 'Y') {
                context.fillRect(x - lineWidth, y, lineWidth, 1)
            }

            context.fillRect(linePositionX, linePositionY, lineX, lineY)
        })
    }
}

window.addEventListener('load', function () {
    const canvas = createCanvas('space')
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasWidth: number = 1400;
    const canvasHeight: number = 700;

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.fillStyle = '#393939'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const coordinateAxes = new CoordinateAxes(canvasWidth, canvasHeight)
    coordinateAxes.draw(ctx)
})