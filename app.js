const container = document.querySelector('.container');
const weather_Section = document.querySelector('.weatherSection');
const weather_Details = document.querySelector('.weatherDetails');
const errorLocation = document.querySelector('.locationNotFound');
const searchBar = document.querySelector('.searchBar input');
searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchBarFunction();
  }
});

const searchButton = document.querySelector('.searchBar button');
searchButton.addEventListener('click', () => {
    searchBarFunction();
});


function searchBarFunction() {

    // API keys
    // You get your own API keys from https://openweathermap.org/api and https://ipgeolocation.io/

    const WeatherAPIKEY = '7faeec3e945ad0dadc6c86283ed50a3b';
    const TimeAPIKEY = 'c2406423e3ed43e0a3bd9bac59b58213';
    const city = document.querySelector('.searchBar input').value;

    if(city === '')
        return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WeatherAPIKEY}`)
        .then((response) => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '600px';
                weather_Section.style.display = 'none';
                weather_Details.style.display = 'none';
                errorLocation.style.display = 'block';
                errorLocation.classList.add('fadeIn');
                return;
            }

            errorLocation.style.display = 'none';
            errorLocation.classList.remove('fadeIn');

            const image = document.querySelector('.weatherSection img');
            const temperature = document.querySelector('.weatherSection .temperature');
            const description = document.querySelector('.weatherSection .description');
            const humidity = document.querySelector('.weatherDetails .humidity span');
            const wind = document.querySelector('.weatherDetails .windSpeed span');
            const timezone = document.querySelector('.weatherSection .timezone');
            const time = document.querySelector('.weatherSection .time');
            

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'assets/sunny.png';
                    break;
                
                case 'Rain':
                    image.src = 'assets/rainy-atmosphere.png';
                    break;

                case 'Snow':
                    image.src = 'assets/snowy.png';
                    break;

                case 'Clouds':
                    image.src = 'assets/cloudy-day.png';
                    break;
                
                case 'Haze':
                    image.src = 'assets/haze.png';
                    break;
                
                case 'Thuderstorm':
                    image.src = 'assets/day-storm.png';

        
                default:
                    image.src = '';
            }

            fetch(`https://api.ipgeolocation.io/timezone?apiKey=${TimeAPIKEY}&location=${city}`)
            .then((response) => response.json())
            .then(json => {
                // make time auto update every second
                setInterval(() => {
                    time.innerHTML = `${json.time_24}`;
                }, 1000);
            }
            );

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
            timezone.innerHTML = `${json.name}, ${json.sys.country}`;

            weather_Section.style.display = '';
            weather_Details.style.display = '';
            weather_Section.classList.add('fadeIn');
            weather_Details.classList.add('fadeIn');
            container.style.height = '750px';
        });


}