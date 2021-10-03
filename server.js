//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var GrassEaterEater = require("./modules/GrassEaterEater.js");
var Fire = require("./modules/Fire.js");
var Water = require("./modules/Water.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
fireArr = [];
waterArr = [];
manArr = [];
matrix = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, gr, grEater, grEaterEater, wt, fr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < wt; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 20, 12, 5, 5, 10);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3){
                var grassEaterEater = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(grassEaterEater)
            } else if (matrix[y][x] == 5){
                var fire = new Fire(x, y);
                fireArr.push(fire)
            } else if (matrix[y][x] == 4){
                var water = new Water(x, y);
                waterArr.push(water)
            }
        }
    }
}
creatingObjects();

let season = 0;

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (grassEaterEaterArr[0] !== undefined) {
        for (var i in grassEaterEaterArr) {
            grassEaterEaterArr[i].eat();
        }
    }

    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].spread();
        }
    }

    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].spread();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        grassEaterEaterCounter: grassEaterEaterArr.length,
        fireCounter: fireArr.length,
        waterCounter: waterArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)