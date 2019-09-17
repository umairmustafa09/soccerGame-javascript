const canvas = document.getElementById( "canvas" );
const context = canvas.getContext( "2d" );


let ballX = window.innerWidth  / 2, ballY = window.innerHeight / 2, radius = 0, playerX = 0, playerY = 0 , flagX = 0, flagY = 0;
let xv = 0, yv = 0;




//random velocity for x and y axis.
function randomVelocity(){
        xv = Math.floor( Math.random() * 4); // numeric 3 is just for speed.
        yv = Math.round( Math.random() * 4);
}

randomVelocity();
draw();
setInterval( ball , 10 );

while( xv == 0 || yv == 0 ){
    randomVelocity();
}

console.log( { xv, yv });





function draw(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //addign background color.
    radius =  (canvas.height / 10) / 2; 
    context.fillStyle = "rgb( 61, 75, 80 )";
    context.fillRect( 0, 0, canvas.width, canvas.height);
    groundDesign();
}




function groundDesign(){
    //drawing goals on each side.
    context.fillStyle = "red" ;
    //left side goal.
    context.fillRect( 5, canvas.height / 3, 5, canvas.height / 2.5);
    //right side goal.
    context.fillRect( canvas.width - 10, canvas.height / 3, 5, canvas.height / 2.5);

    //drawing line between ground
    context.fillStyle = "white" ;
    context.fillRect( canvas.width / 2, 0, 3, canvas.height);

    //drawing circle on middle line.
    context.strokeStyle = "white";
    context.beginPath();
    context.arc( canvas.width / 2, canvas.height / 2, canvas.width / 10 + canvas.height / 10, 0 , 2 * Math.PI  );
    context.stroke();
}




canvas.onmousemove = function ( evnet ){
    //condition to stick player in its boundry.
    if( evnet.clientX < ( canvas.width / 2 ) - radius){
        playerX = evnet.clientX, playerY = evnet.clientY; 
    }
    player();
}





function player(){
    context.strokeStyle = "orange";
    context.fillStyle = "orange";
    context.beginPath();
    context.arc( playerX, playerY, radius, 0, 2 * Math.PI );
    context.stroke();
    context.fill();
}




function ball(){
    draw();
    player();
    radius =  (canvas.height / 12) / 2; 
    if( ballX > canvas.width - radius)
        flagX = 1;
    else if( ballX < 0 + radius ){
        flagX = 0;
    }
    else if( ballY > canvas.height - radius )
        flagY = 1;
    else if( ballY < 0 + radius ){
        flagY = 0;
    }

    flagX == 0 ? ballX += xv : ballX -= xv;
    flagY == 0 ? ballY += yv : ballY -= yv;

    //desing ball.
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.beginPath();
    context.arc( ballX, ballY, radius, 0, 2 * Math.PI );
    context.stroke();
    context.fill();
}