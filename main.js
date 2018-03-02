$(document).ready(function () {
    var lat;
    var lon;
    var result;
    var unitC = '℃';
    var unitF = '℉';
    var showCelsius = true;
    var weatherStatus;
    var key = '&appid=1c5b927e90268468491ebc85e14ca557';
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
                    url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + key,
                    method: 'GET',
                    dataType: 'JSON',
                    success: function (response) {
                        weatherStatus = response.weather[0].main;
                        $('#weather').text(weatherStatus);
                        $('#icon').html('<img src=http://openweathermap.org/img/w/' + response.weather[0].icon + '.png>');
                        result = response.main.temp - 273.15;
                        result = result.toPrecision(3);
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
        var F = result * 1.8 + 32;
        F = F.toPrecision(3);
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
