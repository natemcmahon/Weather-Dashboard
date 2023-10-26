var pastSearchesList = document.getElementById('previousSearches');
var searchButton = $('#search-button');
var currentCity = $('#city-name');
var todayTemp = $('#current-temp');
var todayWind = $('#current-wind');
var todayHumidity = $('#current-humidity');

var searchText;

var latLongAPI;
var apiKey = 'fd960d184c53e4f03c025257c7047935';

searchButton.on('click', function (event) {
    // console.log(event);
    var clickedButton = event.currentTarget;
    var buttonParent = clickedButton.parentElement;
    // console.log(buttonParent.children[0].value);
    searchText = buttonParent.children[0].value;

    var geoCodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchText + '&limit=1&appid=' + apiKey;

    fetch(geoCodeAPI, {
        mode: "cors",
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var entryLat = data[0].lat;
        console.log("your lat is: " + entryLat);
        var entryLong = data[0].lon;
        console.log("your long is: " + entryLong);
        
        latLongAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + entryLat + '&lon=' + entryLong + '&limit=5&appid=' + apiKey;
        
        fetch(latLongAPI, {
            mode: "cors",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentTemp = data.list[0].main.temp - 273.15;
            var currentHumidity = data.list[0].main.humidity;
            var currentWind = data.list[0].wind.speed;

            console.log("current temp in Degrees C: " + currentTemp);

            currentCity.html(searchText);
            todayTemp.html(currentTemp + " Degrees C");
            todayWind.html(currentWind + " mph");
            todayHumidity.html(currentHumidity + "%");

            var dayTwoTemp = data.list[7].main.temp - 273.15;
            var dayThreeTemp = data.list[15].main.temp - 273.15;
            var dayFourTemp = data.list[23].main.temp - 273.15;
            var dayFiveTemp = data.list[31].main.temp - 273.15;
            var daySixTemp = data.list[39].main.temp - 273.15;

            console.log(daySixTemp);
        })
    })

    
})