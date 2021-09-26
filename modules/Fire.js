var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Fire extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    spread() {
        this.multiply++;
        let emptyCells1 = this.chooseCell(1);
        let emptyCells2 = this.chooseCell(2);
        let emptyCells3 = this.chooseCell(3);
        let emptyCells = random([emptyCells1, emptyCells2, emptyCells3])
        let newCell = random(emptyCells);

        if (this.multiply >= 5) {
            if (newCell){
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 5;
                let fire = new Fire(x, y);
                fireArr.push(fire);
                this.multiply = 0;
            } else if(emptyCells1.length == 0 && emptyCells2.length == 0 && emptyCells3.length == 0) {
                this.die()
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i in fireArr) {
            if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                fireArr.splice(i, 1)
            }
        }
    }
}