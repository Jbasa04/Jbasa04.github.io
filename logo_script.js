// script.js
window.onload = function() {
  const container = document.querySelector('.container');
  let isLightRed = true;

  function spawnLogo() {
    const newLogo = document.createElement('img');
    newLogo.src = 'logo.png';
    newLogo.alt = 'Logo';
    newLogo.className = 'logo';
    container.appendChild(newLogo);

    // Use setTimeout to ensure smooth transition
    setTimeout(() => {
      newLogo.style.transition = 'transform 5s linear'; // Set transition property
      newLogo.style.transform = 'translate(-100vw, 100vh)'; // Move to bottom left
    }, 100); // Adjust the delay as needed

    // Remove the logo once it moves out of the screen
    setTimeout(() => {
      newLogo.remove();
    }, 6000); // Adjust timing to match transition duration
  }

  // Function to handle touch events
  function handleTouchStart(event) {
    event.preventDefault(); // Prevent default touch behavior
    
    // Change background color
    if (isLightRed) {
      document.body.style.backgroundColor = '#8b0000'; // Dark red
    } else {
      document.body.style.backgroundColor = '#ff7f7f'; // Light red
    }
    isLightRed = !isLightRed; // Toggle the flag

    // Spawn logo
    spawnLogo();
  }

  // Add event listener for touchstart event
  document.addEventListener('touchstart', handleTouchStart, false);

  // Add fallback for click event for non-touch devices
  document.addEventListener('click', function(event) {
    event.preventDefault();
    handleTouchStart(event);
  });
};

