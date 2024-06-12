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
    "Str", 
    "Ont",
    "Ori",
    "Img",
]

const barColors = d3.scaleOrdinal([
    "#D7191D",
    "#FDAE61",
    "#ABDDA4",
    "#2A83BA"
])

// const xAccessorStruct = d => parseFloat(d.cnt_structural)
// const xAccessorOnto = d => parseFloat(d.cnt_ontological)
// const xAccessorOrient = d => parseFloat(d.cnt_orientational)
// const xAccessorImag = d => parseFloat(d.cnt_imagistic)

// Create scales 
const yScaleBar = d3.scaleBand()
    .domain(cmts)
    .range([0, dimensionsBar.boundedHeight])
    .padding(0.2)

const xScaleBar = d3.scaleLinear()
    .domain([0,5]) //consistent y-scaling
    .range([0, dimensionsBar.boundedWidth])

const xAxisGeneratorBar = d3.axisBottom()
    .ticks(5)
    .scale(xScaleBar)

const yAxisGeneratorBar = d3.axisLeft()
    .scale(yScaleBar)


async function drawBarPlot() {

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
    
    const bars = barBounds.selectAll("rect")
        .data([
            {"metaphorType" : "Str", "count" : 0},
            {"metaphorType" : "Ont", "count" : 0},
            {"metaphorType" : "Ori", "count" : 0},
            {"metaphorType" : "Img", "count" : 0},
        ])
        .join("rect")
        .attr("x", 0)
        .attr("y", d => yScaleBar(d.metaphorType))
        .attr("width", d => xScaleBar(d.count))
        .attr("height", 20)
        .attr("fill", function(d,i) {
            return barColors(i);
        })

        // .join("rect")
        //     .attr("x", d => xScale(x1RectAccessor(d)))
        //     .attr("y", d => yScale(y2RectAccessor(d)))
        //     .attr("width", d => xScale(x2RectAccessor(d))-xScale(x1RectAccessor(d)))
        //     .attr("height", d => yScale(y1RectAccessor(d))-yScale(y2RectAccessor(d)))
        //     .attr("rx", 15)
        //     .attr("fill-opacity", 0.3)

}

async function updateBarPlot(barLengths) {
    console.log(barLengths)
    const barBounds = d3.select("#bar-bounds")

    const bars = barBounds.selectAll("rect").data(barLengths)
        .join("rect")
        .transition().duration(400)
        .attr("x", 0)
        .attr("y", d => yScaleBar(d.metaphorType))
        .attr("width", d => xScaleBar(d.count))
        .attr("height", 20)
        .attr("fill", function(d,i) {
            return barColors(i);
        })
        //.attr("fill", "rgb(1, 148, 136)")
}