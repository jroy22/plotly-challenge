// Check to see whether app.js is being read
console.log("app.js loaded");

// Code credit to Dom during Office Hours on 4/17/2021

// Function stubs

// Function to Draw a bar graph for a given id
function DrawBarGraph(sampleId) {
    console.log(`DrawBarGraph ${sampleId}`);
    d3.json("./data/samples.json").then(function (data) {
        //console.log(data);

        // Getting the values from the json to variables for the bar graph
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        //console.log(resultArray);

        var result = resultArray[0];
        //console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

        // Setting up the bar graph
        yticks = otu_ids.slice(0,10).map(otu_ids =>  `OTU ${otu_ids}`).reverse()

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t:130, l:150}
        }

        Plotly.newPlot("bar", barArray, barLayout);
    }); 
}

// Function to Draw a bubble chart for a given id
function DrawBubbleChart(sampleId) {
    console.log(`DrawBubbleChart ${sampleId}`);
    d3.json("./data/samples.json").then(function (data) {
        //console.log(data);

        // Getting the values from the json to variables for the bubble graph
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        //console.log(resultArray);

        var result = resultArray[0];
        //console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        }

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
});
}

// Function to Create a Demographics Table for a given id
function CreateDemoTable(sampleId) {
    console.log(`CreateDemoTable ${sampleId}`);
    d3.json("./data/samples.json").then(function (data) {
        console.log(data);

        // Getting the values from the json to variables for the demographics table
        var demographics = data.metadata;
        var resultArray = demographics.filter(s => s.id == sampleId);
        console.log(resultArray);

        // Getting the information for an subject 
        var information = resultArray[0];
        console.log(information);

        // Putting the information onto the table 
        var table = d3.select("#sample-metadata");
        table.html("");
        Object.entries(information).forEach(([key, value]) => {
            table.append("h5").text(`${key}: ${value}`);
        });

    });
}

// Function to Draw a gauge chart for a given id
function DrawGaugeChart(sampleId) {
    console.log(`DrawGauge ${sampleId}`);
}

// Event handler function when the a new sample id is choosen
function optionChanged(newsampleId) {
    console.log(`User selected ${newsampleId}`);
    DrawBarGraph(newsampleId);
    DrawBubbleChart(newsampleId);
    CreateDemoTable(newsampleId);
    DrawGaugeChart(newsampleId);
}

// Function to display the visualizations onto a dashboard
function InitDashboard(){
    console.log("Init Dashboard()");

    // Populate the dropdown
        var selector = d3.select("#selDataset");

        d3.json("./data/samples.json").then(function (data) {
            console.log(data);
            
            var sampleName = data.names;
            
            // For each to get the Sample Ids on the dropdown
            sampleName.forEach(sampleId => {
                selector.append("option")
                        .text(sampleId)
                        .property("value", sampleId);
            });
        
            var id = sampleName[0];

            // Commands to create visualizations
            DrawBarGraph(id);
            DrawBubbleChart(id);
            CreateDemoTable(id);
            DrawGaugeChart(id);

        });


    // Update the bargraph
    // Update Bubble Graph
    // Update Demographic Info
}

InitDashboard();
