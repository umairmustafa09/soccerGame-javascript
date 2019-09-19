const canvas = document.getElementById( "canvas" );
const context = canvas.getContext( "2d" );



//declaring and intializing variables.
let ball = { 
                x: Math.floor( window.innerWidth  / 2 ),
                y: Math.floor( window.innerHeight / 2 ), 
                velocity: { x: 0, y: 0 },
                mass: 1,
                radius:  Math.floor( window.innerHeight / 12 ) / 2  
            };


let player = { 
                x: 0,
                y: 0,
                mass: 1,
                velocity: { x: 2, y: 3 },
                radius: Math.floor( window.innerHeight / 10 ) / 2 
            };



//calling function when window start or restart 
randomVelocity();
draw();
setInterval( movingBall, 10 );



//random velocity for x and y axis.
function randomVelocity(){
        ball.velocity.x = ( Math.random() - 0.5 ) * 5;
        ball.velocity.y  = ( Math.random() - 0.5 ) * 5;
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



canvas.onmousemove = function ( evnet ){
    //condition to stick player in its boundry.
    if( evnet.clientX < ( canvas.width / 2 ) - player.radius){
        player.x = evnet.clientX, player.y = evnet.clientY; 
    }
    user();
}



function user(){
    player.radius =  Math.floor( (canvas.height / 10) / 2 );
    context.strokeStyle = "orange";
    context.fillStyle = "orange";
    context.beginPath();
    context.arc( player.x, player.y, player.radius, 0, 2 * Math.PI );
    context.stroke();
    context.fill();
}



function movingBall(){
    draw();
    user();
    ball.radius =  Math.floor( (canvas.height / 12) / 2 );


    //changing state of flag when x and y axis of ball touches the boundry.
   

    if( ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width )
        ball.velocity.x = -ball.velocity.x;
    else if( ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height )
        ball.velocity.y = -ball.velocity.y;


    const td = distance( ball, player )
    if ( td <= ball.radius + player.radius ){
        resolveCollision( ball, player );
        // console.log( ball.radius + player.radius, td );
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



function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}



function resolveCollision(ball, player) {
    const xVelocityDiff = ball.velocity.x - player.velocity.x;
    const yVelocityDiff = ball.velocity.y - player.velocity.y;

    const xDist = player.x - ball.x;
    const yDist = player.y - ball.y;

    // Prevent accidental overlap of balls
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding balls
        const angle = -Math.atan2(player.y - ball.y, player.x - ball.x);

        // Store mass in var for better readability in collision equation
        const m1 = player.mass;
        const m2 = ball.mass;

        // Velocity before equation
        const u1 = rotate(ball.velocity, angle);
        const u2 = rotate(player.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);

        // Swap ball velocities for realistic bounce effect
        ball.velocity.x = vFinal1.x;
        ball.velocity.y = vFinal1.y;
    }
}
