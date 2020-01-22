function gaugeChart(metadata) {
    var wfreq = metadata[0].wfreq;
    // console.log(wfreq);
    // var degChanger = wfreq * 20
    // var deg = 180-degChanger;
    var r = .3;
    var rad = (180 - (wfreq)*20) * Math.PI / 180;
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
            colors: ["rgba(0, 140, 80, 0.1)", "rgba(0, 140, 80, 0.2)", 
                     "rgba(0, 140, 80, 0.3)", "rgba(0, 140, 80, 0.4)", 
                     "rgba(0, 140, 80, 0.5)", "rgba(0, 140, 80, 0.6)", 
                     "rgba(0, 140, 80, 0.7)", "rgba(0, 140, 80, 0.8)", 
                     "rgba(0, 140, 80, 0.9)", "white"]
        },
        // labels: ["wfreq: 1", "wfreq: 2", "wfreq: 3", "wfreq: 4", "wfreq: 5", "wfreq: 6", "wfreq: 7", "wfreq: 8", "wfreq: 9", ""],
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
// function doesn't work
function updateGauge(metadata) {
  var wfreq = metadata[0].wfreq;
  var r = .3;
  var rad = (180 - wfreq*20) * Math.PI / 180;
  var x = r*Math.cos(rad)+0.5;
  var y = r*Math.sin(rad)+0.5;

  var update_needle = {
      'shape.x1': [x],
      'shape.y1': [y]
  };
  Plotly.restyle("guage", update_needle);
};