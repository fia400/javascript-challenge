// Starter Code
var tableData = data;



// Create References
var $tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");


var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]



// Input the data into the HTML
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = $tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column])
        )
    });
}

addData(tableData);


button.on("click", () => {

    d3.event.preventDefault();
    
    //make all lowercase to allow for searching
    var inputDate = inputFieldDate.property("value").trim();

    var inputCity = inputFieldCity.property("value").toLowerCase().trim();

    
    //Filter by date
    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);

    //Filter by city
    var filterCity = tableData.filter(tableData => tableData.city === inputCity);

    //take both city and time to filter data
    var filterCombinedData = tableData.filter(tableData => tableData.datetime === inputDate && tableData.city === inputCity);


    $tbody.html("");

    let response = {
        filterDate, filterCity, filterCombinedData
    }


    // If else statement, 

    if(response.filterCombinedData.length !== 0) {
        addData(filterCombinedData);
    }


        else if(response.filterCombinedData.length === 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0))) {
            addData(filterDate) || addData(filterCity);
        }



        else {
            $tbody.append("tr").append("td").text("Try Again!");
        }
})