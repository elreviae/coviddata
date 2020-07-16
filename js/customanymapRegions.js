anychart.onDocumentReady(function () {
    anychart.theme('darkEarth');
    anychart.data.loadJsonFile('https://disease.sh/v3/covid-19/jhucsse', function (data) {

        var arrayCovidInfos = data;
            arrayCovidInfos.forEach(o => {
              Object.assign(o, 
              { 
                'confirmed': o.stats.confirmed,
                'deaths': o.stats.deaths, 
                'recovered': o.stats.recovered,
                'lat': o.coordinates.latitude,
                'long': o.coordinates.longitude,
              });
              delete o.countryInfo;
          });

        var dataSet = anychart.data.set(arrayCovidInfos);

        var mappingConfirmed = dataSet.mapAs({
          name: 'country',
          id: 'country',
          size: 'confirmed',
          value: 'confirmed',
          lat: 'lat',
          long:'long',
        });

        // Creates Map Chart
        var map = anychart.map();

        map.padding([5, 0, 5, 0]);

        map.geoData('anychart.maps.world');

        map
          .credits()
          .enabled(true)
          .url('https://systems.jhu.edu/')
          .text('Data source: https://systems.jhu.edu/')
          .logoSrc('https://systems.jhu.edu/wp-content/uploads/2020/01/csse-horizontal-white-600x164.png');

        // Sets Title
        map
          .title()
          .enabled(true)
          .useHtml(true)
          .fontSize(14)
          .text('Covid-19 Cumulative Confirmed Cases')
          .padding([0, 0, 5, 0]);
          
        // Sets bubble max size settings
        map.minBubbleSize('0.7%').maxBubbleSize('5%');

        // Creates bubble seriesConfirmed
        var seriesCases = map.bubble(mappingConfirmed);
        // Sets series1 settings
        seriesCases
          .name('Confirmed Cases')
          .fill('#ee1111 0.7')
          .stroke('1 #ff9c80 0.7');
        seriesCases
          .legendItem()
          .iconType('circle')
          .iconFill('#ee1111 0.7')
          .iconStroke('1 #ff9c80 0.7');

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
            var province ='<span>'+'<strong>Province: </strong>'+  this.getData('province') + '</span>';
            var county ='<br/><span>'+ '<strong>County: </strong>' + this.getData('county') + '</span>';
            var confirmed = '<br/><span>' +'<strong>Confirmed: </strong>'+ this.getData('confirmed').toLocaleString() + '</span>';
            var deaths ='<br/><span>'+ '<strong>Deaths: </strong>'+ this.getData('deaths').toLocaleString() + '</span>';
            var recovered ='<br/><span>'+ '<strong>Recovered: </strong>'+ this.getData('recovered').toLocaleString() + '</span>';
            var updatedAt = '<br/><span>'+ '<strong>Updated at: </strong>'+ this.getData('updatedAt') + '</span>';
            
            return (
              province + county + confirmed + deaths + recovered + updatedAt
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