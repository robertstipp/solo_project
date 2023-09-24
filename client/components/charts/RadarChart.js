import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import * as d3 from 'd3';

const RadarChart = () => {
  const d3Container = useRef(null);
  const { genres, dailyTracks, status, error } = useSelector(state => state.user);
  
  // Mock data
  const data = [
    { value: 0.8, axis: 'A' },
    { value: 0.6, axis: 'B' },
    { value: 0.4, axis: 'C' },
    { value: 0.7, axis: 'D' },
  ];

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Set up scales and constants
      const width = 400;
      const height = 400;
      const angleScale = d3.scaleBand().domain(data.map(d => d.axis)).range([0, 2 * Math.PI]);
      const radiusScale = d3.scaleLinear().domain([0, 1]).range([0, width / 2]);

      // Translate to the center
      const plot = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);


      // Draw Circles
      for (let i = 10; i >= 1; i++) {
        plot.append("circle")
        .attr('cx',0)
        .attr('cy',0)
        .attr('r',radiusScale(i/10 + .08))
        .attr("stroke","black")
        .attr("stroke-width", 3)
        .attr("fill",'none')
      }
      
      
      // Draw axes
      data.forEach(d => {
        plot.append("line")
          .attr("x1", .1)
          .attr("y1", .1)
          .attr("x2", radiusScale(1) * Math.cos(angleScale(d.axis) - Math.PI / 2))
          .attr("y2", radiusScale(1) * Math.sin(angleScale(d.axis) - Math.PI / 2))
          .attr("stroke", "black")
          .attr("stroke-width", 2)
      });

      // Draw the shape
      const lineGenerator = d3.lineRadial()
        .angle(d => angleScale(d.axis))
        .radius(d => radiusScale(d.value));

      plot.append("path")
        .attr("d", lineGenerator(data) + "Z")
        .attr("fill", "lightblue")
        .attr("stroke", "blue");
    }
  }, [data]);

  return (
    <svg
      className="d3-component"
      width={400}
      height={400}
      ref={d3Container}
    ></svg>
  );
};

export default RadarChart;
