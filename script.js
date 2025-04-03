// Verify the master password
function verifyMasterPassword() {
    const password = document.getElementById('master-password').value;

    fetch('https://your-render-url/api/auth/verify-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Master password verified') {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('main-page').style.display = 'block';
        } else {
            document.getElementById('error-message').textContent = 'Incorrect password. Please try again.';
        }
    });
}

// Add user form toggle
function showAddUserForm() {
    document.getElementById('add-user-form').style.display = 'block';
}

// Add a new user
function addNewUser() {
    const userName = document.getElementById('user-name').value;
    const userPassword = document.getElementById('user-password').value;

    fetch('https://your-render-url/api/auth/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password: userPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User added successfully') {
            const userList = document.getElementById('user-list');
            const userButton = document.createElement('button');
            userButton.textContent = userName;
            userButton.onclick = function() {
                promptForUserPassword(userName);
            };
            userList.appendChild(userButton);
            document.getElementById('user-name').value = '';
            document.getElementById('user-password').value = '';
        } else {
            document.getElementById('user-error-message').textContent = 'Error adding user. Please try again.';
        }
    });
}

// Verify user password and grant access
function promptForUserPassword(userName) {
    const password = prompt(`Enter password for ${userName}`);
    
    fetch('https://your-render-url/api/auth/verify-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Password verified, access granted') {
            alert(`Welcome ${userName}`);
            showUserForm(userName);
        } else {
            alert('Incorrect password.');
        }
    });
}

// Show user-specific form (name, phone, etc.)
function showUserForm(userName) {
    const userForm = document.createElement('form');
    userForm.innerHTML = `
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Phone Number" />
        <input type="text" placeholder="Gender" />
        <input type="text" placeholder="Address (Optional)" />
        <button type="submit">Submit</button>
    `;
    document.body.appendChild(userForm);
}
