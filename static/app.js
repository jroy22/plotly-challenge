// Check to see whether app.js is being read
console.log("app.js loaded");

// Code credit to Dom during Office Hours on 4/17/2021

function InitDashboard(){
    console.log("Init Dashboard()");

    //Populate the dropdown
        var selector = d3.select("#selDataset");

        d3.json("./data/samples.json").then(function (data) {
            console.log(data);
            
            var sampleName = data.names;
            sampleName.forEach(sampleId => {
                selector.append("option")
                        .text(sampleId)
                        .property("value", sampleId);
            });

        });


    //Update the bargraph
    //Update Bubble Graph
    //Update Demographic Info
}

InitDashboard();
