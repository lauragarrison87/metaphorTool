async function drawScatterPlot(data, rectangles) {

    // 1. Access data 
    const dataset= await d3.csv(data)
    //console.table(dataset[0])

    const rangeRectangles = await d3.csv(rectangles)
    //console.log(rangeRectangles[0])

    const xAccessor = d => parseFloat(d.x) / 10
    const yAccessor = d => parseFloat(d.y) / 10
    const imgTitle = d => d.name
    const imgAuthor = d => d.author
    const srcURL = d => d.url
    const imgURL = d => d.imageURL
    const domainAccessor = d => d.primarydomain
    const secondaryDomainAccessor = d => d.secondarydomain

    let whichDomain = domainAccessor(dataset[0])
    // console.log(yAccessor(dataset[0]))
    // console.log(xAccessor(dataset[0]))

    // 2. Set dimensions 
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


    // 3. Draw canvas 
    const scatterWrapper = d3.select("#scatterplot")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
    
    const scatterBounds = scatterWrapper.append("g")
        .style("transform", `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.top
        }px)`)
    

    // 4. Create scales 
    const xScale = d3.scaleLinear()
        .domain([d3.extent(dataset, xAccessor)[0]-0.5, d3.extent(dataset, xAccessor)[1]+0.5])
        .range([0, dimensions.boundedWidth])
        //.nice()
    
    const yScale = d3.scaleLinear()
        .domain([d3.extent(dataset, xAccessor)[0]-0.5, d3.extent(dataset, yAccessor)[1]+0.5]) 
        .range([dimensions.boundedHeight, 0])
        //.nice()


    // 5. Draw data 
    const dots = scatterBounds.selectAll("circle").data(dataset)

    dots
        .join("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 8)
        .attr('class', 'circle-base')


    // 6. Draw peripherals
    // TODO use a switch statement instead somehow 
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

    //console.log("Domain Ticks")
    console.log(domainTick(whichDomain)[1])

    let ticks = domainTick(whichDomain)


    // X AXIS
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
        .ticks(ticks[0].length)
        .tickFormat(d => ticks[0][d-1])

    const xAxis = scatterBounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)

    scatterBounds.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", dimensions.boundedWidth)
        .attr("y", dimensions.boundedHeight + 40)
        .text("TEMPORAL COVERAGE");

    // Y AXIS 
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .ticks(ticks[1].length)
        .tickFormat(d => ticks[1][d-1])

    const yAxis = scatterBounds.append("g")
        .call(yAxisGenerator)
    
    scatterBounds.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -dimensions.margin.left + 15)
        .attr("x", -dimensions.margin.top)
        .attr("fill", "black")
        //.style("font-size", "1.2em")
        .attr("transform", "rotate(-90)")
        .text("SPATIAL COVERAGE")


    // 7. Interactions
    scatterBounds.selectAll("circle").on("mouseenter", function(e, d){
        console.log(e.target)
    })

    scatterBounds.selectAll("circle")
        .on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)

    const tooltip = d3.select("#tooltip")
    const imgTitleTT = d3.select("#name-title")
    const imgAuthorTT = d3.select("#author-title")
    const srcURLTT = d3.select("#link-title")
    const domainAccessorTT = d3.select("#primary-domain-title")
    const secondDomainAccessorTT = d3.select("#secondary-domain-title")
    const imgPreview = d3.select("#preview-img")
    
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
       
    }

    function onMouseLeave() {
        tooltip.style("opacity", 0)

    }

}
