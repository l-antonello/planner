$("#currentDay").text(dayjs().format("dddd, MMMM D"));

// Check the time and update the colors of the time blocks
function updateHourBlocks() {
  $(".description").each(function() {
    var hour = parseInt($(this).attr("hour"));
    if (dayjs().hour() > hour) {
      $(this).addClass("past");
    } else if (dayjs().hour() === hour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}
// Get the current hour of the day
var currentHour = moment().hours();

// Loop through each timeblock
$(".time-block").each(function() {
  // Get the hour value from the hour attribute
  var blockHour = parseInt($(this).attr("hour"));

  // Compare the current hour to the timeblock hour
  if (blockHour < currentHour) {
    // If the timeblock is in the past, add the "past" class
    $(this).addClass("past");
  } else if (blockHour === currentHour) {
    // If the timeblock is in the present, add the "present" class
    $(this).addClass("present");
  } else {
    // If the timeblock is in the future, add the "future" class
    $(this).addClass("future");
  }
});

updateHourBlocks(); // Call the function on page load

// Update the colors every minute
setInterval(updateHourBlocks, 60000);

// Save the event to localStorage when the button is clicked
$(".saveBtn").click(function() {
  var hour = $(this).siblings(".hour").text().trim();
  var description = $(this).siblings(".description").val().trim();
  localStorage.setItem(hour, description);
});

// Load the events from localStorage on page load
$(".description").each(function() {
  var hour = $(this).siblings(".hour").text().trim();
  var description = localStorage.getItem(hour);
  if (description) {
    $(this).val(description);
  }
});

function updateTime() {
  // Create a new Date object
  var now = new Date();

  // Get the current time as a string
  var timeString = now.toLocaleTimeString();

  // Update the clock element with the current time
  document.getElementById("clock").innerHTML = timeString;
}

// Call updateTime() every second to update the clock
setInterval(updateTime, 1000);

