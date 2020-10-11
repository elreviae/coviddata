var jsonData = 'https://corona-api.com/timeline';
var covApiData = 'https://disease.sh/v3/covid-19/continents';
// Covid-19 percent new confirmed, recovered, deaths
var dataDoughnut1 = [];
var optionsDoughnut1 =  {
        backgroundColor: "#212529",
        height:400,
        exportEnabled: true,
        animationEnabled: true,
        animationDuration: 1000,
        theme: "dark1",
        title: {
            text: "Percentages of New Cases",
            fontSize: 16,
            fontFamily: "tahoma",
        },
        legend:{
            horizontalAlign: "center", // "center" , "right"
            verticalAlign: "top",  // "top" , "bottom"
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "doughnut",
            innerRadius: 80,
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: dataDoughnut1
        }]
};

function addDataDoughnut1(dataPercent1) {
        dataDoughnut1.push(    
            { y: dataPercent1.data[0].new_deaths, name: "New deaths", label: "New deaths", color: "#ee1111" },
            { y: dataPercent1.data[0].new_confirmed, name: "New confirmed", label: "New confirmed", color: "#ff9800" },
            { y: dataPercent1.data[0].new_recovered, name: "New Recovered", label: "New Recovered", color: "#cddc39" },
        );
        $("#chartPercentsActive").CanvasJSChart(optionsDoughnut1);
}
$.getJSON(jsonData, addDataDoughnut1);

// Covid-19 percent deaths, recovered, active
var dataDoughnut2 = [];
var optionsDoughnut2 =  {
        backgroundColor: "#212529",
        height:400,
        exportEnabled: true,
        animationEnabled: true,
        animationDuration: 1000,
        theme: "dark1",
        title: {
            text: "Percentages of Global Cases",
            fontSize: 16,
            fontFamily: "tahoma",
        },
        legend:{
            horizontalAlign: "center", // "center" , "right"
            verticalAlign: "top",  // "top" , "bottom"
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "doughnut",
            innerRadius: 80,
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: dataDoughnut2
        }]
};
function addDataDoughnut2(dataPercent2) {
        dataDoughnut2.push(    
            { y: dataPercent2.data[0].deaths, name: "Deaths", label: "Deaths", color: "#dd250a" },
            { y: dataPercent2.data[0].active, name: "Active", label: "Active", color: "#0a85dd" },
            { y: dataPercent2.data[0].recovered, name: "Recovered", label: "Recovered", color: "#cddc39" },
        );
        $("#chartPercentsCases").CanvasJSChart(optionsDoughnut2);
}
$.getJSON(jsonData, addDataDoughnut2);

// Item Click Explode Pies
function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
}

// Covid-19 Confirmed curves--------------------
var dataPoints1= [];
var dataPoints2 = [];
var dataPoints3 = [];
var optionsPoints =  {
        backgroundColor: "#212529",
        height:400,
        exportEnabled: true,
        zoomEnabled:true,
        animationEnabled: true,
        animationDuration: 1000,
        theme: "dark1",
        title: {
            text: "Overall evolution of cases since the pandemic began.",
            fontSize: 16,
            fontFamily: "arial",
        },
        // subtitles: [{
        //     text: "Active + Deaths + Recovered",
        //     fontSize: 14,
        //     fontFamily: "arial",
        // }],
        toolTip: {
            shared: true
        },
        axisY: {
            includeZero: false,
            title: "Number of Cases",
            titleFontSize: 13,
            lineThickness: 1,
            valueFormatString: "#,###,,.##M",
            gridColor: "#495057"
        },
        axisX: {
            valueFormatString: "MM/DD/YY",
            labelAutoFit: true,
        },
        legend: {
                    horizontalAlign: "center", // "center" , "right"
                    verticalAlign: "top",  // "top" , "bottom"
                    cursor: "pointer",
                    itemclick: function (e) {
                        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                            e.dataSeries.visible = false;
                        } else {
                            e.dataSeries.visible = true;
                        }
                        e.chart.render();
                    }
        },
        data: [
            {
                type: "splineArea",
                name: "Recovered",
                color: "rgba(0, 163, 0, 0.8)",
                showInLegend: true,
                legendMarkerType: "circle",
                yValueFormatString: "# ### ###",
                dataPoints: dataPoints1, lineColor:"#cddc39", markerColor:"#cddc39"
            },
            {
                type: "splineArea",
                name: "Active",
                color: "rgba(10, 133, 221, 0.8)",
                showInLegend: true,
                legendMarkerType: "circle",
                yValueFormatString: "# ### ###",
                dataPoints: dataPoints2, lineColor:"#0a85dd", markerColor:"#0a85dd"
            },
            {
                type: "splineArea",
                name: "Deaths",
                color: "rgba(221, 37, 10, 0.8)",
                showInLegend: true,
                legendMarkerType: "circle",
                yValueFormatString: "# ### ###",
                dataPoints: dataPoints3, lineColor:"#dd250a", markerColor:"#dd250a"
            },
        ]
};

function addData(data) {
        for (var i = 0; i < data.data.length; i++) {
            dataPoints1.push({
                x: new Date(data.data[i].date),
                y: data.data[i].recovered,
            });
            dataPoints2.push({
                x: new Date(data.data[i].date),
                y: data.data[i].active
            });
            dataPoints3.push({
                x: new Date(data.data[i].date),
                y: data.data[i].deaths
            });
        };
        $("#chartContainerConfirmed").CanvasJSChart(optionsPoints);
}
$.getJSON(jsonData, addData);

// Covid-19 details per countries --------------------
var dataPoints4= [];
var dataPoints5= [];
var optionsBars =  {
        backgroundColor: "#212529",
        height:400,
        exportEnabled: true,
        zoomEnabled:true,
        animationEnabled: true,
        animationDuration: 1000,
        theme: "dark1",
        title: {
            text: "Number of Tests & Confirmed cases per Continent",
            fontSize: 16,
            fontFamily: "arial",
        },
        toolTip:{             
            content: "{name}: {y}"
        },
        axisY: {
            gridColor: "#495057",
            includeZero: true,
            titleFontSize: 14,
            valueFormatString: "#,###,,.##M",
        },
        axisX: {
            interval: 1,
            labelAutoFit: true
        },
        legend: {
                horizontalAlign: "center", // "center" , "right"
                verticalAlign: "top",  // "top" , "bottom"
                cursor: "pointer",
                itemclick: function (e) {
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    } else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }
        },
        data: [
            {
                type: "bar",
                name: "Number of Tests",
                color: "#3f51b5",
                showInLegend: true,
                legendMarkerType: "square",
                yValueFormatString: "## ### ###",
                dataPoints: dataPoints4, 
            },
            {
                type: "bar",
                name: "Total Confirmed Cases",
                color: "#ffc107",
                showInLegend: true,
                legendMarkerType: "square",
                yValueFormatString: "## ### ###",
                dataPoints: dataPoints5,
            }
        ]
};
function addData2(data2) {
        for (var i = 0; i < data2.length; i++) {
            dataPoints4.push({
                y: data2[i].tests,
                label: data2[i].continent
            });
            dataPoints5.push({
                y: data2[i].cases,
                label: data2[i].continent
            });
        };
        $("#chartContainerBars").CanvasJSChart(optionsBars);
}
$.getJSON(covApiData, addData2);


