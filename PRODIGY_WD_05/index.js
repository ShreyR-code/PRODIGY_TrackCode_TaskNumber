// Use your provided OpenWeather API key
const API_KEY = 'a2cc388c826d3630ce8d1cb87b8de7d9'; 

// Fetch weather based on user input
document.getElementById('location-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeatherData(location) {
    // Fetch weather data from OpenWeather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
        .then(response => {
            // Log the response for debugging
            console.log(response);
            // Check if the response is okay (status code 200-299)
            if (!response.ok) {
                throw new Error(`Location not found: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            alert(error.message); // Alert the user if there's an error
            console.error('Error fetching weather data:', error); // Log the error for debugging
        });
}

function displayWeatherData(data) {
    // Display weather information on the page
    document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('clouds').textContent = `Cloud Cover: ${data.clouds.all}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Get rain and snow intensity if available
    const rain = data.rain ? data.rain['1h'] || data.rain['3h'] : 0;
    const snow = data.snow ? data.snow['1h'] || data.snow['3h'] : 0;

    document.getElementById('rain-intensity').textContent = rain ? `Rain Intensity: ${rain} mm` : 'No Rain';
    document.getElementById('snow-intensity').textContent = snow ? `Snow Intensity: ${snow} mm` : 'No Snow';

    // Show the weather info section
    document.getElementById('weather-info').classList.remove('hidden');
}

// Optionally, get user's current location and fetch weather
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to fetch weather for your location');
                }
                return response.json();
            })
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data for user location:', error));
    });
}
