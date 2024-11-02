// Dummy data to simulate real-time poll data and results
let pollData = {
    question: "What is your favorite programming language?",
    options: [
      { option: "JavaScript", votes: 50 },
      { option: "Python", votes: 30 },
      { option: "Java", votes: 15 },
      { option: "C++", votes: 5 }
    ],
    totalVotes: 100
  };
  
  // Function to dynamically update poll results and chart
  function updateResults() {
    const canvas = document.getElementById('resultsChart');
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }
    const ctx = canvas.getContext('2d');
    
    // Destroy previous chart instance if it exists
    if (window.myChart) {
      window.myChart.destroy();
    }
    
    // Prepare data for chart
    const labels = pollData.options.map(option => option.option);
    const data = pollData.options.map(option => option.votes);
  
    // Create the chart using Chart.js
    window.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0']
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  
  // Function to handle vote submission
  function submitVote(event) {
    event.preventDefault();
    
    // Get selected option
    const selectedOption = document.querySelector('input[name="vote"]:checked');
    if (!selectedOption) {
      alert('Please select an option to vote!');
      return;
    }
    
    // Simulate vote count update
    const selectedOptionValue = selectedOption.value;
    pollData.options.forEach(option => {
      if (option.option === selectedOptionValue) {
        option.votes += 1;
        pollData.totalVotes += 1;
      }
    });
    
    // Update the poll results
    updateResults();
    alert('Thank you for voting!');
  }
  
  // Event listener for voting form submission
  document.querySelector('.vote-btn').addEventListener('click', submitVote);
  
  // Poll Creation Functionality
  document.querySelector('.create-poll-btn').addEventListener('click', function (e) {
    e.preventDefault();
    const pollQuestion = document.querySelector('input[placeholder="Poll Question"]').value;
    const pollOptions = [...document.querySelectorAll('.poll-options input')].map(option => option.value);
    
    if (!pollQuestion || pollOptions.length < 2) {
      alert('Please enter a valid poll question and at least two options.');
      return;
    }
    
    alert(`Poll created successfully with question: "${pollQuestion}"`);
    
    // Clear the form fields after submission
    document.querySelector('form').reset();
  });
  
  // Notifications
  function sendNotification(message) {
    const notificationSection = document.querySelector('.notifications-section');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<p>${message}</p>`;
    notificationSection.appendChild(notification);
  }
  
  // Simulate new poll notifications
  setTimeout(() => {
    sendNotification('You have a new poll to participate in!');
  }, 5000);
  
  setTimeout(() => {
    sendNotification('Reminder: Vote in the poll "Favorite Programming Language" before it closes!');
  }, 10000);
  
  // Call the updateResults function on page load to show the initial results
  window.onload = updateResults;
  