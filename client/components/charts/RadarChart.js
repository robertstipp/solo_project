import React, { useEffect } from 'react';
import * as d3 from 'd3';

const RadarChart = ({analysis}) => {

  useEffect(() => {
    

    
    const colors = ['#225095','#fac901', '#dd0100']
    const data = Object.values(analysis)
    const labels = Object.keys(analysis)
    console.log(labels)
    const maxes = [1,1,1,1, 1,1,1,1,1,200]
    const svg = d3.select('#my-svg')
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    
    // Make BG
    // svg.append('circle')
    //   .attr('cx', 250)
    //   .attr('cy', 250)
    //   .attr('r', 200)
    //   .attr('fill', 'rgba(0, 0, 0, 1.0')
    //   .attr('stroke', 'black');

    // Make Rings
    for (let i = 10; i > 0; i--) {
      svg.append('circle')
      .attr('cx', 250)
      .attr('cy', 250)
      .attr('r', i * 20)
      .attr('fill', 'rgba(255, 255, 255, 0.0')
      .attr('stroke', 'rgba(0,0,0,.25')
      .attr('stroke-width', '2');
      // .on('mouseover', function (d) {
      //   d3.select(this)
      //     .attr('fill', 'green');
      // })
      // .on('mouseout', function (d) {
      //   d3.select(this)
      //     .attr('fill', 'red');
      // });

    }

    let maxR = 10 * 20
    // Make Dots
    const points = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i]
      const valMax = maxes[i]
      const ratio = value/valMax
      let angle = (i / data.length)  * (Math.PI * 2)
      let xPos = Math.cos(angle) * ratio * maxR * .9 + 250;
      let yPos = Math.sin(angle) * ratio * maxR * .9 + 250;

      const labelLen = labels[i].length * 10;
      let labelXPos = Math.cos(angle) * maxR + 250;
      let labelYPos = Math.sin(angle) * maxR + 250;

      points.push([xPos,yPos])
      svg.append('circle')
      .attr('cx',xPos )
      .attr('cy',yPos )
      .attr('r', 10)
      .attr('fill', colors[i % colors.length]);

      

      svg.append('text')
        .attr('x', labelXPos)
        .attr('y', labelYPos)
        .text(labels[i])
        .attr('transform-origin', `center`)
        .attr('transform', `rotate(${1})`)
        .attr('font-size', '12px')
        .attr('font-family', 'var(--primary-font)')
        // .attr('transform', `rotate(${angle*360}, ${labelXPos}, ${labelYPos})`)
    }

    // Enclose Points
    const lineGenerator = d3.line();
    svg.append('path')
    .attr('d', lineGenerator(points.concat([points[0]])))  // Connect the last point to the first
    .attr('stroke', 'black')
    .attr('fill', 'rgba(255,100,0,.2)');



  }, []);  // Empty dependency array means this useEffect runs once when component mounts
  return (
    <div id="my-svg"></div>
  );
};

export default RadarChart;
