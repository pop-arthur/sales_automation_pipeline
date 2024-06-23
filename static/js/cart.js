document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("FIO");
    input.value = "ФИО";
    input.addEventListener("focus", function () {
        if (input.value === "ФИО") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function () {
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

document.addEventListener("DOMContentLoaded", function() {
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;

    if (myCart.products.length === 0) {
        document.getElementById("clear-cart-button").style.display = "none";
        document.getElementById("no-items-in-cart").innerText = "Корзина пуста"
    } else {
        showCartItems("add-button");
    }

    function showCartItems() {
    document.getElementById("clear-cart-button").style.display = "block";

    if ("content" in document.createElement("template")) {
        const template = document.querySelector("#product_row");
        const list = document.querySelector("#product-list");
        console.log(myCart.products);
        for (let productKey in myCart.products) {
            let product = myCart.products[productKey];
            const clone = template.content.cloneNode(true);
            clone.querySelector(".item").id = "item"+product.id;
            clone.querySelector(".item-img").src = product.imageSrc;
            let item_name = clone.querySelector(".item-name");
            item_name.textContent = product.name;
            let item_id = clone.querySelector(".item-id");
            item_id.textContent = product.id;
            let item_price = clone.querySelector(".item-price");
            item_price.textContent = product.price;
            let item_quantity = clone.querySelector(".item-quantity");
            item_quantity.textContent = product.quantity;
            clone.querySelector(".butt").querySelector("#remove-one").style.display = "flex";
            clone.querySelector(".butt").querySelector(".quantity-form").style.display = "flex";
            clone.querySelector(".butt").querySelector(".quantity-form").id = "quantity-form"+product.id.split(" ")[1];
            console.log(clone.querySelector(".butt").querySelector(".quantity-form").id);
            clone.querySelector(".butt").querySelector("#add-more").style.display = "flex";
            clone.querySelector(".butt").querySelector("#remove-one").onclick = function removeHandler(){
                Remove(product.id);
            };
            clone.querySelector(".butt").querySelector("#add-more").onclick = function addHandler(){
                Add(product.id);
            };
            clone.querySelector(".butt").querySelector("#quantity-form"+product.id.split(" ")[1]).value = product.amount;
            list.appendChild(clone);
        }
    }
}
})


// function removeItem() {
//     const item = button.closest('.cart-item');
//     item.remove();
//     updateTotal();
// }


function Remove(id){
    id = id.split(" ")[1];
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    let inp = document.getElementById("quantity-form"+id);
    console.log(inp);
    if (inp.value <= 1){
        inp.value = 0;
        myCart.removeProductById("ID: " + id);
        localStorage.setItem("cart", JSON.stringify(myCart));
    }
    else{
        inp.value--;
        myCart.get_product(id).amount = inp.value;
    }
    localStorage.setItem("cart", JSON.stringify(myCart));
}


function Add(id){
    id = id.split(" ")[1];
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    console.log("INP: " + "quantity-form"+id);
    let inp = document.getElementById("quantity-form"+id);
    inp.value++;
    myCart.get_product(id).amount = inp.value;
    localStorage.setItem("cart", JSON.stringify(myCart));
}


function generateTxtFile() {
        // Relative URL to redirect to
        const relativeURL = '/formPDF'; // Change this to your desired relative path

        // Construct absolute URL based on the current location
        const absoluteURL = new URL(relativeURL, window.location.href);

        // Log the absolute URL (optional)
        console.log('Redirecting to:', absoluteURL.href);

        // Redirect to the absolute URL
        window.location.href = absoluteURL.href;
}


function clearCart(){
    const myCart = new Cart();
    localStorage.setItem("cart", JSON.stringify(myCart));
    location.reload();
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