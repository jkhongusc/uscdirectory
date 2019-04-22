/* 
This lambda function will be called from the API gateway. 

Input: The event obj will contain a lot of information. Build model (ldap query) based on parameters

Return: Example return expected by the API gateway
    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(entry.object),
        "isBase64Encoded": false
    };
    callback(null,response);

*/
exports.handler = function(event, context, callback) {

    if (!event) {
        var error = new Error('event variable not set');
        callback(error);
        return;
    }
    console.log('event: ' + JSON.stringify(event));

    if (!process.env.LDAP_URL) {
        var error = new Error('LDAP_URL environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.LDAP_BASE) {
        var error = new Error('LDAP_BASE environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.LDAP_USERNAME_FACULTYSTAFF) {
        var error = new Error('LDAP_USERNAME_FACULTYSTAFF environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.LDAP_PASSWORD_FACULTYSTAFF) {
        var error = new Error('LDAP_PASSWORD_FACULTYSTAFF environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.LDAP_USERNAME_STUDENT) {
        var error = new Error('LDAP_USERNAME_STUDENT environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.LDAP_PASSWORD_STUDENT) {
        var error = new Error('LDAP_PASSWORD_STUDENT environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.SLACKTOKEN) {
        var error = new Error('SLACKTOKEN environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.SLACKNAME) {
        var error = new Error('SLACKNAME environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.SLACKCHANNEL) {
        var error = new Error('SLACKCHANNEL environment variable not set');
        callback(error);
        return;
    }
    if (!process.env.SLACKEMOJI) {
        var error = new Error('SLACKEMOJI environment variable not set');
        callback(error);
        return;
    }

    //var url = event.URL;
    //console.log('final URL: ' + url);
    var ldapurl = process.env.LDAP_URL;
    console.log('final LDAP_URL: ' + ldapurl);
    var ldapbase = process.env.LDAP_BASE;
    console.log('final LDAP_BASE: ' + ldapbase);
    var ldapusernamefacultystaff = process.env.LDAP_USERNAME_FACULTYSTAFF;
    console.log('final LDAP_USERNAME_FACULTYSTAFF: ' + ldapusernamefacultystaff);
    var ldappasswordfacultystaff = process.env.LDAP_PASSWORD_FACULTYSTAFF;
    console.log('final LDAP_PASSWORD_FACULTYSTAFF: <hidden>');
    var ldapusernamestudent = process.env.LDAP_USERNAME_STUDENT;
    console.log('final LDAP_USERNAME_STUDENT: ' + ldapusernamestudent);
    var ldappasswordstudent = process.env.LDAP_PASSWORD_STUDENT;
    console.log('final LDAP_PASSWORD_STUDENT: <hidden>');
    var stoken = process.env.SLACKTOKEN;
    console.log('final SLACKTOKEN: <hidden>');
    var sname = process.env.SLACKNAME;
    console.log('final SLACKNAME: ' + sname);
    var schannel = process.env.SLACKCHANNEL;
    console.log('final SLACKCHANNEL: ' + schannel);
    var semoji = process.env.SLACKEMOJI;
    console.log('final SLACKEMOJI: ' + semoji);

    const { WebClient } = require('@slack/client');
    token = 'xoxb-437417541040-437953887284-LkPnovZhk2wP87E9UguzBTw0';
    const slackclient = new WebClient(stoken);

    function slackpost(text) {
        slackclient.chat.postMessage({
            channel: schannel,
            icon_emoji: semoji,
            text: text,
            username: sname
        });
    }
    //slackpost("Starting broken link checker for: "+url);


    // check required event parameters - exit program if not set
    if (!event) { 
        var error = new Error('event variable not set');
        callback(error);
        return;
    } else if (!event.hasOwnProperty('queryStringParameters')) {
        var error = new Error('event queryStringParameters not set');
        callback(error);
        return;
    } else if (!event.hasOwnProperty('path')) {
        var error = new Error('event path properties not set');
        callback(error);
        return;
    }

    const Controller = require('./controller');
    const USCLdap = require('./uscldap');
    var controller = new Controller(event.path);
    console.log(controller.path);

    var uscldapclient = new USCLdap(event.queryStringParameters);
    if (controller.isUscpvidQuery) {
        uscldapclient.uscpvid = controller.uscpvid;
    }
    uscldapclient.print();
    //process.exit();
    /*
    controller.print();
    console.log('isFacultyStaff: ' + controller.isFacultyStaffQuery);
    console.log('isStudent: ' + controller.isStudentQuery);
    console.log('isUscpvid: ' + controller.isUscpvidQuery);
    if (controller.isUscpvidQuery) {
        console.log('uscpvid: ' + controller.uscpvid);
    }
    */
    var ldapusername = "";
    var ldappassword = "";
    var ldapoptions = {};
    if (controller.isFacultyStaffQuery) {
       ldapusername = ldapusernamefacultystaff;
       ldappassword = ldappasswordfacultystaff;
        if (controller.isUscpvidQuery) {
            ldapoptions = uscldapclient.uscpvidOptions;
            console.log(JSON.stringify(ldapoptions));
            console.log('isFacultyStaff uscpvid query: '+ldapoptions.filter);

        } else {
            ldapoptions = uscldapclient.facultystaffOptions;
            console.log(JSON.stringify(ldapoptions));
            console.log('isFacultyStaff search: '+ldapoptions.filter);

        }

    } else if (controller.isStudentQuery) {
        ldapusername = ldapusernamestudent;
        ldappassword = ldappasswordstudent;
        if (controller.isUscpvidQuery) {
            ldapoptions = uscldapclient.uscpvidOptions;
            console.log(JSON.stringify(ldapoptions));
            console.log('isStudent uscpvid query: '+ldapoptions.filter);

        } else {
            ldapoptions = uscldapclient.studentOptions;
            console.log(JSON.stringify(ldapoptions));
            console.log('isStudent search: '+ldapoptions.filter);

        }

    } else {
        // failed
            console.log('[ERROR]: Invalid query');
    }


    //process.exit();
    var ldap = require('ldapjs');
    var client = ldap.createClient({
          url: `${ldapurl}`,
          timeout: 30000
    });
    var results = [];
    client.bind(ldapusername,ldappassword, function(err) {
        if (err) {
          console.log('ldap bind error: ' + err);
        } else {
            console.log('ldap bind successful');
            var opts = {
                filter: 'uscpvid=scmq7nz9',
                scope: 'sub'
            };
            //client.search (ldapbase,opts,(err,res) => {
            client.search (ldapbase,ldapoptions,(err,res) => {
                res.on('searchEntry', (entry) => {
                    //console.log('Entry', JSON.stringify(entry.object));
                    var tmpentry = JSON.parse( JSON.stringify(entry.object));
                    delete tmpentry.controls;
                    delete tmpentry.dn;
                    results.push(JSON.parse( JSON.stringify(tmpentry)));
                    if (results.length == 100) {
                        console.log('search hard-limit end: unbinding');
                        var response = {
                            "statusCode": 200,
                            "body": JSON.stringify(results),
                            "isBase64Encoded": false
                         };
                         callback(null,response);
                        client.unbind(err => {
                            //callback(null,"completed successfully");
                        });

                    }
                });
                res.on('searchReference', (referral) => {
                    //console.log('Referral', referral);
                });
                res.on('error', (err) => {
                    //console.log('Error is', err);
                });
                res.on('end', (result) => {
                    console.log('search end: unbinding');
                    console.log('results', JSON.stringify(results));
                    var response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(results),
                        "isBase64Encoded": false
                     };
                     callback(null,response);
                    //console.log('Result is', result);
                    client.unbind(err => {
                        //callback(null,"completed successfully");
                    });
                });
            })
        }
        //callback(null,"completed successfully");
    });
console.log('lambda end');


/*
   eventually this lambda function will be handling requests from ALB



*/

/* request from ALB
   {
   "requestContext": {
   "elb": {
   "targetGroupArn": "arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-target-group/6d0ecf831eec9f09"
   }
   },
   "httpMethod": "GET",
   "path": "/",
   "queryStringParameters": {parameters},
   "headers": {
   "accept": "text/html,application/xhtml+xml",
   "accept-language": "en-US,en;q=0.8",
   "content-type": "text/plain",
   "cookie": "cookies",
   "host": "lambda-846800462-us-east-2.elb.amazonaws.com",
   "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6)",
   "x-amzn-trace-id": "Root=1-5bdb40ca-556d8b0c50dc66f0511bf520",
   "x-forwarded-for": "72.21.198.66",
   "x-forwarded-port": "443",
   "x-forwarded-proto": "https"
   },
   "isBase64Encoded": false,
   "body": "request_body"
   }
   */



/* response to ALB
   {
   "isBase64Encoded": false,
   "statusCode": 200,
   "statusDescription": "200 OK",
   "headers": {
   "Set-cookie": "cookies",
   "Content-Type": "application/json"
   },
   "body": "Hello from Lambda (optional)"
   }
   */


}
