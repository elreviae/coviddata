var covApi = 'https://disease.sh/v3/covid-19/countries?yesterday=true';

var cellFormatNewDeaths = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 49) {
        cell.getElement().classList.add("w3-metro-dark-red");
        return '+' + value.toLocaleString();
    } else if (value >= 50 && value <= 99) {
        cell.getElement().classList.add("w3-metro-red");
        return '+' + value.toLocaleString();
    } else if (value >= 100 && value <= 500000) {
        cell.getElement().classList.add("w3-black", "w3-text-red");
        return '+' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewCases = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 499) {
        cell.getElement().classList.add("w3-metro-yellow");
        return '+' + value.toLocaleString();
    } else if (value >= 500 && value <= 1499) {
        cell.getElement().classList.add("w3-metro-orange");
        return '+' + value.toLocaleString();
    } else if (value >= 1500 && value <= 500000) {
        cell.getElement().classList.add("w3-black", "w3-text-orange");
        return '+' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewRecov = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 499) {
        cell.getElement().classList.add("w3-metro-dark-green", "w3-text-lime");
        return '+' + value.toLocaleString();
    } else if (value >= 500 && value <= 1499) {
        cell.getElement().classList.add("w3-metro-green");
        return '+' + value.toLocaleString();
    } else if (value >= 1500 && value <= 500000) {
        cell.getElement().classList.add("w3-metro-light-green");
        return '+' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatActiveCases = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 4999) {
        cell.getElement().classList.add("w3-text-aqua");
        return value.toLocaleString();
    } else if (value >= 5000 && value <= 99999) {
        cell.getElement().classList.add("w3-text-cyan");
        return value.toLocaleString();
    } else if (value >= 100000 && value <= 499999) {
        cell.getElement().classList.add("w3-text-light-blue");
        return value.toLocaleString();
    } else if (value > 500000) {
        cell.getElement().classList.add("w3-text-blue");
        return value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatIntenseCare = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 999) {
        cell.getElement().classList.add("w3-text-yellow");
        return value.toLocaleString();
    } else if (value >= 1000 && value <= 2499) {
        cell.getElement().classList.add("w3-text-amber");
        return value.toLocaleString();
    } else if (value >= 2500 && value <= 4999) {
        cell.getElement().classList.add("w3-text-orange");
        return value.toLocaleString();
    } else if (value > 5000) {
        cell.getElement().classList.add("w3-text-deep-orange");
        return value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatterToLocString = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatString = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value;
    }
};

var covTable = new Tabulator("#covTable", {
    ajaxURL: covApi, //ajax URL
    ajaxConfig: "GET", //ajax HTTP request type
    ajaxContentType: "json", // send parameters to the server as a JSON encoded string
    downloadConfig: {
        columnHeaders: true, //do not include column headers in downloaded table
        columnGroups: false, //do not include column groups in column headers for downloaded table
        columnCalcs: false, //do not include column calcs in downloaded table
    },
    height: 750,
    placeholder: "Data Loading",
    pagination: "local", //enable local pagination.
    paginationSize: 15, // this option can take any positive integer value
    paginationSizeSelector: true, //enable page size select element and generate list options
    layout: "fitDataStretch",
    resizableRows: false,
    initialSort: [
        { column: "todayCases", dir: "desc" },
    ],
    columns: [
        {
            title: "Flags", field: "countryInfo.flag", hozAlign: "center", sorter: "string", formatter: "image", download: false, resizable: false, vertAlign: "middle",
            formatterParams: {
                width: "45px",
                height: "30px",
            }
        },
        { title: "Codes", field: "countryInfo.iso2", hozAlign: "center", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Search", resizable: false, vertAlign: "middle", formatter: cellFormatString },
        { title: "Country, Other", field: "country", hozAlign: "center", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Search", resizable: false, vertAlign: "middle", formatter: cellFormatString },
        {
            title: "Latest Cases",
            columns: [
                { title: "New cases", field: "todayCases", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatNewCases },
                { title: "New deaths", field: "todayDeaths", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatNewDeaths },
                { title: "New recovered", field: "todayRecovered", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatNewRecov },
            ]
        },
        { title: "Active Cases", field: "active", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatActiveCases },
        { title: "Critical, Serious", field: "critical", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatIntenseCare },
        { title: "Total Confirmed", field: "cases", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatterToLocString },
        { title: "Total Deaths", field: "deaths", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatterToLocString },
        { title: "Total Recovered", field: "recovered", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatterToLocString },
        { title: "Total Tests", field: "tests", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatterToLocString },
        { title: "Population", field: "population", hozAlign: "center", sorter: "number", resizable: false, vertAlign: "middle", formatter: cellFormatterToLocString },
    ],
});

