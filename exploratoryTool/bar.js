// Set dimensions 
const widthBar = 200

let dimensionsBar = {
    width: widthBar,
    height: widthBar * 0.7,
    margin: {
        top: 10, 
        right: 10,
        bottom: 30,
        left: 25,
    },
}

dimensionsBar.boundedWidth = dimensionsBar.width
    - dimensionsBar.margin.left
    - dimensionsBar.margin.right

dimensionsBar.boundedHeight = dimensionsBar.height
    - dimensionsBar.margin.top
    - dimensionsBar.margin.bottom


// const xAccessorStruct = d => d.structural
// const xAccessorOnto = d => d.ontological
// const xAccessorOrient = d => d.orientational
// const xAccessorImag = d => d.imagistic

const cmts = [
    "Str",//"structural", 
    "Ont",//"ontological",
    "Ori",//"orientational",
    "Img",//"imagistic"
]

const xAccessorStruct = d => parseFloat(d.cnt_structural)
const xAccessorOnto = d => parseFloat(d.cnt_ontological)
const xAccessorOrient = d => parseFloat(d.cnt_orientational)
const xAccessorImag = d => parseFloat(d.cnt_imagistic)

// Create scales 
const yScaleBar = d3.scaleBand()
    .domain(cmts)
    .range([0, dimensionsBar.boundedHeight])
    .padding(0.2)

const xScaleBar = d3.scaleLinear()
    .domain([0,10]) //consistent y-scaling
    .range([0, dimensionsBar.boundedWidth])

const xAxisGeneratorBar = d3.axisBottom()
    .scale(xScaleBar)

const yAxisGeneratorBar = d3.axisLeft()
    .scale(yScaleBar)


async function drawBarPlot(dataCSV) {
    console.log(cmts)
    console.log(yAccessorOnto(dataCSV[0]))

    // Initial draw canvas 
    const barWrapper = d3.select("#barplot")
        .append("svg")
        .attr("width", dimensionsBar.width)
        .attr("height", dimensionsBar.height)
    
    const barBounds = barWrapper.append("g")
        .attr("id", "bar-bounds") 
        .style("transform", `translate(${
            dimensionsBar.margin.left
        }px, ${
            dimensionsBar.margin.top
        }px)`)
    
    const yAxis = barBounds.append("g")
        .call(yAxisGeneratorBar)
        .attr("class", "barYaxis")

    const xAxis = barBounds.append("g")
        .call(xAxisGeneratorBar)
        .attr("class", "barXaxis")
        .style("transform", `translateY(${dimensionsBar.boundedHeight}px)`)

    const bars = scatterBounds.selectAll("rect").data(dataset)

    bars
        .join("rect")
        //.attr('class', 'circle-base')
        .transition().duration(750)
        .attr("x", 0)
        .attr("y", 30)
        .attr("width", d => xScaleBar(xAccessorStruct(d)))
        .attr("height", 10)
        //.attr("fill", "rgb(1, 148, 136)")


        // .join("rect")
        //     .attr("x", d => xScale(x1RectAccessor(d)))
        //     .attr("y", d => yScale(y2RectAccessor(d)))
        //     .attr("width", d => xScale(x2RectAccessor(d))-xScale(x1RectAccessor(d)))
        //     .attr("height", d => yScale(y1RectAccessor(d))-yScale(y2RectAccessor(d)))
        //     .attr("rx", 15)
        //     .attr("fill-opacity", 0.3)
    




}