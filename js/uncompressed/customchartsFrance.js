anychart.onDocumentReady(function () {
    var jsonData = 'https://disease.sh/v3/covid-19/historical/fr?lastdays=all';
    anychart.data.loadJsonFile(jsonData, function (dataCovidFr) {

      var arrayCovidFr = dataCovidFr;
      arrayCovidFr.forEach(o => {
        Object.assign(o, 
        { 
          'cases': o.timeline.cases,
          'deaths': o.timeline.deaths, 
          'recovered': o.timeline.recovered,

        });
        delete o.timeline;
    });
   
      
    // ------------------------------------------------------ SPLINE AREAS SERIES Cumulative
    var dataSet = anychart.data.set(arrayCovidFr);


    // map data for the first series, take x from the zero column and value from the first column of data set
    var dataCases = dataSet.mapAs({x: 'cases', value: 'cases'});
    // var dataDeaths = dataSet.mapAs({x:'date', value:'deaths'});
    // var dataRecovered = dataSet.mapAs({x:'date', value:'recovered'});
  
    // create area chart
    var chart = anychart.area(dataSet);
  
    // adding symbols to yAxis labels
    //chart.yAxis().labels().format('{%Value}%');
  
    chart.background().fill("#212529");
    // turn on chart animation
    chart.animation(true);

    chart.padding([0, 3, 20, 3]);

    // chart.xScale(anychart.scales.dateTime());
    // chart.xScale().inverted(true);

    // force chart to stack values by Y scale.
    // chart.yScale().stackMode('value');

    // chart.yAxis().title('Number of Cases');
    // chart.xAxis().labels().padding([0, 5, 10, 5]);

    // Get yGrid.
    var yGrid = chart.yGrid();
    yGrid.stroke({color: '#2a2f34', thickness: 1});

    // turn on legend
    // chart.legend().enabled(true).fontSize(14).padding([0, 0, 10, 0]);
  
    // set chart title text settings
    chart
      .title()
      .enabled(true)
      .useHtml(true)
      .text('Total Cumulative French Cases (Since 2020-01-21)')
      .padding([0, 0, 20, 0]);

    chart
      .credits()
      .enabled(true)
      .url('https://systems.jhu.edu/')
      .text('Data source: https://systems.jhu.edu/')
      .logoSrc('https://systems.jhu.edu/wp-content/uploads/2020/01/csse-horizontal-white-600x164.png');

    // Create first series with mapped data
    var seriesCases = chart.splineArea(dataCases);
    seriesCases.name('Cases');
    seriesCases.fill('#218eec 0.5').stroke({color: "#80c8e4",thickness: 2});
    seriesCases.hovered().markers().enabled(true).type('circle');
    seriesCases.legendItem().iconType("circle").iconFill('#218eec');
    
    // // create 2nd series with mapped data
    // var seriesDeaths = chart.splineArea(dataDeaths);
    // seriesDeaths.name('Deaths');
    // seriesDeaths.fill('#e64336 0.5').stroke({color: "#f44336",thickness: 2});
    // seriesDeaths.hovered().markers().enabled(true).type('circle');
    // seriesDeaths.legendItem().iconType("circle").iconFill('#e64336');

    // // create 2nd series with mapped data
    // var seriesRecovered = chart.splineArea(dataRecovered);
    // seriesRecovered.name('Recovered');
    // seriesRecovered.fill('#47af50 0.5').stroke({color: "#0eb345",thickness: 2});
    // seriesRecovered.hovered().markers().enabled(true).type('circle');
    // seriesRecovered.legendItem().iconType("circle").iconFill('#0eb345');

    chart
      .tooltip()
      .displayMode("single")
      .useHtml(true)
      .title({ fontColor: '#fff' })
      .padding([8, 13, 10, 13])
      // .format(function () {
      //   var cases ='<span>'+'<strong>Active: </strong>'+  this.getData('cases').toLocaleString() + '</span><br/>';
      //   var deaths ='<span>'+'<strong>Deaths: </strong>'+  this.getData('deaths').toLocaleString() + '</span><br/>';
      //   var recovered ='<span>'+'<strong>Recovered: </strong>'+  this.getData('recovered').toLocaleString() + '</span>';
      //   return (
      //     cases + deaths + recovered
      //   );
      // })
      ;

    // turn on X Scroller
    chart.xScroller(true);
    // set the fill color
    chart.xScroller().fill("#212529");
    // set the selected fill color
    chart.xScroller().selectedFill("#2a2f34");
    // set the stroke of the bar
    chart.xScroller().outlineStroke("#495057", 1);

    // remove two element from the menu
    chart.contextMenu().itemsFormatter(function(items){
      delete items["select-marquee-start"];
      delete items["save-data-as"];
      delete items["share-with"];
      delete items["full-screen-separator"];
      delete items["about"];
    return items;
    });

    chart.interactivity().hoverMode('by-x');
    // set container id for the chart
    chart.container('chartCurvesFrance');
    // initiate chart drawing
    chart.draw();

    
  }
);



});


