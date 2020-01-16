const file = d3.json("../../samples.json");
const dropDown = d3.select("#selDataset");
const demograph = d3.select("#sample-metadata");

function hbarChart(sample) {
    var x = sample.sample_values.slice(0,10);
    var y = sample.otu_ids.slice(0,10);
    var name = sample.otu_labels.slice(0,10);

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
            t: 20,
            l: 120
        }
    };
    Plotly.newPlot("bar", data, layout);
};

function bubbleChart(sample) {
    var x = sample.otu_ids;
    var y = sample.sample_values;
    var name = sample.otu_labels;

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
    Object.entries(metadata).forEach(([key, value]) => {
        demograph.append("h6")
                 .append("b")
                 .text(`${key}: ${value}`);
    })
};

function optionChanged() {
    
};

function init() {
    file.then((data) => {
        data["names"].forEach(item => {
            dropDown.append("option")
                    .text(item)
                    .property("value", item);
        });
        hbarChart(data.samples[0]);
        bubbleChart(data.samples[0]);
        demoInfo(data.metadata[0]);
    });
};
init();

file.then( (data) => {
    // console.log(data);
    // console.log(data['names']);
    // console.log(data.names[0]);
    console.log(data.samples);
    console.log(data.samples[0]);
    console.log(data.samples[0].id);
    // console.log(data.samples[0].sample_values.slice(0,10));
    // console.log(data.samples[0].otu_ids.slice(0,10));
    // console.log(data.samples[0]['sample_values']);
    // console.log(data.samples[0]['otu_ids']);
    // console.log(data.samples[0]['otu_labels']);
});