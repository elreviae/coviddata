anychart.onDocumentReady(function () {
  
  anychart.theme('darkEarth');
   // create area chart
   var chartCurveFR = anychart.area();

    var jsonDataFr = 'https://corona-api.com/countries/fr';

    anychart.data.loadJsonFile(jsonDataFr, function (dataFR) {

      var arrayCovidFr = dataFR.data.timeline;
    //   arrayCovidFr.forEach(o => {
    //     Object.assign(o, 
    //     { 
    //       'active': o.timeline.active,
    //       'deaths': o.timeline.deaths, 
    //       'recovered': o.timeline.recovered,

    //     });
    //     delete o.timeline;
        
    // });


   
    var dataSet = anychart.data.set(arrayCovidFr);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var dataActive = dataSet.mapAs({x:'date', value:'active'});
    var dataDeaths = dataSet.mapAs({x:'date', value:'deaths'});
    var dataRecovered = dataSet.mapAs({x:'date', value:'recovered'});
  
   
  
    // adding symbols to yAxis labels
    // chart.yAxis().labels().format('{%Value}%');
  
  
    // turn on chart animation
    chartCurveFR.animation(true);

    chartCurveFR.padding([0, 3, 20, 3]);

    // chartCurveFR.xScale(anychart.scales.dateTime());
    chartCurveFR.xScale().inverted(true);

    // force chart to stack values by Y scale.
    // chartCurveFR.yScale().stackMode('value');

    chartCurveFR.yAxis().title('Number of French Cases');
    chartCurveFR.xAxis().labels().padding([0, 5, 10, 5]);

    // Get yGrid.
    var yGrid = chartCurveFR.yGrid();
    yGrid.stroke({color: '#2a2f34', thickness: 1});

    // turn on legend
    chartCurveFR.legend().enabled(true).fontSize(14).padding([0, 0, 10, 0]);
  
    // set chart title text settings
    chartCurveFR
      .title()
      .enabled(true)
      .useHtml(true)
      .text('Total Cumulative French Cases (Since 2020-01-23)')
      .padding([0, 0, 20, 0]);

    chartCurveFR
      .credits()
      .enabled(true)
      .url('https://systems.jhu.edu/')
      .text('Data source: https://systems.jhu.edu/')
      .logoSrc('https://systems.jhu.edu/wp-content/uploads/2020/01/csse-horizontal-white-600x164.png');

    // Create 1st series with mapped data
    var seriesActive = chartCurveFR.splineArea(dataActive);
    seriesActive.name('Active');
    seriesActive.fill('#218eec 0.1').stroke({color: "#80c8e4",thickness: 2});
    seriesActive.hovered().markers().enabled(true).type('circle');
    seriesActive.legendItem().iconType("circle").iconFill('#218eec');
    
    // create 2nd series with mapped data
    var seriesDeaths = chartCurveFR.splineArea(dataDeaths);
    seriesDeaths.name('Deaths');
    seriesDeaths.fill('#e64336 0.1').stroke({color: "#f44336",thickness: 2});
    seriesDeaths.hovered().markers().enabled(true).type('circle');
    seriesDeaths.legendItem().iconType("circle").iconFill('#e64336');

    // create 3th series with mapped data
    var seriesRecovered = chartCurveFR.splineArea(dataRecovered);
    seriesRecovered.name('Recovered');
    seriesRecovered.fill('#47af50 0.1').stroke({color: "#0eb345",thickness: 2});
    seriesRecovered.hovered().markers().enabled(true).type('circle');
    seriesRecovered.legendItem().iconType("circle").iconFill('#0eb345');

    chartCurveFR
      .tooltip()
      .displayMode("single")
      .useHtml(true)
      .title({ fontColor: '#fff' })
      .padding([8, 13, 10, 13])
      .format(function () {
        var active ='<span>'+'<strong>Active: </strong>'+  this.getData('active').toLocaleString() + '</span><br/>';
        var deaths ='<span>'+'<strong>Deaths: </strong>'+  this.getData('deaths').toLocaleString() + '</span><br/>';
        var recovered ='<span>'+'<strong>Recovered: </strong>'+  this.getData('recovered').toLocaleString() + '</span>';
        return (
          active + deaths + recovered
        );
      })
      ;

    // turn on X Scroller
    chartCurveFR.xScroller(true);
    // set the fill color
    chartCurveFR.xScroller().fill("#212529");
    // set the selected fill color
    chartCurveFR.xScroller().selectedFill("#2a2f34");
    // set the stroke of the bar
    chartCurveFR.xScroller().outlineStroke("#495057", 1);

    // remove two element from the menu
    chartCurveFR.contextMenu().itemsFormatter(function(items){
      delete items["select-marquee-start"];
      delete items["save-data-as"];
      delete items["share-with"];
      delete items["full-screen-separator"];
      delete items["about"];
    return items;
    });

    chartCurveFR.interactivity().hoverMode('by-x');
    // set container id for the chart
    chartCurveFR.container('chartCurvesFrance');
    // initiate chart drawing
    chartCurveFR.background('#212529');
    chartCurveFR.draw();

  }
);


});


