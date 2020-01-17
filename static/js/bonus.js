function gaugeChart(sample) {
    
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 270,
            title: { text: "Speed" },
            type: "category",
            mode: "gauge+number"
        }
    ];
    
    var layout = {
         width: 600, 
         height: 500, 
         margin: {
              t: 0, 
              b: 0 
        } 
    };

    Plotly.newPlot("gauge", data, layout);
};