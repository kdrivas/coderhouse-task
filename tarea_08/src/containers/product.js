import DB from './db.js'

class Product {
  constructor(options, table) {
    this.db = new DB(options, table)
  }

  async getAll() {
    const result = await this.db.getRecords()
    return result
  }

  async addProduct(title, thumbnail, price) {
    console.log(title, thumbnail, price)
    const result = await this.db.insertRecord({ title, thumbnail, price })
    return result
  }

  getProduct(id) {
    return this.db.selectById(id)
  }

  modifyProduct(id, title, thumbnail, price) {
    return this.db.updateRecord(id, { title, thumbnail, price })
  }

  removeProduct(id) {
    return this.db.removeRecord(id)
  }
}

export { Product }