

var del = require('del');
var projectConfig = require('../project.config');

var paths = del.sync([
    'coverage',
    projectConfig.srcDir +'/**/*.css',
    '!'+ projectConfig.srcClientDir +'/assets/fonts/**/*.css',
    projectConfig.srcDir +'/**/*.js',
    '!'+ projectConfig.srcDir +'/**/libs/**/*',
    projectConfig.srcDir +'/**/*.map',
    projectConfig.testDir+"/**/*.js",
    projectConfig.testDir +'/**/*.map',
    projectConfig.distDir,'temp',"reporters"]);

console.log('Deleted files/folders:\n', paths.join('\n'));


