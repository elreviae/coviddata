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

var vaccinApiFr = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&rows=101&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.variable_label=Tous+%C3%A2ges';
// SCHEMA API : https://public.opendatasoft.com/explore/dataset/covid-19-france-vaccinations-age-sexe-dep/api/?disjunctive.variable_label&sort=date&rows=101&lang=fr&timezone=Europe%2FParis&refine.variable_label=Tous+%C3%A2ges
var vaccinFranceTable = new Tabulator("#vaccinTable", {
    downloadConfig:{
        columnHeaders:true, //do not include column headers in downloaded table
        columnGroups:false, //do not include column groups in column headers for downloaded table
        columnCalcs:false, //do not include column calcs in downloaded table
    },
    cellVertAlign:"middle",
    height: 600,
    placeholder:"Data Not available",
    virtualDomBuffer: 300,
    pagination:"local", //enable local pagination.
    paginationSize:12, // this option can take any positive integer value
    layout:"fitColumns",
    tooltips:false,
    resizableRows:false,
    initialSort:[
                    {column:"fields.n_cum_complet", dir:"desc"},
                ],
    columns:[
        {title:"Departement", field:"fields.dep_name", hozAlign:"center", sorter:"string", headerFilter:"select", headerFilterParams:{values:true}, headerFilterPlaceholder:"Select"},
        {title:"Dep. Code", field:"fields.dep_code", hozAlign:"center", sorter:"string",  headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatterToLocString },
        {title:"First Vaccination Dose", field:"fields.n_cum_dose1", hozAlign:"center", sorter:"number", formatter:cellFormatterToLocString},
        {title:"First Vaccination Progress", field:"fields.n_cum_dose1", hozAlign:"left", sorter:"number", formatter:"progress", formatterParams:{
            min:0,
            max:3000000,
            color:["darkgreen", "green", "limegreen"],
        }},
        {title:"Fully Vaccinated", field:"fields.n_cum_complet", hozAlign:"center", sorter:"number", formatter:cellFormatterToLocString},
        {title:"Full Vaccinated Progress", field:"fields.n_cum_complet", hozAlign:"left", sorter:"number", formatter:"progress", formatterParams:{
            min:0,
            max:3000000,
            color:["RoyalBlue", "DodgerBlue", "DeepSkyBlue "],
        }},
    ],
});

$.getJSON(vaccinApiFr, function(dataVacc){
    let jsonVacc = dataVacc.records;
    vaccinFranceTable.setData(jsonVacc); 
 });

    

