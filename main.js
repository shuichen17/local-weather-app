$(document).ready(function () {
    var lat;
    var lon;
    var result;
    var unitC = '℃';
    var unitF = '℉';
    var showCelsius = true;
    var weatherStatus;
    $('#location').text('loading . . .');
    function getLocation() {
      $.ajax({
        url: 'https://ipapi.co/jsonp',
        method: 'GET',
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: function (response) {
          $('#location').text(response.city + ',' + response.country);
          lat = response.latitude;
          lon = response.longitude;
          /*console.log(lat);
          console.log(lon);*/
          function getWeather(lat, lon) {
            $.ajax({
                    url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon,
                    method: 'GET',
                    dataType: 'JSON',
                    success: function (response) {
                        weatherStatus = response.weather[0].main;
                        $('#weather').text(weatherStatus);
                        $('#icon').html('<img src=' + response.weather[0].icon + '.png>');
                        result = response.main.temp;
                        $('#temp').text(result + unitC);
                        switch (weatherStatus) {
                        case 'Clouds':
                          $('body').css('background-image', 'url("image/broken clouds.jpeg")');
                          break;
                        case 'Clear':
                          $('body').css('background-image', 'url("image/clear.jpg")');
                          break;
                        case 'Rain':
                          $('body').css('background-image', 'url("image/rain.jpeg")');
                          break;
                        case 'Snow':
                          $('body').css('background-image', 'url("image/snow.jpg")');
                          break;
                        case 'thunderstorm':
                          $('body').css('background-image', 'url("image/thunderstorm.jpg")');
                          break;
                        case 'Mist':
                          $('body').css('background-image', 'url("image/mist.jpg")');
                          break;
                        default:
                          $('body').css('background-image', 'url("image/clear sky.jpg")');
                      }

                      },

                  });
          }
          getWeather(lat, lon);
        },

      });
    }
    getLocation();

    $('#togBtn'). on('click', function () {
        var F = Math.round(result * 1.8 + 32);
        if (showCelsius === false) {
          $('#temp').text(result + unitC);
          showCelsius = true;
      }
        else {
          $('#temp').text(F + unitF);
          showCelsius = false;
        }
      });
    //object for weather background

  });
