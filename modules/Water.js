var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Water extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }

    chooseCell(character) {
        return super.chooseCell(character);
    }
    spread() {
        this.multiply++;
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells);

        if (this.multiply > 13) {
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 4;
                let water = new Water(x, y);
                waterArr.push(water);
                this.multiply = 0;
            }
        }

        let fireCells = this.chooseCell(5)

        for (let Cell in fireCells) {
            if (Cell) {
                let x = Cell[0]
                let y = Cell[1]

                for (let i in fireArr) {
                    if (fireArr[i].x == x && fireArr[i].y == y) {
                        fireArr.splice(i, 1)
                        this.die()
                    }
                }
            }
        }

    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i in waterArr) {
            if (waterArr[i].x == this.x && waterArr[i].y == this.y) {
                waterArr.splice(i, 1)
            }
        }
    }
}