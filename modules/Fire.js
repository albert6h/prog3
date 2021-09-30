var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Fire extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }

    chooseCell(character) {
        return super.chooseCell(character);
    }
    spread() {
        this.multiply++;
        let target = random([1, 2, 3])
        let emptyCells = this.chooseCell(target)
        let newCell = random(emptyCells);

        if (this.multiply >= 8) {
            if (newCell){
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 5;
                let fire = new Fire(x, y);
                fireArr.push(fire);
                this.multiply = 0;

                if(target == 1){
                    for (let i in grassArr) {
                        if (grassArr[i].x == x && grassArr[i].y == y) {
                            grassArr.splice(i, 1)
                        }
                    }
                } else if(target == 2){
                    for (let i in grassEaterArr) {
                        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                            grassEaterArr.splice(i, 1)
                        }
                    }
                } else if(target == 3){
                    for (let i in grassEaterEaterArr) {
                        if (grassEaterEaterArr[i].x == x && grassEaterEaterArr[i].y == y) {
                            grassEaterEaterArr.splice(i, 1)
                        }
                    }
                }


            } else {
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