var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-input');
var resultContainerEl = document.querySelector('#result-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getUserCity(cityName);

    resultContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City Name');
  }
};

var buttonClickHandler = function (event) {
  var forecast = event.target.getAttribute('forecast');

  if (forecast) {
    getFeaturedResults(forcast);

    resultContainerEL.textContent = '';
  }
};

var myAPIKey = "b4e070a1a9ebee8165528bdabd520c33";
var cityName = cityInputEl.value.trim();
var getUserCity = function (user) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=" + myAPIKey;


  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayResult(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

console.log()
var getFeaturedResults = function (forecast) {
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&current.uvi&limit=1&appid=b4e070a1a9ebee8165528bdabd520c33";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayResult(data.items, forecast);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayResult = function (results, searchTerm) {
  if (Result.length === 0) {
    resultContainerEL.textContent = 'No data found.';
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < results.length; i++) {
    var resultName = results[i].owner.login + '/' + results[i].name;

    var resultEl = document.createElement('a');
    resultEl.classList = 'list-item flex-row justify-space-between align-center';
    resultEl.setAttribute('href', './single-result.html?result=' + resultName);

    var titleEl = document.createElement('span');
    titleEl.textContent = resultName;

    resultEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (results[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + results[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    resultEl.appendChild(statusEl);

    resultContainerEL.appendChild(resultEl);
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);


  