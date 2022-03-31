// Boolean to control button validity
var redrawValidity = false;

// Global data var
var data = {nodes: [], links: []};

function redraw() {
    if (redrawValidity) {
        // Block multiple clicks
        redrawValidity = false;
        document.getElementById("loading-overlay").style.display = "block";

        // Get input values
        var edgeColor = document.getElementById("edge-color").value;
        var vertexColor = document.getElementById("vertex-color").value;
        var edgeWeight = document.getElementById("edge-weight-switch").checked;
        var vertexLabel = document.getElementById("vertex-label-switch").checked;
        var bgColor = document.getElementById("bg-color").value;
        var shapeSelection = document.getElementById("shape-picker").value;

        // Render using input values
        render(data, edgeColor, vertexColor, bgColor, shapeSelection, vertexLabel, edgeWeight);
    }
}

(function () {

    // Redraw button should not be usable while data is loading initially
    redrawValidity = false;

    // GET the CSV file
    var request = new XMLHttpRequest();
    request.open('GET', 'data.csv', true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        convertCSV(this.response);
      }
    };
    request.send();

    // Convert CSV format to JSON
    function convertCSV(csv) {
        var rows = csv.split(/\r?\n/);
        rows.forEach((row, rIndex )=> {
            var vertexID = rIndex + 1;
            var vertex = {id: vertexID, name: String.fromCharCode(64 + vertexID)};
            data.nodes.push(vertex);
            var values = row.split(",");
            values.forEach((value, vIndex) => {
                if ((vIndex >= rIndex) && (value > 0)) {
                    data.links.push({
                        source: vertexID,
                        target: vIndex + 1,
                        weight: value
                    });
                }
            });
        });
        render(data);
    }
})();

function render(data, lineColor = "#000", nodeColor = "#69b3a2", bgColor="#fafafc", shape=1, vertexLabel=true, linkLabel=false) {

    // Remove any existing SVG/data from the DOM
    d3.select("svg").remove();
    
    // Get the element's size
    var content = document.querySelector('#viz-right');
    var width = content.clientWidth;
    var height = content.clientHeight;

    // Add SVG to the DOM
    var svg = d3.select("#viz-right").append("svg") .attr("width", "100%").attr("height", "100%");//.append("g");
    var g = svg.append("g").attr("transform", function(d, i) { return "translate(0,0)";});
    document.getElementById("viz-right").style.backgroundColor = bgColor;

    // Initialize the links
    var link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", lineColor);

    var symbols = [d3.symbolCircle, d3.symbolSquare, d3.symbolStar, d3.symbolCross, d3.symbolDiamond, d3.symbolTriangle, d3.symbolWye];
    var sym = d3.symbol().type(symbols[shape - 1]).size(300);
    var node = svg
    .selectAll("shape")
    .data(data.nodes)
    .enter()
    .append("path")
    .attr("d", sym)
    .style("fill", nodeColor);

    // Move the graph
    var simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink()
        .id(function(d) { 
            return d.id; 
        })
        .links(data.links)
        )
        .force("charge", d3.forceManyBody().strength(height * -0.18))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("end", update);

    function update() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        node.attr("transform", function(d) { return ["translate(", d.x, ",", d.y, ")"].join(""); });

        if (vertexLabel) {
            var hexIn = (nodeColor.slice(1)).match(/.{1,2}/g);
            var rgbOut = [
                parseInt(hexIn[0], 16),
                parseInt(hexIn[1], 16),
                parseInt(hexIn[2], 16)
            ];
            var avg = (rgbOut[0] + rgbOut[1] + rgbOut[2]) / 3;
            var labelColor = (avg > 128) ? "black" : "white";
            node.append("title").text(function(d) { 
                svg.append("text")
                .attr("x", d.x - 4)
                .attr("y", d.y + 4)
                .attr("stroke", labelColor)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .text(d.name);
                return d.name; 
            });
        }
        if (linkLabel) {
            link.append("title").text(function(d) { 
                svg.append("text")
                .attr("x", (d.source.x + d.target.x) / 2)
                .attr("y", (d.source.y + d.target.y) / 2)
                .attr("stroke", lineColor)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .text(d.weight);
                return d.weight; 
            });
        }

        document.getElementById("loading-overlay").style.display = "none";
        redrawValidity = true;
    }
}