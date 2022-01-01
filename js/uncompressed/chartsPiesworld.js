anychart.onDocumentReady(function () {

    var jsonData = 'https://disease.sh/v3/covid-19/all';

    anychart.data.loadJsonFile(jsonData, function (data) {

        var covidData = data;


        // ------------------------------------------------------------ DONUT PIE 1 
        var dataPie1 = [
            { x: 'New Cases', value: covidData.todayCases },
            { x: 'New Recovered', value: covidData.todayRecovered },
            { x: 'New Deaths', value: covidData.todayDeaths }
        ];

        var chartPie1 = anychart.pie(dataPie1);

        chartPie1.background().fill("#27293d");

        chartPie1.palette(["#2196f3", "#cddc39", "#f44336"]);

        // set outline settings
        chartPie1
            .outline()
            .width('2%')
            .fill(function () {
                return anychart.color.darken(this.sourceColor, 0.15);
            });

        // Set animation settings.
        chartPie1.animation({ enabled: true, duration: 1000 });
        chartPie1
            .labels()
            .fontSize(15)
            .hAlign('center')
            .position('outside')
            .format();

        // set chart title text settings
        chartPie1
            .title('New Cases, Recovered, Deaths')
            .radius('40%')
            .innerRadius('70%');

        chartPie1
            .credits()
            .enabled(true)
            .url('https://disease.sh/')
            .text('Data source: disease.sh - Open Disease Data API');


        // set legend title text settings
        chartPie1
            .legend()
            .position('center-bottom')
            .itemsLayout('horizontal')
            .align('center');

        // remove two element from the menu
        chartPie1.contextMenu().itemsFormatter(function (items) {
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
            { x: 'Total Confirmed', value: covidData.cases },
            { x: 'Total Recovered', value: covidData.recovered },
            { x: 'Total Deaths', value: covidData.deaths }
        ];

        var chartPie2 = anychart.pie(dataPie2);
        chartPie2.background().fill("#27293d");

        chartPie2.palette(["#e91e63", "#cddc39", "#f44336"]);
        // Set animation settings.
        chartPie2.animation({ enabled: true, duration: 1000 });

        // set outline settings
        chartPie2
            .outline()
            .width('2%')
            .fill(function () {
                return anychart.color.darken(this.sourceColor, 0.15);
            });


        chartPie2
            .labels()
            .fontSize(15)
            .hAlign('center')
            .position('outside')
            .format();

        // set chart title text settings
        chartPie2
            .title('Total Cases, Recovered, Deaths')
            .radius('40%')
            .innerRadius('70%');

        chartPie2
            .credits()
            .enabled(true)
            .url('https://disease.sh/')
            .text('Data source: disease.sh - Open Disease Data API');

        // set legend title text settings
        chartPie2
            .legend()
            .position('center-bottom')
            .itemsLayout('horizontal')
            .align('center');

        // remove two element from the menu
        chartPie2.contextMenu().itemsFormatter(function (items) {
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

    });
});
