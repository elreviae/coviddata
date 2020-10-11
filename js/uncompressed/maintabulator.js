function paramLookup(cell){
    var value = cell.getElement().classList.add("w3-metro-darken");
    return value;
}
var cellFormatNewDeaths =function(cell, formatterParams){ 
    var value = cell.getValue();
    if(value > 0 && value <= 49){
        cell.getElement().classList.add("w3-metro-dark-red");
        return '+' + value.toLocaleString();
    }else if (value >= 50 && value <= 99) {
        cell.getElement().classList.add("w3-metro-red");
        return '+' + value.toLocaleString();
    }else if (value >= 100 && value <= 500000) {
        cell.getElement().classList.add("w3-black", "w3-text-red");
        return '+' + value.toLocaleString();
    }else {
        return value.toLocaleString();
    }
};
var cellFormatNewCases =function(cell, formatterParams){ 
    var value = cell.getValue();
    if(value > 0 && value <= 499){
        cell.getElement().classList.add("w3-metro-yellow");
        return '+' + value.toLocaleString();
    }else if (value >= 500 && value <= 1499) {
        cell.getElement().classList.add("w3-metro-orange");
        return '+' + value.toLocaleString();
    }else if (value >= 1500 && value <= 500000) {
        cell.getElement().classList.add("w3-black", "w3-text-orange");
        return '+' + value.toLocaleString();
    }else {
        return value.toLocaleString();
    }
};
var cellFormatNewRecov =function(cell, formatterParams){ 
    var value = cell.getValue();
    if(value > 0 && value <= 499){
        cell.getElement().classList.add("w3-metro-light-green");
        return '+' + value.toLocaleString();
    }else if (value >= 500 && value <= 1499) {
        cell.getElement().classList.add("w3-metro-green");
        return '+' + value.toLocaleString();
    }else if (value >= 1500 && value <= 500000) {
        cell.getElement().classList.add("w3-metro-dark-green", "w3-text-lime");
        return '+' + value.toLocaleString();
    }else {
        return value.toLocaleString();
    }
};
var cellFormatterToLocString = function(cell, formatterParams){
    var value = cell.getValue();
    return value.toLocaleString();
};
var displayDate=function(cell){
    var celldateValue = cell.getValue();
    return moment(celldateValue).format("MM/DD/YY-h:mm A");
};


var covTable = new Tabulator("#covTable", {
    downloadConfig:{
        columnHeaders:true, //do not include column headers in downloaded table
        columnGroups:false, //do not include column groups in column headers for downloaded table
        columnCalcs:false, //do not include column calcs in downloaded table
    },
    cellVertAlign:"middle",
    height: 750,
    // minHeight:400,
    // maxHeight:"100%",
    placeholder:"Data Loading",
    virtualDomBuffer: 300,
    pagination:"local", //enable local pagination.
    paginationSize:15, // this option can take any positive integer value
    reactiveData:true,
    layout:"fitDataStretch",
    // responsiveLayout:"collapse",
    tooltips:false,
    resizableRows:true,
    initialSort:[
                    {column:"todayCases", dir:"desc"},
                ],
    columns:[
        {title:"Flags", field:"countryInfo.flag", hozAlign:"center", sorter:"string", formatter:"image", download:false,
            formatterParams:{
                    width:"45px",
                    height:"30px",
            }
        },
        {title:"Codes", field:"countryInfo.iso2", hozAlign:"center", sorter:"string", headerFilter:"input", headerFilterPlaceholder:"Search"},
        {title:"Country, Other", field:"country", hozAlign:"center", sorter:"string", headerFilter:"input", headerFilterPlaceholder:"Search"},
        {title:"Latest Cases",
            columns: [
                {title:"New cases", field:"todayCases", hozAlign:"center", sorter:"number", formatter:cellFormatNewCases},
                {title:"New deaths", field:"todayDeaths", hozAlign:"center", sorter:"number", formatter:cellFormatNewDeaths},
                {title:"New recovered", field:"todayRecovered", hozAlign:"center", sorter:"number", formatter:cellFormatNewRecov},
            ]
        },
        {title:"Active Cases", field:"active", hozAlign:"center", sorter:"number", formatter:"money", formatterParams:{thousand:" ", precision:false}},
        {title:"Critical, Serious", field:"critical", hozAlign:"center", sorter:"number",formatter:"money", formatterParams:{thousand:" ", precision:false}},
        {title:"Total Confirmed", field:"cases", hozAlign:"center", sorter:"number",formatter:"money", formatterParams:{thousand:" ", precision:false}},
        {title:"Total Deaths", field:"deaths", hozAlign:"center", sorter:"number", formatter:"money", formatterParams:{thousand:" ", precision:false}},
        {title:"Total Recovered", field:"recovered", hozAlign:"center", sorter:"number", formatter:"money", formatterParams:{thousand:" ", precision:false}},
        {title:"Total Tests", field:"tests", hozAlign:"center", sorter:"number", formatter: "money", formatterParams:{thousand:" ", precision:false} },
        {title:"Population", field:"population", hozAlign:"center", sorter:"number", formatter: "money", formatterParams:{thousand:" ", precision:false}},
        {title:"Last Update", field:"updated", hozAlign:"center", sorter:"string", formatter:displayDate,
            accessorDownload: function(value){
                return moment(value).format("MM/DD/YY-h:mm A");
            },
            visible:false
        }
    ],
});
// var proxy = "https://cors-anywhere.herokuapp.com/"; //Using proxy to avoid Cors multi-origins error. 
var covApi = 'https://disease.sh/v3/covid-19/countries?yesterday=true';
covTable.setData(covApi);

