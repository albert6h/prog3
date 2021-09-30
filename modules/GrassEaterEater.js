var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassEaterEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
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
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let grassEaterEater = new GrassEaterEater(x, y);
            grassEaterEaterArr.push(grassEaterEater);
            this.life = 5;
        }
    }
    eat() {
        let arr;
        let newCell;
        if (random([1, 2]) == 1) {
            let emptyCells = this.chooseCell(2);
            newCell = random(emptyCells);
            arr = 1
        } else {
            let emptyCells = this.chooseCell(1);
            newCell = random(emptyCells);
            arr = 1
        }


        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            if (arr = 1) {
                for (let i in grassEaterArr) {
                    if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
            } else {
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1)
                    }
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 12) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in grassEaterEaterArr) {
            if (grassEaterEaterArr[i].x == this.x && grassEaterEaterArr[i].y == this.y) {
                grassEaterEaterArr.splice(i, 1)
            }
        }
    }
}