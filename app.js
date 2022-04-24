let wrk = 1
const { env } = process
const port = env.PORT || 80
const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public/'))
app.use(express.json())
const fs = require('fs')
const { Worker } = require('worker_threads')

const User = require('./include/models/user')



app.get('/cvs', function (req, res) {
    fs.readFile('./map.xls', function (err, data) {
        res.attachment("map.xls")
        res.end(data, 'UTF-8')
    })
})

app.post('/data', function (req, res) {
    // User.create(req.body).then(res => {
    //   console.log({id: res.id, name: res.name, age: res.age});
    for (let item of req.body) {
        console.log(item);
    }

    // }).catch(err => console.log(err))
    res.end('Ok')
})

app.post('/user', function (req, res) {
    const start = Date.now()
    let count = 50000
    const workerData = { user: req.body, count }
    const worker = new Worker(__dirname + '/include/jobs/job2.js', { workerData })

    worker.on('online', () => {
        console.log(`Worker ${wrk++} start`)
    })

    worker.on('message', (msg) => {
        console.log('Worker message:', msg)
    })

    worker.on('exit', (code) => {
        console.log('Worker exit code:', code)
    })

    res.end(`Create the ${count} rows: ${Date.now() - start}ms`)
})
app.get('/user', function (req, res) {
    let start = Date.now()
    User.findAll({ raw: true }).then(users => {
        console.dir(users[40000]);
        return JSON.stringify(users)
    })
    .then(result => {
        // res.write(result)
        // fs.writeFileSync('json.json', result)
        fs.createReadStream(result).pipe(res)
        let end = `Get rows: ${Date.now() - start}ms`

    })
    .catch(err => console.log('Here error:', err));
})

app.get("/", function (req, res) {
    const worker = new Worker(__dirname + '/include/jobs/job1.js');
    worker.on('online', () => {
        console.log('Worker ready');
    });

    worker.on('message', (msg) => {
        console.log('Worker message:', msg);
    });

    worker.on('exit', (code) => {
        console.log('Worker exit code:', code);
    });
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    fs.createReadStream("./page-tamplate.html").pipe(res)
})

app.post("/contact-form", function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(`{"message":"Привет, Mis! Я люблю мику:))", "pass":"${req.body.pwd}"}`)
    // fs.createReadStream("./page-tamplate.html").pipe(res)
})

app.listen(port, function () {
    console.log(`Server running on port:${port}`)
})
