class Container {
  constructor(initProducts) {
    this.products = initProducts
  }

  getLastId() {
    if(this.products.length) {
      return this.products[this.products.length - 1].id + 1
    }
    else {
      return 1
    }
  }

  async getAll() {
    return this.products
  }

  async addProduct(title, thumbnail, price) {
    const product = {title, thumbnail, price}
    product['id'] = this.getLastId()
    this.products.push(product)
    return product
  }

  async getProduct(id) {
    const product = this.products.filter(e => e.id == id)
    if (product) {
      return product[0]
    }
    else {
      return null
    }
  }

  async modifyProduct(id, title, thumbnail, price) {
    const index = this.products.findIndex(e => e.id == id)
    if (index >= 0) {
      this.products[index] = {...this.products[index], ...{title, thumbnail, price}}
      return product[index]
    }
    else {
      return null
    }
  }

  async removeProduct(id) {
    const index = this.products.findIndex(e => e.id == id)
    if (index >= 0) {
      this.products.split(index, 1)
      return 1
    }
    else {
      return 0
    }
  }
}

module.exports = Container;