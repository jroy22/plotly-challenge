// Check to see whether app.js is being read
console.log("app.js loaded");

// Code credit to Dom during Office Hours on 4/17/2021

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
        
            var id = sampleNames[0];

            // Function stubs
            DrawBargraph(id);
            DrawBubbleChart(id);
            CreateDemoTable(id);
            //DrawGauge(id);

        });


    // Update the bargraph
    // Update Bubble Graph
    // Update Demographic Info
}

InitDashboard();
