
var path = require("path");

const config = {};

var rootDir = path.resolve("./");

var srcDir = rootDir + "/src";
var distDir = rootDir + "/dist";

var clientDir = "client";
var apiDir = "api";

config.rootDir = rootDir;
config.distDir = distDir;
config.srcDir = srcDir;
config.testDir = rootDir + "/test";

config.srcClientDir = srcDir + '/' + clientDir;
config.srcClientDirMain = config.srcClientDir + "/main.ts";
config.srcClientDirIndex = config.srcClientDir + "/index.html";
config.srcClientDirMainCSS = config.srcClientDir + "/assets/styles/main.scss";
config.srcApiDir = srcDir + '/' + apiDir;

config.distClientDir = distDir + '/' + clientDir;
config.distClientDirMain = "./main.js";
config.distClientDirIndex =  "./index.html";
config.distClientDirMainCSS = "./assets/styles/main.css";
config.distApiDir = distDir + '/' + apiDir;

module.exports = config;