let changeButton = document.getElementById('createInputsButton');
const personalInfo = document.getElementById('personal-details');
const error = document.createElement('p');

document.addEventListener("DOMContentLoaded", async function() {
    if ("content" in document.createElement("template")) {
        fetch("/get_cart_history")
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            let resp = await response.json();
            const template = document.querySelector("#history-display");
            const list = document.querySelector("#documents");
            console.log(resp);
            for (let storyKey in resp) {
                const clone = template.content.cloneNode(true);
                let story = resp[storyKey];
                clone.querySelector(".document").id = "document"+Number(Number(storyKey)+1);
                clone.querySelector(".open-button").id = "open-button"+Number(Number(storyKey)+1);
                let doc_num = clone.querySelector(".num");
                doc_num.textContent = "КП #" + story['coNum'];
                let doc_name = clone.querySelector(".name");
                doc_name.textContent = story['name'].split(" ")[0];
                let doc_date = clone.querySelector(".date");
                doc_date.textContent = story['phone'];

                list.appendChild(clone);
            }
            
        })


        
    }
})


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

function saveCart(cart) {
    fetch("/post_cart", {
      method: "POST",
      body: JSON.stringify({"products": cart}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
}

function open_cart(id){
    let dbId = Number(id.slice(11));


    fetch(`/get_cart_history`)
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let resp = await response.json();
        let curCart=resp[dbId - 1];
        const myCart = new Cart();
        myCart.products = curCart['products'];
        myCart.coeff = curCart['coeff'];
        myCart.commonDeliveryDate = curCart['commonDeliveryDate'];
        myCart.name = curCart['name'];
        myCart.phone = curCart['phone'];
        myCart.email = curCart['email'];
        myCart.coNum = curCart['coNum'];
        myCart.deliveryCond = curCart['deliveryCond'];
        saveCart(myCart);
        alert("Корзина загружена");
        })
        
    }

