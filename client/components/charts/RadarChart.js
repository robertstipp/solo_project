import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({analysis}) => {
  const d3Container = useRef(null);
  useEffect(() => {
    if (analysis && d3Container.current) {
    const colors = ['#225095','#fac901', '#dd0100']
    const data = [
      analysis.danceability,
      analysis.energy,
      analysis.mode,
      analysis.acousticness,
      analysis.instrumentalness,
      analysis.valence,
      analysis.tempo,
      analysis.speechiness,
    ]
    const labels = [
      "danceability",
      "energy",
      "mode",
      "acousticness",
      "instrumentalness",
      "valence",
      "tempo",
      "speechiness",
    ]
    


    const maxes = [1,1,1,1,1,1,200,1]
    const labelAngles = [91,135,180,225,270,315,0,45]
    // CLEAR ALL PREVIOUS NODES
    

    // const svg = d3.select('#my-svg')
    //   .append('svg')
    //   .attr('width', 500)
    //   .attr('height', 500);
    const svg = d3.select(d3Container.current)
    svg.selectAll('*').remove(); 

    // Make Rings
    let size = 30
    let chartXOrigin = 400;
    let chartYOrigin = 400;
    for (let i = 10; i > 0; i--) {
      svg.append('circle')
      .attr('cx', chartXOrigin)
      .attr('cy', chartYOrigin)
      .attr('r', i * size)
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

    let maxR = 10 * size

    // Make Dots
    const points = [];
    for (let i = 0; i < data.length; i++) {
      const value = data[i]
      const valMax = maxes[i]
      const ratio = value/valMax
      let angle = (i / data.length)  * (Math.PI* 2)
      let xPos = Math.cos(angle) * ratio * maxR * .9 + chartXOrigin;
      let yPos = Math.sin(angle) * ratio * maxR * .9 + chartYOrigin;

      let labelXPos = Math.cos(angle - .1) * maxR + chartXOrigin;
      let labelYPos = Math.sin(angle - .1) * maxR + chartYOrigin;



      points.push([xPos,yPos])
      // svg.append('circle')
      // .attr('cx',xPos )
      // .attr('cy',yPos )
      // .attr('r', 10)
      // .attr('fill', colors[i % colors.length]);

      

      svg.append('text')
        .attr('x', labelXPos)
        .attr('y', labelYPos)
        .text(labels[i])
        // .attr('transform-origin', `center`)
        .attr("transform", `translate(${labelXPos}, ${labelYPos}) rotate(${angle * 360 / (Math.PI * 2) + 90}) translate(-${labelXPos}, -${labelYPos})`)
        .attr('font-size', '12px')
        .attr('font-family', 'var(--primary-font)')
        // .attr('transform', `rotate(${angle*360}, ${labelXPos}, ${labelYPos})`)
    }
    const lineGenerator = d3.line();
    svg.append('path')
    .attr('d', lineGenerator(points.concat([points[0]])))  // Connect the last point to the first
    .attr('stroke', 'black')
    .attr('fill', 'rgba(255,100,0,.2)');


    for (let i = 0; i < points.length; i++) {
      const [xPos, yPos] = points[i]
      svg.append('circle')
      .attr('cx',xPos )
      .attr('cy',yPos )
      .attr('r', 10)
      .attr('fill', colors[i % colors.length]);

    }
    
  }
  }, [analysis]); 
  return (
    <svg 
    className="d3-component"
    width={800}
    height={800}
    ref={d3Container}
    ></svg>
  );
};

export default RadarChart;
