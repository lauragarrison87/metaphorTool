async function drawScatterPlot(data, rectangles) {

    // 1. Access data 
    const dataset= await d3.csv(data)
    console.table(dataset[0])

    const rangeRectangles = await d3.csv(rectangles)
    //console.log(rangeRectangles[0])

    const xAccessor = d => parseFloat(d.x)
    const yAccessor = d => parseFloat(d.y)
    const imgTitle = d => d.name
    const imgAuthor = d => d.author
    const imgURL = d => d.url
    const domainAccessor = d => d.primarydomain
    const secondaryDomainAccessor = d => d.secondarydomain

    let whichDomain = domainAccessor(dataset[0])

    // console.log(yAccessor(dataset[0]))
    // console.log(xAccessor(dataset[0]))
    console.log(whichDomain)


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
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])
        .nice()
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor)) // TODO don't hard-code max 
        .range([dimensions.boundedHeight, 0])
        .nice()


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
        let xTick = []
        let xTickStr = []
        let yTick = []
        let yTickStr = []

        if (whichDomain == "Biomedicine") {
            yTick = [10, 20, 30, 40, 50, 60, 70, 80, 90]
            yTickStr = [
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
            xTick = [10, 20, 30, 40, 50, 60, 70, 80, 90]
            xTickStr = [
                "nanosec", 
                "sec",
                "min",
                "hour",
                "day",
                "week",
                "month",
                "year"
            ]
            return [xTick, xTickStr, yTick, yTickStr]

        } else if (whichDomain == "Climate") {
            yTick = [10, 20, 30]
            yTickStr = [
                "local",
                "regional",
                "global"
            ]
            xTick = [10, 20, 30, 40, 50]
            xTickStr = [
                "<1 year",
                "decade",
                "century",
                "thousand"
            ]
            return [xTick, xTickStr, yTick, yTickStr]

        } else if (whichDomain == "Space") {
            yTick = [10, 20, 30, 40, 50, 60]
            yTickStr = [
                'objects in space',
                'planet',
                'star',
                'black holes',
                'galaxy',
                'universe',
            ]
            xTick = [10, 20, 30, 40]
            xTickStr = [
                "<1 yr",
                "decade",
                "million",
                "billion"
            ]
            return [xTick, xTickStr, yTick, yTickStr]

        } else if (whichDomain == "Anthropology") {
            yTick = [10, 20, 30, 40, 50]
            yTickStr = [
                "local",
                "regional",
                "continental",
                "intercontinental",
                "global"
            ]
            xTick = [10, 20, 30, 40, 50, 60, 70, 80]
            xTickStr = [
                "<1 yr",
                "decade",
                "century",
                "quincent.",
                "thousand",
                "centamill.",
                "million",
                "billion"
            ]
            return [xTick, xTickStr, yTick, yTickStr]
        }

    }

    console.log(domainTick(whichDomain))


    // X AXIS
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
        // TODO this is currently hard-coded to BIOMED - struggling to get function domainTick() fed into here 
        .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90])
        .tickFormat((v) => {
            // you can completley override anything in this formatting
            // for example
            if (v <= 10) return 'nanosec';
            if (v <= 20) return 'sec';
            if (v <= 30) return 'min';
            if (v <= 40) return 'hours';
            if (v <= 50) return 'days';
            if (v <= 60) return 'weeks';
            if (v <= 70) return 'months';
            if (v <= 80) return 'years';
        })

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
        .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90])
        .tickFormat((v) => {
            switch (v) {
                case 10: return 'molecules';
                case 20: return 'viruses';
                case 30: return 'cells';
                case 40: return 'bacteria';
                case 50: return 'tissues';
                case 60: return 'organs';
                case 70: return 'organ systems';
                case 80: return 'organism';
                case 90: return 'population';
                
            }
        })

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
    const imgName = d3.select("#name-title")
    
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
        + `calc(0% + ${x}px),`
        + `calc(0% + ${y}px)`
        + `)`)

        tooltip.style("opacity", 1)   

        imgName.text(imgTitle(datum))
    }

    function onMouseLeave() {
        tooltip.style("opacity", 0)

    }

}
