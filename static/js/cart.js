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
    const input = document.getElementById("co-num");
    input.value = "Номер КП";
    input.addEventListener("focus", function() {
        if (input.value === "Номер КП") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Номер КП";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("delivery-date");
    input.value = "Срок поставки";
    input.addEventListener("focus", function() {
        if (input.value === "Срок поставки") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Срок поставки";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("delivery-cond");
    input.value = "Условие поставки";
    input.addEventListener("focus", function() {
        if (input.value === "Условие поставки") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Условие поставки";
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
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;


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
            let item_sku = clone.querySelector(".item-sku");
            item_sku.textContent = product.sku;
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
            clone.querySelector(".price-button").id = "price-button"+product.id.split(" ")[1];
            clone.querySelector(".quantity-button").id = "quantity-button"+product.id.split(" ")[1];
            clone.querySelector(".delivery-date-button").id = "delivery-date-button"+product.id.split(" ")[1];
            clone.querySelector(".item-price").id = "item-price"+product.id.split(" ")[1];
            clone.querySelector(".quantity-measure-button").id = "quantity-measure-button"+product.id.split(" ")[1];
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
            clone.querySelector("#price-button"+product.id.split(" ")[1]).oninput = function changePriceHandler(){
                changePrice(product.id);
            };
            clone.querySelector("#delivery-date-button"+product.id.split(" ")[1]).oninput = function changeDeliveryDateHandler(){
                changeDeliveryDate(product.id);
            };
            clone.querySelector("#quantity-button"+product.id.split(" ")[1]).oninput = function changeQuantityInStockHandler(){
                changeQuantityInStock(product.id);
            };
            clone.querySelector("#quantity-measure-button"+product.id.split(" ")[1]).oninput = function changeQuantityMeasureHandler(){
                changeQuantityMeasure(product.id);
            };

        
            clone.querySelector(".butt").querySelector("#quantity-form"+product.id.split(" ")[1]).value = product.amount;
            clone.querySelector(".item-divider").id = "divider"+product.id.split(" ")[1];
            clone.querySelector(".butt").querySelector(".item-price-total-wrapper").querySelector(".item-price-total").textContent = totPrice;

            
            clone.querySelector("#price-button"+product.id.split(" ")[1]).value = product.price.split(" ")[1];
            clone.querySelector("#delivery-date-button"+product.id.split(" ")[1]).value = product.deliveryDate;
            clone.querySelector("#quantity-button"+product.id.split(" ")[1]).value = product.quantity;
            clone.querySelector("#quantity-measure-button"+product.id.split(" ")[1]).value = product.measure;
            list.appendChild(clone);


            
        }
        document.querySelector("#FIO").oninput = function changeFIOHandler(){
            changeFIO();
        };
        document.querySelector("#phone").oninput = function changePhoneHandler(){
            changePhone();
        };
        document.querySelector("#email").oninput = function changeEmailHandler(){
            changeEmail();
        };
        document.querySelector("#co-num").oninput = function changeCoNumHandler(){
            changeCoNum();
        };
        document.querySelector("#delivery-date").oninput = function changeEveryDeliveryDateHandler(){
            changeEveryDeliveryDate();
        };
        document.querySelector("#delivery-cond").oninput = function changeDeliveryCondHandler(){
            changeDeliveryCond();
        };
        // document.getElementById("delivery-date").value = myCart.CommonDeliveryDate;

        document.getElementById("coeff-button").value = myCart.coeff;
        document.getElementById("FIO").value = myCart.name;
        document.getElementById("phone").value = myCart.phone;
        document.getElementById("email").value = myCart.email;
        document.getElementById("co-num").value = myCart.coNum;
        document.getElementById("delivery-date").value = myCart.commonDeliveryDate;
        document.getElementById("delivery-cond").value = myCart.deliveryCond;
        let coeff = Number(document.getElementById("coeff-button").value);
        myCart.totalSum=Math.round(sum*100)/100;
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
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

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
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

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
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

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
    document.getElementById("item-total-price"+id).innerText=totPrice;

}


function clearCart(){
    const myCart = new Cart();
    saveCart(myCart);
    location.reload();
}

function changePrice(id){
    id = id.split(" ")[1];
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;

    let inp = document.getElementById("price-button"+id);
    if (inp.value<=0 && !isNaN(number)){
        alert("Введенное количество превышает наличие");
        return;
    }
    if (inp.value != myCart.get_product(id).price){
        myCart.get_product(id).price = "Price: "+inp.value+" RUB";
        saveCart(myCart);
        
    }
    let sum = 0;
    for (let productKey in myCart.products){
        let product = myCart.products[productKey];
        sum+=Number(product.price.split(" ")[1])*product.amount;
    }
    myCart.totalSum = sum;
    document.getElementById("item-price"+id).innerText=myCart.get_product(id).price;
    let totPrice = Math.round(Number(myCart.get_product(id).price.split(" ")[1]) * myCart.get_product(id).amount*100)/100;

    document.getElementById("item-total-price"+id).innerText=totPrice;
    myCart.totalSum = Math.round(sum*100)/100;
    document.getElementById("total-amount").innerText=myCart.totalSum;
    saveCart(myCart);

}

function changeDeliveryDate(id){
    id = id.split(" ")[1];
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

    let inp = document.getElementById("delivery-date-button"+id);
    myCart.get_product(id).deliveryDate = inp.value;
    saveCart(myCart);

}

function changeQuantityInStock(id){
    id = id.split(" ")[1];
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

    let inp = document.getElementById("quantity-button"+id);
    myCart.get_product(id).quantity = inp.value;
    saveCart(myCart);
}

function changeEveryDeliveryDate(){
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;
    let inp = document.getElementById("delivery-date");
    myCart.commonDeliveryDate = inp.value;
    for (let productKey in myCart.products){
        let product = myCart.products[productKey];
        product.deliveryDate = inp.value;
        document.getElementById("delivery-date-button"+product.id.split(" ")[1]).value=inp.value;

    }
    saveCart(myCart);
}

function changeFIO (){
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;
    let inp = document.getElementById("FIO");
    myCart.name = inp.value;
    saveCart(myCart);
}

function changePhone (){
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;
    let inp = document.getElementById("phone");
    myCart.phone = inp.value;
    saveCart(myCart);
}
function changeEmail (){
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;
    let inp = document.getElementById("email");
    myCart.email = inp.value;
    saveCart(myCart);
}
function changeCoNum (){
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;
    let inp = document.getElementById("co-num");
    myCart.coNum = inp.value;
    saveCart(myCart);
}
function changeDeliveryCond (){
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;
    let inp = document.getElementById("delivery-cond");
    myCart.deliveryCond = inp.value;
    saveCart(myCart);
}

function changeQuantityMeasure(id){
    id = id.split(" ")[1];
    const myCart = new Cart();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

    let inp = document.getElementById("quantity-measure-button"+id);
    myCart.get_product(id).measure = inp.value;
    saveCart(myCart);
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
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

    let inp = document.getElementById("quantity-form"+id);
    if (Number(inp.value)+1 > Number(myCart.get_product(id).quantity.split(" ")[3])) {
        alert("Введенное количество превышает наличие");
        document.getElementById("quantity-form"+id).value = 1;
        return;
    }
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
    myCart.totalSum = Math.round(sum*100)/100;
    saveCart(myCart);

    document.getElementById("total-amount").innerText=myCart.totalSum;
    document.getElementById("item-total-price"+id).innerText=totPrice;

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

function changeCoeff(){
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const myCart = new Cart();
    myCart.products = savedCart.products;
    myCart.totalSum = savedCart.totalSum;
    myCart.coeff = savedCart.coeff;
    myCart.commonDeliveryDate = savedCart.commonDeliveryDate;
    myCart.name = savedCart.name;
    myCart.phone = savedCart.phone;
    myCart.email = savedCart.email;
    myCart.coNum = savedCart.coNum;
    myCart.deliveryCond = savedCart.deliveryCond;

    let coeff = document.getElementById("coeff-button").value;
    myCart.coeff=coeff;
    let sum = myCart.totalSum;
    document.getElementById("total-amount").innerText=Math.round(sum*coeff*100)/100;
    saveCart(myCart);
}


function postExcel(){
    alert("Please, wait a minute")
    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = "POST";
    form.action = "/download_excel";

    const cart_info = document.getElementById("info-container");
    const fio = document.getElementById("FIO").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const coef = document.getElementById("coeff-button").value;
    const delcond = document.getElementById("delivery-cond").value;
    const co_number = document.getElementById("co-num").value;

    const hiddenField_fio = document.createElement('input');
    hiddenField_fio.type = 'hidden';
    hiddenField_fio.name = "FIO";
    hiddenField_fio.value = fio;

    form.appendChild(hiddenField_fio);

    const hiddenField_phone = document.createElement('input');
    hiddenField_phone.type = 'hidden';
    hiddenField_phone.name = "phone";
    hiddenField_phone.value = phone;

    form.appendChild(hiddenField_phone);

    const hiddenField_email = document.createElement('input');
    hiddenField_email.type = 'hidden';
    hiddenField_email.name = "email";
    hiddenField_email.value = email;

    form.appendChild(hiddenField_email);

    const hiddenField_coeff = document.createElement('input');
    hiddenField_coeff.type = 'hidden';
    hiddenField_coeff.name = "coeff-button";
    hiddenField_coeff.value = coef;

    form.appendChild(hiddenField_coeff);

    const hiddenField_delivery_cond = document.createElement('input');
    hiddenField_delivery_cond.type = 'hidden';
    hiddenField_delivery_cond.name = "delivery-cond";
    hiddenField_delivery_cond.value = delcond;
    form.appendChild(hiddenField_delivery_cond);

    const hiddenField_co_num = document.createElement('input');
    hiddenField_co_num.type = 'hidden';
    hiddenField_co_num.name = "conum";
    hiddenField_co_num.value = co_number;
    form.appendChild(hiddenField_co_num);

    document.body.appendChild(form);
    form.submit();
}


function postPdf(){

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = "POST";
    form.action = "/download_pdf";
    const cart_info = document.getElementById("info-container");
    const fio = document.getElementById("FIO").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const coef = document.getElementById("coeff-button").value;
    const delcond = document.getElementById("delivery-cond").value;
    const co_number = document.getElementById("co-num").value;

    const hiddenField_fio = document.createElement('input');
    hiddenField_fio.type = 'hidden';
    hiddenField_fio.name = "FIO";
    hiddenField_fio.value = fio;

    form.appendChild(hiddenField_fio);

    const hiddenField_phone = document.createElement('input');
    hiddenField_phone.type = 'hidden';
    hiddenField_phone.name = "phone";
    hiddenField_phone.value = phone;

    form.appendChild(hiddenField_phone);

    const hiddenField_email = document.createElement('input');
    hiddenField_email.type = 'hidden';
    hiddenField_email.name = "email";
    hiddenField_email.value = email;

    form.appendChild(hiddenField_email);

    const hiddenField_coeff = document.createElement('input');
    hiddenField_coeff.type = 'hidden';
    hiddenField_coeff.name = "coeff-button";
    hiddenField_coeff.value = coef;

    form.appendChild(hiddenField_coeff);

    const hiddenField_delivery_cond = document.createElement('input');
    hiddenField_delivery_cond.type = 'hidden';
    hiddenField_delivery_cond.name = "delivery-cond";
    hiddenField_delivery_cond.value = delcond;
    form.appendChild(hiddenField_delivery_cond);

    const hiddenField_co_num = document.createElement('input');
    hiddenField_co_num.type = 'hidden';
    hiddenField_co_num.name = "conum";
    hiddenField_co_num.value = co_number;
    form.appendChild(hiddenField_co_num);

    document.body.appendChild(form);
    form.submit();
}



function save_cart() {

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    fetch("/save_cart_to_history", {
      method: "POST",
      body: JSON.stringify({"products": savedCart}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    localStorage.setItem("cart", JSON.stringify(new Cart()));
    clearCart();
}