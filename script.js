let correctPhoneNumber = "08033397359"; // Predefined phone number
let correctPassword = ""; // Variable to store password set by the master user
let isMasterUserSet = false; // Flag to check if master user has set the password

// Function to check if phone number is already saved in session
function checkIfPhoneNumberExists() {
    fetch('server/checkPhoneNumber.php')
        .then(response => response.json())
        .then(data => {
            if (data.phoneNumber) {
                // If phone number exists, show the password form
                document.getElementById('phone-password-form').style.display = "none";
                checkIfPasswordExists(); // Check if master password is set
            } else {
                // If no phone number is saved, prompt the user for one
                document.getElementById('phone-password-form').style.display = "block";
                document.getElementById('password-form').style.display = "none";
            }
        });
}

// Function to check if the master password is set in session
function checkIfPasswordExists() {
    fetch('server/checkPassword.php')
        .then(response => response.json())
        .then(data => {
            if (data.passwordSet) {
                // If the password is set, show the password form
                document.getElementById('password-form').style.display = "block";
            } else {
                // If the password is not set, allow the user to set it
                document.getElementById('password-form').style.display = "none";
                document.getElementById('password-instruction').innerText = "You are the first user. Please set the password.";
            }
        });
}

// Call checkIfPhoneNumberExists when the page loads
window.onload = checkIfPhoneNumberExists;

function verifyPhoneNumber() {
    const phoneNumber = document.getElementById('phone-number').value;
    if (phoneNumber === correctPhoneNumber) {
        // Store phone number in session
        fetch('server/savePhoneNumber.php', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            document.getElementById('phone-password-form').style.display = "none";
            checkIfPasswordExists(); // After phone number, check password
        });
    } else {
        showErrorMessage("Phone number doesn't match the required number.");
    }
}

function submitPassword() {
    const password = document.getElementById('password').value;

    // Check if the master password is already set
    fetch('server/checkPassword.php')
        .then(response => response.json())
        .then(data => {
            if (data.passwordSet) {
                if (password === data.password) {
                    showSuccessMessage("Welcome! You are now logged in.");
                } else {
                    showErrorMessage("Incorrect password. Please try again.");
                }
            } else {
                // If the password is not set, set the master password
                fetch('server/savePassword.php', {
                    method: 'POST',
                    body: JSON.stringify({ password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    showSuccessMessage("Password set successfully. You are now the master user!");
                    document.getElementById('password-form').style.display = "none";
                });
            }
        });
}

function showErrorMessage(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.innerText = message;
    errorElement.style.display = "block";
    document.getElementById('success-message').style.display = "none";
}

function showSuccessMessage(message) {
    const successElement = document.getElementById('success-message');
    successElement.innerText = message;
    successElement.style.display = "block";
    document.getElementById('error-message').style.display = "none";
}
