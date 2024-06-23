class Cart {
  products;
  constructor() {
    this.products = [];
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
      console.log(this.products[i].id);
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
  constructor(card, amount) {
    this.imageSrc = card.querySelector(".item-img").src;
    this.name = card.querySelector(".item-name").innerText;
    this.id = card.querySelector(".item-id").innerText;
    this.price = card.querySelector(".item-price").innerText;
    this.quantity = card.querySelector(".item-quantity").innerText;
    this.amount = amount;
  }
}