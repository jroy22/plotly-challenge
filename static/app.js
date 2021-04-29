// Check to see whether app.js is being read
console.log("app.js loaded");

// Code credit to Dom during Office Hours on 4/17/2021

// Function stubs

// Function to Draw a bar graph for a given id
function DrawBarGraph(sampleId) {
    console.log(`DrawBarGraph ${sampleId}`);
    d3.json("./data/samples.json").then(function (data) {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        console.log(resultArray);

        var result = resultArray[0];
        console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        console.log(otu_ids);
        console.log(otu_labels);

    }) 
}

// Function to Draw a bubble chart for a given id
function DrawBubbleChart(sampleId) {
    console.log(`DrawBubbleChart ${sampleId}`);
}

// Function to Create a Demographics Table for a given id
function CreateDemoTable(sampleId) {
    console.log(`CreateDemoTable ${sampleId}`);
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
