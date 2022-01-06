// from data.js
var tableData = data;

// YOUR CODE HERE!

// function fillingTable() {
//     // grabbing the table element:
//     // choosing the "location" of the HTML to put the table in
//     var ufoTable = document.getElementById("ufo-table");

//     // collecting the keys in JSON for columns name
//     var columns = [];
//     for (var i = 0; i < tableData.length; i++) {
//         for (var key in tableData[i]) {

//             // indexOf -1 is the condition to check if the array already has that element or not
//             // if the element is already inside the array, it will have the index as an interger: 0,1,2...
//             if (columns.indexOf(key) === -1) {
//                 columns.push(key);
//             }
//         }
//     }

//     // create a <tr> element of the table
//     for (var i = 0; i < tableData.length; i++) {


//         var trow = ufoTable.insertRow(-1);

//         for (var j = 0; j < columns.length; j++) {
//             // create new cell 
//             var cell = trow.insertCell(-1);
//             cell.innerHTML = tableData[i][columns[j]];
//         }
//     }
// }

function fillingTable(table, data) {
    for (var element of data) {
        var row = table.insertRow();
        for (key in element) {
            var cell = row.insertCell();
            var text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

var ufoTable = document.getElementById("ufo-table");
// var tableBody = ufoTable.getElementsByTagName("tbody")
fillingTable(ufoTable, data);



// Filtering the data, using the input date 
var filterButton = d3.select('#filter-btn');
var filterTable = d3.select('#datetime');

filterButton.on("click", runEnter);
filterTable.on("submit", runEnter);


function runEnter() {
    d3.event.preventDefault();

    var inputElement = d3.select('#datetime');

    var inputValue = inputElement.property('value');

    //testing,  IT WORKS BABY!!!!!!!
    function whatever(datum) {
        return datum.datetime === inputValue
    };

    var filteredData = data.filter(datum => datum.datetime === inputValue);
    console.log(filteredData)

    // passing the filterData as new parameter to fillingTable function
    // call the function to reload the table with filtered input
    fillingTable(ufoTable, filteredData);
}