function setup() {

    createCanvas(displayWidth, displayHeight);

    fullscreen(true);

    page0 = new Page0();

    page0.gene();

    game0 = new Game0();

  }

var pageAc;

var page0;

var game0;

class Game0{

    constructor(){

        this.effetGene=1;

        this.score=0;

        this.vie=5;

        this.fpsMilis=0;

        this.fps=0;

        this.boules=[];

        for(var i =0;i<100;i++){

            this.boules[i]= new boule();

        }

    }

    gene(){

        switch(this.effetGene){

            case 1:

                pageAc=2;

                rectMode(CORNER);

                textAlign(CENTER); 

                fill("rgba(35, 30, 35,0.7)");

                textSize(250);

                text("3",width/2,height/2);

                fill("rgba(236, 240, 241,0.1)");

                break;

            case 20:

                fill("rgba(35, 30, 35,0.7)");

                text("2",width/2,height/2);

                fill("rgba(236, 240, 241,0.1)");

                break;

            case 40:

                fill("rgba(35, 30, 35,0.7)");

                text("1",width/2,height/2);

                fill("rgba(236, 240, 241,0.1)");

                break;

            case 60:

                pageAc=1;

                textSize(12);

                textAlign(LEFT); 

                break;

        }   

        rect(0,0,width,height);

        this.effetGene++;

    };

    gameOver(){

        pageAc=3;

        textAlign(CENTER,CENTER);

        fill("rgba(35, 30, 35,0.5)");

        textSize(180);

        noStroke();

        text("SCORE "+this.score+"\nClick !",width/2,height/2);

    };

    drawGame(){

        if(this.vie <= 0){

            this.gameOver();

            return null;

        }

        background("#ECF0F1");

        fill("#000000");

        if(this.fpsMilis<millis()){

            this.fpsMilis=millis()+500;

            this.fps=int(frameRate());

        }

        text("FPS:"+this.fps,15,20);

        text("Points:"+this.score,15,30);

        text("Vie:"+this.vie,15,40);

        fill(color(int(cos(0.001*millis()+70)*255),int(cos(0.001*millis()+190)*255),int(cos(0.001*millis())*255)));

        ellipse(mouseX,mouseY,10,10);

        for(var i=0;i<this.boules.length;i++){

            this.boules[i].x+=this.boules[i].vx;

            this.boules[i].y+=this.boules[i].vy;

            this.boules[i].draw();

            if(this.boules[i].colision()){

                if(this.boules[i].e)this.score++;

                else this.vie--;

                this.boules[i].gene(this.score);

            }

        };

    }

}

class boule{

    constructor(){

        this.x;

        this.y;

        this.vx;

        this.vy;

        this.r;

        this.e;

        this.gene(0);

    }

    draw(){

        if(this.e)fill(0,200,0);

        else fill(200,0,0);

        ellipse(round(this.x),round(this.y),this.r*2,this.r*2);

    }

    gene(p){

        this.x=width/2;

        this.y=height/2;

        var tetha=random(359);

        var puis=random(5+1.5*p,10+2*p);

        this.vx=cos(tetha)*puis;

        this.vy=sin(tetha)*puis;

        //if(random([false,true]))this.vx=-1*this.vx;

        //if(random([false,true]))this.vx=-1*this.vy;

        this.e=random([false,true]);

        if(puis > 60)puis=60;

        this.r=round(0.5*(70-puis));

    }

    colision(){

        if((this.x+this.r)>width || this.x<this.r)this.vx=-this.vx;

        if((this.y+this.r)>height || this.y<this.r)this.vy=-this.vy;

        //if((this.x+this.r)<(mouseX+5) && (this.x+this.r)>(mouseX+5) && (this.y+this.r)<(mouseY+5) && (this.y+this.r)>(mouseY+5)){

            //console.log("dsfsdfds");

            if(sqrt(pow(this.x-mouseX,2)+pow(this.y-mouseY,2))<(5+this.r)){    

                return true;

            }

        //}

        return false;

    }

}

class Page0{

    constructor(){

        this.over1=false;

    }

    asso(a){

        switch(a[0]){

            case 0:

                this.over1=a[1];

                break;

        }

    }

    gene(){

        pageAc=0;

        background("#454C4B");

        textSize(25);

        textAlign(LEFT,TOP); 

        fill("#D0D3D4");

        text("<name> V2.0 all rights reserved © Antoine ADAM",15,15);

        rectMode(CENTER);

        textAlign(CENTER, CENTER);

        fill("#424949");

        stroke("#000000");

        rect(width/2+300,height/2, 300, 400, 5);

        fill("#00FF00");

        text("Classement",width/2+295,height/2-180);

        textSize(20);

        const classement=[["name",5000,"#FFFF00"],["name",5000,"#FFFF00"],["name",5000,"#FFFF00"],["name",5000,"#FFFF00"],];

        for(var i=0;i<classement.length;i++){

            var hauteurtext=height/2-150+20*i;

            fill(200,0,0);

            text("#"+(i+1)+": "+classement[i][1]+"Points ",width/2+245,hauteurtext);

            fill(classement[i][2]);

            text(classement[i][0],width/2+350,hauteurtext);

        }

        var colorBox ="#2E4053";

        if(this.over1)colorBox="#34495E";

        stroke(colorBox);

        fill(colorBox);

        rect(width/2,height/2, 150, 50, 30);

        fill("#D0D3D4");

        textSize(30);

        //textFont(loadFont("font1.ttf"));

        text("Jouer",width/2,height/2);

        textSize(40);

        text("<name>.io",width/2,height/3);

    }  

}

function mouseClicked() {

    if(pageAc==0){

        if(detecteBox(width/2,height/2, 75, 25)){

            game0.gene();

        }

    }

    if(pageAc == 3){

        game0 = new Game0();

        page0.gene();

    }

}

function mouseMoved(){

    if(pageAc==0){

        switchBox(detecteBox(width/2,height/2, 75, 25),page0.over1,page0,0);

    }

}

function switchBox(a,b,c,d){

    if(a){

        if(!b){

            c.asso([d,true]);

            c.gene();

        }

    }else{

        if(b){

            c.asso([d,false]);

            c.gene();

        }

    }

}

function detecteBox(a,b,c,d){

    if(mouseX<a+c && mouseX>a-c && mouseY<b+d && mouseY>b-d)return true; else return false;

}

  function draw() {

    switch(pageAc){

        case 1:

            game0.drawGame();

            break;

        case 2:

            game0.gene();

            break;

    }

  }