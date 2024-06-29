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
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;

    if (myCart.products.length === 0) {
        document.getElementById("clear-cart-button").style.display = "none";
        document.getElementById("no-items-in-cart").innerText = "Корзина пуста";
        document.getElementById("info-container").style.display = "none";
        document.getElementById("coeff-container").style.display = "none";

    } else {
        showCartItems("add-button");
    }

    function showCartItems() {
    document.getElementById("clear-cart-button").style.display = "block";
    
    if ("content" in document.createElement("template")) {
        const template = document.querySelector("#product_row");
        const list = document.querySelector("#product-list");
        let sum = 0;
        for (let productKey in myCart.products) {
            let product = myCart.products[productKey];
            const clone = template.content.cloneNode(true);
            clone.querySelector(".item").id = "item"+product.id.split(" ")[1];
            clone.querySelector(".item-img").src = product.imageSrc;
            let item_name = clone.querySelector(".item-name");
            item_name.textContent = product.name;
            let item_id = clone.querySelector(".item-id");
            item_id.textContent = product.id;
            let item_price = clone.querySelector(".item-price");
            item_price.textContent = product.price;
            let item_quantity = clone.querySelector(".item-quantity");
            item_quantity.textContent = product.quantity;

            sum+=product.price.split(" ")[1]*product.amount;
            let totPrice = Number(product.price.split(" ")[1]) * product.amount  ;
            clone.querySelector(".butt").querySelector("#remove-one").style.display = "flex";
            clone.querySelector(".butt").querySelector(".quantity-form").style.display = "flex";
            clone.querySelector(".butt").querySelector(".quantity-form").id = "quantity-form"+product.id.split(" ")[1];
            clone.querySelector(".butt").querySelector(".item-price-total-wrapper").querySelector(".item-price-total").id = "item-total-price"+product.id.split(" ")[1];
            clone.querySelector(".butt").querySelector("#add-more").style.display = "flex";
            clone.querySelector(".butt").querySelector("#remove-one").onclick = function removeHandler(){
                Remove(product.id);
            };
            clone.querySelector(".butt").querySelector("#add-more").onclick = function addHandler(){
                Add(product.id);
            };
            clone.querySelector(".butt").querySelector("#quantity-form"+product.id.split(" ")[1]).oninput = function changeHandler(){
                change(product.id);
            };
            clone.querySelector(".butt").querySelector("#quantity-form"+product.id.split(" ")[1]).value = product.amount;
            clone.querySelector(".item-divider").id = "divider"+product.id.split(" ")[1];
            clone.querySelector(".butt").querySelector(".item-price-total-wrapper").querySelector(".item-price-total").textContent = totPrice;
            list.appendChild(clone);


            
        }
        document.getElementById("coeff-button").value = myCart.coeff;
        console.log()
        let coeff = Number(document.getElementById("coeff-button").value);
        console.log(myCart.coeff);
        myCart.totalSum=sum;
        saveCart(myCart);
        document.getElementById("total-amount").innerText=sum*coeff;
    }
}
})


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


// function to remove item from html display
function removeItem(closest, id) {
    const myCart = new Cart();

    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.coeff = savedCart.coeff;
    myCart.totalSum = savedCart.totalSum;
    myCart.removeProductById("ID: " + id);
    const item = document.getElementById('item'+id);
    const item2 = closest.closest('.butt');
    const itemDivider = document.getElementById('divider'+id);
    item.remove();
    item2.remove();
    itemDivider.remove();
    updateTotal();
    saveCart(cart);
    if (myCart.products.length === 0) {
        document.getElementById("clear-cart-button").style.display = "none";
        document.getElementById("no-items-in-cart").innerText = "Корзина пуста"
        document.getElementById("info-container").style.display = "none";

    }
}


// function to decrease amount of item in cart
function Remove(id){
    id = id.split(" ")[1];
    const myCart = new Cart();

    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;

    let inp = document.getElementById("quantity-form"+id);
    if (inp.value <= 1){
        inp.value = 0;
        myCart.totalSum-=Number(myCart.get_product(id).price.split(" ")[1]);
        myCart.removeProductById("ID: " + id);
        localStorage.setItem("cart", JSON.stringify(myCart));
    
        removeItem(inp, id);

    }
    else{
        myCart.totalSum-=Number(myCart.get_product(id).price.split(" ")[1]);
        let totPrice = Number(myCart.get_product(id).price.split(" ")[1]) * (myCart.get_product(id).amount-1);
        inp.value--;
        myCart.get_product(id).amount = inp.value;
        document.getElementById("item-total-price"+id).innerText=totPrice;

    }
    saveCart(myCart);
    document.getElementById("total-amount").innerText=myCart.totalSum;
}


// function to increase amount of item in cart
function Add(id){
    id = id.split(" ")[1];
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;

    let inp = document.getElementById("quantity-form"+id);
    if (Number(inp.value)+1 > Number(myCart.get_product(id).quantity.split(" ")[3])) {
        alert("Введенное количество превышает наличие");
        return;
    }
    inp.value++;
    myCart.get_product(id).amount = inp.value;
    let totPrice = Number(myCart.get_product(id).price.split(" ")[1]) * myCart.get_product(id).amount;
    myCart.totalSum+=Number(myCart.get_product(id).price.split(" ")[1]);
    saveCart(myCart);

    document.getElementById("total-amount").innerText=myCart.totalSum;
    console.log(id);
    document.getElementById("item-total-price"+id).innerText=totPrice;

}


function clearCart(){
    const myCart = new Cart();
    saveCart(myCart);
    location.reload();
}


// function to update total amount field
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


// function to control changes of input field of each item
function change(id){
    id = id.split(" ")[1];
    const myCart = new Cart();
    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    let inp = document.getElementById("quantity-form"+id);
    if (inp.value != myCart.get_product(id).amount){
        myCart.get_product(id).amount = inp.value;
        saveCart(myCart);
    }
    let totPrice = Number(myCart.get_product(id).price.split(" ")[1]) * (myCart.get_product(id).amount);

    let numFloat = parseFloat(inp.value);

    if (inp.value<=0 && !isNaN(number)){
        removeItem(inp, id);

    }
    let sum = 0;
    for (let productKey in myCart.products){
        let product = myCart.products[productKey];
        sum+=Number(product.price.split(" ")[1])*product.amount;
    }
    myCart.totalSum = sum;
    saveCart(myCart);

    document.getElementById("total-amount").innerText=myCart.totalSum;
    document.getElementById("item-total-price"+id).innerText=totPrice;

}

function changeCoeff(){
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const myCart = new Cart();
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    let coeff = document.getElementById("coeff-button").value;
    myCart.coeff=coeff;
    let sum = myCart.totalSum;
    document.getElementById("total-amount").innerText=Math.round(sum*coeff*100)/100;
    saveCart(myCart);
}