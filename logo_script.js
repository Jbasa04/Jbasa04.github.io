// script.js
window.onload = function() {
  const container = document.querySelector('.container');
  
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
  
  setInterval(spawnLogo, 2000); // Adjust the interval as needed
};

