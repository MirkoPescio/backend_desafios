const os = require("os");


module.exports = {
    ARGS: process.argv.slice(2),
    CURRENT_SYSTEM: process.platform,
    NODE_VERSION: process.version,
    TOTAL_MEMORY: process.memoryUsage().rss,
    CURRENT_PATH: process.argv.slice(0),
    FOLDER_PATH: process.cwd,
    PROCESS_ID: process.pid,
    N_PROCESSORS: os.cpus().length,
}
