const pino = require("pino");

function buildDevLogger() {
  const devLogger = pino("./src/logs/debug.log");
  devLogger.level = "info";
  return devLogger;
}

let logger = buildDevLogger();

module.exports = logger;
