anychart.onDocumentReady(function () {
    anychart.theme('darkEarth');
    anychart.data.loadJsonFile('https://disease.sh/v3/covid-19/countries', function (data) {
  
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

        var mappingCases = dataSet.mapAs({
          name: 'country',
          id: 'iso2',
          size: 'active',
          value: 'active',
          lat: 'lat',
          long:'long',
        });

        // Creates Map Chart
        var map = anychart.map();

        map.padding([5, 0, 5, 0]);

        map.geoData('anychart.maps.world');

        var colorRange = map.colorRange();
        colorRange
          .enabled(true)
          .padding([5, 0, 10, 0])
          .colorLineSize(10)
          .stroke('#B9B9B9')
          .labels({ padding: 3 })
          .labels({ size: 8 });
        colorRange
          .ticks()
          .enabled(true)
          .stroke('#B9B9B9')
          .position('outside')
          .length(10);
        colorRange
          .minorTicks()
          .enabled(true)
          .stroke('#B9B9B9')
          .position('outside')
          .length(5);

        map
          .credits()
          .enabled(true)
          .url('https://www.worldometers.info/coronavirus/#countries')
          .text('Data source: www.worldometers.info')
          .logoSrc('https://www.worldometers.info/favicon/favicon-96x96.png');

        // Sets Chart Title
        map
          .title()
          .enabled(true)
          .useHtml(true)
          .fontSize(14)
          .text('Covid-19 Cumulative Active Cases')
          .padding([0, 0, 5, 0]);
          
        // Sets bubble max size settings
        map.minBubbleSize('0.7%').maxBubbleSize('5%');

        // Creates bubble seriesActive
        var seriesCases = map.bubble(mappingCases);
        // Sets series1 settings
        seriesCases
          .name('Active Cases')
          .fill('#ee1111 0.7')
          .stroke('1 #ff9c80 0.7');
        seriesCases
          .legendItem()
          .iconType('circle')
          .iconFill('#ee1111 0.7')
          .iconStroke('1 #ff9c80 0.7');

        // Creates choropleth for series2
        var choroActive = map.choropleth(mappingCases);
        // Sets choropleth series2 settings
        choroActive
          .name('Areas of Active Cases')
          .geoIdField('iso_a2')
          // .fill('#333333 0.7')
          .stroke('1 #4b4b4b 0.8');
          choroActive
          .legendItem()
          .iconType('square')
          .iconFill('#ffcfc9 0.7');
          choroActive.hovered().fill('#222222 0.8').stroke('1 #ee1111 0.8').size(15);
          choroActive.colorScale(
            anychart.scales.linearColor('#ffcfc9','#ff8e00','#dd0436','#b8002a')
          );

        map
          .legend()
          .enabled(true)
          .position('top')
          .align('center')
          .itemsLayout('horizontal')
          .padding(10, 0, 40, 0)
          .paginator(false);

        map.interactivity().selectionMode('none');

        map
          .tooltip()
          .useHtml(true)
          .title({ fontColor: '#fff' })
          .padding([8, 13, 10, 13])
          .format(function () {
            var active ='<span>'+'<strong>Active cases: </strong>'+ this.getData('active').toLocaleString() + '</span>';
            var cases ='<br/><span>'+ '<strong>Confirmed: </strong>' + this.getData('cases').toLocaleString() + '</span>';
            var deaths ='<br/><span>'+ '<strong>Dead: </strong>'+ this.getData('deaths').toLocaleString() + '</span>';
            var recovered ='<br/><span>'+ '<strong>Recovered: </strong>'+ this.getData('recovered').toLocaleString() + '</span>';
            var population = '<br/><span>' +'<strong>Population: </strong>'+ this.getData('population').toLocaleString() + '</span>';
     
            return (
              active + cases + deaths + recovered + population
            );
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
        map.background('none');
        // set render mode: true - async
         map.draw();
      }
    );
});