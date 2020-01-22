const file = d3.json("./data/samples.json");

function hbarChart(sample) {
    var x = sample[0].sample_values.slice(0,10);
    var y = sample[0].otu_ids.slice(0,10);
    var name = sample[0].otu_labels.slice(0,10);

    var data = [{
        type: 'bar',
        x: x.reverse(),
        y: y.map(d => 'OTU '+ d+' ').reverse(),
        text: name,
        orientation: 'h'
    }];
    
    var layout = {
        height: 550,
        width: 450,
        margin: {
            t: 25,
            l: 120
        }
    };

    // Plotly.react functions like newPlot but restyles on recall instead
    // of breaking and creating a newPlot.
    // https://plot.ly/javascript/plotlyjs-function-reference/
    // This seems ideal than making two distinct functions for newPlot and restyle
    Plotly.react("bar", data, layout);
};

function bubbleChart(sample) {
    var x = sample[0].otu_ids;
    var y = sample[0].sample_values;
    var name = sample[0].otu_labels;

    var data = [{
        mode: 'markers',
        x: x,
        y: y,
        text: name,
        marker: {
            color: x,
            size: y,
            colorscale: 'Earth'
        }
    }];
    
    var layout = {
        xaxis: {
            title: 'OTU ID'
        },
        margin: {
            t: 0
        }
    };
    Plotly.react("bubble", data, layout);
};

function demoInfo(metadata) {
    d3.select("#sample-metadata").html("");
    Object.entries(metadata[0]).forEach(([k, v]) => {
        d3.select("#sample-metadata").append("h6")
                                     .append("b")
                                     .text(`${k}: ${v}`);
    });
};

function updateCharts(sample) {
    var id = sample[0].otu_ids;
    var value = sample[0].sample_values;
    var label = sample[0].otu_labels;

    var data_bar = {
        'x': [value.slice(0,10).reverse()],
        'y': [id.slice(0,10).map(d => 'OTU '+ d+' ').reverse()],
        'text': label.slice(0,10)
    };

    var data_bubble = {
        'x': [id],
        'y': [value],
        'text': [label],
        'marker.color': [id],
        'marker.size': [value]
    };

    Plotly.restyle("bar", data_bar);
    Plotly.restyle("bubble", data_bubble);
}

function optionChanged(this_value) {
    // console.log(this_value);
    // console.log(typeof this_value);
    file.then((data) => {
        let sample = data.samples.filter(d => d.id == this_value);
        let metadata = data.metadata.filter(d => d.id == this_value);

        // hbarChart() & bubbleChart(): Plotly.react() used
        // hbarChart(sample);
        // bubbleChart(sample);
        // guageChart(metadata);

        updateCharts(sample); // updateCharts: Plotly.restyle() used
        // updateGuage(metadata);
        demoInfo(metadata);
    });
};

function init() {
    file.then((data) => {
        // Dropdown Menu
        data["names"].forEach(item => {
            d3.select("#selDataset").append("option")
                    .text(item)
                    .property("value", item);
        });
        // Charts and Demographics Info
        hbarChart(data.samples);
        bubbleChart(data.samples);
        demoInfo(data.metadata);
        // bonus.js
        gaugeChart(data.metadata);
    });
};
init();

// Test runs
// file.then((data) => {
    // console.log(data);
    // console.log(data['names']);
    // console.log(data.names[0]);
    // console.log(data.samples);
    // console.log(data.samples[0]);
    // console.log(data.samples[0].id);
    // console.log(typeof data.samples[0].id);

    // var sample = data.samples.filter(d => d.id == '941');
    // console.log(sample);
    // console.log(sample[0]);
// });