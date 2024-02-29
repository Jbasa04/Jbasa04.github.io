// script.js
window.onload = function() {
  const container = document.querySelector('.container');
  const mainSection = document.querySelector('.main');

  function spawnLogo() {
    const newLogo = document.createElement('img');
    newLogo.src = 'logo.png';
    newLogo.alt = 'Logo';
    newLogo.className = 'logo';
    container.appendChild(newLogo);

    setTimeout(() => {
      newLogo.style.transform = 'translate(calc(-50% + 100vw), calc(-50% + 100vh))'; /* Move logo to bottom left */
    }, 100); // Adjust the delay as needed
  }

  setInterval(spawnLogo, 2000); // Adjust the interval as needed

  // Function to handle color change on touch/click
  function changeColor() {
    const currentColor = mainSection.style.backgroundColor;
    if (currentColor === 'rgb(139, 0, 0)') {
      mainSection.style.backgroundColor = '#ff7f7f'; // Light red
    } else {
      mainSection.style.backgroundColor = '#8b0000'; // Dark red
    }
  }

  // Event listeners for touch and click events to trigger color change
  document.addEventListener('touchstart', changeColor);
  document.addEventListener('click', changeColor);
};

