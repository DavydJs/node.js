const { env } = process
const Sequelize = require("sequelize")

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    port: env.DB_PORT,
    logging: false,
    pool: {
        max: 10,
        idle: 100000,
        acquire: 100000,
      }
})

module.exports = {
    Sequelize,
    sequelize
}