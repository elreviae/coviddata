// function paramLookup(cell){
//     var value = cell.getElement().classList.add("w3-metro-darken");
//     return value;
// }

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

var cellFormatActualHospitalAdmiss =function(cell, formatterParams){ 
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
        cell.getElement().style.font = "normal bold 15px arial,serif";
        return value.toLocaleString();
    }else if (value == null) {
        cell.getElement().classList.add("w3-text-red");
        return 'Data not available';
    }else {
        return value.toLocaleString();
    }
};


var cellFormatActualHospIntensCare =function(cell, formatterParams){ 
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
        cell.getElement().style.font = "normal bold 15px arial,serif";
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


// var displayDate=function(cell){
//     var celldateValue = cell.getValue();
//     return moment(celldateValue).format("MM/DD/YY-h:mm A");
// };




//var proxy = "https://cors-anywhere.herokuapp.com/"; //Using proxy to avoid Cors multi-origins error. 
var covApiFr = 'https://coronavirusapi-france.now.sh/AllLiveData';

var covFranceTable = new Tabulator("#covidTableFrance", {
    // ajaxURL: proxy + covApiFr, //ajax URL
    // ajaxResponse:function(url, params, response){
    //     //url - the URL of the request
    //     //params - the parameters passed with the request
    //     //response - the JSON object returned in the body of the response.
    //     if(response.allLiveFranceData[101].code=='FRA'){delete response.allLiveFranceData[101];}else{return response.allLiveFranceData};
    //     if(response.allLiveFranceData[102].code=='FRA'){delete response.allLiveFranceData[102];}else{return response.allLiveFranceData};
    //     // delete response.allLiveFranceData[102];
    //      //return the tableData property of a response json object
    // },
    downloadConfig:{
        columnHeaders:true, //do not include column headers in downloaded table
        columnGroups:false, //do not include column groups in column headers for downloaded table
        columnCalcs:false, //do not include column calcs in downloaded table
    },
    cellVertAlign:"middle",
    height: 750,
    // minHeight:400,
    // maxHeight:"100%",
    placeholder:"Data Not available",
    virtualDomBuffer: 300,
    pagination:"local", //enable local pagination.
    paginationSize:15, // this option can take any positive integer value
    reactiveData:true,
    layout:"fitDataStretch",
    // responsiveLayout:"collapse",
    tooltips:false,
    resizableRows:true,
    initialSort:[
                    {column:"reanimation", dir:"desc"},
                ],
    columns:[
        {title:"Code", field:"code", hozAlign:"center", sorter:"string",  headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatString },
        {title:"Departement, Region Name", field:"nom", hozAlign:"center", sorter:"string", headerFilter:"input", headerFilterPlaceholder:"Search", formatter:cellFormatString},
        {title:"Latest French Cases",
            columns: [
                {title:"New Hospital admissions", field:"nouvellesHospitalisations", hozAlign:"center", sorter:"number", formatter:cellFormatNewHospitalAdmiss },
                {title:"New Hospital intensive care", field:"nouvellesReanimations", hozAlign:"center", sorter:"number", formatter:cellFormatNewHospIntensCare},
            ]
        },
        {title:"Actual Hospital admissions", field:"hospitalises", hozAlign:"center", sorter:"number", formatter:cellFormatActualHospitalAdmiss },
        {title:"Actual Hospital intensive care", field:"reanimation", hozAlign:"center", sorter:"number", formatter:cellFormatActualHospIntensCare},
        {title:"Total Deaths", field:"deces", hozAlign:"center", sorter:"number", formatter:cellFormatterToLocString},
        {title:"Total Recovered", field:"gueris", hozAlign:"center", sorter:"number", formatter:cellFormatterToLocString},
        {title:"Sources", field:"source.nom", hozAlign:"center", sorter:"string"},
        // {title:"Last Update", field:"date", hozAlign:"center", sorter:"string", formatter:displayDate,
        //     accessorDownload: function(value){
        //         return moment(value).format("MM/DD/YY-h:mm A");
        //     }
        // }
    ],
});
// covFranceTable.setFilter("code", "keywords", "REG- DEP-");

$.getJSON(covApiFr, function(response){
    var jsonData = response.allLiveFranceData;
    if(response.allLiveFranceData[101].code=='FRA'){
        delete response.allLiveFranceData[101];
        covFranceTable.setData(jsonData);
    }else {
        covFranceTable.setData(jsonData);
    };
    
    if(response.allLiveFranceData[102].code=='FRA'){
        delete response.allLiveFranceData[102];
        covFranceTable.setData(jsonData);
    }else{
        covFranceTable.setData(jsonData);
    };    
 });

    

