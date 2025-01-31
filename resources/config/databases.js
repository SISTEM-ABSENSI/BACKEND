module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'sistemabsensi',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 8889,
    dialectOptions: {
      dateStrings: true
    }
  },
  test: {
    username: 'root',
    password: '',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: '',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
