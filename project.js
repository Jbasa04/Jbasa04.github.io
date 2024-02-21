<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jordan Basabanda - Resume</title>
  <link rel="stylesheet" href="styles.css"> <!-- Link to the external CSS file -->
</head>
<body>

<header>
  <h1>Jordan Basabanda</h1>
  <p>Computer Science Student at The University of Notre Dame</p>
</header>

<div class="container">

  <section class="resume-section">
    <h2>Resume</h2>
    <div id="resume-content">
      <!-- Resume content will be dynamically loaded here -->
    </div>
  </section>

  <!-- Add a link to trigger the game -->
  <a href="#" id="game-link">Test Breakout</a>

  <!-- Add a container for the canvas -->
  <div id="game-container" style="display: none;">
    <canvas id="gameCanvas" width="400" height="300"></canvas>
  </div>

</div>

<footer class="footer">
  <div class="container">
    <div class="contact-info">
      <p>Contact Info:</p>          
      <p>Jordan Basabanda</p>
      <p>jbasaban@nd.edu</p>
    </div>
    <div class="linkedin-button">
      <a href="https://www.linkedin.com/in/jordanbasabanda/" target="_blank">
        <img src="LinkedIn.png" alt="LinkedIn" width="30">
      </a>
    </div>
  </div>
</footer>

<!-- Include your JavaScript file -->
<script src="project.js"></script>

<script>
  // Function to load the resume from your files
  function loadResumeFromFiles() {
    // Update the file path with the name of your resume PDF file
    const resumeFilePath = 'BASABANDA,JORDAN RESUME.pdf'; // Replace with the name of your resume PDF file
    document.getElementById('resume-content').innerHTML = `<embed src="${resumeFilePath}" type="application/pdf" width="100%" height="600px" />`;
  }

  // Call the function to load the resume when the page loads
  window.addEventListener('DOMContentLoaded', loadResumeFromFiles);

  // Add an event listener to the game link to show the game container
  document.getElementById('game-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    document.getElementById('game-container').style.display = 'block'; // Show the game container
    initializeGame(); // Initialize the game
  });
</script>

</body>
</html>

