var cellFormatNewHospitalAdmiss =function(cell, formatterParams){ 
    let value = cell.getValue();
    if(value > 0 && value <= 49){
        cell.getElement().classList.add("w3-aqua");
        return '+' + value.toLocaleString();
    }else if (value >= 50 && value <= 149) {
        cell.getElement().classList.add("w3-blue");
        return '+' + value.toLocaleString();
    }else if (value >= 150 && value <= 5000) {
        cell.getElement().classList.add("w3-black", "w3-text-blue");
        return '+' + value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatNewHospIntensCare =function(cell, formatterParams){ 
    let value = cell.getValue();
    if(value > 0 && value <= 9){
        cell.getElement().classList.add("w3-amber");
        return '+' + value.toLocaleString();
    }else if (value >= 10 && value <= 49) {
        cell.getElement().classList.add("w3-deep-orange");
        return '+' + value.toLocaleString();
    }else if (value >= 50 && value <= 500) {
        cell.getElement().classList.add("w3-black", "w3-text-deep-orange");
        return '+' + value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatNewRecovered =function(cell, formatterParams){ 
    let value = cell.getValue();
    if(value > 0 && value <= 9){
        cell.getElement().classList.add("w3-metro-light-green");
        return '+' + value.toLocaleString();
    }else if (value >= 10 && value <= 49) {
        cell.getElement().classList.add("w3-metro-green");
        return '+' + value.toLocaleString();
    }else if (value >= 50 && value <= 500) {
        cell.getElement().classList.add("w3-metro-dark-green", "w3-text-white");
        return '+' + value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatNewDeaths =function(cell, formatterParams){ 
    let value = cell.getValue();
    if(value > 0 && value <= 9){
        cell.getElement().classList.add("w3-metro-light-purple");
        return '+' + value.toLocaleString();
    }else if (value >= 10 && value <= 49) {
        cell.getElement().classList.add("w3-metro-dark-red");
        return '+' + value.toLocaleString();
    }else if (value >= 50 && value <= 500) {
        cell.getElement().classList.add("w3-black");
        return '+' + value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatTotalDeaths =function(cell, formatterParams){ 
    let value = cell.getValue();
    if(value > 0 && value <= 499){
        cell.getElement().classList.add("w3-text-aqua");
        return value.toLocaleString();
    }else if (value >= 500 && value <= 999) {
        cell.getElement().classList.add("w3-text-cyan");
        return value.toLocaleString();
    }else if (value >= 1000 && value <= 2499) {
        cell.getElement().classList.add("w3-text-light-blue");
        return value.toLocaleString();
    }else if (value > 2500) {
        cell.getElement().classList.add("w3-text-blue");
        return value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatTotalRecovered =function(cell, formatterParams){ 
    let value = cell.getValue();
    if(value > 0 && value <= 149){
        cell.getElement().classList.add("w3-text-yellow");
        return value.toLocaleString();
    }else if (value >= 150 && value <= 499) {
        cell.getElement().classList.add("w3-text-amber");
        return value.toLocaleString();
    }else if (value >= 500 && value <= 999) {
        cell.getElement().classList.add("w3-text-orange");
        return value.toLocaleString();
    }else if (value > 1000) {
        cell.getElement().classList.add("w3-text-deep-orange");
        return value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatterToLocString = function(cell, formatterParams){
    let value = cell.getValue();
    if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};

var cellFormatString = function(cell, formatterParams){
    let value = cell.getValue();
    if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value;
    }
};

var covApiFr = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france%40public&q=&rows=101&sort=date&facet=date&facet=countrycode_iso_3166_1_alpha3&facet=region_min&facet=nom_dep_min&facet=sex&refine.sex=Tous';
// SCHEMA API : https://data.opendatasoft.com/explore/dataset/donnees-hospitalieres-covid-19-dep-france%40public/information/?disjunctive.countrycode_iso_3166_1_alpha3&disjunctive.nom_dep_min&rows=101&q=&timezone=Europe%2FParis&sort=date&lang=FR&refine.sex=Tous
var covFranceTable = new Tabulator("#covidTableFrance", {
    downloadConfig:{
        columnHeaders:true, //do not include column headers in downloaded table
        columnGroups:false, //do not include column groups in column headers for downloaded table
        columnCalcs:false, //do not include column calcs in downloaded table
    },
    cellVertAlign:"middle",
    height: 750,
    placeholder:"Data Not available",
    virtualDomBuffer: 300,
    pagination:"local", //enable local pagination.
    paginationSize:15, // this option can take any positive integer value
    layout:"fitDataStretch",
    tooltips:false,
    resizableRows:false,
    initialSort:[
                    {column:"fields.day_hosp", dir:"desc"},
                ],
    columns:[
        {title:"Reg. Code", field:"fields.reg_code", hozAlign:"center", sorter:"string",  headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatString, visible:false },
        {title:"Reg. Name", field:"fields.region_min", hozAlign:"center", sorter:"string",  headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatString },
        {title:"Departement", field:"fields.nom_dep_min", hozAlign:"center", sorter:"string", headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatString},
        {title:"Dep. Code", field:"fields.dep_code", hozAlign:"center", sorter:"string",  headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatString },
        {title:"Latest French Cases",
            columns: [
                {title:"New Hospital admissions", field:"fields.day_hosp", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatNewHospitalAdmiss },
                {title:"New Hospital intensive care", field:"fields.day_intcare_new", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatNewHospIntensCare},
                {title:"New Recovered", field:"fields.day_out_new", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatNewRecovered},
                {title:"New Deaths", field:"fields.day_out_new", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatNewDeaths},
            ]
        },
        {title:"Total Deaths", field:"fields.tot_death", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatTotalDeaths},
        {title:"Total Recovered", field:"fields.tot_out", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatTotalRecovered},
        {title:"Date", field:"fields.date", hozAlign:"center", sorter:"string"},
    
    ],
});

$.getJSON(covApiFr, function(response){
    let jsonData = response.records;
    covFranceTable.setData(jsonData); 
 });

    

