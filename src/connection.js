const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER || process.env.DB_LOCAL_USER,
    port: 5432,
    host: process.env.DB_HOST || process.env.DB_LOCAL_HOST,
    database: process.env.DB_DATABASE || process.env.DB_LOCAL_DATABASE,
    password: process.env.DB_PASSWORD || process.env.DB_LOCAL_PASSWORD,
    // ssl: { rejectUnauthorized: false },
  },
})

module.exports = knex
