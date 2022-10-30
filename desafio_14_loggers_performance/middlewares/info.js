const os = require("os");
const logger = require("../middlewares/logger.js");

function getSystemInformation() {
  logger.info('Entregando información del sistema correcto');
  const data = {
    ARGS: process.argv.slice(2),
    CURRENT_SYSTEM: process.platform,
    NODE_VERSION: process.version,
    TOTAL_MEMORY: process.memoryUsage().rss,
    CURRENT_PATH: process.argv.slice(0),
    FOLDER_PATH: process.cwd,
    PROCESS_ID: process.pid,
    N_PROCESSORS: os.cpus().length,
  };
  return data;
}

module.exports = getSystemInformation;
