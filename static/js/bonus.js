function gaugeChart(metadata) {
    var wfreq = metadata[0].wfreq;
    // console.log(wfreq);
    // var degChanger = wfreq * 20
    // var deg = 180-degChanger;
    var r = .3;
    var rad = (180 - wfreq*20) * Math.PI / 180;
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
        title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week'
    };

    Plotly.react("gauge", data, layout);
}

// I couldn't find a way to restyle only the layout part of a plot using restyle

// function updateGuage(metadata) {
//   var wfreq = metadata[0].wfreq;
//   var r = .3;
//   var rad = (180 - wfreq*20) * Math.PI / 180;
//   var x = r*Math.cos(rad)+0.5;
//   var y = r*Math.sin(rad)+0.5;

//     var update_needle = {
//         'shape.x1': [x],
//         'shape.y1': [y]
//     };
//     Plotly.restyle("guage",update_needle);
// };