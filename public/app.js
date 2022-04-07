//opens and connects to the socket
let socket = io();

//value assigned with user's input
// // // let msg_text;
window.addEventListener("load", function(){

    //listen for confirmation
    socket.on("connect", () => {
        console.log("Connected to the server via sockets")
    })

    // // // //we get the input from the user
    // // // let msg_input = this.document.getElementById("input-msg");

    // // // //we listen to 'Send' button
    // // // let submitButton = document.getElementById('submit-button');
    // // // submitButton.addEventListener('click', function () {
    // // //     msg_text = msg_input.value;
    // // //     //console.log(msg_text);
    // // // });

})

// // // //to resixe window every time there's a change
// // // function windowResized(){
// // //     resizeCanvas(windowWidth, windowHeight);
// // // }


// // //to get the coordinates and input of each text drawn by all the users
// // let drawingCoords={};
// // socket.on('dataFromServer', (data)=> {
// //     drawingCoords = data;
// // })

let xspeed = 1;
let rows = 30;
let columns = 27;

let pacman;
let pacmanX;
let pacmanY;
let direction; // RIGTH : 1; UP: 2; LEFT: 3; DOWN: 4
let wallCoordinates;
let pathCoordinates;

let gameState;

//images
let wall;

//Display P5 Canva
function setup(){
    background(0);
    // // //to create canvas and put it in the background
    canvas = createCanvas(540,600);
    canvas.position(windowWidth/3.5, windowHeight/10);
    canvas.style('z-index', '-1');

    wall = loadImage("images/wall.jpg");

    cell_w = width/columns;
    cell_h = height/rows;

    pacmanX = cell_w/2+cell_w*13;
    pacmanY = cell_h/2+cell_h*22;

    ghostX = cell_w/2+cell_w*13;
    ghostY = cell_h/2+cell_h*14;

    pacman = new Player(pacmanX, pacmanY, cell_w, cell_h);
    ghost = new Player(ghostX, ghostY, cell_w, cell_h);
    frameRate(3);

    //console.log(wallCoordinates);

}


function draw(){
    background(0);

    givePath(rows, columns, cell_w, cell_h);
    drawMap(rows, columns, cell_w, cell_h);
    
    drawGrid();

    pacman.display();
    pacman.move();

    ghost.display();
    ghost.move();

    checkForWalls();

}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        direction = 1;
    } else if (keyCode === UP_ARROW) {
        direction = 2;
       
    } else if (keyCode === LEFT_ARROW) {
        direction = 3;
        
    } else if (keyCode === DOWN_ARROW) {
        direction = 4;
       
    }

//     // // //     socket.emit("msgPositionData", msgPost)
}




class Player {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xspeed = this.w;
        this.yspeed = this.h;
    }

    move(){
        if (direction == 1){
            this.x += this.xspeed;
        }
        else if (direction == 2){
            this.y -= this.yspeed;
        }
        else if (direction == 3){
            this.x -= this.xspeed;
        }
        else if (direction == 4){
            this.y += this.yspeed;
        }
    }



    display(){
        fill(255, 255, 0)
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        //console.log(this.x/this.w)
    }
}


// let wall = 0;

function checkForWalls() {
// // to loop through coordinate values
    for (let i = 0; i < wallCoordinates.length; i++) {
        let wallx = wallCoordinates[i].x;
        let wally = wallCoordinates[i].y;

        if ((direction == 1)&&(pacman.x == wallx-cell_w)&&(pacman.y==wally)){
            gameState = "stop";
        }
    }

    // if ((direction == 1)&&(pacman.x>(width-cell_w))){
    //     pacman.xspeed = 0;
    // } else {
    //     pacman.xspeed = cell_w;
    // }
}




