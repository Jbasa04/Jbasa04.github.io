// logo_script.js
document.addEventListener('DOMContentLoaded', function() {
  const mainSection = document.querySelector('.main');
  const logo = document.querySelector('.logo');
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
    logo.style.transition = 'transform 5s linear';
    logo.style.transform = 'translate(-100vw, 50%)'; // Move logo out of the screen
  }

  // Call the animateLogo function
  animateLogo();
});

