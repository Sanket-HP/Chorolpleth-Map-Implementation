# Choropleth Map Visualization

This project creates a choropleth map visualizing educational attainment across the United States. The map is built using D3.js and follows a series of user stories to ensure functionality and visual appeal.

## User Stories Fulfilled

1. **Title and Description**: The map includes a title with `id="title"` and a description with `id="description"`.
2. **Counties Representation**: Each county is represented with a `class="county"` and displays data attributes for `data-fips` and `data-education`.
3. **Color Variance**: At least four different fill colors are used to differentiate between various levels of educational attainment.
4. **Legend**: A legend with `id="legend"` is included, displaying at least four different colors used in the map.
5. **Tooltip**: Hovering over a county shows a tooltip with `id="tooltip"` that displays the educational attainment of that area and has a `data-education` property.

## Files

- `index.html`: The main HTML file that sets up the structure of the webpage.
- `style.css`: Contains the CSS styles for the map and tooltip.
- `script.js`: The JavaScript file that uses D3.js to generate the map and handle interactions.

## Dependencies

- [D3.js](https://d3js.org/) - JavaScript library for producing dynamic, interactive data visualizations in web browsers.
- [TopoJSON](https://github.com/topojson/topojson) - Extension of GeoJSON for encoding topology.

## Data Sources

- [US Education Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json)
- [US County Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json)

## Instructions

1. Clone the repository or download the files.
2. Open `index.html` in a web browser to view the choropleth map.
3. Ensure you have an internet connection to load D3.js from the CDN.

## Running Tests

To verify that the project fulfills all the user stories, you can use the FreeCodeCamp test suite. Include the following script in your HTML file if not already present:

```html
<script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
