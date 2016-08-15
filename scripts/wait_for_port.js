const program = require('commander')
const chalk = require('chalk')
const tcpPortUsed = require('tcp-port-used')

const RETRY_MS = 100
const TIMEOUT = 4000

const list = (val) => val.split(',')

program
  .version('1.0.0')
  .option('-p, --port <n>', 'Use port(s). They can be a comma separated list.', list)
  .parse(process.argv)

const ports = program.port.map((port) => parseInt(port, 10))

console.log(chalk.blue(`Waiting for port(s) ${ports}...`))

Promise.all(ports.map(port => tcpPortUsed.waitUntilUsed(port, RETRY_MS, TIMEOUT))).then(
  () => console.log(chalk.green(`Connection established to port(s) ${ports}`)),
  (err) => console.log(chalk.red(`Error establishing a connection to ${ports}:`), err.message)
)
