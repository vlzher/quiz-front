import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarGraph = ({ data, questions }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Clear previous graph
        svg.selectAll('*').remove();

        const width = 600;
        const height = 400;

        const margin = { top: 30, right: 30, bottom: 50, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleBand()
            .domain(data.map((_, i) => i))
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([innerHeight, 0]);

        const colorScale = d3.scaleSequential(d3.interpolateBlues)
            .domain([0, data.length]);

        const xAxis = d3.axisBottom(xScale).tickFormat(d => d + 1);
        const yAxis = d3.axisLeft(yScale).tickFormat(d => `${(d * 100).toFixed(0)}%`);

        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(yAxis)
            .selectAll('text')
            .attr('font-size', '14px');

        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
            .call(xAxis)
            .selectAll('text')
            .attr('font-size', '14px')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (_, i) => margin.left + xScale(i))
            .attr('y', d => margin.top + yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d))
            .attr('fill', (_, i) => colorScale(i))
            .style('cursor', 'pointer')
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.7);
                svg.append('text')
                    .attr('id', 'tooltip')
                    .attr('x', margin.left + xScale(data.indexOf(d)) + xScale.bandwidth() / 2)
                    .attr('y', margin.top + yScale(d) - 10)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '14px')
                    .text((d*100).toFixed(2)+'%')
                    .attr('fill', '#ffffff');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1);
                svg.select('#tooltip').remove();
            });

        // Legend
        const legend = svg.append('g')
            .attr('transform', `translate(${innerWidth + margin.left}, ${margin.top})`);

        const legendRectSize = 18;
        const legendSpacing = 4;

        const legends = legend.selectAll('.legend')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (_, i) => `translate(0,${i * (legendRectSize + legendSpacing)})`);

        legends.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', (_, i) => colorScale(i));

        legends.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text((d, i) => `${questions[i]}`)
            .attr('font-size', '14px')
            .attr('fill', '#ece5e5');

    }, [data]);

    return (
        <div className={"w-full items-center flex flex-col justify-center"}>
            <div className={"text-xl text-white mb-2"}>Correct Answer Percentage</div>
            <svg ref={svgRef} width={700} height={400}></svg>
        </div>

    );
};

export default BarGraph;
