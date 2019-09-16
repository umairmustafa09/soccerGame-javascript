const canvas = document.getElementById( "canvas" );
const context = canvas.getContext( "2d" );

draw();

function draw(){
    canvas.height = window.innerHeight + scrollY;
    canvas.width = window.innerWidth + scrollX;
    //addign background color.
    context.fillStyle = "rgb(61, 75, 80)" ;
    context.fillRect( 0, 0, canvas.width, canvas.height);
    //calling ground design function.
    groundDesign();
}

function groundDesign(){
    //drawing goals on each side.
    context.fillStyle = "red" ;
    //left side goal.
    context.fillRect( 5, canvas.height/3, 5, canvas.height/2.5);
    //right side goal.
    context.fillRect( canvas.width - 10, canvas.height/3, 5, canvas.height/2.5);

    //drawing line between ground
    context.fillStyle = "white" ;
    context.fillRect( canvas.width/2, 0, 3, canvas.height);

    //drawing circle on middle line.
    context.strokeStyle = "white";
    context.beginPath();
    context.arc( canvas.width / 2, canvas.height / 2, canvas.width / 10 + canvas.height / 10, 0 , 2 * Math.PI  );
    context.stroke();
}

