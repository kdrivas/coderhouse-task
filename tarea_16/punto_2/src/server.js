import express from 'express'
import { Server as HttpServer } from 'http'
import os from 'os';
import cluster from 'cluster';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import compression from 'compression';
import myLogger from './logger.js';

const argv = yargs(hideBin(process.argv)).default({
  modo: 'FORK',
  puerto: 8080
})
.argv

const numCPUs = os.cpus().length

if (argv.modo == 'CLUSTER' && cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
      console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
      cluster.fork()
  })
}
else {
  const app = express()
  const httpServer = HttpServer(app)

  const loggerMiddleware = (req, res, next) => {
    myLogger.info(`Receiving a ${req.method} req with url ${req.originalUrl}`)
    next()
  }

  app.use('/', express.static('public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(loggerMiddleware)

  app.get('/infoCompression', compression({ threshold: 0 }), (req, res) => {
    res.json({
      'argv': process.argv,
      'platform': process.platform,
      'version': process.version,
      'memoryUsage': process.memoryUsage.rss(),
      'execPath': process.execPath,
      'processId': process.pid,
      'folder': process.cwd(),
      'cpus': numCPUs,
    })
  })

  app.get('/info', (req, res) => {
    const logs = {
      'argv': process.argv,
      'platform': process.platform,
      'version': process.version,
      'memoryUsage': process.memoryUsage.rss(),
      'execPath': process.execPath,
      'processId': process.pid,
      'folder': process.cwd(),
      'cpus': numCPUs,
    }
    res.status(200).json(logs)
  })

  app.get('/infoConsole', (req, res) => {
    const logs = {
      'argv': process.argv,
      'platform': process.platform,
      'version': process.version,
      'memoryUsage': process.memoryUsage.rss(),
      'execPath': process.execPath,
      'processId': process.pid,
      'folder': process.cwd(),
      'cpus': numCPUs,
    }
    console.log(logs)
    return res.status(200).json(logs)
  })

  app.get('*', (req, res) => {
    myLogger.warn(`Url ${req.originalUrl} with method ${req.method} not exists`)

    return res.json({'message': 'Not exist or authorized'})
  })

  const port = argv.port || 8080
  const server = httpServer.listen(port, () => {
    console.log(`listening at port ${port} with process ${process.pid}`)
  })
  server.on('error', error => console.log(error))
}