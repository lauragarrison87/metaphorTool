// GLOBAL VARIABLES //
// Set dimensions 
const width = 500

let dimensions = {
    width: width,
    height: width,
    margin: {
        top: 10, 
        right: 10,
        bottom: 80,
        left: 100,
    },
}

dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

// Create scales 
const xScale = d3.scaleLinear()
    .range([0, dimensions.boundedWidth])

const yScale = d3.scaleLinear()
    .range([dimensions.boundedHeight, 0])

const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

const yAxisGenerator = d3.axisLeft()
    .scale(yScale)


const xAccessor = d => parseFloat(d.x) / 10
const yAccessor = d => parseFloat(d.y) / 10
const imgTitle = d => d.name
const imgAuthor = d => d.author
const srcURL = d => d.url
const imgURL = d => d.imageURL
const domainAccessor = d => d.primarydomain
const secondaryDomainAccessor = d => d.secondarydomain

const tooltip = d3.select("#tooltip")
const imgTitleTT = d3.select("#name-title")
const imgAuthorTT = d3.select("#author-title")
const srcURLTT = d3.select("#link-title")
const domainAccessorTT = d3.select("#primary-domain-title")
const secondDomainAccessorTT = d3.select("#secondary-domain-title")
const imgPreview = d3.select("#preview-img")


function domainTick(whichDomain) {
    if (whichDomain == " Biomedicine") {
        //const yTick = [10, 20, 30, 40, 50, 60, 70, 80, 90]
        const yTickStr = [
            'molecules',
            'viruses',
            'cells',
            'bacteria',
            'tissues',
            'organs',
            'organ systems',
            'organism',
            'population',

        ]
        //const xTick = [10, 20, 30, 40, 50, 60, 70, 80, 90]
        const xTickStr = [
            "nanosec", 
            "sec",
            "min",
            "hour",
            "day",
            "week",
            "month",
            "year"
        ]
        return [xTickStr, yTickStr]

    } else if (whichDomain == " Climate") {
        //const yTick = [10, 20, 30]
        const yTickStr = [
            "local",
            "regional",
            "global"
        ]
        //const xTick = [10, 20, 30, 40, 50]
        const xTickStr = [
            "<1 year",
            "decade",
            "century",
            "thousand",
            "" //HANNA check this 
        ]
        return [xTickStr, yTickStr]

    } else if (whichDomain == " Space") {
        //const yTick = [10, 20, 30, 40, 50, 60]
        const yTickStr = [
            "objects in space",
            "planet",
            "star",
            "black holes",
            "galaxy",
            "universe",
        ]
        //const xTick = [10, 20, 30, 40]
        const xTickStr = [
            "<1 yr",
            "decade",
            "million",
            "billion"
        ]
        return [xTickStr, yTickStr]

    } else if (whichDomain == " Anthropology") {
        //const yTick = [10, 20, 30, 40, 50]
        const yTickStr = [
            "local",
            "regional",
            "continental",
            "intercontinental",
            "global"
        ]
        //const xTick = [10, 20, 30, 40, 50, 60, 70, 80]
        const xTickStr = [
            "<1 yr",
            "decade",
            "century",
            "quincent.",
            "thousand",
            "centamill.",
            "million",
            "billion"
        ]
        return [xTickStr, yTickStr]
    }

}

function onMouseEnter(e, datum) {
    tooltip.select("#values")
        .style("font-size", "0.7em")
        .text(imgTitle(datum))


    //get the x and y coord of dot, offset by left and right margins
    const x = xScale(xAccessor(datum))
    + dimensions.margin.left + 10
    const y = yScale(yAccessor(datum))
    + dimensions.margin.top + 190

    // move tooltip to dot position, with % shift so is centered, not top-left positioned
    tooltip.style("transform", `translate(`
    + `calc(${x}px),`
    + `calc(${y}px)`
    + `)`)

    tooltip.style("opacity", 1)

    // Other image metadata to populate based on mouseHover:
    imgTitleTT.text(imgTitle(datum))
    imgAuthorTT.text(imgAuthor(datum))
    srcURLTT.text(srcURL(datum))
    domainAccessorTT.text(domainAccessor(datum))
    secondDomainAccessorTT.text(secondaryDomainAccessor(datum))

    imgPreview
        .attr("src", imgURL(datum))
        .attr("alt", "this is some alt text")
    
    this.parentNode.appendChild(this); //move hovered item to top

    d3.select(this)
        .transition().ease(d3.easeLinear)
        .duration(400)
        .attr("fill", "#5afaed") 
        .attr("opacity", 1)
        .attr("r", 15)
    

}

