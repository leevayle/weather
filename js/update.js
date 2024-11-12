// Assuming the JSON data is fetched from an API endpoint
fetch('https://api.open-meteo.com/v1/forecast?latitude=-0.6817&longitude=34.7667&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&hourly=weather_code&timezone=Africa%2FNairobi&forecast_days=1')
  .then(response => response.json())
  .then(data => {
    // Extract and round relevant data from the JSON response
    const currentTemp = Math.round(data.current.temperature_2m);
    const humidity = Math.round(data.current.relative_humidity_2m);
    const windSpeed = Math.round(data.current.wind_speed_10m);
    const rain = Math.round(data.current.rain);

    // Update the UI elements with rounded values
    document.getElementById('temp').textContent = `${currentTemp}`;
    document.getElementById('temp-now').textContent = `${currentTemp}˚`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
    document.getElementById('rain').textContent = `${rain}%`;

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