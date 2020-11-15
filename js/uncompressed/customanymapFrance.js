anychart.onDocumentReady(function () {
    anychart.theme('darkEarth');

    // Creates Map Chart
    var map = anychart.map();
   
    anychart.data.loadJsonFile(
      'https://coronavirusapi-france.now.sh/AllLiveData',
      function (data) {
        var arrayCovidInfos = data.allLiveFranceData;
        
            arrayCovidInfos.forEach(o => {
              Object.assign(o, 
              { 
                'id': o.code,
              });
              delete o.code;
          });

          var newArrayCovidInfos = JSON.stringify(arrayCovidInfos, function (key, value) {
            if (key == "id") {
              return value.
              replace('REG-01', 'FR.GUA')
             .replace('REG-02', 'FR.MQ')
             .replace('REG-03', 'FR.GF')
             .replace('REG-04', 'FR.LRE')
             .replace('REG-06', 'FR.MAY')
             .replace('REG-11', 'FR.IDF')
             .replace('REG-24', 'FR.CVL')
             .replace('REG-27', 'FR.BFC')
             .replace('REG-28', 'FR.NOR')
             .replace('REG-32', 'FR.HDF')
             .replace('REG-44', 'FR.GES')
             .replace('REG-52', 'FR.PDL')
             .replace('REG-53', 'FR.BRE')
             .replace('REG-75', 'FR.NAQ')
             .replace('REG-76', 'FR.OCC')
             .replace('REG-84', 'FR.ARA')
             .replace('REG-93', 'FR.PAC')
             .replace('REG-94', 'FR.COR');
            }else {
              return value
            }
          });
          
          var newCovidData = JSON.parse(newArrayCovidInfos);
          // console.log(newCovidData);
          var dataSet = anychart.data.set(newCovidData);

          var mappingActualHospAdmiss = dataSet.mapAs({
            name: 'name',
            id: 'id',
            value: 'hospitalises'
          });

          var mappingActualHospIntensCare = dataSet.mapAs({
            name: 'name',
            id: 'id',
            size: 'reanimation',
            value: 'reanimation'
          });

          // map.padding([5, 0, 5, 0]);
         
          map.geoData('anychart.maps.france');

          map
          .credits()
          .enabled(true)
          .url('https://github.com/opencovid19-fr')
          .text('Data source: opencovid19-fr')
          .logoSrc('https://avatars3.githubusercontent.com/u/62096497?s=200&v=4');

      
          map
            .legend()
            .enabled(true)
            .position('top')
            .align('center')
            .itemsLayout('horizontal')
            .padding(10, 0, 10, 0)
            .paginator(false);

          // Creates bubble seriesActive
          var actualHospIntensCare = map.bubble(mappingActualHospIntensCare);
          // Sets series1 settings
          actualHospIntensCare
            .name('Actual Hospital Intensive Care')
            .fill('#ee1111 0.7')
            .stroke('1 #ff9c80 0.7');
          actualHospIntensCare
            .legendItem()
            .iconType('circle')
            .iconFill('#ee1111 0.7')
            .iconStroke('1 #ff9c80 0.7');

             // Sets bubble max size settings
          map.minBubbleSize('1%').maxBubbleSize('7%');

         // Creates choropleth for serie
        var choropActualHospAdmiss = map.choropleth(mappingActualHospAdmiss);
        // Sets choropleth serie settings
        choropActualHospAdmiss
          .name('Actual Hospital Admissions')
          .geoIdField('id')
          .stroke('1 #4b4b4b 0.8');
        choropActualHospAdmiss
          .legendItem()
          .iconType('circle')
          .iconFill('#d61ee9 0.7');
        choropActualHospAdmiss.hovered().fill('#222222 0.8').stroke('1 #ee1111 0.8').size(15);

          var colorScale = anychart.scales.ordinalColor();
          // Set colors.
          colorScale.colors([
            '#1ee9a2',
            '#1ee9d5',
            '#1ee9e6',
            '#1ecae9',
            '#1e97e9',
            '#df4fed',
            '#e91ec9',
            '#e91e85',
            '#e91e63',
            '#f50031'
          ]);
          colorScale.ranges([
              {less:5},
              {from:5, to:25},
              {from:25, to:50},
              {from:50, to:150},
              {from:150, to:250},
              {from:250, to:500},
              {from:500, to:1000},
              {from:1000, to:1500},
              {from:1500, to: 2500},
              {greater: 2500}
          ]);

          var colorRange = map.colorRange();
          colorRange.enabled(true).padding([0, 0, 10, 0]);
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

          choropActualHospAdmiss.colorScale(colorScale);

          map.colorRange(true);

          map.interactivity().selectionMode('none');
         

          map
            .tooltip()
            .title(false)
            .useHtml(true)
            // .title({ fontColor: '#fff' })
            // .padding([8, 13, 10, 13])
            .format(function () {
              var nom ='<h4 class="w3-text-white">' +  this.getData('nom') + '</h4>';
              var nouvellesHospitalisations = '<br/><span>' +'<strong>New Hospital Admissions: </strong>'+ this.getData('nouvellesHospitalisations').toLocaleString() + '</span>';
              var nouvellesReanimations ='<br/><span>'+ '<strong>New Hospital Intensive Care: </strong>'+ this.getData('nouvellesReanimations').toLocaleString() + '</span>';
              var actualHosp ='<span>'+'<strong>Actual Hospital Admissions: </strong>' +  this.getData('hospitalises').toLocaleString() + '</span>';
              var actualReanim ='<br/><span>'+ '<strong>Actual Hospital Intensive Care : </strong>' + this.getData('reanimation').toLocaleString() + '</span>';
              var deces ='<br/><span>'+ '<strong>Cumul. Deaths: </strong>'+ this.getData('deces').toLocaleString() + '</span>';
              var gueris = '<br/><span>'+ '<strong>Cumul. Recovered: </strong>'+ this.getData('gueris').toLocaleString() + '</span>';
              
              return (
                nom + actualHosp + actualReanim + nouvellesHospitalisations + nouvellesReanimations + deces + gueris
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
            map.container('containerMapFrance');
            // initiate map drawing

            map.background('#212529');
            // set render mode: true - async
            map.draw();

      }
     
    );
});