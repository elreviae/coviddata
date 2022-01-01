anychart.onDocumentReady(function () {
  var jsonData = 'https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all&fullData=true';

  anychart.data.loadJsonFile(jsonData, function (data) {

    var historicCovid = data;

    // ------------------------------------------------------ SPLINE AREAS SERIES Daily Vacc
    var dataSet = anychart.data.set(historicCovid);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var dataVaccDaily = dataSet.mapAs({ x: 'date', value: 'daily' });

    // create area chart
    var chart = anychart.area();

    // set scale minimum
    chart.yScale().minimum(0);

    chart.xAxis().labels().padding([0, 0, 10, 0]);

    // chart.yAxis().labels().format('{%Value}{groupsSeparator: }').padding([5, 10, 20, 5]);

    var yLabels = chart.yAxis().labels();
    yLabels.format("{%value}{scale: (1)(1000)(1000)(1000)|(k)(m)(M)(B)}");

    chart.background().fill("#27293d");
    // turn on chart animation
    chart.animation(true);

    chart.padding([0, 3, 20, 3]);

    chart.xScale(anychart.scales.dateTime());
    // chart.xScale().inverted(true);

    // force chart to stack values by Y scale.
    chart.yScale().stackMode('value');

    chart.yAxis().title('World Daily Vaccinations');
    // chart.xAxis().labels().padding([0, 5, 10, 5]);

    // Get yGrid.
    var yGrid = chart.yGrid();
    yGrid.stroke({ color: '#565a83', thickness: 1 });

    // // turn on legend
    // chart.legend().enabled(true).fontSize(14).padding([0, 0, 10, 0]);

    // set chart title text settings
    chart
      .title()
      .enabled(true)
      .useHtml(true)
      .text('Daily World Vaccination Doses')
      .padding([0, 0, 20, 0]);

    chart
      .credits()
      .enabled(true)
      .url('https://disease.sh/')
      .text('Data source: disease.sh - Open Disease Data API');

    // Create series with mapped data
    var seriesVaccDaily = chart.splineArea(dataVaccDaily);
    seriesVaccDaily.name('Daily World Vaccinations');
    seriesVaccDaily.fill('#99b433 0.1').stroke({ color: "#99b433", thickness: 2 });
    seriesVaccDaily.hovered().markers().enabled(true).type('circle');
    seriesVaccDaily.legendItem().iconType("circle").iconFill('#99b433');

    chart
      .tooltip()
      .displayMode("single")
      .useHtml(true)
      .title({ fontColor: '#fff' })
      .padding([8, 13, 10, 13])
      .format(function () {
        var dailyVacc = '<span>' + '<strong>Daily Vaccinations: </strong>' + this.getData('daily').toLocaleString() + '</span><br/>';

        return (
          dailyVacc
        );
      });

    // turn on X Scroller
    chart.xScroller(true);
    // set the fill color
    chart.xScroller().fill("#1e1e2e");
    // set the selected fill color
    chart.xScroller().selectedFill("#27293d");
    // set the stroke of the bar
    chart.xScroller().outlineStroke("#565a83", 1);

    // remove two element from the menu
    chart.contextMenu().itemsFormatter(function (items) {
      delete items["select-marquee-start"];
      delete items["save-data-as"];
      delete items["share-with"];
      delete items["full-screen-separator"];
      delete items["about"];
      return items;
    });

    chart.interactivity().hoverMode('by-x');
    // set container id for the chart
    chart.container('curvesVaccDaily');
    // initiate chart drawing
    chart.draw();

  });


});


