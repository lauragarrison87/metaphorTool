async function drawPieChart(data) {
    // 1. Access data 
    const dataset= await d3.csv(data)
    console.table(dataset[1])   //test if data are importing 
    
    //const metaphorAccessor = d => d.icon


    // 2. Set dimensions 



    // 3. Draw canvas 
   


    // 4. Create scales 


    // 5. Draw data 
    


    // 6. Draw peripherals


    // 7. Interactions

    
}

drawPieChart()


// TO ORGANIZE 

// const setPiechart = (values) => {
//     if (!values) return;

//     const piechart_column = document.querySelector("#piechart");

//     document.querySelectorAll('#piechart svg').forEach(e => e.remove());

//     let chart = PieChart(values, {
//         name: d => d.type,
//         value: d => d.percentage,
//         width: piechart_column.clientWidth,
//         height: piechart_column.clientHeight,
//         names: ['Structural', 'Ontological', 'Orientational', 'Imagistic']
//     });
    
//     piechart_column.insertBefore(chart, document.querySelector('#piechart .row:nth-child(2)'));
// };

// setPiechart(piechartValues);