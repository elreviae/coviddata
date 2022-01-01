anychart.onDocumentReady(function () {

  var covApiData = 'https://disease.sh/v3/covid-19/continents';

  anychart.data.loadJsonFile(covApiData, function (dataCovContinents) {

    var dataSet = anychart.data.set(dataCovContinents);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var dataCases = dataSet.mapAs({ x: 'continent', value: 'cases' });
    var dataTests = dataSet.mapAs({ x: 'continent', value: 'tests' });
    var dataPopulation = dataSet.mapAs({ x: 'continent', value: 'population' });

    // create a chart and set loaded data
    chart = anychart.bar();

    chart.background().fill("#27293d");

    // Get yGrid.
    var xGrid = chart.xGrid();
    xGrid.stroke({ color: '#565a83', thickness: 1 });

    // Create first series with mapped data
    var seriePopulation = chart.bar(dataPopulation);
    seriePopulation.name('Population');
    seriePopulation.fill('#ffc107 0.5').stroke({ color: "#ffc107", thickness: 1 });

    // Create second series with mapped data
    var serieCases = chart.bar(dataCases);
    serieCases.name('Number of Cases');
    serieCases.color('#f44336 0.5').stroke({ color: "#f44336", thickness: 1 });

    // Create third series with mapped data
    var serieTests = chart.bar(dataTests);
    serieTests.name('Number of Tests');
    serieTests.fill('#3358f4 0.5').stroke({ color: "#1d8cf8", thickness: 1 });

    chart.title("Bar chart");

    chart
      .credits()
      .enabled(true)
      .url('https://disease.sh/')
      .text('Data source: disease.sh - Open Disease Data API');


    // turn on chart animation
    chart.animation(true);

    chart.padding([0, 0, 0, 0]);

    // set scale minimum
    chart.yScale().minimum(0);

    // chart.xAxis().labels().rotation(-90).padding([0, 0, 10, 0]);

    chart.yAxis().labels().format('{%Value}{groupsSeparator: }').padding([5, 10, 20, 5]);

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
        var population = '<span>' + '<strong>Population: </strong>' + this.getData('population').toLocaleString() + '</span><br/>';
        var tests = '<span>' + '<strong>Tests: </strong>' + this.getData('tests').toLocaleString() + '</span><br/>';
        var cases = '<span>' + '<strong>Total cases: </strong>' + this.getData('cases').toLocaleString() + '</span><br/>';
        var updated = '<span>' + '<strong>Updated at: </strong>' + new Date(this.getData('updated')).toLocaleDateString('en-US') + '</span>';
        return (
          population + tests + cases + updated
        );
      });

    // remove two element from the menu
    chart.contextMenu().itemsFormatter(function (items) {
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


