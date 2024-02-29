// logo_script.js
document.addEventListener('DOMContentLoaded', function() {
  const mainSection = document.querySelector('.main');
  const logoContainer = document.querySelector('.container');
  const colorChange = document.querySelector('.color-change');

  // Function to handle color change animation
  function changeColor() {
    if (mainSection.style.backgroundColor === 'rgb(255, 127, 127)') {
      mainSection.style.backgroundColor = '#ff7f7f'; // Change to light red
    } else {
      mainSection.style.backgroundColor = '#ff7f7f'; // Change to dark red
    }
  }

  // Event listener for touchstart and click events
  document.addEventListener('touchstart', function() {
    changeColor(); // Change color on touchstart
  });

  document.addEventListener('click', function() {
    changeColor(); // Change color on click
  });

  // Function to handle logo animation
  function animateLogo() {
    const logo = document.createElement('img');
    logo.src = 'logo.png';
    logo.alt = 'Logo';
    logo.classList.add('logo');

    // Set initial position of logo
    logo.style.top = `${Math.random() * 100}vh`; // Random top position
    logo.style.right = '-100px'; // Off-screen initially
    logoContainer.appendChild(logo);

    // Trigger animation
    setTimeout(() => {
      logo.style.transition = 'transform 5s linear';
      logo.style.transform = 'translate(-100vw, 50%)'; // Move logo out of the screen
    }, 100); // Adjust delay as needed
  }

  // Call the animateLogo function
  animateLogo();
});

