module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'fresh_absensi',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 8889
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
