function gaugeChart(metadata) {
    // console.log(metadata[0]);
    let degChanger = metadata[0].wfreq * 20 //degree;

    let deg = 180-degChanger, r = .3;
    let rad = deg * Math.PI / 180;
    let x = r*Math.cos(rad)+0.5;
    let y = r*Math.sin(rad)+0.5;

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
            colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "white"]
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

    var data_guage = {
        'x': [value.slice(0,10).reverse()],
        'y': [id.slice(0,10).map(d => 'OTU '+ d+' ').reverse()],
        'text': label.slice(0,10)
    };
    Plotly.restyle("guage",data_guage);
};