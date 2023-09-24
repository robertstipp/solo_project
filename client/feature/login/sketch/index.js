import React from "react";
import Sketch from "react-p5";

let t = 50;
let dotSpacing = 7
let dotSize = dotSpacing;
let img;
const dots = [];
const red = '#dd0100'
const blue = '#225095'
const yellow = '#fac901'
const clrs = [red,blue,yellow]

export default (props) => {

  const preload = (p5) => {
    img = p5.loadImage('./images/spotify-logo.png')
  }

  const mouseClicked = (p5) => {
    if (p5.mouseX >= 0 && p5.mouseX <= 400 && p5.mouseY >= 0 && p5.mouseY <= 400) {
      window.location.href = 'api/auth/spotify/passport-auth';
    }
  };

  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(400, 350).parent(canvasParentRef);
    
    img.loadPixels();
    
    p5.noStroke()
    for (let xPos = 0; xPos < img.width; xPos+=dotSpacing) {
      for (let yPos = 0; yPos < img.height; yPos+=dotSpacing) {
        let loc = (xPos + yPos * 400)*4;
        let c = 255-img.pixels[loc+3]
        if (c < 30) {
          // const selColor = p5.random(clrs)
          // const clrX = Math.floor(xPos/img.width * 10)
          // const clrY = Math.floor(yPos/img.width * 4)
          // const selColor = clrs[(clrX + clrY) % 3]
          dots.push(new Dots(xPos,yPos,red))  
        }
        
      }
    }
  };

  const draw = (p5) => {
    p5.background(255);
    dots.forEach(dot=>{
      dot.display(p5)
    })
    // p5.ellipse(x, y, 70, 70);
    // p5.image(img,0,0)
    // p5.image(img,0,0)
    t+=.05;
  };


  class Dots {
    constructor(x,y,color) {
      this.x = x;
      this.y = y
      this.size = dotSize
      this.color = color
      this.defaultColor = 'black'
      this.hoverColor = 'yellow'
      this.noiseOffsetX = Math.random() * 1000; // Initialize with some random value for x
      this.noiseOffsetY = Math.random() * 1000;
    }
    display(p5) {
      // Check the distance between the mouse and this dot
      let d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
       let dAmp = p5.map(d,0,100,0,10)
      
      let newX = this.x + (p5.noise(this.noiseOffsetX) - 0.5) * dAmp;
      let newY = this.y + (p5.noise(this.noiseOffsetY) - 0.5) * dAmp;
      let rD = p5.dist(this.x, this.y, 200, 200);
      let newSize = (Math.sin(rD + t*2) + Math.cos(rD/4)) * 2 + this.size
      this.noiseOffsetX += 0.01; // Increment noise offset for x
      this.noiseOffsetY += 0.01; 
      
  
      // If the distance is less than the radius (size / 2), change color
      
  
      p5.fill(this.color);
      p5.ellipse(newX, newY, this.size);
    }
  }

  return <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked}/>;
};
