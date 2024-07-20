document.addEventListener("DOMContentLoaded", function() {
    checkCart();

    const input = document.getElementById("search-bar");
    input.value = "Search";

    input.addEventListener("focus", function() {
        if (input.value === "Search") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Search";
        }
    });
});

function refreshCart() {
    fetch("/load_from_api", {
        method: "GET",
    });
}



// check if some items in products are already in cart. If so, display their amount
function checkCart(){
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.products.forEach(async (product) => {
        document.getElementById("add-to-cart-btn"+product.id.split(" ")[1]).style.display = "none";
        document.getElementById("remove-one"+product.id.split(" ")[1]).style.display = "flex";
        document.getElementById("add-more"+product.id.split(" ")[1]).style.display = "flex";
        document.getElementById("quantity-form"+product.id.split(" ")[1]).style.display = "flex";
        document.getElementById("quantity-form"+product.id.split(" ")[1]).value = product.amount;
      });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("/get_cart")
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            let resp = await response.json();
            const cart = new Cart();
            cart.products = resp.products;
            localStorage.setItem("cart", JSON.stringify(cart));
        })
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


// function to add item to cart for first time
function addItem (id){
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const card = document.querySelector("#item" + id);
    if (document.getElementById("quantity-form"+id).value > card.querySelector(".item-quantity").textContent.split(" ")[3]) {
        alert("u nas nihuya net");
        return;
    }
    const product = new Product(card, 1);
    document.getElementById("quantity-form"+id).value = 1;

    if(myCart.get_product(id)==null){
        myCart.addProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        document.getElementById("add-to-cart-btn"+id).style.display="none";
        document.getElementById("add-more"+id).style.display="flex";
        document.getElementById("quantity-form"+id).style.display="flex";
        document.getElementById("remove-one"+id).style.display="flex";
    }
    else{
        document.getElementById("add-to-cart-btn"+id).style.display="none";
        document.getElementById("add-more"+id).style.display="flex";
        document.getElementById("quantity-form"+id).style.display="flex";
        document.getElementById("remove-one"+id).style.display="flex";
        document.getElementById("quantity-form"+id).value=myCart.get_product(id).amount;
    }
    saveCart(myCart);
}


// function to increase amount of item in cart
function addMore(id){
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      saveCart(myCart);
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    let inp = document.getElementById("quantity-form"+id);
    if (Number(inp.value)+1 > Number(myCart.get_product(id).quantity.split(" ")[3])) {
        alert("u nas nihuya net");
        return;
    }

    inp.value++;
    myCart.get_product(id).amount = inp.value;
    saveCart(myCart);
    
}


// function to decrease amount of item in cart
function Remove (id){
    // alert("Не трогай эту кнопку! Она не работает!");
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      saveCart(myCart);
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const card = document.querySelector("#item" + id);
    let inp = document.getElementById("quantity-form"+id);
    if (inp.value <= 1){
        inp.value = 0;
        myCart.removeProductById("ID: " + id);
        saveCart(myCart);
        document.getElementById("add-to-cart-btn"+id).style.display="flex";
        document.getElementById("add-more"+id).style.display="none";
        document.getElementById("quantity-form"+id).style.display="none";
        document.getElementById("remove-one"+id).style.display="none";
    }
    else{
        inp.value--;
        myCart.get_product(id).amount = inp.value;
    }
    saveCart(myCart);
    
}


// function to control change of input field of amount for each item
function change(id){
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    let inp = document.getElementById("quantity-form"+id);
    if (inp.value != myCart.get_product(id).amount){
        myCart.get_product(id).amount = inp.value;
        localStorage.setItem("cart", JSON.stringify(myCart));
    }
    let numFloat = parseFloat(inp.value);

    if (inp.value<=0 && !isNaN(number)){
        myCart.removeProductById("ID: " + id);
        localStorage.setItem("cart", JSON.stringify(myCart));
        document.getElementById("add-to-cart-btn"+id).style.display="flex";
        document.getElementById("add-more"+id).style.display="none";
        document.getElementById("quantity-form"+id).style.display="none";
        document.getElementById("remove-one"+id).style.display="none";
        localStorage.setItem("cart", JSON.stringify(myCart));
    }
}