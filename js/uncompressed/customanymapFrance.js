anychart.onDocumentReady(function () {
    anychart.theme('darkEarth');

    // Creates Map Chart
    var map = anychart.map();
   
    anychart.data.loadJsonFile(
      // 'https://coronavirusapi-france.now.sh/AllLiveData',
      'https://data.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-region%40public&q=&rows=20&facet=date&facet=reg_code&facet=reg_name',
      function (data) {
        // var arrayCovidInfos = data.allLiveFranceData;
        var arrayCovidInfos = data.records;

            // arrayCovidInfos.forEach(o => {
            //   Object.assign(o, 
            //   { 
            //     'id': o.reg_code,
            //   });
            //   delete o.reg_code;
            // });



            for(var i = 0; i<arrayCovidInfos.length; i++){

              var newArrayCovidInfos = arrayCovidInfos[i].fields;

            }


        

          var newArrayCovidInfos = JSON.stringify(arrayCovidInfos, function (key, value) {
            if (key == "reg_code") {
              return value.
              replace('01', 'FR.GUA')
             .replace('02', 'FR.MQ')
             .replace('03', 'FR.GF')
             .replace('04', 'FR.LRE')
             .replace('06', 'FR.MAY')
             .replace('11', 'FR.IDF')
             .replace('24', 'FR.CVL')
             .replace('27', 'FR.BFC')
             .replace('28', 'FR.NOR')
             .replace('32', 'FR.HDF')
             .replace('44', 'FR.GES')
             .replace('52', 'FR.PDL')
             .replace('53', 'FR.BRE')
             .replace('75', 'FR.NAQ')
             .replace('76', 'FR.OCC')
             .replace('84', 'FR.ARA')
             .replace('93', 'FR.PAC')
             .replace('94', 'FR.COR');
            }else {
              return value
            }
          });
          
          var newCovidData = JSON.parse(newArrayCovidInfos);
          console.log(newCovidData);


          var dataSet = anychart.data.set(newCovidData);

          var total_vaccines = dataSet.mapAs({
            // name: 'reg_name',
            id: 'reg_code',
            value: 'total_vaccines'
          });

          var regPopTot = dataSet.mapAs({
            name: 'reg_name',
            id: 'reg_code',
            size: 'reg_pop_tot',
            value: 'reg_pop_tot'
          });
          
      

          map.padding([5, 0, 5, 0]);
         
          map.geoData('anychart.maps.france');

          // map
          // .credits()
          // .enabled(true)
          // .url('https://github.com/opencovid19-fr')
          // .text('Data source: opencovid19-fr')
          // .logoSrc('https://avatars3.githubusercontent.com/u/62096497?s=200&v=4');

      
          map
            .legend()
            .enabled(true)
            .position('top')
            .align('center')
            .itemsLayout('horizontal')
            .padding(10, 0, 10, 0)
            .paginator(false);

          // // Creates bubble seriesActive
          // var actualtotalVaccines = map.bubble(total_vaccines);
          // // Sets series1 settings
          // actualtotalVaccines
          //   .name('total_vaccines')
          //   .fill('#ee1111 0.7')
          //   .stroke('1 #ff9c80 0.7');
          // actualtotalVaccines
          //   .legendItem()
          //   .iconType('circle')
          //   .iconFill('#ee1111 0.7')
          //   .iconStroke('1 #ff9c80 0.7');

          // Sets bubble max size settings
          // map.minBubbleSize('1%').maxBubbleSize('7%');

         // Creates choropleth for serie
        var choropRegPopTot = map.choropleth(regPopTot);
        // Sets choropleth serie settings
        choropRegPopTot
          .name('Actual Hospital Admissions')
          .geoIdField('id')
          .stroke('1 #4b4b4b 0.8');
        choropRegPopTot
          .legendItem()
          .iconType('circle')
          .iconFill('#d61ee9 0.7');

        choropRegPopTot.hovered().fill('#222222 0.8').stroke('1 #ee1111 0.8').size(15);

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

          choropRegPopTot.colorScale(colorScale);

          map.colorRange(true);
          map.interactivity().selectionMode('none');
         
          // map
          //   .tooltip()
          //   .title(false)
          //   .useHtml(true)
          //   // .title({ fontColor: '#fff' })
          //   // .padding([8, 13, 10, 13])
          //   .format(function () {
          //     var regName ='<h4 class="w3-text-white">' +  this.getData('reg_name') + '</h4>';
          //     // var nouvellesHospitalisations = '<br/><span>' +'<strong>New Hospital Admissions: </strong>'+ this.getData('nouvellesHospitalisations').toLocaleString() + '</span>';
          //     // var nouvellesReanimations ='<br/><span>'+ '<strong>New Hospital Intensive Care: </strong>'+ this.getData('nouvellesReanimations').toLocaleString() + '</span>';
          //     // var actualHosp ='<span>'+'<strong>Actual Hospital Admissions: </strong>' +  this.getData('hospitalises').toLocaleString() + '</span>';
          //     // var actualReanim ='<br/><span>'+ '<strong>Actual Hospital Intensive Care : </strong>' + this.getData('reanimation').toLocaleString() + '</span>';
          //     // var deces ='<br/><span>'+ '<strong>Cumul. Deaths: </strong>'+ this.getData('deces').toLocaleString() + '</span>';
          //     // var gueris = '<br/><span>'+ '<strong>Cumul. Recovered: </strong>'+ this.getData('gueris').toLocaleString() + '</span>';
              
          //     return (
          //       regName
          //     );
          //   });

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