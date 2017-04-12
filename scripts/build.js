
var util = require('./util');
var argv = require('minimist')(process.argv.slice(2));
var sass = require('node-sass');
var path = require("path");
var fs = require("fs-extra");
var projectConfig = require("../project.config");

var subCommand;
if(argv._ && argv._.length > 0) //look for release build
{
    subCommand = argv._[0].toLowerCase();
    if(subCommand === "release")
    {
        process.env.NODE_ENV = "production";
        buildRelease();
    }
    else if(subCommand == "local")
    {
        util.exec("npm run clean", function (err) {

            if(err)
            {
                console.log(err);
                process.exit(1);
            }

            util.callTasksInSeries([
                {fn:buildTypescript},
                {fn:buildSASS}
            ],function(err){

                util.finishTask(null,err,true);
            })

        });
    }

}
else // will build only the typescript the src/api directory, use npm run build-local to build locally all typescript and scss files
{
    util.exec("npm run clean", function (err) {

        if(err)
        {
            console.log(err);
            process.exit(1);
        }

        buildTypescript(function(err){
            util.finishTask(null,err,true);
        });

    });
}



function buildSASS(cb) {

    var mainSassFilePath = projectConfig.srcClientDir+"/assets/styles/main.scss";
    var outFilePath = projectConfig.srcClientDir+"/assets/styles/main.css";

    sass.render({
        file: mainSassFilePath
    },function(error, result){

        if(!error)
        {
            fs.writeFile(outFilePath,result.css,"utf8",function(err){

                util.finishTask(cb,err,true);

            });
        }
        else
        {
            util.finishTask(cb,error,true);
        }

    });

}

function buildTypescript(cb,isRelease){

    var cmd = "tsc";

    if(subCommand !== "local")
    {
        cmd = cmd + " -p src/api"; // only need to build api as client code is taken care by webpack
    }

    if(!isRelease)
        cmd = cmd + " --sourceMap";

    util.exec(cmd, function (err) {

        util.finishTask(cb,err,true);
    });

}

function bundleFiles(cb){

    util.exec("webpack -p",function(err) {
        if(err)
            cb(err);
        else
        {
            cb();
        }
    });
}

function buildRelease(){

    util.exec("npm run clean", function (err) {

        var distDir = path.resolve("./dist");


        util.callTasksInSeries(
            [
                {fn:buildTypescript,
                    args:[true]
                },
                {fn:bundleFiles}

            ]
            ,function(err){
                util.finishTask(null,err,true);
            });

    });
}