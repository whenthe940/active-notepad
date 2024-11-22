// Initialize socket connection
const socket = io(); // Establish connection to the server

let currentName = "";  // To keep track of the current username
let oldName = "";      // To store the old name for "Formerly" functionality

document.getElementById('finish-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        // Set current name and hide name prompt
        currentName = username;
        document.getElementById('name-prompt').style.display = 'none';
        document.getElementById('notepad-container').style.display = 'block';

        // Set initial name next to mouse
        updateNameDisplay(currentName);

        // Emit the username to the server
        socket.emit('setName', currentName);

        // Mouse tracking functionality
        document.addEventListener('mousemove', function(e) {
            document.getElementById('mouse-tracker').style.left = `${e.pageX + 10}px`;
            document.getElementById('mouse-tracker').style.top = `${e.pageY + 10}px`;

            // Emit mouse move to server for other players to see
            socket.emit('mouseMove', { x: e.pageX, y: e.pageY });
        });

        // Show user list with pencil icon
        const userList = document.getElementById('user-list');
        userList.style.display = 'block';

        // Add pencil icon for renaming next to the user list
        const pencil = document.getElementById('pencil-icon');
        pencil.style.display = 'inline-block';
        pencil.addEventListener('click', openRenamePopup);
    }
});

function openRenamePopup() {
    // Show the rename popup
    document.getElementById('rename-popup').style.display = 'block';
}

document.getElementById('rename-btn').addEventListener('click', function() {
    const newName = document.getElementById('new-name').value;
    if (newName) {
        // Store the old name for "Formerly"
        oldName = currentName;

        // Update the name and display "Formerly"
        currentName = newName;
        updateNameDisplay(`${newName} (Formerly: ${oldName})`);

        // Emit the new name to the server
        socket.emit('setName', currentName);

        // Close the rename popup
        document.getElementById('rename-popup').style.display = 'none';
    }
});

function updateNameDisplay(name) {
    document.getElementById('mouse-tracker').textContent = name;
}

// Listening for mouse movements from other users
socket.on('mouseMove', function(data) {
    // Show other players' mouse movements (this could be more advanced with custom cursor rendering)
    console.log(`${data.id} moved to (${data.x}, ${data.y})`);
});

// Listening for updated user list from the server
socket.on('updateUserList', function(usernames) {
    const userListUl = document.getElementById('user-list-ul');
    userListUl.innerHTML = ''; // Clear the current user list
    usernames.forEach(username => {
        const li = document.createElement('li');
        li.textContent = username;
        userListUl.appendChild(li);
    });
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('rename-popup').style.display = 'none';
});

document.getElementById('dark-mode').addEventListener('click', function() {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode').style.display = 'none';
    document.getElementById('light-mode').style.display = 'inline-block';
});

document.getElementById('light-mode').addEventListener('click', function() {
    document.body.classList.remove('dark-mode');
    document.getElementById('light-mode').style.display = 'none';
    document.getElementById('dark-mode').style.display = 'inline-block';
});

