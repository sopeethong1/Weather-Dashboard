var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-input');
var resultContainerEl = document.querySelector('#result-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getUserCity(cityName);

    resultContainerEL.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City Name');
  }
};

var buttonClickHandler = function (event) {
  var forecast = event.target.getAttribute('forcast');

  if (forecast) {
    getFeaturedResults(forcast);

    resultContainerEL.textContent = '';
  }
};

var getUserCity = function (user) {
  var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=b4e070a1a9ebee8165528bdabd520c33";


  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

var getFeaturedResults = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    resultContainerEL.textContent = 'No repositories found.';
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    resultContainerEL.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);


  