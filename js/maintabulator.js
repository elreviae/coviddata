var covTable = new Tabulator("#covTable", {
    downloadConfig:{
        columnHeaders:true, //do not include column headers in downloaded table
        columnGroups:false, //do not include column groups in column headers for downloaded table
        columnCalcs:false, //do not include column calcs in downloaded table
    },
    height: 900,
    placeholder:"Data Loading",
    virtualDomBuffer: 300,
    reactiveData:true,
    layout:"fitData",
    responsiveLayout:"collapse",
    tooltips:true,
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
        {title:"Country Codes", field:"countryInfo.iso2", hozAlign:"center", sorter:"string", headerFilter:"input", headerFilterPlaceholder:"Search"},
        {title:"Country name", field:"country", hozAlign:"center", sorter:"string", headerFilter:"input", headerFilterPlaceholder:"Search"},
        {title:"Today Cases",
            columns: [
                {title:"New cases", field:"todayCases", hozAlign:"center", sorter:"number",topCalc:"sum", formatter:cellFormatNewCases},
                {title:"New deaths", field:"todayDeaths", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatNewDeaths},
                {title:"New recovered", field:"todayRecovered", hozAlign:"center", sorter:"number",topCalc:"sum", formatter:cellFormatNewRecov},
            ]
        },
        {title:"Active", field:"active", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatterToLocString},
        {title:"Critical", field:"critical", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatterToLocString},
        {title:"Confirmed", field:"cases", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatterToLocString},
        {title:"Deaths", field:"deaths", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatterToLocString},
        {title:"Recovered", field:"recovered", hozAlign:"center", sorter:"number", topCalc:"sum", formatter:cellFormatterToLocString},
        {title:"Tests", field:"tests", hozAlign:"center", sorter:"number", topCalc:"sum", formatter: cellFormatterToLocString },
        {title:"Population", field:"population", hozAlign:"center", sorter:"number", formatter: cellFormatterToLocString},
        {title:"Last Update", field:"updated", hozAlign:"center", sorter:"string", formatter:displayDate,
            accessorDownload: function(value){
                return moment(value).format("MM/DD/YY-h:mm A");
            }
        }
    ],
});
// var proxy = "https://cors-anywhere.herokuapp.com/"; //Using proxy to avoid Cors multi-origins error. 
var covApi = 'https://disease.sh/v3/covid-19/countries';
covTable.setData(covApi);