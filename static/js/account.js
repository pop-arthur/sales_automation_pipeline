let changeButton = document.getElementById('createInputsButton');
const personalInfo = document.getElementById('personal-details');
const error = document.createElement('p');

changeButton.addEventListener('click', function() {

    const input1 = document.createElement('input');
    input1.placeholder = "Введите новый пароль";
    input1.className = "change-password-input"

    const input2 = document.createElement('input');
    input2.placeholder = "Подтвердите новый пароль";
    input2.className = "change-password-input"

    const commitButton = document.createElement('button');
    commitButton.className = "change-password-button"
    commitButton.textContent = 'Submit';

    const resetButton = document.createElement('button');
    resetButton.className = "change-password-button"
    resetButton.textContent = 'Cancel';

    const container = document.getElementById('change-password-container');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = "buttons-container";
    buttonsContainer.id = 'buttons-container';

    if (container.getElementsByTagName('input').length === 0) {
        container.className = "change-password-container";
        container.appendChild(input1);
        container.appendChild(input2);

        buttonsContainer.appendChild(commitButton);
        buttonsContainer.appendChild(resetButton);

        container.appendChild(buttonsContainer);
    }

    resetButton.addEventListener('click', function() {
        container.remove();
        personalInfo.parentNode.removeChild(error);
    });

    commitButton.addEventListener('click', function() {
        const password1 = input1.value;
        const password2 = input2.value;

        if (password1 === password2 && password1 !== '') {
            console.log(password1);
            fetch(`/changeUserPassword`, {
                method: 'POST',
                body: JSON.stringify({"password" : password1}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(data => {
                    error.textContent = "Password was changed successfully";
                    personalInfo.appendChild(error);
                    container.remove()
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    alert('Failed to change password');
                });

        }
        else {
            error.textContent = "Different passwords";
            personalInfo.appendChild(error);
        }
    });
});
function sorry(){
    alert("Не реализовано(");
}
