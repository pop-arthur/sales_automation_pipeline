document.getElementById('loginForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;

    if (username === 'Username' || password === 'Password') {
        alert('Please fill in both fields');
        event.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const seePasswordButton = document.getElementById("seePasswordButton");
    seePasswordButton.src = "../static/styles/authorization/show.png";


    seePasswordButton.addEventListener("click", function () {
        const showSrc = "../static/styles/authorization/show.png";
        const hideSrc = "../static/styles/authorization/hide.png";
        const input = document.getElementById("password1");
        input.type = "text"

        if (seePasswordButton.src.endsWith("show.png")) {
            seePasswordButton.src = hideSrc;
            input.type = "text"
        } else {
            seePasswordButton.src = showSrc;
            input.type = "password"
        }
    });
});
