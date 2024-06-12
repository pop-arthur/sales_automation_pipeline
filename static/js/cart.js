document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("FIO");
    input.value = "ФИО";
    input.addEventListener("focus", function() {
        if (input.value === "ФИО") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "ФИО";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("phone");
    input.value = "Телефон";
    input.addEventListener("focus", function() {
        if (input.value === "Телефон") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Телефон";
        }
    });
});
function removeItem() {
    const item = button.closest('.cart-item');
    item.remove();
    updateTotal();
}


document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("email");
    input.value = "E-mail";
    input.addEventListener("focus", function() {
        if (input.value === "E-mail") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "E-mail";
        }
    });
});

function generateTxtFile() {
    const fullName = document.querySelector('.full-name').textContent.trim();
    const phoneNumber = document.querySelector('.phone-number').textContent.trim();
    const email = document.querySelector('.email').textContent.trim();
    const content = `Full Name: ${fullName}\nPhone Number: ${phoneNumber}\nEmail: ${email}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'contact-info.txt';
    a.click();
}



function setQuantity(button) {
    const quantityElement = button.closest('.cart-item').querySelector('.item-quantity');
    const newQuantity = prompt('Enter new quantity:', quantityElement.textContent.replace('Quantity: ', ''));
    if (newQuantity !== null) {
        quantityElement.textContent = `: ${newQuantity}`;
        updateTotal();
    }
}

function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
    items.forEach(item => {
        const quantity = parseInt(item.querySelector('.item-quantity').textContent.replace('Quantity: ', ''), 10);
        const price = parseInt(item.querySelector('.item-price').textContent.replace('Price: ', '').replace(' rub', ''), 10);
        total += quantity * price;
    });
    document.getElementById('total-amount').textContent = `${total} rub`;
}

function editField(element) {
    const newValue = prompt('Enter new value:', element.textContent);
    if (newValue !== null) {
        element.textContent = newValue;
    }
}