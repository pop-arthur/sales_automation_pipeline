document.addEventListener("DOMContentLoaded", function() {
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



function addItem (id){
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const card = document.querySelector("#item" + id);
    const product = new Product(card, 1);
    console.log(myCart.get_product(id));
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
    console.log(myCart.products);
    
}


function addMore(id){
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    let inp = document.getElementById("quantity-form"+id);
    inp.value++;
    myCart.get_product(id).amount = inp.value;
    localStorage.setItem("cart", JSON.stringify(myCart));
    
}


function Remove (id){
    // alert("Не трогай эту кнопку! Она не работает!");
    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const card = document.querySelector("#item" + id);
    let inp = document.getElementById("quantity-form"+id);
    if (inp.value <= 1){
        inp.value = 0;
        myCart.removeProductById("ID: " + id);
        localStorage.setItem("cart", JSON.stringify(myCart));
        document.getElementById("add-to-cart-btn"+id).style.display="flex";
        document.getElementById("add-more"+id).style.display="none";
        document.getElementById("quantity-form"+id).style.display="none";
        document.getElementById("remove-one"+id).style.display="none";
    }
    else{
        inp.value--;
        myCart.get_product(id).amount = inp.value;
    }
    localStorage.setItem("cart", JSON.stringify(myCart));
    
}

// function addOneItem (id) {
//     const savedCart = JSON.parse(localStorage.getItem("cart"));
//     myCart.products = savedCart.products;
//     const card = document.querySelector("#item" + id);
//     const product = new Product(card);
//     localStorage.setItem("cart", JSON.stringify(myCart));
//     const curQty = document.querySelector

// }

// function removeOneItem (id) {

// }

