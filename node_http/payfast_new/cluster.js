const cluster = require('cluster')
const os = require('os')
const { workerData } = require('worker_threads')

const osInfo = os.cpus()

console.log('executando thread')
if (cluster.isMaster) {
    console.log('executando thread master')
    osInfo.forEach(element => {
        cluster.fork()
    });
    cluster.on('listening', (worker)=>{
        console.log('cluster conectado ' + worker.process.pid)
    })

    cluster.on('exit', (worker)=>{
        console.log('cluster %d desconectado', worker.process.pid)
        cluster.fork()
    })
}else{
    console.log('executando thread slave')
    require('./index')
}
