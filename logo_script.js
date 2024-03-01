window.onload = function() {
  const main = document.getElementById('main');
  const bottomHalf = document.getElementById('bottomHalf');

  // Variable to track color state
  let currentState = 1;

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
    if (currentState === 1) {
      bottomHalf.style.backgroundColor = '#ffc0cb'; // Bright pink
      currentState = 2;
    } else {
      bottomHalf.style.backgroundColor = '#7f281f'; // Dark red
      currentState = 1;
    }
  }

  // Event listener for click or touch on the main element
  main.addEventListener('click', toggleColor);
  main.addEventListener('touchstart', toggleColor);
  main.addEventListener('touchend', toggleColor);

  setInterval(spawnLogo, 2000); // Adjust the interval as needed
};

