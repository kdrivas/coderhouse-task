import knexLib from 'knex'

class DB {
  constructor(options, table, dbType) {
    this.knex = knexLib(options)
    this.table = table
    if (dbType == 'mariadb'){
      this.knex.schema.createTableIfNotExists(table, table => {
        table.increments("id")
        table.string("thumbnail")
        table.string("title")
        table.float("price")
      })
      .then(() => console.log("table created"))
      .catch((err) => { console.log(err); throw err })
    }
    else {
      this.knex.schema.createTableIfNotExists(table, table => {
        table.increments("id")
        table.string("message")
        table.string("user")
        table.string("time")
      })
      .then(() => console.log("table created"))
      .catch((err) => { console.log(err); throw err })
    }
  }

  async getRecords() {
    const result = await this.knex(this.table).select('*')
    return result
  }

  async selectById(id) {
    const result = await this.knex(this.table).select('*').where({ id })
    return result
  }

  async insertRecord(data) {
    const result = await this.knex(this.table).insert(data)
    return result
  }

  async deleteRecord(id) {
    const result = await this.knex(this.table).where({ id }).del()
    return result
  }

  async updateRecord(id, data) {
    const result = await this.knex(this.table).where({ id }).update(data)
    return result
  }
}

export default DB