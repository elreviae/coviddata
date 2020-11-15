anychart.onDocumentReady(function () {
    var jsonData = 'https://corona-api.com/timeline';
    anychart.data.loadJsonFile(jsonData, function (data) {

      var arrayCovid = data.data;

      var newArrayCovid = JSON.stringify(arrayCovid, function (key, value) {

        if (key=="date" && value=="2020-08-17") {
          return value.replace('2020-08-17', '2020-08-16');

        }else {
          return value
        };

      });

      var newCovidData = JSON.parse(newArrayCovid);
   
      // ------------------------------------------------------------ DONUT PIE 1 
      var dataPie1 = [
        {x: 'Cumul. Active', value: newCovidData[0].active},
        {x: 'Cumul. Recovered', value: newCovidData[0].recovered},
        {x: 'Cumul. Deaths', value: newCovidData[0].deaths}
      ];

        var chartPie1 = anychart.pie(dataPie1);

        chartPie1.background().fill("#212529");

        chartPie1.palette([ "#2196f3","#00a300", "#f44336" ]);
        // Set animation settings.
        chartPie1.animation({enabled: true, duration: 1000});
        chartPie1
          .labels()
          .fontSize(15)
          .hAlign('center')
          .position('outside')
          .format();

        // set chart title text settings
        chartPie1
          .title('Total Cumulative Cases')
          .radius('40%')
          .innerRadius('70%');

        chartPie1
          .credits()
          .enabled(true)
          .url('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports')
          .text('Data source: World Health Organization')
          .logoSrc('https://www.who.int/ResourcePackages/WHO/assets/dist/images/logos/en/h-logo-white.svg');


        // set legend title text settings
        chartPie1
          .legend()
          .position('center-bottom')
          .itemsLayout('horizontal')
          .align('center');

        // remove two element from the menu
        chartPie1.contextMenu().itemsFormatter(function(items){
          delete items["select-marquee-start"];
          delete items["save-data-as"];
          delete items["share-with"];
          delete items["full-screen-separator"];
          delete items["about"];
        return items;
        });

        // set container id for the chart
        chartPie1.container('chartPie1');
        // initiate chart drawing
        chartPie1.draw();

      // --------------------------------------------------------------- DONUT PIE 2
        var dataPie2 = [
          {x: 'New Confirmed', value: newCovidData[0].new_confirmed},
          {x: 'New Recovered', value: newCovidData[0].new_recovered},
          {x: 'New Deaths', value: newCovidData[0].new_deaths}
        ];

        var chartPie2 = anychart.pie(dataPie2);
        chartPie2.background().fill("#212529");
        chartPie2.palette([ "#ff9800", "#4caf50", "#f44336"]);
        // Set animation settings.
        chartPie2.animation({enabled: true, duration: 1000});
        chartPie2
          .labels()
          .fontSize(15)
          .hAlign('center')
          .position('outside')
          .format();

        // set chart title text settings
        chartPie2
          .title('Total of New Cases')
          .radius('40%')
          .innerRadius('70%');

        chartPie2
          .credits()
          .enabled(true)
          .url('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports')
          .text('Data source: World Health Organization')
          .logoSrc('https://www.who.int/ResourcePackages/WHO/assets/dist/images/logos/en/h-logo-white.svg');

        // set legend title text settings
        chartPie2
          .legend()
          .position('center-bottom')
          .itemsLayout('horizontal')
          .align('center');

        // remove two element from the menu
        chartPie2.contextMenu().itemsFormatter(function(items){
          delete items["select-marquee-start"];
          delete items["save-data-as"];
          delete items["share-with"];
          delete items["full-screen-separator"];
          delete items["about"];
        return items;
        });
          
        // set container id for the chart
        chartPie2.container('chartPie2');
        // initiate chart drawing
        chartPie2.draw();


    // ------------------------------------------------------ SPLINE AREAS SERIES Cumulative
    var dataSet = anychart.data.set(newCovidData);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var dataActive = dataSet.mapAs({x:'date', value:'active'});
    var dataDeaths = dataSet.mapAs({x:'date', value:'deaths'});
    var dataRecovered = dataSet.mapAs({x:'date', value:'recovered'});
  
    // create area chart
    var chart = anychart.area();
  
    // adding symbols to yAxis labels
    //chart.yAxis().labels().format('{%Value}%');
  
    chart.background().fill("#212529");
    // turn on chart animation
    chart.animation(true);

    chart.padding([0, 3, 20, 3]);

    // chart.xScale(anychart.scales.dateTime());
    chart.xScale().inverted(true);

    // force chart to stack values by Y scale.
    // chart.yScale().stackMode('value');

    chart.yAxis().title('Number of Cases');
    chart.xAxis().labels().padding([0, 5, 10, 5]);

    // Get yGrid.
    var yGrid = chart.yGrid();
    yGrid.stroke({color: '#2a2f34', thickness: 1});

    // turn on legend
   chart.legend().enabled(true).fontSize(14).padding([0, 0, 10, 0]);
  
    // set chart title text settings
    chart
      .title()
      .enabled(true)
      .useHtml(true)
      .text('Total Cumulative Worldwide Cases (Since 2020-01-21)')
      .padding([0, 0, 20, 0]);

    chart
      .credits()
      .enabled(true)
      .url('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports')
      .text('Data source: World Health Organization')
      .logoSrc('https://www.who.int/ResourcePackages/WHO/assets/dist/images/logos/en/h-logo-white.svg');

    // Create first series with mapped data
    var seriesActive = chart.splineArea(dataActive);
    seriesActive.name('Active');
    seriesActive.fill('#218eec 0.1').stroke({color: "#80c8e4",thickness: 2});
    seriesActive.hovered().markers().enabled(true).type('circle');
    seriesActive.legendItem().iconType("circle").iconFill('#218eec');
    
    // create 2nd series with mapped data
    var seriesDeaths = chart.splineArea(dataDeaths);
    seriesDeaths.name('Deaths');
    seriesDeaths.fill('#e64336 0.1').stroke({color: "#f44336",thickness: 2});
    seriesDeaths.hovered().markers().enabled(true).type('circle');
    seriesDeaths.legendItem().iconType("circle").iconFill('#e64336');

    // create 2nd series with mapped data
    var seriesRecovered = chart.splineArea(dataRecovered);
    seriesRecovered.name('Recovered');
    seriesRecovered.fill('#47af50 0.1').stroke({color: "#0eb345",thickness: 2});
    seriesRecovered.hovered().markers().enabled(true).type('circle');
    seriesRecovered.legendItem().iconType("circle").iconFill('#0eb345');

    chart
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
      });

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
    chart.container('chartCurves');
    // initiate chart drawing
    chart.draw();

    
  }
);

