class Contenedor {
  constructor(elements=[]) {
    this.products = elements;
  }
  
  getLastIndex() {
    let newId = null;
    if (this.products.length > 0 ){
      newId = this.products[this.products.length - 1].id + 1;
    }
    else {
      newId = 1;
    }
    return newId;
  }

  getAll() {
    return this.products;
  }

  getProductById(id){
    const product = this.products.filter(e => e.id == id);
    if (product.length){
      return product[0];
    }
    else {
      return 0;
    }
  }

  addProduct(item) {
    item['id'] = this.getLastIndex();
    this.products.push(item);
    return item;
  }

  modifyProduct(id, item) {
    const index = this.products.findIndex(e => e.id == id);
    if (index < 0) {
      return 0;
    }
    else {
      this.products[index] = {...this.products[index], ...item};
      return this.products[index];
    }
  }

  removeProduct(id) {
    const index = this.products.findIndex(e => e.id == id);
    if (index < 0) {
      return 0;
    }
    else {
      this.products.splice(index, 1);
      return 1;
    }
  }
}

module.exports = Contenedor;
