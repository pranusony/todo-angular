
var fs = require("fs-extra");
var path = require("path");

try {
    // Query the entry
    fs.lstatSync(path.resolve("./coverage/lcov.info"));

    var exec = require('child_process').exec;

    exec("cat ./coverage/lcov.info | ./node_modules/.bin/coveralls", function(err, stdOut, stdErr){
        console.log(stdOut);
        console.log(stdErr);
        if(err)
        {
            process.exit(1);
        }

        process.exit(0);
    });
}
catch (e) {


    //means no coverage report was generated
    console.log("Nothing to Report: Coverage info not found");
    process.exit(0);

}