function drawGrid(r, c){
    let rows = r;
    let columns = c;
    
    for (let x = 0; x < width; x += width / columns) {
	    for (let y = 0; y < height; y += height / rows) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
}


function drawMap(r, c, w, h) {
    wallCoordinates = []

    let rows = r;
    let columns = c;
    let cell_w = w;
    let cell_h = h;
    let first_x = cell_w/2;
    let first_y = cell_h/2;

    //blue part of map
    fill(0,0,255);
    imageMode(CENTER);

    //// TOP
    for (let x = first_x; x < width; x += width / columns) {
        let y = first_y;
        image(wall, x, y, cell_w, cell_h);
        
        let coor = {x: x, y: y}
        wallCoordinates.push(coor)
    }

    //// TOP left part
    //column 1
    for (let y = first_y+cell_h; y < cell_h*14; y += height / rows) {
        let x = first_x;
        image(wall, x,y, cell_w, cell_h);
        let coor = {x: x, y: y}
        wallCoordinates.push(coor)
    }



    //rectangle 1
    for (let x = first_x+cell_w*2; x < cell_w*6; x += width / columns) {
        for (let y = first_y+cell_h*2; y < cell_h*5; y += height / rows) {
            image(wall, x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }

    //rectangle 2
    for (let x = first_x+cell_w*7; x < cell_w*12; x += width / columns) {
        for (let y = first_y+cell_h*2; y < cell_h*5; y += height / rows) {
            image(wall, x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 3
    for (let x = first_x+cell_w*2; x < cell_w*6; x += width / columns) {
        for (let y = first_y+cell_h*6; y < cell_h*8; y += height / rows) {
            image(wall, x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 4
    for (let x = first_x+cell_w; x < cell_w*6; x += width / columns) {
        for (let y = first_y+cell_h*9; y < cell_h*14; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 2
    for (let x = first_x+cell_w*7; x < cell_w*9; x += width / columns) {
        for (let y = first_y+cell_h*6; y < cell_h*14; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 5
    for (let x = first_x+cell_w*9; x < cell_w*12; x += width / columns) {
        for (let y = first_y+cell_h*9; y < cell_h*11; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }

    //// TOP right part
    //column 1
    for (let y = first_y+cell_h; y < cell_h*14; y += height / rows) {
        let x = width-first_x;
        image(wall,x,y, cell_w, cell_h);
        let coor = {x: x, y: y}
        wallCoordinates.push(coor)
    }

    //rectangle 1
    for (let x = first_x+width-cell_w*6; x < width-cell_w*2; x += width / columns) {
        for (let y = first_y+cell_h*2; y < cell_h*5; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 2
    for (let x = first_x+width-cell_w*12; x < width-cell_w*7; x += width / columns) {
        for (let y = first_y+cell_h*2; y < cell_h*5; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 3
    for (let x = first_x+width-cell_w*6; x < width-cell_w*2; x += width / columns) {
        for (let y = first_y+cell_h*6; y < cell_h*8; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 4
    for (let x = first_x+width-cell_w*6; x < width-cell_w; x += width / columns) {
        for (let y = first_y+cell_h*9; y < cell_h*14; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 2
    for (let x = first_x+width-cell_w*9; x < width-cell_w*7; x += width / columns) {
        for (let y = first_y+cell_h*6; y < cell_h*14; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 5
    for (let x = first_x+width-cell_w*12; x < width-cell_w*9; x += width / columns) {
        for (let y = first_y+cell_h*9; y < cell_h*11; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }

    //// MIDDLE PART
    //column 1
    for (let x = first_x+cell_w*13; x < cell_w*14; x += width / columns) {
        for (let y = first_y+cell_h; y < cell_h*5; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 1
    for (let x = first_x+cell_w*10; x < cell_w*17; x += width / columns) {
        for (let y = first_y+cell_h*6; y < cell_h*8; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 2
    for (let x = first_x+cell_w*13; x < cell_w*14; x += width / columns) {
        for (let y = first_y+cell_h*8; y < cell_h*11; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 2
    for (let x = first_x+cell_w*10; x < cell_w*17; x += width / columns) {
        for (let y = first_y+cell_h*17; y < cell_h*19; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 3
    for (let x = first_x+cell_w*13; x < cell_w*14; x += width / columns) {
        for (let y = first_y+cell_h*19; y < cell_h*22; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 3
    for (let x = first_x+cell_w*10; x < cell_w*17; x += width / columns) {
        for (let y = first_y+cell_h*23; y < cell_h*25; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 4
    for (let x = first_x+cell_w*13; x < cell_w*14; x += width / columns) {
        for (let y = first_y+cell_h*25; y < cell_h*28; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }


    //// CENTER
    //column 1
    for (let x = first_x+cell_w*10; x < cell_w*12; x += width / columns) {
        for (let y = first_y+cell_h*12; y < cell_h*16; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 2
    for (let x = first_x+cell_w*15; x < cell_w*17; x += width / columns) {
        for (let y = first_y+cell_h*12; y < cell_h*16; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //two little squares (NOTE ADD THESE RECTANGLES TO wallCoordinates)
    image(wall,first_x+cell_w*12, first_y+cell_h*12, cell_w, cell_h);
    image(wall,first_x+cell_w*14, first_y+cell_h*12, cell_w, cell_h);
    //rectangle 1
    for (let x = first_x+cell_w*12; x < cell_w*15; x += width / columns) {
        for (let y = first_y+cell_h*15; y < cell_h*16; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }


    
    //// BOTTOM
    for (let x = first_x; x < width; x += width / columns) {
        let y = height-first_y;
        image(wall, x, y, cell_w, cell_h);
        let coor = {x: x, y: y}
        wallCoordinates.push(coor)
    }

    ////BOTTOM right part
    //column 1
    for (let x = first_x; x < cell_w; x += width / columns) {
        for (let y = first_y+height-cell_h*15; y < height-cell_h; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 1
    for (let x = first_x+cell_w; x < cell_w*6; x += width / columns) {
        for (let y = first_y+height-cell_h*15; y < height-cell_h*11; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 2
    for (let x = first_x+cell_w*7; x < cell_w*9; x += width / columns) {
        for (let y = first_y+height-cell_h*15; y < height-cell_h*11; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 2
    for (let x = first_x+cell_w*2; x < cell_w*6; x += width / columns) {
        for (let y = first_y+height-cell_h*10; y < height-cell_h*8; y += height / rows) {
            image(wall,x, y, cell_w, cell_h); 
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 3
    for (let x = first_x+cell_w*7; x < cell_w*12; x += width / columns) {
        for (let y = first_y+height-cell_h*10; y < height-cell_h*8; y += height / rows) {
            image(wall,x, y, cell_w, cell_h); 
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //square
    for (let x = first_x+cell_w; x < cell_w*3; x += width / columns) {
        for (let y = first_y+height-cell_h*7; y < height-cell_h*5; y += height / rows) {
            image(wall,x, y, cell_w, cell_h); 
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 3
    for (let x = first_x+cell_w*4; x < cell_w*6; x += width / columns) {
        for (let y = first_y+height-cell_h*8; y < height-cell_h*5; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 4
    for (let x = first_x+cell_w*7; x < cell_w*9; x += width / columns) {
        for (let y = first_y+height-cell_h*7; y < height-cell_h*4; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 4
    for (let x = first_x+cell_w*2; x < cell_w*12; x += width / columns) {
        for (let y = first_y+height-cell_h*4; y < height-cell_h*2; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }

    ////BOTTOM left part
    //column 1
    for (let x = first_x+width-cell_w; x < width; x += width / columns) {
        for (let y = first_y+height-cell_h*15; y < height-cell_h; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 1
    for (let x = first_x+width-cell_w*6; x < width-cell_w; x += width / columns) {
        for (let y = first_y+height-cell_h*15; y < height-cell_h*11; y += height / rows) {
            image(wall,x,y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 2
    for (let x = first_x+width-cell_w*9; x < width-cell_w*7; x += width / columns) {
        for (let y = first_y+height-cell_h*15; y < height-cell_h*11; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 2
    for (let x = first_x+width-cell_w*6; x < width-cell_w*2; x += width / columns) {
        for (let y = first_y+height-cell_h*10; y < height-cell_h*8; y += height / rows) {
            image(wall,x, y, cell_w, cell_h); 
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 3
    for (let x = first_x+width-cell_w*12; x < width-cell_w*7; x += width / columns) {
        for (let y = first_y+height-cell_h*10; y < height-cell_h*8; y += height / rows) {
            image(wall,x, y, cell_w, cell_h); 
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //square
    for (let x = first_x+width-cell_w*3; x < width-cell_w; x += width / columns) {
        for (let y = first_y+height-cell_h*7; y < height-cell_h*5; y += height / rows) {
            image(wall,x, y, cell_w, cell_h); 
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 3
    for (let x = first_x+width-cell_w*6; x < width-cell_w*4; x += width / columns) {
        for (let y = first_y+height-cell_h*8; y < height-cell_h*5; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //column 4
    for (let x = first_x+width-cell_w*9; x < width-cell_w*7; x += width / columns) {
        for (let y = first_y+height-cell_h*7; y < height-cell_h*4; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }
    //rectangle 4
    for (let x = first_x+width-cell_w*12; x < width-cell_w*2; x += width / columns) {
        for (let y = first_y+height-cell_h*4; y < height-cell_h*2; y += height / rows) {
            image(wall,x, y, cell_w, cell_h);
            let coor = {x: x, y: y}
            wallCoordinates.push(coor)
        }
    }

}


function givePath(r, c, w, h){
    pathCoordinates= [];

    let rows = r;
    let columns = c;
    let cell_w = w;
    let cell_h = h;
    let first_x = cell_w/2;
    let first_y = cell_h/2;

    for (let x = first_x; x < width; x += width / columns) {
        for (let y = first_y; y < height; y += height / rows) {
            let coor = {x: x, y: y}
            fill(255,255,0);
            ellipse(x, y, 8, 8);
            pathCoordinates.push(coor);
        }
    }
    //console.log(pathCoordinates);
}