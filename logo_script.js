// logo_script.js
document.addEventListener('DOMContentLoaded', function() {
  const logoContainer = document.querySelector('.container');

  // Function to create and animate a logo
  function animateLogo() {
    const logo = document.createElement('img');
    logo.src = 'logo.png';
    logo.alt = 'Logo';
    logo.classList.add('logo');

    // Initial position of logo (top right)
    logo.style.top = '0';
    logo.style.right = '0';
    logoContainer.appendChild(logo);

    // Final position of logo (bottom left)
    const finalTop = logoContainer.clientHeight - logo.clientHeight;
    const finalRight = logoContainer.clientWidth - logo.clientWidth;

    // Animation: Move from top right to bottom left
    logo.style.transition = 'transform 5s linear';
    logo.style.transform = `translate(${finalRight}px, ${finalTop}px)`;

    // Remove logo after animation completes
    logo.addEventListener('transitionend', function() {
      logo.remove();
    });
  }

  // Function to repeatedly animate logos every second
  function spawnLogo() {
    animateLogo();
    setTimeout(spawnLogo, 1000); // Spawn a new logo every 1 second
  }

  // Start spawning logos
  spawnLogo();
});

