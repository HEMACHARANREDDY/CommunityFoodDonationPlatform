const donationForm = document.getElementById("donationForm");
const donationList = document.getElementById("donationList");

let donations = JSON.parse(localStorage.getItem("donations"))  [];

if (donationForm) {
    donationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile").value; // Get mobile number
        const foodDetails = document.getElementById("foodDetails").value;
        const expiryDate = document.getElementById("expiryDate").value; 
        const location = document.getElementById("location").value;

        const donation = {
            name,
            email,
            mobile,  
            foodDetails,
            location,
            expiryDate,
        };

        donations.push(donation);

        localStorage.setItem("donations", JSON.stringify(donations));

        donationForm.reset();

        window.location.href = "donations.html";
    });
}

if (donationList) {
    updateDonationList();
}

function updateDonationList() {
    donationList.innerHTML = "";

    donations.forEach((donation, index) => {
        const donationItem = document.createElement("div");
        donationItem.classList.add("donation-item");
        const isExpired = new Date(donation.expiryDate) < new Date();
        donationItem.innerHTML = `
            <h3>Donor: ${donation.name}</h3>
            <p>Email: ${donation.email}</p>
            <p>Mobile: ${donation.mobile}</p> <!-- Display mobile number -->
            <p>Food Details: ${donation.foodDetails}</p>
            <p>Location: <a href="https://www.google.com/maps/search/${encodeURIComponent(donation.location)}" target="_blank">${donation.location}</a></p>
            <p>Expiry Date: ${donation.expiryDate}</p>
            <p class="${isExpired ? 'expired' : ''}">${isExpired ? 'Expired' : ''}</p> <!-- Show 'Expired' text if donation is expired -->
            <button onclick="receiveFood(this)">Receive Food</button>
            <button onclick="deleteDonation(${index})">Remove</button>
        `;
        donationList.appendChild(donationItem);
    });
}

// Function to handle "Receive Food" button click without the popup
function receiveFood(button) {
    // Change the button text and background color
    button.innerText = "Food Received";
    button.style.backgroundColor = "#4CAF50"; // Green color

    // Optionally, disable the button to prevent further clicks
    button.disabled = true;
}

function deleteDonation(index) {
    donations.splice(index, 1);
    localStorage.setItem("donations", JSON.stringify(donations));
    updateDonationList();
}

// Grab the request form and the request list container
const requestFoodForm = document.getElementById("requestFoodForm");
const foodRequestList = document.getElementById("foodRequestList");

// Get existing food requests from localStorage or initialize as an empty array
let foodRequests = JSON.parse(localStorage.getItem("foodRequests"))  [];

// Add event listener for the food request form submission (Need_Food.html)
if (requestFoodForm) {
    requestFoodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get values from the form
        const requestorName = document.getElementById("requestorName").value;
        const requestorMobile = document.getElementById("requestorMobile").value;
        const requestorLocation = document.getElementById("requestorLocation").value;

        // Create a food request object
        const foodRequest = {
            requestorName,
            requestorMobile,
            requestorLocation
        };

        // Push the new food request into the foodRequests array
        foodRequests.push(foodRequest);

        // Save the updated food requests array to localStorage
        localStorage.setItem("foodRequests", JSON.stringify(foodRequests));

        // Reset the form
        requestFoodForm.reset();
        // Redirect to the "Food Request" page after submission
        window.location.href = "Food_Request.html";  // Make sure this path is correct
    });
}

// If foodRequestList exists, update it on page load (Food_Request.html)
if (foodRequestList) {
    updateFoodRequestList();
}

// Function to update the food request list on the "Food_Request.html" page
function updateFoodRequestList() {
    // Clear the food request list before adding new ones
    foodRequestList.innerHTML = "";

    foodRequests.forEach((foodRequest, index) => {
        const requestItem = document.createElement("div");
        requestItem.classList.add("food-request-item");

        requestItem.innerHTML = `
            <h3>Requestor: ${foodRequest.requestorName}</h3>
            <p>Mobile: ${foodRequest.requestorMobile}</p>
            <p>Location: <a href="https://www.google.com/maps/search/${encodeURIComponent(foodRequest.requestorLocation)}" target="_blank">${foodRequest.requestorLocation}</a></p>
            <button onclick="acceptRequest(${index})">Accept Request</button>
            <button onclick="deleteFoodRequest(${index})">Remove</button>
        `;
        foodRequestList.appendChild(requestItem);
    });
}

// Function to handle "Accept Request" button click
function acceptRequest(index) {
    const request = foodRequests[index];

    // You can implement your logic here for accepting a food request
    alert(`Request from ${request.requestorName} has been accepted!`);

    // Optionally, disable the button to prevent further clicks
    document.querySelectorAll("button")[index].disabled = true;
}

// Function to delete a food request
function deleteFoodRequest(index) {
    // Remove the food request from the foodRequests array
    foodRequests.splice(index, 1);

    // Save the updated food requests array back to localStorage
    localStorage.setItem("foodRequests", JSON.stringify(foodRequests));

    // Update the food request list on the page
    updateFoodRequestList();
}