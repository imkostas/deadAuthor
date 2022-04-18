let xp = [];
let yp = [];
let pp = []
function setup() {
  createCanvas(400, 400);
  for(let i=0; i<50; i++){
    // xp.push(width/2) 
    // yp.push(height/2)
        xp.push(random(width)) 
    yp.push(random(height))
    pp.push(int(random(2)))
  }
}
//*******************************
function draw() {
  background(255);
  rectMode(CENTER);
  move(width/2,height/2)
  //repell();
  for(let i=0; i<xp.length; i++)
    pp[i]==1?rect(xp[i],yp[i],5,5):circle(xp[i],yp[i],5)
}
//*******************************
function move(tx,ty){
  for(let i=0; i<xp.length; i++){
        let dx = tx-xp[i]
        let dy = ty-yp[i]
        if (abs(dx) > 1) xp[i] += dx * 0.05;
        if (abs(dy) > 1) yp[i] += dy * 0.05;
  }
}
//*******************************
function repell(){
  for(let i=0; i<xp.length; i++)
    for(let k=0; k<xp.length; k++){
      if(k==i)continue;
      let d = dist(xp[i],yp[i],xp[k],yp[k]);
      if( d<15 ){
        xp[i] += random(-5,5);
        yp[i] += random(-5,5);
        xp[i] = constrain(xp[i],10,width-10);
        yp[i] = constrain(yp[i],10,height-10);
        line(xp[i],yp[i],xp[k],yp[k]);
      }
    } 
}

