module.exports = {
  development: {
    username: 'root',
    password: 'toor',
    database: 'sistemabsensi',
    host: '127.0.0.1',
    dialect: 'mysql',
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
