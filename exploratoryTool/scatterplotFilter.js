// GLOBAL VARIABLES //
// Set dimensions 
const width = 360

let dimensions = {
    width: width,
    height: width,
    margin: {
        top: 20, 
        right: 20,
        bottom: 100,
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


//to draw circles
const xAccessor = d => (parseFloat(d.xfrom) + parseFloat(d.xto)) / 2 + 0.3 * Math.random() //hack to spread points a wee bit 
const yAccessor = d => (parseFloat(d.yfrom) + parseFloat(d.yto)) / 2 + 0.3 * Math.random() //hack to spread points a wee bit that overlap exactly

//to draw rects 
const xfromAccessor = d => parseFloat(d.xfrom)
const yfromAccessor = d => parseFloat(d.yfrom)
const xtoAccessor = d => parseFloat(d.xto)
const ytoAccessor = d => parseFloat(d.yto)

// to draw text
const imgTitle = d => d.name
const imgAuthor = d => d.author
const srcURL = d => d.url
const imgURL = d => d.imgURL
const domainAccessor = d => d.primary_domain
const secondaryDomainAccessor = d => d.secondary_domain

const tooltip = d3.select("#tooltip")
const imgTitleTT = d3.select("#name-title")
const imgAuthorTT = d3.select("#author-title")
const srcURLTT = d3.select("#link-title")
const domainAccessorTT = d3.select("#primary-domain-title")
const secondDomainAccessorTT = d3.select("#secondary-domain-title")
const imgPreview = d3.select("#preview-img")

// CMT rationale variables
const structuralAccessor = d => d.structural_details
const ontologicalAccessor = d => d.ontological_details
const orientationalAccessor = d => d.orientational_details
const imagisticAccessor = d => d.imagistic_details
const textGraphicMetaphorAcc = d => d.text_support_graphical_metaphors
const textGraphicMetaphorDetailsAcc = d => d.text_support_graphical_metaphor_details

const structTT = d3.select("#structural-details")
const ontoTT =  d3.select("#ontological-details")
const orientTT = d3.select("#orientational-details")
const imagTT = d3.select("#imagistic-details")
const textMetTT = d3.select("#text-support-graphical-metaphors")
const textMetTypeTT = d3.select("#text-support-graphical-metaphors-details")


function domainTick(whichDomain) {
    if (whichDomain == "Biomedicine") {
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

    } else if (whichDomain == "Climate") {
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

    } else if (whichDomain == "Space") {
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

    } else if (whichDomain == "Anthropology") {
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
    
    const barLengths = [
        {"metaphorType" : "Str", "count" : parseInt(datum.cnt_structural)},
        {"metaphorType" : "Ont", "count" : parseInt(datum.cnt_ontological)},
        {"metaphorType" : "Ori", "count" : parseInt(datum.cnt_orientational)},
        {"metaphorType" : "Img", "count" : parseInt(datum.cnt_imagistic)},
    ]

    updateBarPlot(barLengths)

    //CMT rationale
    structTT.text(structuralAccessor(datum))
    ontoTT.text(ontologicalAccessor(datum))
    orientTT.text(orientationalAccessor(datum))
    imagTT.text(imagisticAccessor(datum))
    textMetTT.text(textGraphicMetaphorAcc(datum))
    textMetTypeTT.text(textGraphicMetaphorDetailsAcc(datum))

    // Other image metadata to populate based on mouseHover:
    imgTitleTT.text(imgTitle(datum))
    imgAuthorTT.text(imgAuthor(datum))
    srcURLTT.attr("href", srcURL(datum)).text(srcURL(datum))
    domainAccessorTT.text(domainAccessor(datum))
    secondDomainAccessorTT.text(secondaryDomainAccessor(datum))

    imgPreview.attr("src", "./images/placeholder.png")
    imgPreview.attr("src", imgURL(datum))
    
    this.parentNode.appendChild(this) //move hovered item to top

    d3.select(this)
        .transition().ease(d3.easeLinear)
        .duration(400)
        .attr("fill", "black") // BRIGHT TURQ #5afaed
        .attr("opacity", 1)
        .attr("r", 10)
    
    hoveredRect = d3.selectAll("rect")
        .filter(d => d==datum)

    hoveredRect
        .attr("opacity", 1)
        .parentNode.appendChild(hoveredRect)


}

function onMouseLeave() {
    tooltip.style("opacity", 0)

    d3.select(this)
        .transition().ease(d3.easeLinear)
        .duration(400)
        .attr("fill", "gray")
        .attr("opacity", 0.5)
        .attr("r", 5)
    
    d3.selectAll(".scatterRects")
        .attr("opacity", 0.2)

    //imgPreview.attr("src", "./images/placeholder.png")
}

function setTickMarks(dataset) {
    let whichDomain = domainAccessor(dataset[0])
    console.log(dataset[0])

    let ticks = domainTick(whichDomain)
    console.log(ticks)

    xAxisGenerator
        .ticks(ticks[0].length)
        .tickFormat(d => ticks[0][d-1]) //bring to 0 since lowest value in dataset is 1 

    yAxisGenerator
        .ticks(ticks[1].length)
        .tickFormat(d => ticks[1][d-1])
}

function styleAxes(dataset, scatterBounds) {        
    //redraw x axis
    xScale.domain([d3.extent(dataset, xfromAccessor)[0], d3.extent(dataset, xtoAccessor)[1]])
    scatterBounds.selectAll(".myXaxis").transition()
        .duration(750)
        .call(xAxisGenerator)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)")

    //redraw y axis 
    yScale.domain([d3.extent(dataset, yfromAccessor)[0], d3.extent(dataset, ytoAccessor)[1]]) 
        scatterBounds.selectAll(".myYaxis").transition()
            .duration(750)
            .call(yAxisGenerator)
}

async function drawScatterPlot(dataset) {

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
    //const dataset= await d3.csv(dataCSV)
    //console.table(dataset[0])

    setTickMarks(dataset)

    const xAxis = scatterBounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
        .attr("class", "myXaxis")
    
    // scatterBounds.selectAll(".myXaxis")
    //     .selectAll("text")  
    //     .style("text-anchor", "end")
    //     .attr("dx", "-.8em")
    //     .attr("dy", ".15em")
    //     .attr("transform", "rotate(-30)")

    const yAxis = scatterBounds.append("g")
        .call(yAxisGenerator)
        .attr("class", "myYaxis")
    

    styleAxes(dataset, scatterBounds)


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
        .attr("y", dimensions.boundedHeight + 55)
        .text("TEMPORAL COVERAGE");

  
    const sqs = scatterBounds.selectAll("rect").data(dataset)
    sqs
        .join("rect")
        .attr("class", "scatterRects")
        .attr("x", d => xScale(xfromAccessor(d)))
        .attr("y", d => yScale(ytoAccessor(d)))
        .attr("width", d => xScale(xtoAccessor(d))-xScale(xfromAccessor(d)))
        .attr("height", d => yScale(yfromAccessor(d))-yScale(ytoAccessor(d)))
        //.attr("rx", 15)
        .attr("opacity", 0.2)
        //.attr("stroke","black")
        .attr("fill", "lightgreen")


    //create update selection to bind new data
    const dots = scatterBounds.selectAll("circle").data(dataset)

    dots
        .join("circle")
        //.attr('class', 'circle-base')
        .transition().duration(750)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", "gray") //teal color rgb(1, 148, 136)
        .attr("opacity", 0.5)
        .attr("r", 5)


    // INTERACTIONS 
    scatterBounds.selectAll("circle").on("mouseenter", function(e, d){
        console.log(e.target)
    })

    scatterBounds.selectAll("circle")
        .on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)                         
}


async function updateScatterPlot(dataset) {
    //const dataset= await d3.csv(dataCSV)
    console.log("this is my new data")
    console.table(dataset[1])

    const scatterBounds = d3.select("#scatter-bounds")

    // redraw X and Y axes 
    setTickMarks(dataset)
    styleAxes(dataset, scatterBounds)

    //redraw squares in new position
    scatterBounds.selectAll("rect")
        .data(dataset)
        .join("rect")
        .transition().duration(1000)
        .attr("x", d => xScale(xfromAccessor(d)))
        .attr("y", d => yScale(ytoAccessor(d)))
        .attr("width", d => xScale(xtoAccessor(d))-xScale(xfromAccessor(d)))
        .attr("height", d => yScale(yfromAccessor(d))-yScale(ytoAccessor(d)))

    // redraw dots in new position
    scatterBounds.selectAll("circle")
        .data(dataset)
        .join("circle")
        .transition().duration(1000)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))

}

