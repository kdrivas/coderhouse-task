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
    return this.knex(this.table).select('*').where({ id })
  }

  async insertRecord(data) {
    const result = await this.knex(this.table).insert(data)
    return result
  }

  deleteRecord(id) {a
    return this.knex(this.table).where({ id }).del()
  }

  updateRecord(id, data) {
    return this.knex(this.table).where({ id }).update(data)
  }
}

export default DB