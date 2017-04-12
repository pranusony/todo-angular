
import path = require("path");
import http = require('http');

var express = require('express');



var server;
var env = process.env.NODE_ENV || "development";
var staticPath:string = path.resolve("./");

export function start(port?:number,plugins?:Array<any>):void
{
    var httpPort = port;

    if(!httpPort || httpPort === 0)
    {
        httpPort = 3000;
    }

    var app = express();

    if(plugins)
    {
        plugins.forEach((plugin)=>{
            app.use(plugin);
        })
    }


    if(env === "development")
    {
        app.use(express.static("./"));
        app.use(express.static("src/client"));
        app.use('/node_modules', express.static('node_modules'));
    }
    else
    {
        app.use(express.static("dist/client"));
    }

    server = app.listen(httpPort);

    console.log("Server started at port: " + port);

    return server;
}

export function close()
{
    server.close();
}

if(env !== "development")
{
    start(process.env.PORT);
}
