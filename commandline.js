/*
This file is used to run lambda nodejs functions from the commandline:
 node commandline.js*
*/
var lambda = require('./main');

const dotenv = require('dotenv');
dotenv.config();
event =
{
    "resource": "/{faculty-staff+}",
//    "path": "/faculty-staff/scmq7nz9",
    "path": "/faculty-staff",
    "httpMethod": "GET",
    "headers": null,
    "multiValueHeaders": null,
    "queryStringParameters": {
        "test1": "test1",
        "first": "firstname",
        "last": "lastname",
        "tel": "1234",
        "email": "myemail",
        "div": "div1",
        "dept": "dept1",
        "title": "title1",
        "major": "major1",
        "school": "school1",
//        "count": "blah",
//        "basic": "jkhong"
    },
    "multiValueQueryStringParameters": {
        "test1": [
            "test1"
        ]
    },
    "pathParameters": {
        "faculty-staff": "faculty-staff"
    },
    "stageVariables": null,
    "requestContext": {
        "path": "/dir/faculty-staff/scmq7nz9",
        "accountId": "158432785907",
        "resourceId": "2e35xf",
        "stage": "test-invoke-stage",
        "domainPrefix": "testPrefix",
        "requestId": "8a259c1d-6343-11e9-9c94-a57b0579d940",
        "identity": {
            "cognitoIdentityPoolId": null,
            "cognitoIdentityId": null,
            "apiKey": "test-invoke-api-key",
            "cognitoAuthenticationType": null,
            "userArn": "arn:aws:sts::158432785907:assumed-role/SSO-USC-PowerUser/jkhong",
            "apiKeyId": "test-invoke-api-key-id",
            "userAgent": "aws-internal/3 aws-sdk-java/1.11.498 Linux/4.9.137-0.1.ac.218.74.329.metal1.x86_64 OpenJDK_64-Bit_Server_VM/25.202-b08 java/1.8.0_202",
            "accountId": "158432785907",
            "caller": "AROAIKFP3M27LUZBCY6YQ:jkhong",
            "sourceIp": "test-invoke-source-ip",
            "accessKey": "ASIASJY2UOXZXSFKG6HY",
            "cognitoAuthenticationProvider": null,
            "user": "AROAIKFP3M27LUZBCY6YQ:jkhong"
        },
        "domainName": "testPrefix.testDomainName",
        "resourcePath": "/{faculty-staff+}",
        "httpMethod": "GET",
        "extendedRequestId": "YbX_fE5gvHcFRPw=",
        "apiId": "2oosp5tt1g"
    },
    "body": null,
    "isBase64Encoded": false
};


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
