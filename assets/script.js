$(function () {
  // Listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Get the corresponding time-block's id
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Save the user input in local storage using the id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future class to each time block
  function updateClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Get user input from localStorage and set textarea values
  function loadUserInput() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var userInput = localStorage.getItem(timeBlockId);

      if (userInput) {
        $(this).find(".description").val(userInput);
      }
    });
  }

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));

  // Initial function calls
  updateClasses();
  loadUserInput();

  // Update classes and user input every minute
  setInterval(function () {
    updateClasses();
    loadUserInput();
  }, 60000); // 60000 milliseconds = 1 minute
});
