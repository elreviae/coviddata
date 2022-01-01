anychart.onDocumentReady(function () {

  anychart.data.loadJsonFile('https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=true', function (data) {

    var arrayCovidInfos = data;
    arrayCovidInfos.forEach(o => {
      Object.assign(o,
        {
          'lat': o.countryInfo.lat,
          'long': o.countryInfo.long,
          'iso2': o.countryInfo.iso2,
        });
      delete o.countryInfo;
    });

    var dataSet = anychart.data.set(arrayCovidInfos);

    var mappingActiveCases = dataSet.mapAs({
      name: 'country',
      id: 'iso2',
      size: 'active',
      value: 'active',
      lat: 'lat',
      long: 'long',
    });

    var mappingCriticalCases = dataSet.mapAs({
      name: 'country',
      id: 'iso2',
      size: 'critical',
      value: 'critical',
      lat: 'lat',
      long: 'long',
    });


    // Creates Map Chart
    var map = anychart.map();

    // map.padding([5, 0, 5, 0]);

    map.geoData('anychart.maps.world');

    map
      .credits()
      .enabled(true)
      .url('https://www.worldometers.info/coronavirus/#countries')
      .text('Data source: www.worldometers.info')
      .logoSrc('https://www.worldometers.info/favicon/favicon-96x96.png');

    // Sets bubble max size settings
    map.minBubbleSize('0.7%').maxBubbleSize('5%');

    // Creates bubble seriesActive
    var seriesCases = map.bubble(mappingCriticalCases);
    // Sets series1 settings
    seriesCases
      .name('Critical Cases')
      .fill('#ee1111 0.7')
      .stroke('1 #ff9c80 0.7');
    seriesCases
      .legendItem()
      .iconType('circle')
      .iconFill('#ee1111 0.7')
      .iconStroke('1 #ff9c80 0.7');

    // Creates choropleth for series2
    var choroActive = map.choropleth(mappingActiveCases);
    // Sets choropleth series2 settings
    choroActive
      .name('Areas of Active Cases')
      .geoIdField('iso_a2')
      // .fill('#333333 0.7')
      .stroke('1 #4b4b4b 0.8');
    choroActive
      .legendItem()
      .iconType('circle')
      .iconFill('#2196f3 0.7');
    choroActive.hovered().fill('#222222 0.8').stroke('1 #ee1111 0.8').size(15);
    // choroActive.colorScale(
    //   anychart.scales.linearColor('#ffcfc9','#ff8e00','#dd0436','#b8002a')
    // );

    var colorScale = anychart.scales.ordinalColor();
    // Set colors.
    colorScale.colors([
      '#1ee9a2',
      '#1ee9d5',
      '#1ee9e6',
      '#1ecae9',
      '#1e97e9',
      '#d61ee9',
      '#e91ec9',
      '#e91e85',
      '#e91e63',
      '#f50031'
    ]);

    colorScale.ranges([
      { less: 50 },
      { from: 50, to: 1000 },
      { from: 1000, to: 5000 },
      { from: 5000, to: 20000 },
      { from: 20000, to: 50000 },
      { from: 50000, to: 150000 },
      { from: 150000, to: 500000 },
      { from: 500000, to: 1000000 },
      { from: 1000000, to: 2500000 },
      { greater: 2500000 }
    ]);

    var colorRange = map.colorRange();
    colorRange.enabled(true).padding([0, 0, 20, 0]);
    colorRange
      .ticks()
      .enabled(true)
      .stroke('1 #ffffff')
      .position('center')
      .length(7);
    colorRange.colorLineSize(5);
    colorRange.marker().size(7);
    colorRange
      .labels()
      .fontSize(11)
      .padding(3, 0, 0, 0);

    choroActive.colorScale(colorScale);

    map.colorRange(true);

    map
      .legend()
      .enabled(true)
      .position('top')
      .align('center')
      .itemsLayout('horizontal')
      // .padding(10, 0, 40, 0)
      .paginator(false);

    map.interactivity().selectionMode('none');

    map
      .tooltip()
      .useHtml(true)
      .title({ fontColor: '#fff' })
      .padding([8, 13, 10, 13])
      .format(function () {
        var active = '<span>' + '<strong>Active cases: </strong>' + this.getData('active').toLocaleString() + '</span>';
        var critical = '<br/><span>' + '<strong>Critical cases: </strong>' + this.getData('critical').toLocaleString() + '</span>';
        // var deaths ='<br/><span>'+ '<strong>Dead: </strong>'+ this.getData('deaths').toLocaleString() + '</span>';
        // var recovered ='<br/><span>'+ '<strong>Recovered: </strong>'+ this.getData('recovered').toLocaleString() + '</span>';
        var population = '<br/><span>' + '<strong>Population: </strong>' + this.getData('population').toLocaleString() + '</span>';
        return (
          active + critical + population
        );
      });

    // remove two element from the menu
    map.contextMenu().itemsFormatter(function (items) {
      delete items["select-marquee-start"];
      delete items["save-data-as"];
      delete items["share-with"];
      delete items["full-screen-separator"];
      delete items["about"];
      return items;
    });

    // create zoom controls
    var zoomController = anychart.ui.zoom();
    zoomController.render(map);

    // zoom On Mouse Wheel
    map.interactivity().zoomOnMouseWheel(true);

    // zoom on double click
    map.interactivity().zoomOnDoubleClick(true);

    // set container id for the map
    map.container('containerMap');

    // initiate map drawing
    map.background('#27293d');

    // set render mode: true - async
    map.draw();


  }
  );
});