const file = "../../samples.json";

function init() {
    d3.json(file).then((data) => {
        var id = d3.select("#selDataset").append("option")
                .text(data.samples[0].id);

        var x = data.samples[0].sample_values.slice(0,10);
        var y = data.samples[0].otu_ids.slice(0,10);
        var name = data.samples[0].otu_labels.slice(0,10);
        var reverse_y = y.sort((a,b) => b-a);
        
        var data = [{
            type: 'bar',
            name: name,
            x: x,
            y: `${reverse_y}`,
            text: name,
            orientation: 'h',
        }];
        
        var layout = {
            xaxis: {
                autorange: true
            },
            yaxis: {
                autorange: 'reversed'
            },
            bargap: 0.5
        }
        
        Plotly.newPlot("bar", data, layout);
    });
};
init();

d3.json(file).then( (data) => {
    console.log(data.samples[0]);
    console.log(data.samples[0].sample_values.slice(0,10));
    console.log(data.samples[0].otu_ids.slice(0,10));
});