// Assuming the JSON data is fetched from an API endpoint
fetch('https://api.open-meteo.com/v1/forecast?latitude=-0.6817&longitude=34.7667&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&timezone=Africa%2FNairobi')
  .then(response => response.json())
  .then(data => {
    // Extract and round relevant data from the JSON response
    const currentTemp = Math.round(data.current.temperature_2m);
    const humidity = Math.round(data.current.relative_humidity_2m);
    const windSpeed = Math.round(data.current.wind_speed_10m);
    const rain = Math.round(data.current.rain);
    const weatherCode = data.current.weather_code; // Extract weather code

    // Determine weather description and icon based on the weather code
    let weatherDescription;
    let icon;

    if (weatherCode >= 0 && weatherCode <= 1) {
      weatherDescription = "Clear skies";
      icon = "01.png";
    } else if (weatherCode === 2) {
      weatherDescription = "Partly cloudy";
      icon = "02.png";
    } else if (weatherCode >= 20 && weatherCode <= 29) {
      weatherDescription = "Thunderstorm";
      icon = "04.png";
    } else if (weatherCode >= 30 && weatherCode <= 39) {
      weatherDescription = "Drizzle";
      icon = "03b.png";
    } else if (weatherCode >= 40 && weatherCode <= 49) {
      weatherDescription = "Rain";
      icon = "03.png";
    } else if (weatherCode >= 50 && weatherCode <= 59) {
      weatherDescription = "Snow showers";
      icon = "07.png";
    } else if (weatherCode >= 60 && weatherCode <= 69) {
      weatherDescription = "Freezing rain";
      icon = "03c.png"; // Reuse icon for moderate rain showers if no freezing rain icon exists
    } else if (weatherCode >= 70 && weatherCode <= 79) {
      weatherDescription = "Ice pellets";
      icon = "03a.png"; // Reuse light rain showers icon if no ice pellets icon exists
    } else if (weatherCode >= 80 && weatherCode <= 89) {
      weatherDescription = "Rain showers";
      icon = "03.png"; // Use the main rain icon for general rain showers
    } else if (weatherCode >= 90 && weatherCode <= 99) {
      weatherDescription = "Snow showers";
      icon = "07.png";
    } else {
      weatherDescription = "Unknown";
      icon = "default.png"; 
    }

    // Determine if it's day or night
    const currentHour = new Date().getHours(); // Get current hour (0-23)
    const isNight = currentHour >= 18 || currentHour < 6;
    const folder = isNight ? "night" : "day";

    // Update the icon based on the time of day
    document.getElementById('icon').src = `images/${folder}/${icon}`;

    // Update the UI elements with rounded values and weather description
    document.getElementById('temp').textContent = `${currentTemp}`;
    document.getElementById('temp-now').textContent = `${currentTemp}˚`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
    document.getElementById('rain').textContent = `${rain}%`;
    document.getElementById('subreading').textContent = weatherDescription;

    // ... similar logic for other UI elements
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours;
  }
  
  const minutes = ":00";
  const currentTime = getCurrentTime();
  
  // Create Date objects for previous and next hours
  const prev1Date = new Date();
  prev1Date.setHours(currentTime - 1);
  
  const prev2Date = new Date();
  prev2Date.setHours(currentTime - 2);
  
  const nextDate = new Date();
  nextDate.setHours(currentTime + 1);
  
  // Format the hours for display
  const prev1Hours = prev1Date.getHours().toString().padStart(2, '0');
  const prev2Hours = prev2Date.getHours().toString().padStart(2, '0');
  const nextHours = nextDate.getHours().toString().padStart(2, '0');
  
  // Update the HTML elements
  document.getElementById('current-time').textContent = currentTime + minutes;
  document.getElementById('prev1').textContent = prev1Hours + minutes;
  document.getElementById('prev2').textContent = prev2Hours + minutes;
  document.getElementById('next').textContent = nextHours + minutes;