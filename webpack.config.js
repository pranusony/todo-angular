var projectConfig = require("./project.config");

module.exports = function(options) {
    options = options || {};
    options.env = process.env.NODE_ENV || projectConfig.envTypes.DEVELOPMENT;

    switch (process.env.NODE_ENV) {
        case projectConfig.envTypes.PRODUCTION:
            return require('./webpack/prod.config')(options);
        case projectConfig.envTypes.TEST:
            return require('./webpack/test.config')(options);
        case projectConfig.envTypes.DEVELOPMENT:
        default:
            return require('./webpack/dev.config')(options);
    }
}