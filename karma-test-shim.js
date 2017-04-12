Error.stackTraceLimit = Infinity;


var appContext = require.context('./test', true, /\.spec\.tsx?$|.test\.tsx?$/);

appContext.keys().forEach(appContext);
