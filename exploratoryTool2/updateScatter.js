async function updateScatterPlot() {

    const scatterBounds = d3.select("#scatter-bounds")

    scatterBounds.selectAll("circle")
        //.attr("fill", "grey")
        .on("mouseover", function(d){
            console.log(d) //check that am accessing data object
            console.log(this) //check access to DOM object
            d3.select(this)
                .transition().ease(d3.easeLinear)
                .duration(400)
                .attr("fill", "yellowgreen") 
                .attr("opacity", 1)
                .attr("r", 40)

        })
}