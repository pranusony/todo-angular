/*
 * grunt-coverage-badger
 * https://github.com/node-libs/grunt-coverage-badger
 *
 * Copyright (c) 2016 kuldeep keshwar
 * Licensed under the MIT license.
 */

'use strict';
// For generating the coverage badge
var path = require("path");
var defaultThresholds = {
    excellent: 90,
    good: 65
};
var fs = require("fs");
var XMLSplitter = require("xml-splitter");
var https = require("https");
var http = require("http");



/**
 * Downloads a given URL as a file at the saveAtPath location.
 *
 * @param {String} url The URL to a file to be downloaded.
 * @param {String} saveAtPath An existing file path to save the file.
 * @param {Function} callback CPS callback with the error/result.
 */
function downloader(url, saveAtPath, callback) {
    // Handle the parameter errors
    if (!url || !saveAtPath) {
        return callback(new Error("You need to provide the URL and the location to save the file!"));
    }
    if (url && typeof url !== "string") {
        return callback(new Error("The parameter 'url' must be a string"));
    }
    if (saveAtPath && typeof saveAtPath !== "string") {
        return callback(new Error("The parameter 'saveAtPath' must be a string"));
    }
    if (callback && typeof callback !== "function") {
        throw new Error("The callback provided must be a function");
    }

    var httpClient = url.indexOf("https://") === 0 ? https : http;

    // The directory to save the file.
    var dirToSave = path.dirname(saveAtPath);

    // Verify if the directory to save exists before downloading.
    fs.stat(dirToSave, function gettingStats(err) {
        if (err) {
            return callback(new Error("The path '" + dirToSave + "' does NOT exist!"));
        }

        var req = httpClient.get(url, function requestHandler(res) {
            if (res.statusCode === 404) {
                return callback(new Error("The resource at the given URL " + url + " does NOT exist"));
            }

            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var buffer = Buffer.concat(chunks);

                // Finished downloading and getting the buffer to be saved.
                fs.writeFile(saveAtPath, buffer, function(err) {
                    if (err) {
                        var error = new Error("Error while saving image: " + err.message);
                        if (err.code === "EISDIR") {
                            error = new Error("Cannot save the url " + url + " as a directory " + saveAtPath);
                        }
                        callback(error);
                    }

                    fs.stat(saveAtPath, function(err, stat) {
                        if (err) {
                            callback(new Error("Error while getting image stats: " + err.message));
                        }

                        // Creating the response object.
                        var response = {
                            downloaded: true,
                            filePath: saveAtPath,
                            size: stat.size
                        };

                        // The request to the URL was successful and the file was saved.
                        callback(null, response);
                    });
                });
            });

        });

        // Handle errors during the request.
        req.on("error", function(error) {
            if (error) {
                if (error.code === "ENOTFOUND") {
                    return callback(new Error("There's no internet connectivity to " + url));

                } else {
                    var unknownError = new Error("Unknown error to save " + url + " as " + saveAtPath);
                    unknownError.stack = error.stack;
                    return callback(unknownError);
                }
            }
        });
    });
}

/**
 * Processes the individual Class and compute totals.
 *
 * <class>...</class>
 *
 * @param {Object} clazz is the class object from the report.
 * @param {Object} computation is the result of the computation.
 */
function processClass(clazz, computation) {
    if (!clazz.methods.method) {
        return;
    }
    if (clazz.methods.method instanceof Array) {

        clazz.methods.method.forEach(function(method) {
            ++computation.total;
            // Incremente the total number of methods if there were hits. Don't increment for no hit
            computation.passed = parseInt(method.hits) > 0 ? ++computation.passed : computation.passed;
        });

    } else { // That's the method object itself.
        ++computation.total;
        computation.passed = parseInt(clazz.methods.method.hits) > 0 ? ++computation.passed : computation.passed;
    }
}
/**
 * Processes the individual package entry.
 *
 * <package><class></package>
 *
 * @param {Object} packageObject is the package object from the report.
 * @param {Object} computation is the result of the computation.
 */
