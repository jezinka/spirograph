function getPoint(outerCircleRadius, innerCircleRadius, offset, i) {
    let x, y = 0;

    if (document.getElementById('inside').checked) {
        x = (outerCircleRadius - innerCircleRadius) * Math.cos(i) + offset * Math.cos(((outerCircleRadius - innerCircleRadius) / innerCircleRadius) * i);
        y = (outerCircleRadius - innerCircleRadius) * Math.sin(i) - offset * Math.sin(((outerCircleRadius - innerCircleRadius) / innerCircleRadius) * i);
    } else {
        x = (outerCircleRadius + innerCircleRadius) * Math.cos(i) - offset * Math.cos(((outerCircleRadius + innerCircleRadius) / innerCircleRadius) * i);
        y = (outerCircleRadius + innerCircleRadius) * Math.sin(i) - offset * Math.sin(((outerCircleRadius + innerCircleRadius) / innerCircleRadius) * i);
    }

    return {x, y};

}

function draw() {
    let layer2 = document.getElementById('layer2');
    let ctx = layer2.getContext("2d");

    drawCircles();

    let innerCircleRadius = document.getElementById('innerCircle').value;
    let outerCircleRadius = document.getElementById('outerCircle').value;
    let offset = document.getElementById('offset').value;

    let time = document.getElementById('time').value;

    for (let i = 0; i < time; i++) {
        let {x, y} = getPoint(innerCircleRadius, outerCircleRadius, offset, i);
        ctx.strokeStyle = document.getElementById('colorPicker').value;
        ctx.beginPath();
        ctx.rect(x + layer2.width / 2, y + layer2.height / 2, 1, 1);
        ctx.stroke();
    }
}


function drawCircles() {
    let layer1 = document.getElementById('layer1');
    let ctx = layer1.getContext("2d");


    let outerCircleRadius = document.getElementById('outerCircle').value;
    let innerCircleRadius = document.getElementById('innerCircle').value;
    let offset = document.getElementById('offset').value;

    ctx.strokeStyle = '#ff9f26';
    ctx.beginPath();
    ctx.arc(layer1.width / 2, layer1.height / 2, outerCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.moveTo((layer1.width / 2) - (outerCircleRadius - innerCircleRadius), layer1.height / 2);

    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc((layer1.width / 2) - (outerCircleRadius - innerCircleRadius), layer1.height / 2, innerCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = '#2cff01';
    ctx.beginPath();
    ctx.arc((layer1.width / 2) - (outerCircleRadius - innerCircleRadius - offset), layer1.height / 2, 2, 0, 2 * Math.PI);
    ctx.stroke()
}

function refreshCircles() {
    clear('layer1');
    drawCircles();
}

function clear(canvas) {
    let layer = document.getElementById(canvas);
    let ctx = layer.getContext("2d");

    ctx.beginPath();
    ctx.clearRect(0, 0, layer.width, layer.height);
    ctx.stroke();
}

function random() {
    document.getElementById('innerCircle').value = Math.floor((Math.random() * 250) + 1);
    document.getElementById('outerCircle').value = Math.floor((Math.random() * 250) + 1);
    document.getElementById('offset').value = Math.floor((Math.random() * 250) + 1);
    document.getElementById('colorPicker').value = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    refreshCircles();
    draw();
}

function initElement() {
    document.getElementById("clearButton").onclick = () => clear('layer2');
    document.getElementById("drawButton").onclick = draw;
    document.getElementById("randomButton").onclick = random;
    document.getElementById('innerCircle').onchange = refreshCircles;
    document.getElementById('outerCircle').onchange = refreshCircles;
    document.getElementById('offset').onchange = refreshCircles;
}

refreshCircles();