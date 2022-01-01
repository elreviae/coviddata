anychart.onDocumentReady(function () {
  anychart.theme('darkEarth');

  // Creates Map Chart
  var map = anychart.map();
  var urlApi = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&lang=fr&rows=101&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.variable_label=Tous+%C3%A2ges'
  anychart.data.loadJsonFile(urlApi,
    function (data) {
      // var arrayCovidInfos = data.allLiveFranceData;
      var dataCovid = data.records;

      var pushCovidInfo = [];
      for (var i = 0; i < dataCovid.length; i++) {
        var obj = dataCovid[i];
        for (var key in obj) {
          pushCovidInfo.push(obj[key]);
        };
      };


      // arrayCovidInfos.forEach(o => {
      //   Object.assign(o, 
      //   { 
      //     'id': o.reg_code,
      //   });
      //   delete o.reg_code;
      // });

      var newArrayCovidInfos = JSON.stringify(pushCovidInfo, function (key, value) {
        if (key == "reg_code") {
          return value
            .replace('01', 'FR.GUA')
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
        } else {
          return value
        }
      });


      var newCovidData = JSON.parse(newArrayCovidInfos);

      console.log(newCovidData);
      var dataSet = anychart.data.set(newCovidData);


      var n_cum_complet = dataSet.mapAs({ // Nombre cumulé de vaccinations complètes (doses n°2) administrées du début de la vaccination jusqu'à ce jour inclus
        // name: 'reg_name',
        id: 'reg_code',
        size: 'n_cum_complet',
        value: 'n_cum_complet'
      });

      var n_cum_dose1 = dataSet.mapAs({ // Nombre cumulé de doses n°1 administrées du début de la vaccination jusqu'à ce jour inclus
        // name: 'reg_name',
        id: 'reg_code',
        value: 'n_cum_dose1'
      });


      map.padding([5, 0, 5, 0]);

      map.geoData('anychart.maps.france');

      map
        .credits()
        .enabled(true)
        .url('https://public.opendatasoft.com/explore/dataset/covid-19-france-vaccinations-age-sexe-dep/information/?disjunctive.variable_label&sort=date')
        .text('Data source: Santé Publique France')
        .logoSrc('https://static.data.gouv.fr/avatars/79/7e94cd7a8d43d39544d4018666e646.png');

      map
        .legend()
        .enabled(true)
        .position('top')
        .align('center')
        .itemsLayout('horizontal')
        .padding(10, 0, 10, 0)
        .paginator(false);

      // Creates bubble seriesActive
      var cumulVaccindose1 = map.bubble(n_cum_dose1);
      // Sets series1 settings
      cumulVaccindose1
        .name('total_vaccines')
        .fill('#ee1111 0.7')
        .stroke('1 #ff9c80 0.7');
      cumulVaccindose1
        .legendItem()
        .iconType('circle')
        .iconFill('#ee1111 0.7')
        .iconStroke('1 #ff9c80 0.7');

      //Sets bubble max size settings
      map.minBubbleSize('0.5%').maxBubbleSize('5%');

      // // Creates choropleth for serie
      // var choropCumuldose2 = map.choropleth(n_cum_complet);
      // // Sets choropleth serie settings
      // choropCumuldose2
      //   .name('n_complet')
      //   .geoIdField('id')
      //   .stroke('1 #4b4b4b 0.8');
      // choropCumuldose2
      //   .legendItem()
      //   .iconType('circle')
      //   .iconFill('#d61ee9 0.7');

      // choropCumuldose2.hovered().fill('#222222 0.8').stroke('1 #ee1111 0.8').size(15);

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
        { less: 9999 },
        { from: 10000, to: 49999 },
        { from: 50000, to: 149999 },
        { from: 150000, to: 499999 },
        { from: 500000, to: 999999 },
        { from: 1000000, to: 4999999 },
        { from: 5000000, to: 9999999 },
        { greater: 10000000 }
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

      choropCumuldose2.colorScale(colorScale);

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
      map.container('containerMapFrance');
      // initiate map drawing

      map.background('#212529');
      // set render mode: true - async
      map.draw();

    }

  );
});