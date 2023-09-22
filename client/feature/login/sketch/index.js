import React from "react";
import Sketch from "react-p5";


let x = 50;
let y = 50;
let img;
const dots = [];
export default (props) => {

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    // console.log(p5.loadImage(./))
    img = p5.loadImage('./images/spotify-logo.png')
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // p5.background(0);
    // p5.ellipse(x, y, 70, 70);
    p5.image(img,0,0)
    // p5.image(img,0,0)
    x++;
  };


  class Dots {
    constructor(x,y) {
      this.x = x;
      this.y = y
    }
    display () {
      p5.ellipse(this.x,this.y,10)
    }
  }

  return <Sketch setup={setup} draw={draw}/>;
};
