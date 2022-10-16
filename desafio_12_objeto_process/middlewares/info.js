const os = require("os");


module.exports = {
    CURRENT_SYSTEM: os.hostname(),
    NODE_VERSION: process.version,
    TOTAL_MEMORY: process.memoryUsage().rss,
    CURRENT_PATH: process.cwd(),
    PROCESS_ID: process.pid,
}
