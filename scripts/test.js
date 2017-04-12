
var util = require('./util');
var projectConfig = require("../project.config");

var testCMD = projectConfig.karma  + " start";

util.exec("npm run lint",function (err) {

    if(process.env.TEST_E2E) // look for End to End testing
    {
        var protractorCMD = "protractor";

        util.series(["webdriver-manager update --standalone",protractorCMD],function (err) {

            if(err)
            {
                console.log(err);
                process.exit(1);
            }

            process.exit(0);
        })
    }
    else
    {
        if(process.env.TEST_BROWSER)
        {



            testCMD = testCMD + " --browsers " + process.env.TEST_BROWSER;
            util.series([testCMD], function(err){

                if(err)
                {
                    console.log(err);
                    process.exit(1);
                }

                process.exit(0);
            });
        }
        else
        {

            testCMD = testCMD + " --single-run --no-auto-watch --browsers PhantomJS";
            util.series(["npm run clean",testCMD], function(err){

                if(err)
                {
                    console.log(err);
                    process.exit(1);
                }

                var coverageBadger = require("./coverage-badger");

                coverageBadger(function (err,report) {

                    if(err)
                    {
                        console.log(err);
                        process.exit(1);
                    }

                    process.exit(0);
                })

            });
        }

    }
});



