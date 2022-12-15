// Get the input element, start button, stop button, and reset button
const refreshTimeInput = document.getElementById('refresh-time');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// Set the initial time remaining and refresh interval
let timeRemaining = refreshTimeInput.value;
let refreshInterval = null;

// Function to update the time remaining display
function updateTimeRemaining() {
  document.getElementById('time-remaining').innerText = timeRemaining;
}

// Function to refresh the current tab
function refreshTab() {
  // Get the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Refresh the tab
    chrome.tabs.reload(tabs[0].id);
    // Show a notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'favicon.ico',
      title: 'Tab refreshed',
      message: 'The current tab has been refreshed.'
    });
  });
}

// Function to start the auto refresh
function startAutoRefresh() {
  // Set the time remaining to the refresh time
  timeRemaining = refreshTimeInput.value;
  // Update the time remaining display
  updateTimeRemaining();
  // Enable the stop button and disable the start button
  startBtn.disabled = true;
  stopBtn.disabled = false;
// Set the refresh interval
refreshInterval = setInterval(function() {
// Decrement the time remaining
timeRemaining--;
// Update the time remaining display
updateTimeRemaining();
// If the time remaining is zero, refresh the tab
if (timeRemaining === 0) {
refreshTab();
}
}, 1000);
}

// Function to stop the auto refresh
function stopAutoRefresh() {
// Clear the refresh interval
clearInterval(refreshInterval);
// Enable the start button and disable the stop button
startBtn.disabled = false;
stopBtn.disabled = true;
}

// Function to reset the auto refresh
function resetAutoRefresh() {
// Stop the auto refresh
stopAutoRefresh();
// Set the time remaining to the refresh time
timeRemaining = refreshTimeInput.value;
// Update the time remaining display
updateTimeRemaining();
}

// Start the auto refresh when the start button is clicked
startBtn.addEventListener('click', startAutoRefresh);

// Stop the auto refresh when the stop button is clicked
stopBtn.addEventListener('click', stopAutoRefresh);

// Reset the auto refresh when the reset button is clicked
resetBtn.addEventListener('click', resetAutoRefresh);

