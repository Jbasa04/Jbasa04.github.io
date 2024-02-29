window.onload = function() {

  const main = document.querySelector('.main');
  const logo = document.querySelector('.logo');

  // Variable to track color state
  let isLightRed = false;

  function spawnLogo() {
    const newLogo = document.createElement('img');
    newLogo.src = 'logo.png';
    newLogo.alt = 'Logo';
    newLogo.className = 'logo';
    main.appendChild(newLogo);

    setTimeout(() => {
      newLogo.style.transform = 'translate(-100vw, 100vh)'; /* adjust as needed */
    }, 100); // Adjust the delay as needed
  }

  function toggleColor() {
    console.log("Color toggled"); // Check if the function is being called
    if (isLightRed) {
      main.style.backgroundColor = '#ff0000'; // Set to dark red
    } else {
      main.style.backgroundColor = '#7f281f'; // Set to light red
    }
    isLightRed = !isLightRed; // Toggle the state
  }

// Event listener for click or touch on the main element
main.addEventListener('click', toggleColor);
main.addEventListener('touchstart', toggleColor);
main.addEventListener('touchend', toggleColor);


  setInterval(spawnLogo, 2000); // Adjust the interval as needed
};

