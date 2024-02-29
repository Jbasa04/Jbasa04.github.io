// script.js
window.onload = function() {
  const container = document.querySelector('.container');
  const logo = document.querySelector('.logo');
  
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
  
  setInterval(spawnLogo, 2000); // Adjust the interval as needed
};


