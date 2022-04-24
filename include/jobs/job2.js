const start = Date.now()
const { threadId, parentPort, workerData } = require('worker_threads');
const { count, user } = workerData

const User = require('../models/user')

for (let i = count; i > 0; i--) {
    User.create(user)
        .catch(err => console.log(err))
}

parentPort.postMessage(`Created the ${count} rows: ${Date.now() - start}ms --THRED_ID: ${threadId}`);

