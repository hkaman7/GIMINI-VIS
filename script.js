document.addEventListener("DOMContentLoaded", function () {
    d3.csv("data.csv").then(function (data) {
        window.dataset = data;
        displayData(data);
    });
});

function filterData() {
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let location = document.getElementById("location").value;

    let filteredData = window.dataset.filter(d => {
        let dateCheck = (!startDate || new Date(d.date) >= new Date(startDate)) &&
                        (!endDate || new Date(d.date) <= new Date(endDate));
        let locationCheck = (location === "all" || d.location === location);
        return dateCheck && locationCheck;
    });
    
    displayData(filteredData);
}

function displayData(data) {
    let tableBody = d3.select("#data-table");
    tableBody.html("");
    
    data.forEach(d => {
        let row = tableBody.append("tr");
        row.append("td").text(d.date);
        row.append("td").text(d.location);
        row.append("td").text(d.category);
        row.append("td").text(d.sub_category);
    });
}