function processPackage(packageObject, computation) {
    if (packageObject.classes.class instanceof Array) {
        // Process each individual class
        packageObject.classes.class.forEach(function(clazz) {
            processClass(clazz, computation);
        });

    } else {
        // Single class to be processed
        processClass(packageObject.classes.class, computation);
    }
}
/**
 * Processes the XML report based on the package.
 *
 * <package>...</package>
 *
 * @param {Object} xml is the parsed report.
 * @param {Object} computation is result of computation.
 */
function processReport(xml, computation) {
    if (xml.packages.package instanceof Array) {
        // Process all the packages
        xml.packages.package.forEach(function(packageObject) {
            processPackage(packageObject, computation);
        });

    } else {
        processPackage(xml.packages.package, computation);
    }
}

/**
 * Parses a given istanbul report file path and returns the XML "coverage" element containing the report results.
 *
 * @param {String} reportFilePath The location where the istanbul report in cobertura xml format is located.
 * @param {Function} callback Th regular CPS function.
 */
function parseIstanbulReport(reportFilePath, callback) {

    if (!reportFilePath) {
        return callback(new Error("The istanbul report file path must be provided!"));
    }
    // Read the XML cobertura report
    fs.readFile(reportFilePath, function(err, coberturaXmlReport) {
        if (err && err.code === "ENOENT") {
            return callback(new Error("The istanbul report file '" + reportFilePath + "' does not exist!"));

        } else if (err) {
            return callback(new Error("Error while reading the istanbul file '" + reportFilePath + "': " + err.message));
        }

        // Parse the cobertura root element.
        var xs = new XMLSplitter("/coverage");
        var errorOnce = false;

        // Calculate the final percent based on the line and branch rates
        xs.on("data", function parsingCoverageTag(xml) {

            // Calculate the function rate based on the functions collected.
            var methods = {
                total: 0,
                passed: 0
            };

            // Parse the xml in regards to the methods above.
            processReport(xml, methods);

            // All the rates for the final result.
            var functionRate = parseFloat(methods.passed / methods.total);
            var lineRate = parseFloat(xml["line-rate"]);
            var branchRate = parseFloat(xml["branch-rate"]);

            // Calculate the final percent based on the line and branch rates$
            var percent = Math.floor(((functionRate + lineRate + branchRate) / 3) * 100);

            return callback(null, {
                overallPercent: percent,
                functionRate: functionRate,
                lineRate: lineRate,
                branchRate: branchRate
            });

        }).on("error", function handlingError(error) {
            var parsingError = new Error("Error parsing the given istanbul report (" + reportFilePath + "): ");
            parsingError.stack = error.stack;
            if (!errorOnce) {
                errorOnce = true;
                return callback(parsingError);
            }

        }).parseString(coberturaXmlReport);

    });
}


module.exports = function(callback) {

    var opts = {
        // Setting the default coverage file generated by istanbul cobertura report.
        istanbulReportFile: "./coverage/cobertura/cobertura-coverage.xml",
        // The default location for the destination being the coverage directory from istanbul.
        destinationDir: './coverage',
        // The shields host to be used for retrieving the badge. https://github.com/badges/shields
        shieldsHost: process.env.SHIELDS_HOST || "https://img.shields.io",
        // The name of the badge file to be generated
        badgeFileName: "badge",
        // The thresholds to be used to give colors to the badge.
        thresholds: defaultThresholds
    };


    parseIstanbulReport(opts.istanbulReportFile, function(err, report) {
        if (err) {
            done();
            return false;
        }

        // The color depends on the fixed thresholds (RED: 0 >= % < 60) (YELLOW: 60 >= % < 90) (GREEN: % >= 90)
        var color = report.overallPercent >= opts.thresholds.excellent ? "brightgreen" :
            (report.overallPercent >= opts.thresholds.good ? "yellow" : "red");

        // The shields service that will give badges.
        var url = opts.shieldsHost + "/badge/coverage-" + report.overallPercent + "%-" + color + ".svg";

        // Save always as coverage image.
        var badgeFileName = path.join(opts.destinationDir, opts.badgeFileName + ".svg");

        downloader(url, badgeFileName, function(err, downloadResult) {
            if (err) {
                callback(err);
            }

            report.url = url;
            report.badgeFile = downloadResult;
            report.color = color;
            console.log('badge generated :'+report.badgeFile.filePath);
            callback(err,report);
        });
    });

};