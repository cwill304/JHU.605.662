(function () {

    // Store all node data
    var nodes = [];

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
            var obj = {id: rIndex};
            var values = row.split(",");
            values.forEach((value, vIndex) => {
                obj[vIndex] = value;
            });
            nodes.push(obj);
        });
        console.log(nodes);
    }



})();