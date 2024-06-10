async function drawScatterPlot(data, rectangles) {

    // 1. Access data 
    const dataset= await d3.csv(data)
    console.table(dataset[0])

    const rangeRectangles = await d3.csv(rectangles)
    console.log(rangeRectangles[0])


    // 2. Set dimensions 
    const svg_column = document.querySelector("#scatterplot");

    const margin = { 
        top: 20, 
        right: 10, 
        bottom: 45, 
        left: 80 
    };
    const width = svg_column.clientWidth - margin.left - margin.right;
    const height = svg_column.clientHeight - margin.top - margin.bottom;


    // 3. Draw canvas 
    d3.select("#scatterplot").append("svg");
    const svg = d3.select("#scatterplot > svg");

    const svg_viewport = svg
        .attr("width", svg_column.clientWidth)
        .attr("height", svg_column.clientHeight)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // 4. Create scales 


    // 5. Draw data 


    // 6. Draw peripherals


    // 7. Interactions



}

drawScatterPlot(data, rectanges)