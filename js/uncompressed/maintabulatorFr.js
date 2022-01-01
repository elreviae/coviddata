var covApiFr = 'https://coronavirusapifr.herokuapp.com/data/live/departements';

var cellFormatHospPressure = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value >= 1) {
        cell.getElement().classList.add("w3-black", "w3-text-red");
        return '<i class="fas fa-sort-up arrowUpDown"></i> ' + value.toPrecision(4);
    } else if (value <= 0.99 && value >= 0.5) {
        cell.getElement().classList.add("w3-metro-red");
        return '<i class="fas fa-sort arrowUpDown"></i> ' + value.toPrecision(3);
    } else if (value < 0.49 && value > 0) {
        cell.getElement().classList.add("w3-metro-dark-red");
        return '<i class="fas fa-sort-down arrowUpDown"></i> ' + value.toPrecision(3);
    } else if (value == 0) {
        cell.getElement().classList.add("w3-metro-magenta");
        return value.toPrecision(3);
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value;
    }
};
var cellFormatActualHospAdmiss = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 49) {
        cell.getElement().classList.add("w3-text-aqua");
        return '<strong>' + value.toLocaleString() + '</strong>';
    } else if (value >= 50 && value <= 149) {
        cell.getElement().classList.add("w3-text-cyan");
        return '<strong>' + value.toLocaleString() + '</strong>';
    } else if (value >= 150 && value <= 5000) {
        cell.getElement().classList.add("w3-text-blue");
        return '<strong>' + value.toLocaleString() + '</strong>';
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatHospIntensCare = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 9) {
        cell.getElement().classList.add("w3-text-amber");
        return '<strong>' + value.toLocaleString() + '</strong>';
    } else if (value >= 10 && value <= 49) {
        cell.getElement().classList.add("w3-text-orange");
        return '<strong>' + value.toLocaleString() + '</strong>';
    } else if (value >= 50 && value <= 500) {
        cell.getElement().classList.add("w3-text-deep-orange");
        return '<strong>' + value.toLocaleString() + '</strong>';
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewHospitalAdmiss = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 49) {
        cell.getElement().classList.add("w3-aqua");
        return '+' + value.toLocaleString();
    } else if (value >= 50 && value <= 99) {
        cell.getElement().classList.add("w3-blue");
        return '+' + value.toLocaleString();
    } else if (value >= 100 && value <= 5000) {
        cell.getElement().classList.add("w3-black", "w3-text-blue");
        return '+' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewHospIntensCare = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 9) {
        cell.getElement().classList.add("w3-amber");
        return '+' + value.toLocaleString();
    } else if (value >= 10 && value <= 19) {
        cell.getElement().classList.add("w3-deep-orange");
        return '+' + value.toLocaleString();
    } else if (value >= 20 && value <= 500) {
        cell.getElement().classList.add("w3-black", "w3-text-deep-orange");
        return '+' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewRecovered = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 9) {
        cell.getElement().classList.add("w3-metro-dark-green");
        return '+' + value.toLocaleString();
    } else if (value >= 10 && value <= 49) {
        cell.getElement().classList.add("w3-metro-green");
        return '+' + value.toLocaleString();
    } else if (value >= 50 && value <= 500) {
        cell.getElement().classList.add("w3-metro-light-green");
        return '+' + value.toLocaleString();
    } else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    } else {
        return value.toLocaleString();
    }
};
var cellFormatNewDeaths = function (cell, formatterParams) {
    let value = cell.getValue();
    if (value > 0 && value <= 9) {
        cell.getElement().classList.add("w3-metro-magenta");
        return '+' + value.toLocaleString();
    } else if (value >= 10 && value <= 19) {
        cell.getElement().classList.add("w3-metro-dark-red");
        return '+' + value.toLocaleString();
    } else if (value >= 20 && value <= 500) {
        cell.getElement().classList.add("w3-black");
        return '+' + value.toLocaleString();
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

// var covApiFr = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france%40public&q=&rows=101&sort=date&facet=date&facet=countrycode_iso_3166_1_alpha3&facet=region_min&facet=nom_dep_min&facet=sex&refine.sex=Tous';
// SCHEMA API : https://data.opendatasoft.com/explore/dataset/donnees-hospitalieres-covid-19-dep-france%40public/information/?disjunctive.countrycode_iso_3166_1_alpha3&disjunctive.nom_dep_min&rows=101&q=&timezone=Europe%2FParis&sort=date&lang=FR&refine.sex=Tous

var covFranceTable = new Tabulator("#covidTableFrance", {
    downloadConfig: {
        columnHeaders: true, //do not include column headers in downloaded table
        columnGroups: false, //do not include column groups in column headers for downloaded table
        columnCalcs: false, //do not include column calcs in downloaded table
    },
    height: 750,
    placeholder: "Data Not available",
    pagination: "local", //enable local pagination.
    paginationSize: 14, // this option can take any positive integer value
    layout: "fitColumns",
    resizableRows: false,
    initialSort: [
        { column: "incid_hosp", dir: "desc" },
    ],
    columns: [
        { title: "Reg. Name", field: "lib_reg", hozAlign: "center", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Search", formatter: cellFormatString },
        { title: "Departement", field: "lib_dep", hozAlign: "center", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Search", formatter: cellFormatString },
        { title: "Dep. Code", field: "dep", hozAlign: "center", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Search", formatter: cellFormatString },
        { title: "Hosp. Pressure", field: "TO", hozAlign: "center", sorter: "string", formatter: cellFormatHospPressure },
        {
            title: "Latest French Cases",
            columns: [
                { title: "New Hosp. <br/>admissions", field: "incid_hosp", hozAlign: "center", sorter: "number", topCalc: "sum", formatter: cellFormatNewHospitalAdmiss },
                { title: "New <br/>intensive care", field: "incid_rea", hozAlign: "center", sorter: "number", topCalc: "sum", formatter: cellFormatNewHospIntensCare },
                { title: "New Recovered", field: "incid_rad", hozAlign: "center", sorter: "number", topCalc: "sum", formatter: cellFormatNewRecovered },
                { title: "New Hosp.<br/> Deaths", field: "incid_dchosp", hozAlign: "center", sorter: "number", topCalc: "sum", formatter: cellFormatNewDeaths },
            ]
        },
        { title: "Actual Hosp.", field: "hosp", hozAlign: "center", sorter: "number", topCalc: "sum", formatter: cellFormatActualHospAdmiss },
        { title: "Total <br/>intensive care", field: "rea", hozAlign: "center", sorter: "number", topCalc: "sum", formatter: cellFormatHospIntensCare },
    ],

});

$.getJSON(covApiFr, function (response) {
    // let jsonData = response.records;
    covFranceTable.setData(response);
});



