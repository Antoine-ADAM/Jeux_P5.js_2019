function setup() {
    createCanvas(displayWidth, displayHeight, WEBGL);
    cam = createCamera();
    img = loadImage('https://static.wixstatic.com/media/b8c8c8_22c2092dd3824fad86735a415e091ec5~mv2.jpg');
    img2 = loadImage('de.png');
    pg = createGraphics(100, 100);
  }
var pg;
var img;
var img2;
let cam;
var fpsMilis=0;
var fps=0;
var delta1=0;
const vitesseMax=0.2;
var delta2=0;
function draw() {
      background(175);
      plane(500,500);
      if(millis()<1500){
        delta1=rotationZ;
        delta2=rotationX;
      }
      var delta1d=(rotationZ-delta1)*0.05;
      var delta2d=(rotationX-delta2)*0.05;
      if(abs(delta1d)>vitesseMax){
        if(delta1d<0){
          delta1d=-vitesseMax;
        }else{
          delta1d=vitesseMax;
        }
      }
      if(abs(delta2d)>vitesseMax){
        if(delta2d<0){
          delta2d=-vitesseMax;
        }else{
          delta2d=vitesseMax;
        }
      }
      if(fpsMilis<millis()){
        fpsMilis=millis()+500;
        fps=int(frameRate());
    }
    pg.clear();
    pg.text("FPS:"+fps,15,20);
    fill(250,0,0);
    stroke(0,250,0)
    cam.pan(delta2d);
    cam.tilt(delta1d);
    delta1=rotationZ;
    delta2=rotationX;
    //if(delta1d<delta2d){
      //texture(img);
    //}  
    //box(1500);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(img2);
    torus(300, 150);
  }