Error.stackTraceLimit = Infinity;

require("core-js/shim");

var appContext = require.context('./tests', true, /\.spec\.tsx?$|.test\.tsx?$/);

appContext.keys().forEach(appContext);
