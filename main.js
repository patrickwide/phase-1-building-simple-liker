// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
const errorModal = document.querySelector("#modal");
const errorMessage = document.querySelector("#modal-message");

// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
errorModal.classList.add("hidden");

// When a user clicks on an empty heart:
document.addEventListener("click", (event) => {
  if (event.target.matches(".like-glyph")) {
    // Invoke mimicServerCall to simulate making a server request
    mimicServerCall()
      .then(() => {
        // When the "server" returns a success status:
        // Change the heart to a full heart
        event.target.textContent = FULL_HEART;
        // Add the .activated-heart class to make the heart appear red
        event.target.classList.add("activated-heart");
      })
      .catch((error) => {
        // When the "server" returns a failure status:
        // Display the error modal by removing the .hidden class
        errorModal.classList.remove("hidden");
        // Display the server error message in the modal
        errorMessage.textContent = error;
        // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });
  }
  // When a user clicks on a full heart:
  else if (event.target.matches(".activated-heart")) {
    // Change the heart back to an empty heart
    event.target.textContent = EMPTY_HEART;
    // Remove the .activated-heart class
    event.target.classList.remove("activated-heart");
  }
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