function onMouseLeave() {
    tooltip.style("opacity", 0)

    d3.select(this)
        .transition().ease(d3.easeLinear)
        .duration(400)
        .attr("fill", "rgb(1, 148, 136)")
        .attr("opacity", 0.5)
        .attr("r", 8)

}

function drawAxes(dataset, scatterBounds) {
    //this is duplicated code from initial scatterplot draw function
    let whichDomain = domainAccessor(dataset[0])

    let ticks = domainTick(whichDomain)

    xAxisGenerator
        .ticks(ticks[0].length)
        .tickFormat(d => ticks[0][d-1])

    yAxisGenerator
        .ticks(ticks[1].length)
        .tickFormat(d => ticks[1][d-1])

    //redraw x axis
    xScale.domain([d3.extent(dataset, xAccessor)[0]-0.5, d3.extent(dataset, xAccessor)[1]+0.5])
    scatterBounds.selectAll(".myXaxis").transition()
        .duration(750)
        .call(xAxisGenerator)

    //redraw y axis 
    yScale.domain([d3.extent(dataset, xAccessor)[0]-0.5, d3.extent(dataset, yAccessor)[1]+0.5]) 
        scatterBounds.selectAll(".myYaxis").transition()
            .duration(750)
            .call(yAxisGenerator)
}

async function drawScatterPlot(dataCSV) {

    // Initial draw canvas 
    const scatterWrapper = d3.select("#scatterplot")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
    
    const scatterBounds = scatterWrapper.append("g")
        .attr("id", "scatter-bounds")
        .style("transform", `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.top
        }px)`)
    

    // Access data 
    const dataset= await d3.csv(dataCSV)
    console.table(dataset[0])

    drawAxes(dataset, scatterBounds)
    
    const xAxis = scatterBounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
        .attr("class", "myXaxis")

    const yAxis = scatterBounds.append("g")
        .call(yAxisGenerator)
        .attr("class", "myYaxis")

    scatterBounds.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -dimensions.margin.left + 15)
        .attr("x", -dimensions.margin.top)
        .attr("fill", "black")
        //.style("font-size", "1.2em")
        .attr("transform", "rotate(-90)")
        .text("SPATIAL COVERAGE")

    scatterBounds.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", dimensions.boundedWidth)
        .attr("y", dimensions.boundedHeight + 40)
        .text("TEMPORAL COVERAGE");

        
    // const sqs = scatterBounds.selectAll("rect").data(rangeRectangles)
    // sqs
    //     .join("rect")
    //     .attr("x", d => xScale(x1RectAccessor(d)))
    //     .attr("y", d => yScale(y2RectAccessor(d)))
    //     .attr("width", d => xScale(x2RectAccessor(d))-xScale(x1RectAccessor(d)))
    //     .attr("height", d => yScale(y1RectAccessor(d))-yScale(y2RectAccessor(d)))
    //     .attr("rx", 15)
    //     .attr("fill-opacity", 0.3)

    //create update selection to bind new data
    const dots = scatterBounds.selectAll("circle").data(dataset)

    dots
        .join("circle")
        //.attr('class', 'circle-base')
        .transition().duration(750)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", "rgb(1, 148, 136)")
        .attr("opacity", 0.5)
        .attr("r", 8)


    // INTERACTIONS 
    scatterBounds.selectAll("circle").on("mouseenter", function(e, d){
        console.log(e.target)
    })

    scatterBounds.selectAll("circle")
        .on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)                         
}


async function updateScatterPlot(dataCSV) {
    const dataset= await d3.csv(dataCSV)
    console.log("this is my new data")
    console.table(dataset[1])

    const scatterBounds = d3.select("#scatter-bounds")

    // redraw X and Y axes 
    drawAxes(dataset, scatterBounds)

    // redraw dots in new position
    const dots = scatterBounds.selectAll("circle").data(dataset)
    
    dots
        .join("circle")
        .transition().duration(1000)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))

}

