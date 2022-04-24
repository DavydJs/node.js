const {threadId, parentPort} = require('worker_threads');
let count = 0;

function pauseComp(millis) {

    const log = (loop) => console.log(`Количество итераций цикл-${loop}:`, new Intl.NumberFormat('ru-RU').format(count));
    
    let date = Date.now();
    do { count++; }
    while (Date.now() - date < millis);

    log('while');
    console.log('job1', __dirname)

    parentPort.postMessage(`Hello from thread #${threadId}.`);
    parentPort.postMessage(`Количество итераций цикл - for: ${ new Intl.NumberFormat('ru-RU').format(count)}`);

}

pauseComp(60000);

setInterval(()=> parentPort.postMessage(`Hello, Davyd!`), 2000)