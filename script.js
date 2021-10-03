
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterEaterCountElement = document.getElementById('grassEaterEaterCount');
    let fireCounterElemrnt = document.getElementById('fireCount');
    let waterCounterElemrnt = document.getElementById('waterCount');

    let seasonChanger = document.getElementById("btnsc");
    let seasonElement = document.getElementById("SeasonLabel");

    let season = 0;

    let colorSystem = [
        ["white", "orange", "red", "yellow", "cyan"],
        ["green", "orange", "red", "yellow", "blue"],
        ["#34eb4c", "orange", "red", "yellow", "blue"],
        ["green", "orange", "red", "yellow", "blue"]

    ];

    let Seasons = ["Winter", "Spring", "Summer", "Autumn"]

    seasonChanger.addEventListener("click", ()=>{
        season += 1;
        season %= 4;

        seasonElement.innerText = "Season: " + Seasons[season];
    });


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {        
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;  
        grassEaterEaterCountElement.innerText = data.grassEaterEaterCounter;
        fireCounterElemrnt.innerText = data.fireCounter;
        waterCounterElemrnt.innerText = data.waterCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill(colorSystem[season][0]);
                } else if (matrix[i][j] == 2) {
                    fill(colorSystem[season][1]);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    fill(colorSystem[season][3]);
                } else if (matrix[i][j] == 4) {
                    fill(colorSystem[season][4]);
                } else if (matrix[i][j] == 5) {
                    fill(colorSystem[season][3]);
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}