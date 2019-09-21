const canvas = document.getElementById( "canvas" );
const context = canvas.getContext( "2d" );



//declaring and intializing variables.
let ball = {    x: Math.floor( window.innerWidth  / 2 ),
                y: Math.floor( window.innerHeight / 2 ), 
                velocity: { x: 0, y: 0 },
                mass: 1,
                radius:  Math.floor( window.innerHeight / 12 ) / 2  
};


let player = {  x: 0,
                y: 0,
                mass: 1,
                velocity: { x: 0.5, y: 0 },
                radius: Math.floor( window.innerHeight / 10 ) / 2 
};

let opponent = {    x: window.innerWidth - 50,
                    y: window.innerHeight / 2,
                    mass: 1,
                    velocity: { x: 0.5, y: 0 },
                    radius: Math.floor( window.innerHeight / 10 ) / 2,
                    velocity: { y: 0 },
};



//calling function when window start or restart 
randomVelocity();
draw();
setInterval( movingBall, 10 );
setInterval( opponentBall, 10 );



//random velocity for x and y axis.
function randomVelocity(){
        ball.velocity.x = ( Math.random() - 1 ) * 5;
        ball.velocity.y  = ( Math.random() - 1 ) * 5;
        opponent.velocity.y = Math.abs( ball.velocity.y )
}



function draw(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //addign background color.
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



onmousemove = function ( event ){
    const tempPlayer = { x: event.clientX, y: event.clientY  }; //temppLyaer to check player's ball and moving ball is overlaping or not;
    const td = distance( ball, tempPlayer );
    
    if( tempPlayer.x + player.radius < canvas.width / 2 )
        if( td  > ball.radius + player.radius * 1.8)
            player.x = event.clientX , player.y = event.clientY;
    PlayerBall();
}



function PlayerBall(){
    player.radius =  Math.floor( (canvas.height / 10) / 2 );
    //displaying player's ball on the screen.
    context.strokeStyle = "orange";
    context.fillStyle = "orange";
    context.beginPath();
    context.arc( player.x, player.y, player.radius, 0, 2 * Math.PI );
    context.stroke();
    context.fill();
}


//opponent ball function.
function opponentBall(){
    const td = distance( ball, opponent );
    opponent.radius =  Math.floor( (canvas.height / 10) / 2 );

    if( td  > ball.radius + opponent.radius * 1.8)
        ball.y > opponent.y ? opponent.y += opponent.velocity.y : opponent.y -= opponent.velocity.y;


    if ( td <= ball.radius + opponent.radius ){
            let rotatedVelocities =  rotate(); 
            ball.velocity.x = -rotatedVelocities.x;
            ball.velocity.y = -rotatedVelocities.y; 

            ball.x += ball.velocity.x;
            ball.y += ball.velocity.y;
            opponent.velocity.y = Math.abs( ball.velocity.y )
    }


    //displaying opponent's ball on the screen.
    context.strokeStyle = "brown";
    context.fillStyle = "brown";
    context.beginPath();
    context.arc( opponent.x, opponent.y, opponent.radius, 0, 2 * Math.PI );
    context.stroke();
    context.fill();
}



function movingBall(){
    draw();
    PlayerBall();
    opponentBall();

    
    ball.radius =  Math.floor( (canvas.height / 12) / 2 );
    
    //changing state of flag when x and y axis of ball touches the boundry.
    if( ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width )
        ball.velocity.x = -ball.velocity.x;
    else if( ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height )
        ball.velocity.y = -ball.velocity.y;



    const td = distance( ball, player );
    if ( td <= ball.radius + player.radius ){
            let rotatedVelocities =  rotate(); 
            ball.velocity.x = -rotatedVelocities.x;
            ball.velocity.y = -rotatedVelocities.y; 
    }
    

    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;

    
    //desing ball.
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.beginPath();
    context.arc( ball.x, ball.y, ball.radius, 0, 2 * Math.PI );
    context.stroke();
    context.fill();
}



function distance(ball, player){
    let d =  ( ball.x - player.x ) * ( ball.x - player.x ) + ( ball.y - player.y ) * ( ball.y - player.y );
    let td = Math.sqrt( d );
    return td;
}   




function rotate() {
    const angle = -Math.atan2(ball.y,ball.x);

    const rotatedVelocities = {
        x: ball.velocity.x * Math.cos(angle) -  ball.velocity.y * Math.sin(angle),
        y: ball.velocity.x * Math.sin(angle) +  ball.velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}
