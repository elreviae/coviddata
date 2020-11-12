anychart.onDocumentReady(function () {
    anychart.theme('darkEarth');
    anychart.data.loadJsonFile('https://disease.sh/v3/covid-19/jhucsse', function (dataCovid) {

        var arrayglobalCovidInfos = dataCovid;
        arrayglobalCovidInfos.forEach(o => {
              Object.assign(o, 
              { 
                'confirmed': o.stats.confirmed,
                'deaths': o.stats.deaths, 
                'recovered': o.stats.recovered,
                'lat': o.coordinates.latitude,
                'long': o.coordinates.longitude,
              });
              // delete o.countryInfo;
          });

        var dataSet = anychart.data.set(arrayglobalCovidInfos);

        // Creates Map Chart
        var map = anychart.map();

        map.geoData('anychart.maps.world');

        map
          .credits()
          .enabled(true)
          .url('https://systems.jhu.edu/')
          .text('Data source: https://systems.jhu.edu/')
          .logoSrc('https://systems.jhu.edu/wp-content/uploads/2020/01/csse-horizontal-white-600x164.png');


        // Sets bubble max size settings
        map.minBubbleSize('1%').maxBubbleSize('7%');

        var mappingDeaths = dataSet.mapAs({ name: 'country', id: 'country', size: 'deaths'});
        // Creates bubble seriesDeaths
        var seriesDeaths = map.bubble(mappingDeaths);
        // Sets series
        seriesDeaths
          .name('Cumulative Deaths')
          .fill('#f44336 0.9')
          .stroke('1 #f56358 0.7');
        seriesDeaths
          .legendItem()
          .iconType('circle')
          .iconFill('#f44336 0.7')
          .iconStroke('1 #f56358 0.7');
        

        var mappingRecovered = dataSet.mapAs({ name: 'country', id: 'country', size: 'recovered'});
        // Creates bubble seriesRecovered
        var seriesRecovered = map.bubble(mappingRecovered);
        // Sets series
        seriesRecovered
          .name('Cumulative Recovered')
          .fill('#00a300 0.8')
          .stroke('1 #99b433 0.7');
        seriesRecovered
          .legendItem()
          .iconType('circle')
          .iconFill('#00a300 0.7')
          .iconStroke('1 #99b433 0.7');


          var mappingConfirmed= dataSet.mapAs({ name: 'country', id: 'country', size: 'confirmed'});

          // Creates bubble seriesConfirmed
          var seriesConfirmed = map.bubble(mappingConfirmed);
          //Sets series
          seriesConfirmed
            .name('Cumulative Confirmed')
            .fill('#f85222 0.8')
            .stroke('1 #f17f22 0.7');
            seriesConfirmed
            .legendItem()
            .iconType('circle')
            .iconFill('#f85222 0.8')
            .iconStroke('1 #f17f22 0.7');
          
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
            var deaths ='<br/><span>'+ '<strong>Deaths: </strong>'+ this.getData('deaths').toLocaleString() + '</span>';
            var recovered ='<br/><span>'+ '<strong>Recovered: </strong>'+ this.getData('recovered').toLocaleString() + '</span>';
            var confirmed = '<br/><span>' +'<strong>Confirmed: </strong>'+ this.getData('confirmed').toLocaleString() + '</span>';
            // var updatedAt = '<br/><span>'+ '<strong>Updated at: </strong>'+ this.getData('updatedAt') + '</span>';
            
            return (
              province + county + deaths + recovered + confirmed
            );
          });

        // remove two element from the menu
        map.contextMenu().itemsFormatter(function(items){
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
        map.container('containerGlobalMap');
        // initiate map drawing
        map.background('#212529');
        // set render mode: true - async
         map.draw();
      }
    );
});