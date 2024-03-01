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
      newLogo.style.transform = 'translate(-150vw, 100vh)'; /* adjust as needed */
    }, 100); // Adjust the delay as needed
  }

  function toggleColor() {
    console.log("Color toggled"); // Check if the function is being called
    if (isLightRed) {
      main.style.background = 'linear-gradient(#ff7f7f, #7f281f)'; // Dark red to light red gradient
    } else {
      main.style.background = 'linear-gradient(#7f281f, #ff0000)'; // Light red to dark red gradient
    }
    isLightRed = !isLightRed; // Toggle the state
  }

  // Event listener for click or touch on the main element
  main.addEventListener('click', toggleColor);
  main.addEventListener('touchstart', toggleColor);
  main.addEventListener('touchend', toggleColor);

  setInterval(spawnLogo, 1000); // Adjust the interval as needed
};


