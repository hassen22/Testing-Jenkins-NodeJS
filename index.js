//init
var jenkins = require('jenkins')({ baseUrl: 'http://hmejri:11ff9227f78014214ee53d00a9dd4fc783@localhost:8080', crumbIssuer: true });

//Return Info
// jenkins.info(function(err, data) {
//   if (err) throw err;
 
//   console.log('info', data);
// });

//Build Info
// jenkins.build.get('newPipe', 8, function(err, data) {
//     if (err) throw err;
   
//     console.log('build', data);
//   });

//Get Job Config
// jenkins.job.config('newPipe', function(err, data) {
//     if (err) throw err;

//     console.log('xml', data);
//   });

//read XML as Json
const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

/*read XML*/
let xml_string = fs.readFileSync("./config.xml", "utf8");

/*parse it to JSON*/
// parser.parseString(xml_string, function(error, result) {
//     if(error === null) {
//         console.log(JSON.stringify(result));
//     }
//     else {
//         console.log(error);
//     }
// });
// jenkins.job.create('new2', xml_string, function(err) {
//     if (err) throw err;
//     });

//Delete Job
jenkins.job.destroy('new2', function(err) {
    if (err) throw err;
    else{
        //create Job with XML file 
        jenkins.job.create('new2', xml_string, function(err) {
        if (err) throw err;
        else{
            //Build Job
            jenkins.job.build('new2', function(err, data) {
            if (err) throw err;
  
            console.log('queue item number', data);
            });
        }
        });
    }
});






//Build with params
/*
stage('Test'){
  sh "/bin/bash /hai/mycode/scripts/run_script.sh ${params.highVersion}"
}
*/
// jenkins.job.build({ name: 'example', parameters: { name: 'value' } }, function(err) {
//     if (err) throw err;
//   });
