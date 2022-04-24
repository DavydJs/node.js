const start = Date.now();
const { sequelize } = require('../db/sequelize')

require('../models/user')

sequelize.sync({ force: true })
    .then(_ => console.log(`Migration models finish successfully in: ${Date.now() - start}ms`))
    .catch(err => console.log(err))
