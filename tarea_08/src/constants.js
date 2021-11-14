const mariaDbOptions = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'admin',
    password: 'admin',
    database: 'coderhouse'
  },
  pool: { min: 0, max: 7 }
}

const mariaDbMigrate = 1

const sqliteOptions = {
  client: 'sqlite3',
  connection: { filename: './mydb.sqlite' }
}

export { mariaDbOptions, mariaDbMigrate, sqliteOptions}