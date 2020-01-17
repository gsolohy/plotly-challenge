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
    Plotly.newPlot("bar", data, layout);
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
    Plotly.newPlot("bubble", data, layout);
};

function demoInfo(metadata) {
    d3.select("#sample-metadata").html("");
    Object.entries(metadata[0]).forEach(([k, v]) => {
        d3.select("#sample-metadata").append("h6")
                                     .append("b")
                                     .text(`${k}: ${v}`);
    });
};

function optionChanged(this_value) {
    console.log(this_value);
    file.then((data) => {
        let sample = data.samples.filter(d => d.id == this_value);
        let metadata = data.metadata.filter(d => d.id == this_value);

        hbarChart(sample);
        bubbleChart(sample);
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
        // gaugeChart(data.metadata[0]);
    });
};
init();

// Test runs
file.then((data) => {
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
});