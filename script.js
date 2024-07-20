const countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
const educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

Promise.all([d3.json(countyUrl), d3.json(educationUrl)]).then(data => {
    const countyData = data[0];
    const educationData = data[1];

    const svg = d3.select("#choropleth");
    const path = d3.geoPath();
    const color = d3.scaleThreshold()
        .domain(d3.range(2, 75, 9))
        .range(d3.schemeBlues[9]);

    const educationById = {};
    educationData.forEach(d => { educationById[d.fips] = d; });

    svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(countyData, countyData.objects.counties).features)
        .enter().append("path")
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => educationById[d.id].bachelorsOrHigher)
        .attr("fill", d => color(educationById[d.id].bachelorsOrHigher))
        .attr("d", path)
        .on("mouseover", (event, d) => {
            const county = educationById[d.id];
            d3.select("#tooltip")
                .classed("hidden", false)
                .attr("data-education", county.bachelorsOrHigher)
                .html(`${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
            d3.select("#tooltip").classed("hidden", true);
        });

    const x = d3.scaleLinear()
        .domain([2, 75])
        .rangeRound([600, 860]);

    const legend = svg.append("g")
        .attr("id", "legend")
        .attr("transform", "translate(0,40)");

    const legendThreshold = d3.scaleThreshold()
        .domain(d3.range(2, 75, 9))
        .range(d3.schemeBlues[9]);

    legend.selectAll("rect")
        .data(legendThreshold.range().map(d => {
            d = legendThreshold.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .enter().append("rect")
        .attr("height", 8)
        .attr("x", d => x(d[0]))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("fill", d => legendThreshold(d[0]));

    legend.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Bachelor's degree or higher");

    legend.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(x => Math.round(x) + '%')
        .tickValues(legendThreshold.domain()))
        .select(".domain")
        .remove();
});
