import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import * as d3 from 'd3';

const BarChart = ({}) => {
  const d3Container = useRef(null);
  const { genres, dailyTracks, status, error } = useSelector(state => state.user);
  // Mock data
  const data = [
    { value: 10, name: 'A' },
    { value: 20, name: 'B' },
    { value: 30, name: 'C' },
    { value: 40, name: 'D' },
  ];

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Set up scales and constants
      const width = 400;
      const height = 300;
      const xScale = d3.scaleBand().domain(data.map(d => d.name)).range([0, width]).padding(0.2);
      const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([height, 0]);

      // Append bars
      svg.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.value))
        .attr("fill", "steelblue");
    }
  }, [data]);

  return (
    <svg
      className="d3-component"
      width={400}
      height={300}
      ref={d3Container}
    ></svg>
  );
};

export default BarChart;
