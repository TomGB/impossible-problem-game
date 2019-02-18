var imgR=['0', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];
var imgN=['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16']
var imgX=[0, 510, 610, 710, 810, 510, 610, 710, 810, 510, 610, 710, 810, 510, 610, 710, 810];
var imgY=[0, 10, 10, 10, 10, 110, 110, 110, 110, 210, 210, 210, 210, 310, 310, 310, 310];
var hLocX=[0, 510, 610, 710, 810, 510, 610, 710, 810, 510, 610, 710, 810, 510, 610, 710, 810];
var hLocY=[0, 10, 10, 10, 10, 110, 110, 110, 110, 210, 210, 210, 210, 310, 310, 310, 310];
var gLoc=[0, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
var inPlay = 0
var usedLoc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var sideN = [0, 4, 1, 3, 4, 4, 3, 2, 3, 4, 2, 2, 2, 4, 4, 4, 3];
var sideE = [0, 3, 2, 3, 1, 3, 2, 1, 3, 1, 4, 2, 4, 4, 1, 3, 1];
var sideS = [0, -3, -2, -4, -2, -4, -2, -3, -2, -3, -4, -4, -4, -4, -1, -1, -2];
var sideW = [0, -2, -4, -1, -2, -1, -4, -1, -1, -4, -2, -3, -1, -2, -4, -3, -3];
var vld = 0;

function draw() {
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
        ctx.drawImage(document.getElementById('board'), 0, 0);
    for (var i = 1; i < 17; i++) {
        ctx.drawImage(document.getElementById(imgR[i]+imgN[i]), imgX[i], imgY[i]);
    }
}

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
    canvas.addEventListener
    canvas.onclick = function() {
//start of function;
        bLoc = 0;
        var x = event.pageX;
        var y = event.pageY;

        var colX = (Math.floor(x / 100));

        if (colX > 4) {
            colX -= 1;
            bLoc += 12;
        }
        
        var rowY = (Math.floor(y / 100));
        bLoc = bLoc + (((rowY * 4)-4)+colX);
        
        if (x < 500) {
// choice is cut if location occupied;
// or move previously marked piece if location vacant;

            if (inPlay > 0 && usedLoc[bLoc] == 0) {

// check before moving that move is valid

                usedLoc[bLoc] = inPlay;
                var vld = validate();

                if (vld == 0) {

                    // piece chosen, location vacant adn move legal;
                    // move piece;

                    imgX[inPlay] = (((Math.floor(x/100))*100)-90);
                    imgY[inPlay] = (((Math.floor(y/100))*100)-90);
                    inPlay = 0;

                    draw();
                }
                else {
                    alert ('illegal move');
                    usedLoc[bLoc] = 0;
                    inPlay = 0;
                }

            }

// cut
            else {
            imgX[usedLoc[bLoc]] = hLocX[usedLoc[bLoc]];
            imgY[usedLoc[bLoc]] = hLocY[usedLoc[bLoc]];

            draw();
            usedLoc[bLoc] = 0;
            inPlay = 0;
            }

        }
        else {
// choice is rotate or mark for use;
            for (var j = 1; j < 17; j++) {
                if (bLoc == gLoc[j]) {
                    inPlay = j;
            }
         }

    if(((x - (Math.floor(x/100)*100))<30) &&
       ((y - (Math.floor(y/100)*100))<30)) {

// rotate code;

        if (imgR[inPlay] == 'd') {
            imgR[inPlay] = 'a';
        } else if (imgR[inPlay] == 'c') {
                   imgR[inPlay] = 'd';
            } else if (imgR[inPlay] == 'b') {
                       imgR[inPlay] = 'c';
        } else {
            imgR[inPlay] = 'b';
        }

        var tempN = sideN[inPlay];
        sideN[inPlay] = sideW[inPlay];
        sideW[inPlay] = sideS[inPlay];
        sideS[inPlay] = sideE[inPlay];
        sideE[inPlay] = tempN;

    draw();
    inPlay = 0;
    }

        else {
//alert ('chosen' + inPlay);
        }

    }
}


function validate() {

    var vld = 0;

    if ((bLoc) > 4) {
        // check N;
        if (((sideN[usedLoc[bLoc]]) + (sideS[usedLoc[bLoc - 4]]) != 0) && ((sideN[usedLoc[bLoc]]) + (sideS[usedLoc[bLoc - 4]]) != (sideN[usedLoc[bLoc]]))) {
            vld += 1;
//            alert ('N not valid');
        }
        else {
//            alert ('N valid');
        }
    }

    if ((bLoc) / 4 != Math.floor(bLoc / 4)) {
        // check E;
        if (((sideE[usedLoc[bLoc]]) + (sideW[usedLoc[bLoc + 1]]) != 0) && ((sideE[usedLoc[bLoc]]) + (sideW[usedLoc[bLoc + 1]]) != (sideE[usedLoc[bLoc]]))) {
            vld += 1;
//            alert ('E not valid');
        }
        else {
//            alert ('E valid');
        }
    }

    if ((bLoc) < 13) {
        // check S;
        if (((sideS[usedLoc[bLoc]]) + (sideN[usedLoc[bLoc + 4]]) != 0) && ((sideS[usedLoc[bLoc]]) + (sideN[usedLoc[bLoc + 4]]) != (sideS[usedLoc[bLoc]]))) {
            vld += 1;
//            alert ('S not valid');
        }
        else {
//            alert ('S valid');
        }
    }

    if ((((bLoc) / 4) - (Math.floor((bLoc) / 4))) != 0.25) {
        // check W;
        if (((sideW[usedLoc[bLoc]]) + (sideE[usedLoc[bLoc - 1]]) != 0) && ((sideW[usedLoc[bLoc]]) + (sideE[usedLoc[bLoc - 1]]) != (sideW[usedLoc[bLoc]]))) {
            vld += 1;
//            alert ('W not valid');
        }
        else {
//            alert ('W valid');
        }
    }

return (vld);

}