/*
This file is used to run lambda nodejs functions from the commandline:
 node commandline.js*
*/
var lambda = require('./main');

const dotenv = require('dotenv');
dotenv.config();
event ={};
event['URL'] = 'test';
event['EXCLUDES'] = 'test';

// better to see process.env variable in .env file
// examples of in-line code
//process.env['SLACKTOKEN']='test';
//process.env['SLACKNAME']='test';
//process.env['SLACKCHANNEL']='test';
//process.env['SLACKEMOJI']='test';


//console.log(typeof lambda_handler);
//console.log(typeof lambda_handler.handler);
lambda.handler(event,null,function (error) {
    if (error)
        console.log("processing error: "+error.message);
});
console.log("exiting");
process.exit;
