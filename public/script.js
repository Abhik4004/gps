let watchId; // Variable to store the tracking ID

function startTracking() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  // Update the tracking status
  document.getElementById('latitude').textContent = '-';
  document.getElementById('longitude').textContent = '-';
  document.getElementById('speed').textContent = '-';
  document.getElementById('altitude').textContent = '-';

  // Update the marker position with the current location
  function updateLocation(position) {
    const { latitude, longitude, speed, altitude } = position.coords;

    // Update the tracking info
    document.getElementById('latitude').textContent = latitude.toFixed(6);
    document.getElementById('longitude').textContent = longitude.toFixed(6);
    document.getElementById('speed').textContent = speed ? speed.toFixed(2) + ' m/s' : '-';
    document.getElementById('altitude').textContent = altitude ? altitude.toFixed(2) + ' meters' : '-';
  }

  // Get the current position and update the location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      updateLocation(position);
    },
    (error) => {
      console.error('Error occurred while retrieving the current position:', error);
    }
  );

  // Watch for position updates and update the location
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      updateLocation(position);
    },
    (error) => {
      console.error('Error occurred while tracking:', error);
    }
  );
}

function stopTracking() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

document.getElementById('startButton').addEventListener('click', startTracking);
document.getElementById('stopButton').addEventListener('click', stopTracking);
