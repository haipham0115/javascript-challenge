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

// function to make the table head
function constructTableHead(table, data) {
    var thead = table.createTHead();
    var row = thead.insertRow();
    for (var key of data) {
        var th = document.createElement("th");
        var text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

// function to fill the data into the actual table
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

// locate the element that will contain the table
var ufoTable = document.getElementById("ufo-table");
// grab the keys of the JSON object, will be used to make the table head
var tableHead = Object.keys(data[0]);

// calling the 2 function to fully construct the table
fillingTable(ufoTable, data);
constructTableHead(ufoTable, tableHead);


// Filtering the data, using the input date 
var filterButton = d3.select('#filter-btn');
var filterTable = d3.select('#datetime');

filterButton.on("click", runFilter);
filterTable.on("submit", runFilter);


function runFilter() {
    d3.event.preventDefault();

    // Grabbing the input element
    var inputElement = d3.select('#datetime');
    // retrieve the actual value of the input
    var inputValue = inputElement.property('value');

    // set the condition to filter, and create a new array object
    var filteredData = data.filter(datum => datum.datetime === inputValue);
    console.log(filteredData)

    // In order to load the new filtered table, I need to delete the current table from the original data
    // grab the element that contain the table
    var tableToDelete = d3.select("#ufo-table");
    // remove all the children of inside the table, leaving the <table></table> blank
    tableToDelete.html("");

    // CONSTRUCT A NEW TABLE WITH `filteredData`


    // Passing the filterData as new parameter to fillingTable function
    // Call the function to reload the table with filtered input
    fillingTable(ufoTable, filteredData);
    // also, reconstruct the table head: same parameter as original is fine
    constructTableHead(ufoTable, tableHead);
};