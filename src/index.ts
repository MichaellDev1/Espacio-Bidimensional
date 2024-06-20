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


class DimensionalSpace {
    #canvasWidth: number
    #canvasHeight: number
    #distanceBetween: number
    #context: CanvasRenderingContext2D | null
    coordinates: {
        x: number, y: number, value: number, type: 'X' | 'Y' | '0'
    }[]

    constructor(canvasWidth: number = 0, canvasHeight: number = 0, distanceBetween: number = 45) {
        this.#canvasHeight = canvasHeight
        this.#canvasWidth = canvasWidth
        this.#context = null
        this.coordinates = []
        this.#distanceBetween = distanceBetween
    }

    draw(context: CanvasRenderingContext2D) {
        // Build axe Y
        context.fillStyle = '#1f1f1f'
        context.fillRect(this.#canvasWidth / 2, 0, 1, this.#canvasHeight)

        // Build axe X
        context.fillStyle = '#1f1f1f'
        context.fillRect(0, this.#canvasHeight / 2, this.#canvasWidth, 1)

        this.#buildCoordinates(context)
    }

    // Distance between coordinates = 25
    #buildCoordinates(context: CanvasRenderingContext2D) {
        this.#context = context
        const halfCanvasWidth = this.#canvasWidth / 2
        const halfCanvasHeight = this.#canvasHeight / 2
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
                const axeDistance = (pointsCreateds * this.#distanceBetween)

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

        createPointCoortinate((halfCanvasWidth / this.#distanceBetween), 'X')
        createPointCoortinate((halfCanvasHeight / this.#distanceBetween), 'Y')

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

    createLine(y: number, x: number) {
        if (!this.#context) return;

        const halfCanvasWidth = this.#canvasWidth / 2
        const halfCanvasHeight = this.#canvasHeight / 2
        
        let positions = {
            y: y > 0 ? halfCanvasHeight - (y * this.#distanceBetween) : halfCanvasHeight + -(this.#distanceBetween * Math.trunc(y)),
            x: x > 0 ? halfCanvasWidth + (this.#distanceBetween * x) : (halfCanvasWidth - -(this.#distanceBetween * Math.trunc(x)))
        }   

        this.#context.fillStyle = '#fff'

        this.#context.beginPath()
        this.#context.moveTo(halfCanvasWidth, positions.y)
        this.#context.lineTo(positions.x, positions.y)

        this.#context.moveTo(positions.x, halfCanvasHeight)
        this.#context.lineTo(positions.x, positions.y)
        this.#context.stroke()
    }
}

window.addEventListener('load', function () {
    const canvas = createCanvas('space')
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasWidth: number = 1400;
    const canvasHeight: number = 700;

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const DISTANCE_BETWEEN = 40
    ctx.fillStyle = '#393939'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const dimensionalSpace = new DimensionalSpace(canvasWidth, canvasHeight, DISTANCE_BETWEEN)
    dimensionalSpace.draw(ctx)
    for (let i = 1; i - 1 < 4; i++) {
        dimensionalSpace.createLine(-i, -i)
        dimensionalSpace.createLine(i, -i)
        dimensionalSpace.createLine(i, i)
        dimensionalSpace.createLine(-i, i)
    }
})