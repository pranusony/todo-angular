
var util = require('./util');
var sass = require('node-sass');
var path = require("path");
var fs = require("fs-extra");
var projectConfig = require("../project.config");
var webpack = require("webpack");


util.series(["npm run clean","npm run lint"], function (err) {


    if(err)
    {
        console.log(err);
        process.exit(1);
    }

    var tasks;

    if(process.env.NODE_ENV === projectConfig.envTypes.PRODUCTION)
    {
        tasks = [
            {fn:buildTypescript,fn:bundleFiles}
        ]
    }
    else
    {
        tasks = [
            {fn:buildTypescript,args:[false,true]},{fn:buildSASS}
        ];
    }

    util.callTasksInSeries(tasks,function(err){

        util.finishTask(null,err,true);
    })

});

function buildSASS(cb) {

    var mainSassFilePath = projectConfig.srcDir+"/assets/styles/main.scss";
    var outFilePath = projectConfig.srcDir+"/assets/styles/main.css";

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

function buildTypescript(cb){


    var cmd = projectConfig.tsc;
    cmd = cmd + " -p src/api";

    util.exec(cmd, function (err) {

        util.finishTask(cb,err,true);
    });

}

function bundleFiles(cb){

    util.exec(projectConfig.webpack + " -p --env.aot=true",function(err) {
        if(err)
            cb(err);
        else
        {
            cb();
        }
    });
}
