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
  constructor(card) {
    this.imageSrc = card.querySelector(".item-img").src;
    this.name = card.querySelector(".item-name").innerText;
    this.id = card.querySelector(".item-id").innerText;
    this.price = card.querySelector(".item-price").innerText;
    this.quantity = card.querySelector(".item-quantity").innerText;
  }
}