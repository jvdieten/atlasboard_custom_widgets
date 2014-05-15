module.exports = function (config, dependencies, job_callback) {

  
    var logger = dependencies.logger;
    var underscore = dependencies.underscore;
    var moment = dependencies.moment;
    
    var metricsUrl = config.serverUrl + config.suiteName + '?testHistory&format=xml';
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlhttp = new XMLHttpRequest();

    function formatTestName (pageObj){
        var result = (pageObj.toString()).split('.');
        return result[result.length - 1];
    };


	xmlhttp.open("GET", metricsUrl, false); 
    xmlhttp.send(); 
    
    var xml2js = require('xml2js');
	var parser = new xml2js.Parser();
    var xml = xmlhttp.responseText; 
	
	parser.parseString(xml, function (err, result) {	  	   
  	  	   
        var pages = [];
        var count = 0;
        result.TestHistory.Page.forEach(function(page) {
            if (count != 0){
                pages.push({ 
                    projectName: config.projectName,
                    testName: formatTestName(page.Name),
                    testsPassed: page.Pass,
                    testsFailed: page.Fail
                }); 
            }
            count++;
        });

        /*
  	    test = (result.TestHistory.Page[0]);
        console.log(result);
  	    json_data = JSON.stringify(test);
	    var data = { 
            projectName: config.suiteName,
            testName: test.Name,
            testsPassed: test.Pass,
            testsFailed: test.Fail
        };
        */
        job_callback(null, pages);

	});


};