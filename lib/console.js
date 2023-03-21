module.exports = {
  log: (logs, text) => {
    logs? console.log("\x1b[37m[ 👍 LOGS   ]\x1b[0m :", text) : ""
  },
  warn: (logs, text) => {
    logs? console.warn("\x1b[33m[ 📝 WARING ]\x1b[0m :", text) : ""
  },
  info: (logs, text) => {
    logs? console.info("\x1b[34m[ 📂 INFO   ]\x1b[0m :", text) : ""
  },
  error: (logs, text) => {
    logs? console.error("\x1b[31m[ 📝 ERROR  ]\x1b[0m :", text) : ""
  }
}