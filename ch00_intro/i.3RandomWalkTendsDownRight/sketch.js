
// The Nature of Code
// natureofcode.com
// Diane Cai 05/18

let walker; 

function setup() {
    createCanvas(640,360);
    walker = new LopsidedWalker();
    background('rgba(0,255,0, 0.25)');
}

function draw() {
    walker.render();
    walker.step();
}

class LopsidedWalker {
    constructor(){
        // start out in center
        this.x = width/2;
        this.y = height/2;
        this.colorShift = 2
        this.colorVals = [0, 0, 0]
        this.colorIndex = 0
    }

    changeColor(change, index) {
        let proposed = this.colorVals[index] + change
        this.colorVals[index] = proposed > 255 | proposed < 0 ? proposed - change * 2 : proposed
    }

    atEdge(val) {
      let colorEnds = [0, 255]
      return val + this.colorShift < colorEnds[0] ||  val + this.colorShift > colorEnds[1]
    }

    colorDirection() {
        let colorVector = this.colorShift
        if (this.colorVals.every(x => this.atEdge(x))) {
            colorVector = 0 - this.colorShift
        }
        return colorVector
    }

    idRGB() {
        let index = this.colorIndex
        if (this.atEdge(this.colorVals[this.colorIndex])) {
            if (this.colorIndex < 2) {
                index++
            } else {
                index = 0
            }   
        } 
        return index
    }

    determineRGBChange() {  
        this.colorShift = this.colorDirection()
        this.colorIndex = this.idRGB()

        this.colorVals[this.colorIndex] += this.colorShift
    }

    setColor() {
        let r,g,b
        [r, g, b] = this.colorVals
        return `rgba(${r},${g},${b},0.25)`
    }

    render() {
        this.color = this.setColor();
        console.log(this.color)
        stroke(this.color);
        point(this.x, this.y);
    }

    step() {
        let xChoice = random();
        let yChoice = random();

        let probability = random();

        if (probability > 0.6) {
            xChoice = 0 - xChoice;
            yChoice = 0 - yChoice;
        }

        this.determineRGBChange()
        this.x += xChoice;
        this.y += yChoice;
    }
}