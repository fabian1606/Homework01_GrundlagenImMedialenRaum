// const { color } = require("echarts");

let objects = [];
let size = 40;
let ballcolor

function setup() {
    createCanvas(800, 800);
    colorMode(HSB ,360,100,100,1);
    for (let x = 0; x < 60; x++) {
        for (let y = 0; y < 60; y++) {
            objects.push( new MyObject((width/size)*x,y*(height/size), size));
        }
    }

        ballcolor = color(20,80,100)
 
}

function draw() {
    background(0);
    objects.forEach(obj => {
        obj.display(mouseincanvas());
        // obj.setColor(ballcolor)
    });
    
}

function mouseincanvas() {
    return (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
}
function mousePressed(){
    for (let index = 0; index < objects.length; index++) {
        const obj = objects[index];
        // obj.setColor(color(map(index%size,0,size,0,360),map(parseInt(index/size),0,size,0,225),100));
        // console.log(map(index%size,0,size,0,360));
        obj.setColor(color(int(map(index/size,0,size,0,255)),100,100));
        
        // console.log(map(index%size,0,size,0,100));
    }
}
function mouseReleased(){
    for (let index = 0; index < objects.length; index++) {
        const obj = objects[index];
        obj.setColor(color(int(map(mouseX,0,width,0,360)),100,100));
    }
}