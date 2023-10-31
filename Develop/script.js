var body = document.body;
var pastSearchesList = document.getElementById('previousSearches');
var searchButton = $('#search-button');
var currentCity = $('#city-name');
var todayDate = $('#current-date');
var todayTemp = $('#current-temp');
var todayWind = $('#current-wind');
var todayHumidity = $('#current-humidity');
// var historicSearches = $('#search-history');
var historicSearches = document.getElementById('search-history');

// Five Day
var dateEl2 = $('#day-two-date');
var tempEl2 = $('#day-two-temp');
var windEl2 = $('#day-two-wind');
var humidEl2 = $('#day-two-humidity');
var dateEl3 = $('#day-three-date');
var tempEl3 = $('#day-three-temp');
var windEl3 = $('#day-three-wind');
var humidEl3 = $('#day-three-humidity');
var dateEl4 = $('#day-four-date');
var tempEl4 = $('#day-four-temp');
var windEl4 = $('#day-four-wind');
var humidEl4 = $('#day-four-humidity');
var dateEl5 = $('#day-five-date');
var tempEl5 = $('#day-five-temp');
var windEl5 = $('#day-five-wind');
var humidEl5 = $('#day-five-humidity');
var dateEl6 = $('#day-six-date');
var tempEl6 = $('#day-six-temp');
var windEl6 = $('#day-six-wind');
var humidEl6 = $('#day-six-humidity');



var searchText;
var searchHistory = [];
// console.log(searchHistory.length);

var latLongAPI;
var apiKey = 'fd960d184c53e4f03c025257c7047935';

var currentDate = dayjs().format('MMM D, YYYY');
var dayTwoDate = dayjs().add(1, "day").format('MMM D, YYYY');
var dayThreeDate = dayjs().add(2, "day").format('MMM D, YYYY');
var dayFourDate = dayjs().add(3, "day").format('MMM D, YYYY');
var dayFiveDate = dayjs().add(4, "day").format('MMM D, YYYY');
var daySixDate = dayjs().add(5, "day").format('MMM D, YYYY');

console.log(typeof(searchHistory));

var storedSearches = JSON.parse(localStorage.getItem("Search History String Array"));

console.log(storedSearches);
console.log("type of searchHistory is: " + typeof(storedSearches));

for (i = 0; i < storedSearches.length; i++) {
    var liEl = document.createElement("li");
    
    liEl.setAttribute('class', 'past-search');
    liEl.innerHTML = storedSearches[i];
    console.log(storedSearches[i]);
    historicSearches.appendChild(liEl);
}




searchButton.on('click', function (event) {
    // console.log(event);
    var clickedButton = event.currentTarget;
    var buttonParent = clickedButton.parentElement;
    // console.log(buttonParent.children[0].value);
    searchText = buttonParent.children[0].value;

    // local Storage setup
    console.log(searchHistory);
    console.log(searchText);
    searchHistory.push(searchText);
    console.log(searchHistory);
    // clear duplicates from array

    localStorage.setItem("Search History String Array", JSON.stringify(searchHistory));



    // Setting local storage properly
    // struggling to get from local storage and build HTML list
    // historicSearches isn't populating as an HTML element, could try getElementById
    for (i = 0; i < searchHistory.length; i++) {
        var liEl = document.createElement("li");
        
        liEl.setAttribute('class', 'past-search');
        liEl.innerHTML = searchHistory[i];
        console.log(historicSearches[i]);
        historicSearches.appendChild(liEl);
    }

    //////////////////////////

    var geoCodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchText + '&limit=1&appid=' + apiKey;

    fetch(geoCodeAPI, {
        mode: "cors",
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        var entryLat = data[0].lat;
        // console.log("your lat is: " + entryLat);
        var entryLong = data[0].lon;
        // console.log("your long is: " + entryLong);
        
        latLongAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + entryLat + '&lon=' + entryLong + '&limit=5&appid=' + apiKey;
        
        fetch(latLongAPI, {
            mode: "cors",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var currentTemp = data.list[0].main.temp - 273.15;
            var currentHumidity = data.list[0].main.humidity;
            var currentWind = data.list[0].wind.speed;

            // console.log("current temp in Degrees C: " + currentTemp);

            currentCity.html(searchText);
            todayDate.html(currentDate);
            todayTemp.html("Temp: " + currentTemp + "&deg C");
            todayWind.html("Wind: " + currentWind + " mph");
            todayHumidity.html("Humidity: " + currentHumidity + "%");

            dateEl2.html(dayTwoDate);
            tempEl2.html("Temp: " + (data.list[7].main.temp - 273.15) + '&deg C');
            windEl2.html("Wind: " + (data.list[7].wind.speed) + ' MPH');
            humidEl2.html("Humidity: " + (data.list[7].main.humidity) + '%');

            dateEl3.html(dayThreeDate);
            tempEl3.html("Temp: " + (data.list[15].main.temp - 273.15) + '&deg C');
            windEl3.html("Wind: " + (data.list[15].wind.speed) + ' MPH');
            humidEl3.html("Humidity: " + (data.list[15].main.humidity) + '%');

            dateEl4.html(dayFourDate);
            tempEl4.html("Temp: " + (data.list[23].main.temp - 273.15) + '&deg C');
            windEl4.html("Wind: " + (data.list[23].wind.speed) + ' MPH');
            humidEl4.html("Humidity: " + (data.list[23].main.humidity) + '%');

            dateEl5.html(dayFiveDate);
            tempEl5.html("Temp: " + (data.list[31].main.temp - 273.15) + '&deg C');
            windEl5.html("Wind: " + (data.list[31].wind.speed) + ' MPH');
            humidEl5.html("Humidity: " + (data.list[31].main.humidity) + '%');

            dateEl6.html(daySixDate);
            tempEl6.html("Temp: " + (data.list[39].main.temp - 273.15) + '&deg C');
            windEl6.html("Wind: " + (data.list[39].wind.speed) + ' MPH');
            humidEl6.html("Humidity: " + (data.list[39].main.humidity) + '%');

            // console.log(daySixTemp);
            
        })
    })

    
})

function incrementDate(dateInput,increment) {
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() +(increment *86400000));
    increasedDate.format('MMM D, YYYY');
    return increasedDate;
}

function removeDuplicates(arr) { 
    return arr.filter((item, 
        index) => arr.indexOf(item) === index); 
}