//***********************************************************************
  var covApiData = 'https://disease.sh/v3/covid-19/continents';
  
  anychart.data.loadJsonFile(covApiData, function (dataCovContinents) {

      var dataSet = anychart.data.set(dataCovContinents);

      // map data for the first series, take x from the zero column and value from the first column of data set
      var dataActiveCases = dataSet.mapAs({x:'continent', value:'cases'});
      var dataTests = dataSet.mapAs({x:'continent', value:'tests'});
      var dataPopulation = dataSet.mapAs({x:'continent', value:'population'});
  
      // create a chart and set loaded data
      chart = anychart.bar();

      chart.background().fill("#212529");

      // Get yGrid.
      var xGrid = chart.xGrid();
      xGrid.stroke({color: '#2a2f34', thickness: 1});

      // Create first series with mapped data
      var seriePopulation = chart.bar(dataPopulation);
      seriePopulation.name('Population');
      seriePopulation.color('#009688');

      // Create first series with mapped data
      //var serieCases = chart.bar(dataActiveCases);
      //serieCases.name('Number of Active Cases');
      //serieCases.color('Blue 0.5');

      var serieTests = chart.bar(dataTests);
      serieTests.name('Number of Tests');
      serieTests.color('#ff5722');
      
      chart.title("Bar chart");

      chart
        .credits()
        .enabled(true)
        .url('https://www.worldometers.info/coronavirus/#countries')
        .text('Data source: www.worldometers.info')
        .logoSrc('https://www.worldometers.info/favicon/favicon-96x96.png');

      // turn on chart animation
      chart.animation(true);

      chart.padding([0, 0, 0, 0]);

      // set scale minimum
      chart.yScale().minimum(0);

      chart.xAxis().labels().rotation(-90).padding([0, 0, 10, 0]);

      chart.yAxis().labels().format('{%Value}{groupsSeparator: }').padding([5, 10, 20, 5]);
    
      // set titles for Y-axis
      //chart.yAxis().title('Revenue in Dollars');

      // turn on legend
      chart
      .legend()
      .enabled(true)
      .fontSize(13)
      .padding([0, 0, 20, 0]);

      chart.interactivity().hoverMode('single');

      chart
        .tooltip()
        .positionMode('point')
        .useHtml(true)
        .title({ fontColor: '#fff' })
        .padding([8, 13, 10, 13])
        .format(function () {
          var population ='<span>'+'<strong>Population: </strong>'+  this.getData('population').toLocaleString() + '</span><br/>';
          var tests ='<span>'+'<strong>Tests: </strong>'+  this.getData('tests').toLocaleString() + '</span><br/>';
          var cases ='<span>'+'<strong>Total cases: </strong>'+  this.getData('cases').toLocaleString() + '</span><br/>';
          var updated ='<span>'+'<strong>Updated at: </strong>'+  new Date(this.getData('updated')).toLocaleDateString('en-US')+ '</span>';
          return (
            population + tests + cases + updated
          );
        });

       // remove two element from the menu
      chart.contextMenu().itemsFormatter(function(items){
        delete items["select-marquee-start"];
        delete items["save-data-as"];
        delete items["share-with"];
        delete items["full-screen-separator"];
        delete items["about"];
      return items;
      });

      chart.container('chartBars');
      chart.draw();
  });



});


