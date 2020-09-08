//some problems when the eventhandler loads
//before the library does.
let traj = document.getElementById('phase');
// let canvas = document.getElementsByTagName('canvas')[0]
// let ctx = canvas.getContext('2d');

//initial conditions:
let theta = Math.PI/1.9, td = 0, phi = 0, pd = Math.PI/6, g = 1;
let r = 1, xs = [], ys = [], zs = [], step = 0.001;



for (let i = 0; i < 30000; i++){

    tdd = (
        (pd**2)*Math.sin(theta)*Math.cos(theta)-(g*Math.sin(theta))/r
    )

    pdd = (
        -2*td*pd*(Math.cos(theta)/Math.sin(theta))
    )
    // console.log(pdd)
    //updates
    pd = pd + pdd*step;
    phi = phi + pd*step;
    td = td + tdd*step;
    theta = theta + td*step 

    pos = {
        x:r*Math.sin(theta)*Math.cos(phi),
        y:r*Math.sin(theta)*Math.sin(phi),
        z:-r*Math.cos(theta)
    }

    if (i%50 == 0) {
        xs.push(pos.x)
        ys.push(pos.y)
        zs.push(pos.z);
    }

}


let trace = {
    x:xs,
    y:ys,
    z:zs,
    mode:'markers',
    type:'scatter3d',
    marker: {
        color: 'rgba(0, 50, 210, 0.4)',
        size:7
    }
}
// let layout = {
//     xaxis: {range:[-1.5, 1.5]},
//     yaxis: {range:[-1.5, 1.5]}
// }

Plotly.newPlot(traj, [trace])


function loop() {
    // c.clearRect(canvas.width, canvas.height)
    //rest of the animation from above physics
    //(bundle as separate functions.)
}

// requestAnimationFrame(loop)