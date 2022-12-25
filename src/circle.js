export default class Circle{
    constructor(x, y, size, speed, color){
        this.x = x
        this.y = y
        this.size = size
        this.speed = speed
        this.color = color
    }

    drawCircle(context){
        this.circle(context,
            this.x, this.y, this.size, this.line, this.color, this.color)
    }

    circle(context, x, y, radius, line, color, fill = false){
        context.lineWidth = line
        context.strokeStyle = color
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.stroke()

        if(fill){
            context.fillStyle = fill
            context.fill()
        }
    }

    colision(object){
        return(
            this.hurtbox.size + object.size >= Math.sqrt((this.hurtbox.x - object.x) ** 2 + (this.hurtbox.y - object.y) ** 2)
        )
    }
}