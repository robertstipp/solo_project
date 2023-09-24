import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import * as d3 from 'd3';



const BubbleChart = () => {
  const d3Container = useRef(null);
  const { genres, dailyTracks, status, error } = useSelector(state => state.user);

  console.log(genres)
  // const data = [
  //   { value: 10, name: 'A' },
  //   { value: 20, name: 'B' },
  //   { value: 30, name: 'C' },
  //   { value: 40, name: 'D' },
  // ];
  const colors = ['#dd0100','#fac901','#225095']
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

  const data = genres.map((genre)=>{
    return {value: 20, name: genre, color: getRandomColor()}
  })

 
  

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      const width = 1000;
      const height = 700;

      const radiusScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.value)])
        .range([5, 60]);

      // Clear the previous SVG content
      svg.selectAll('*').remove();

      // Create the circles
      const circles = svg.selectAll('.bubble')
        .data(data)
        .join('circle')
        .attr('class', 'bubble')
        .attr('r', d => radiusScale(d.value))
        .attr('stroke', d => d.color)
        .attr("stroke-width", 3)
        .attr('fill', 'white');
      
        const textElements = svg.selectAll('.label')
          .data(data)
          .join('text')
          .attr('class','label')
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('font-family', 'var(--primary-font)')
          .attr('color', 'black')

          textElements.each(function(d, i) {
            const node = d3.select(this);
            const words = d.name.split(' '); // Assume 'name' contains the text you want to stack
            
            words.forEach((word, j) => {
              node.append('tspan')
                .attr('x', 0)
                .attr('dy', j === 0 ? '0' : '1.2em') // Move down by 1.2em for each subsequent word
                .text(word);
            });
          });

      // Create the force simulation
      const simulation = d3.forceSimulation(data)
        .force('x', d3.forceX(width / 2).strength(0.1))  // Increase the strength here
        .force('y', d3.forceY(height / 2).strength(0.1)) 
        .force('charge', d3.forceManyBody().strength(-10))
        .force('collide', d3.forceCollide(d => radiusScale(d.value)))
        .on('tick', ticked);

      function ticked() {
        circles
          .attr('cx', d => Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), d.x)))
          .attr('cy', d => Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), d.y)));

          textElements
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .selectAll('tspan')
          .attr('x', d=>d.x)
      }
    }
  }, [data]);

  return (
    <svg
      className="d3-component"
      width={1000}
      height={700}
      ref={d3Container}
    ></svg>
  );
};

export default BubbleChart;
