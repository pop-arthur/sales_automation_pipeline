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
    const product = new Product(card);
    myCart.addProduct(product);
    localStorage.setItem("cart", JSON.stringify(myCart));
}
