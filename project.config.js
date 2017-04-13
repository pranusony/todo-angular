
var path = require("path");

const config = {};

config.envTypes = {

    TEST:"test",
    DEVELOPMENT:"development",
    PRODUCTION:"production"

};

var rootDir = path.resolve("./");
var root = path.join.bind(path, rootDir);

var srcDirName = "src/client";
var distDirName = "dist";
var srcDir = root(srcDirName);
var distDir = root(distDirName);

config.rootDir = rootDir;
config.root = root;
config.distDir = distDir;
config.srcDir = srcDir;
config.documentationDir = root("documentation");
config.documentationDistDir = root("dist/docs");
config.testsDir = root("tests");

config.tsc = root("./node_modules/.bin/tsc");
config.karma = root("./node_modules/.bin/karma");
config.webpack = root("./node_modules/.bin/webpack");

config.srcDirMain =  root(srcDirName+"/main.ts");
config.srcDirIndex = root(srcDirName + "/index.html");
config.srcDirMainCSS = root(srcDirName + "/assets/styles/main.scss");
config.distDirMainCSS = "./assets/styles/main.css";

config.documentationDirIndex = root("documentation" + "/index.html");
config.documentaionDirMain = root("documentation" + "/documentation-main.ts");
config.documentationDirMainCSS = root("documentation" + "/assets/styles/documentation-main.scss");


module.exports = config;