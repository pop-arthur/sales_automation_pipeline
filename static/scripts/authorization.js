document.getElementById('loginForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;

    if (username === 'Username' || password === 'Password') {
        alert('Please fill in both fields');
        event.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("username1");
    input.value = "Username";

    input.addEventListener("focus", function() {
        if (input.value === "Username") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Username";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("password1");
    input.value = "Password";
    input.type = "text"

    input.addEventListener("focus", function() {
        if (input.value === "Password") {
            input.type = "password"
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.type = "text"
            input.value = "Password";
        }
    });
});
