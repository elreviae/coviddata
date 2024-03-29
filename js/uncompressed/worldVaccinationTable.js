var cellFormatReproductionRate = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value >= 1) {
        cell.getElement().classList.add("w3-black", "w3-text-red");
        return '<i class="fas fa-sort-up arrowUpDown"></i>' + value;
    } else if (value <= 0.99 && value >= 0.5) {
        cell.getElement().classList.add("w3-metro-dark-orange");
        return '<i class="fas fa-sort-down arrowUpDown"></i>' + value;
    } else if (value < 0.49 && value > 0) {
        cell.getElement().classList.add("w3-metro-orange");
        return '<i class="fas fa-sort-down arrowUpDown"></i>' + value;
    } else if (value == 0) {
        cell.getElement().classList.add("w3-metro-yellow");
        return value;
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value;
    }
};
var cellFormatNewVaccinations = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 49999) {
        cell.getElement().classList.add("w3-indigo");
        return '+ ' + value.toLocaleString();
    } else if (value >= 50000 && value <= 99999) {
        cell.getElement().classList.add("w3-blue");
        return '+ ' + value.toLocaleString();
    } else if (value >= 100000 && value <= 999999) {
        cell.getElement().classList.add("w3-light-blue");
        return '+ ' + value.toLocaleString();
    } else if (value > 1000000) {
        cell.getElement().classList.add("w3-aqua");
        return '+ ' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatPeopleVaccinated = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 9999) {
        cell.getElement().classList.add("w3-metro-red");
        return value.toLocaleString();
    } else if (value >= 10000 && value <= 999999) {
        cell.getElement().classList.add("w3-metro-dark-orange");
        return value.toLocaleString();
    } else if (value >= 10000000 && value <= 49999999) {
        cell.getElement().classList.add("w3-metro-orange");
        return value.toLocaleString();
    } else if (value > 50000000) {
        cell.getElement().classList.add("w3-metro-yellow");
        return value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatPeopleFullyVaccinated = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 9999) {
        cell.getElement().classList.add("w3-teal");
        return value.toLocaleString();
    } else if (value >= 10000 && value <= 999999) {
        cell.getElement().classList.add("w3-metro-dark-green");
        return value.toLocaleString();
    } else if (value >= 10000000 && value <= 49999999) {
        cell.getElement().classList.add("w3-metro-green");
        return value.toLocaleString();
    } else if (value > 50000000) {
        cell.getElement().classList.add("w3-metro-light-green");
        return value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatBooster = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 99999) {
        cell.getElement().classList.add("w3-text-teal");
        return value.toLocaleString();
    } else if (value >= 100000 && value <= 999999) {
        cell.getElement().classList.add("w3-text-green");
        return value.toLocaleString();
    } else if (value >= 1000000 && value <= 9999999) {
        cell.getElement().classList.add("w3-text-light-green");
        return value.toLocaleString();
    } else if (value > 10000000) {
        cell.getElement().classList.add("w3-text-lime");
        return value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewTests = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 4999) {
        cell.getElement().classList.add("w3-text-aqua");
        return '+ ' + value.toLocaleString();
    } else if (value >= 5000 && value <= 99999) {
        cell.getElement().classList.add("w3-text-cyan");
        return '+ ' + value.toLocaleString();
    } else if (value >= 100000 && value <= 499999) {
        cell.getElement().classList.add("w3-text-light-blue");
        return '+ ' + value.toLocaleString();
    } else if (value > 500000) {
        cell.getElement().classList.add("w3-text-blue");
        return '+ ' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatTotalTests = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 499999) {
        cell.getElement().classList.add("w3-text-green");
        return value.toLocaleString();
    } else if (value >= 500000 && value <= 999999) {
        cell.getElement().classList.add("w3-text-light-green");
        return value.toLocaleString();
    } else if (value >= 1000000 && value <= 4999999) {
        cell.getElement().classList.add("w3-text-lime");
        return value.toLocaleString();
    } else if (value > 5000000) {
        cell.getElement().classList.add("w3-text-yellow");
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
var cellFormatContinent = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value == null) {
        // cell.getElement().classList.add("w3-text-red");
        return 'Continent';
    } else {
        return value;
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
var cellFormatPercent = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value + ' %';
    }
};

var vaccinTable = new Tabulator("#vaccinTable", {
    rowFormatter: function (row) {
        var data = row.getData(); //get data object for row
        if (data.location == "World" || data.location == "International" || data.continent == null) {
            row.delete();
        };
    },
    downloadConfig: {
        columnHeaders: true, //do not include column headers in downloaded table
        columnGroups: false, //do not include column groups in column headers for downloaded table
        columnCalcs: false, //do not include column calcs in downloaded table
    },
    cellVertAlign: "middle",
    height: 750,
    placeholder: "Data Loading",
    virtualDomBuffer: 300,
    pagination: "local", //enable local pagination.
    paginationSize: 15, // this option can take any positive integer value
    layout: "fitDataStretch",
    tooltips: false,
    resizableRows: false,
    initialSort: [
        { column: "total_vaccinations", dir: "desc" },
    ],
    columns: [
        { title: "Continent", field: "continent", hozAlign: "center", sorter: "string", headerFilter: "select", headerFilterParams: { values: true }, headerFilterPlaceholder: "Select", formatter: cellFormatContinent },
        { title: "Location", field: "location", hozAlign: "center", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Search", formatter: cellFormatString },
        { title: "New vaccinations", field: "new_vaccinations", hozAlign: "center", sorter: "number", formatter: cellFormatNewVaccinations },
        { title: "People vaccinated <br/> (at least 1 dose)", field: "people_vaccinated", hozAlign: "center", sorter: "number", formatter: cellFormatPeopleVaccinated },
        { title: "People Fully vaccinated<br/> (all doses)", field: "people_fully_vaccinated", hozAlign: "center", sorter: "number", formatter: cellFormatPeopleFullyVaccinated },
        { title: "Total boosters doses", field: "total_boosters", hozAlign: "center", sorter: "number", formatter: cellFormatBooster },
        { title: "Total vaccinations", field: "total_vaccinations", hozAlign: "center", sorter: "number", formatter: cellFormatterToLocString },
        { title: "New tests", field: "new_tests", hozAlign: "center", sorter: "number", formatter: cellFormatNewTests },
        { title: "Total tests", field: "total_tests", hozAlign: "center", sorter: "number", formatter: cellFormatTotalTests },
        { title: "Reproduction rate (R)", field: "reproduction_rate", hozAlign: "center", width: 120, formatter: cellFormatReproductionRate },
        { title: "Population", field: "population", hozAlign: "center", sorter: "number", formatter: cellFormatterToLocString },
    ],
});

var vaccinAPI = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json';
$.getJSON(vaccinAPI, function (vaccindata) {
    if (vaccindata.location == 'World') { delete vaccindata.location['World']; }
    if (vaccindata.location == 'International') { delete vaccindata.location['International']; }
    let vaccinResultData = Object.keys(vaccindata).reduce(function (result, key) {
        return result.concat(key, vaccindata[key]);
    }, []);
    // console.log(vaccinResultData);
    vaccinTable.setData(vaccinResultData);
});