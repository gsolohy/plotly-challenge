function gaugeChart(metadata) {
    var wfreq = metadata[0].wfreq;
    var degChanger = wfreq * 20 //degree;

    var deg = 180-degChanger, r = .3;
    var rad = deg * Math.PI / 180;
    var x = r*Math.cos(rad)+0.5;
    var y = r*Math.sin(rad)+0.5;

    var data = [{
        type: "pie",
        showlegend: false,
        hole: 0.5,
        rotation: 90,
        values: [10/9, 10/9, 10/9, 10/9, 10/9, 10/9, 10/9, 10/9, 10/9, 10],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", 
                     "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", 
                     "rgba(154, 205, 50, 0.6)", "rgba(255, 0, 0, 0.6)", 
                     "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", 
                     "rgba(144, 238, 144, 0.6)", "white"]
        },
        hoverinfo: "text"
    }];

    var layout = {
        shapes:[{
            type: 'line',
            x0: 0.5, //center x
            y0: 0.5, //center y
            x1: x,
            y1: y,
            line: {
              color: 'red',
              width: 4
            }
          }],
        title: '<b>Belly Button Washing Frequency</b> <br>Scrubs per Week',
        height: 650,
        width: 650
    };

    Plotly.react("gauge", data, layout);
}

function updateGuage(metadata) {
    wfreq = metadata[0].wfreq;
    degChanger = wfreq * 20 //degree;

    deg = 180-degChanger, r = .3;
    rad = deg * Math.PI / 180;
    x = r*Math.cos(rad)+0.5;
    y = r*Math.sin(rad)+0.5;

    var layout_guage = {
        'shape.x1': [x],
        'shape.y1': [y]
    };
    Plotly.restyle("guage",layout_guage);
};