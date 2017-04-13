

var del = require('del');
var projectConfig = require('../project.config');

var paths = del.sync([
    'coverage',
    projectConfig.srcDir +'/**/*.css',
    '!'+ projectConfig.srcDir +'/assets/fonts/**/*.css',
    projectConfig.srcDir +'/**/*.js',
    '!'+ projectConfig.srcDir +'/**/libs/**/*',
    projectConfig.srcDir +'/**/*.map',
    projectConfig.testsDir+"/**/*.js",
    projectConfig.testsDir +'/**/*.map',
    'dist','temp',"reporters"]);

console.log('Deleted files/folders:\n', paths.join('\n'));


