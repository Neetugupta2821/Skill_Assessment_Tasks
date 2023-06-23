// 4. JavaScript DOM Manipulation
function addItem() {
    // Get the input value
    var newItem = document.getElementById("newItemInput").value;
  
    // Create a new list item element
    var li = document.createElement("li");
    li.innerText = newItem;
  
    // Create a delete button for the list item
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
      li.remove();
    });
  
    // Append the delete button to the list item
    li.appendChild(deleteButton);
  
    // Append the list item to the item list
    var itemList = document.getElementById("itemList");
    itemList.appendChild(li);
  
    // Clear the input field
    document.getElementById("newItemInput").value = "";
  }
  
//   6. AJAX and API Integration
const form = document.getElementById("cityForm");
const cityInput = document.getElementById("cityInput");
const loadingIndicator = document.getElementById("loadingIndicator");
const weatherData = document.getElementById("weatherData");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityName = cityInput.value;
  if (cityName === "") {
    showError("Please enter a city name");
    return;
  }
  getWeather(cityName);
});

function getWeather(cityName) {
  loadingIndicator.style.display = "block";
  weatherData.style.display = "none";

  // Replace 'API_KEY' with your actual API key from OpenWeatherMap
  const apiKey = "API_KEY";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      return response.json();
    })
    .then(function (data) {
      displayWeather(data);
    })
    .catch(function (error) {
      showError(error.message);
    })
    .finally(function () {
      loadingIndicator.style.display = "none";
      weatherData.style.display = "block";
    });
}

function displayWeather(data) {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp - 273.15);
  const weatherDescription = data.weather[0].description;

  weatherData.innerHTML = `<strong>${cityName}</strong>: ${temperature}°C, ${weatherDescription}`;
}

function showError(errorMessage) {
  weatherData.innerHTML = `<div class="error">${errorMessage}</div>`;
}
// 7. Form Validation
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // Validate name
  if (name === "") {
    nameError.textContent = "Name is required";
  }

  // Validate email
  if (email === "") {
    emailError.textContent = "Email is required";
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Invalid email format";
  }

  // Validate message
  if (message === "") {
    messageError.textContent = "Message is required";
  } else if (message.length < 10) {
    messageError.textContent = "Message should be at least 10 characters long";
  } else if (message.length > 100) {
    messageError.textContent = "Message should not exceed 100 characters";
  }

  // Submit the form if there are no errors
  if (nameError.textContent === "" && emailError.textContent === "" && messageError.textContent === "") {
    // Perform further actions here, such as sending the form data to a server
    alert("Form submitted successfully");
    contactForm.reset();
  }
});

function isValidEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}


 

