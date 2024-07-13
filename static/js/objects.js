class Cart {
  products;
  totalSum;
  coeff;
  commonDeliveryDate;
  name;
  phone;
  email;
  coNum;
  deliveryCond;

  constructor() {
    this.products = [];
    this.coeff=1;
    this.commonDeliveryDate="Срок поставки";
    this.name="ФИО";
    this.phone="Телефон";
    this.email="E-mail";
    this.coNum="Номер КП";
    this.deliveryCond="Условие поставки";
  }
  get count() {
    return this.products.length;
  }
  addProduct(product) {
    this.products.push(product);
    

  }
  removeProduct(index) {
    this.products.splice(index, 1);

  }
  removeProductById(id){
    for (let i = 0; i < this.products.length; i++){
      if(this.products[i].id == id){
        this.removeProduct(i);


      }
    }
    
  }
  get cost() {
    const prices = this.products.map((product) => {
      return toNum(product.price);
    });
    const sum = prices.reduce((acc, num) => {
      return acc + num;
    }, 0);
    return sum;
  }
  get costDiscount() {
    const prices = this.products.map((product) => {
      return toNum(product.priceDiscount);
    });
    const sum = prices.reduce((acc, num) => {
      return acc + num;
    }, 0);
    return sum;
  }
  get discount() {
    return this.cost - this.costDiscount;
  }
  get_product(id){
    id = "ID: " + id;
    for (let i = 0; i < this.products.length; i++){
      if (this.products[i].id == id){
        return this.products[i];
      }
    }
    return null;
  }
  clearProducts() {
    this.products = [];
  }
}


class Product {
  imageSrc;
  name;
  price;
  quantity;
  id;
  amount;
  sku;
  totalPrice;
  deliveryDate;
  measure;
  constructor(card, amount) {
    this.imageSrc = card.querySelector(".item-img").src;
    this.name = card.querySelector(".item-name").innerText;
    this.id = card.querySelector(".item-id").innerText;
    this.price = card.querySelector(".item-price").innerText;
    this.quantity = card.querySelector(".item-quantity").innerText;
    this.amount = amount;
    this.totalPrice = amount * this.price.split(" ")[1];
    this.sku = card.querySelector(".sku").innerText;
    this.deliveryDate="-";
    this.measure=card.querySelector(".quantity-measure-unit").innerText;
}
}