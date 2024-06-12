document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("search-input");
    input.value = "What would you like to find?";

    input.addEventListener("focus", function() {
        if (input.value === "What would you like to find?") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "What would you like to find?";
        }
    });
});

let container_for_search = [{ID: 1234, name: "Kirill", description: "HUI", price: "300$", amount: 3}];

let item_block = document.getElementById("items-block");

container_for_search.forEach(item => {
    let newItem = document.createElement('div');
    newItem.classList.add('item-shopping-cart');

    newItem.innerHTML = `
        <p>ID: ${item.ID} Name: ${item.name} 
        Description: ${item.description} Price: ${item.price} Amount: ${item.amount}</p>
    `;

    item_block.appendChild(newItem);
});

let container_for_cart = [{}]

let shopping_cart = document.getElementById("shopping-cart-items")

