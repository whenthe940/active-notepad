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

        // Mouse tracking functionality
        document.addEventListener('mousemove', function(e) {
            document.getElementById('mouse-tracker').style.left = `${e.pageX + 10}px`;
            document.getElementById('mouse-tracker').style.top = `${e.pageY + 10}px`;
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

        // Close the rename popup
        document.getElementById('rename-popup').style.display = 'none';
    }
});

function updateNameDisplay(name) {
    document.getElementById('mouse-tracker').textContent = name;
}

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

