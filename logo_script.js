window.onload = function() {
  const container = document.querySelector('.container');
  const logo = document.querySelector('.logo');

  // Variable to track color state
  let isLightRed = false;

  function spawnLogo() {
    const newLogo = document.createElement('img');
    newLogo.src = 'logo.png';
    newLogo.alt = 'Logo';
    newLogo.className = 'logo';
    container.appendChild(newLogo);

    setTimeout(() => {
      newLogo.style.transform = 'translate(-100vw, 100vh)'; /* adjust as needed */
    }, 100); // Adjust the delay as needed
  }

  function toggleColor() {
    console.log("Color toggled"); // Check if the function is being called
    if (isLightRed) {
      container.style.backgroundColor = '#ff0000'; // Set to dark red
    } else {
      container.style.backgroundColor = '#ff7f7f'; // Set to light red
    }
    isLightRed = !isLightRed; // Toggle the state
  }

  // Event listener for click or touch
  container.addEventListener('click', toggleColor);
  container.addEventListener('touchstart', toggleColor);

  setInterval(spawnLogo, 2000); // Adjust the interval as needed
};

