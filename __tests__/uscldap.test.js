
const USCLdap = require('../uscldap');


test('Dummy - will always pass', () => {
    var event = {
        "queryStringParameters": {
            "test": "test1",
            "first": "firstname",
        }
    };
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(1).toBe(1);
});

test('Testing null query string parameter', () => {
    var event = {
        "queryStringParameters": null
    };
    var expectedParameters = null;
    var expectedOptions = {"filter":"(&(objectclass=*))","scope":"sub","sizeLimit":100,"attributes":["dn","mail","telephonenumber","uscpvid","uscsorteddisplayname"]};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toBe(expectedParameters);
    expect(uscldap.facultystaffOptions).toMatchObject(expectedOptions);
});


test('Testing facultystaff uscpvid search', () => {
    var event = {
        "queryStringParameters": null
    };
    var expectedParameters = null;
    var expectedOptions = {"attributes": ["*"], "filter": "uscpvid=scmq7nz9", "scope": "sub"};
    var uscldap = new USCLdap(event.queryStringParameters);
    uscldap.uscpvid = "scmq7nz9";
    expect(uscldap.parameters).toBe(expectedParameters);
    expect(uscldap.uscpvidOptions).toMatchObject(expectedOptions);
});

test('Testing facultystaff basic search', () => {
    var event = {
        "queryStringParameters": {
            "basic": "searchterm"
        }
    };
    var expectedParameters = {"basic": "searchterm"};
    var expectedOptions = {"attributes": ["dn", "mail", "telephonenumber", "uscpvid", "uscsorteddisplayname"], "filter": "(&(|(departmentNumber=*searchterm*)(cn=*searchterm*)(mail=*searchterm*)(telephoneNumber=*searchterm*)(title=*searchterm*)(uscemployeehomedivision=*searchterm*))(|(uscstaff=*)(uscfaculty=*)(!(|(uscstaff=*)(uscfaculty=*)(uscstudent=*)))))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.facultystaffOptions).toMatchObject(expectedOptions);
});

test('Testing facultystaff basic count search', () => {
    var event = {
        "queryStringParameters": {
            "count": "1",
            "basic": "searchterm"
        }
    };
    var expectedParameters = {"basic": "searchterm", "count": true};
    var expectedOptions = {"attributes": ["uscpvid"], "filter": "(&(|(departmentNumber=*searchterm*)(cn=*searchterm*)(mail=*searchterm*)(telephoneNumber=*searchterm*)(title=*searchterm*)(uscemployeehomedivision=*searchterm*))(|(uscstaff=*)(uscfaculty=*)(!(|(uscstaff=*)(uscfaculty=*)(uscstudent=*)))))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.facultystaffOptions).toMatchObject(expectedOptions);
});

test('Testing facultystaff advance search', () => {
    var event = {
        "queryStringParameters": {
            "first": "firstname",
            "last": "lastname",
            "tel": "1234",
            "email": "myemail",
            "div": "div1",
            "dept": "dept1",
            "title": "title1",
            "major": "major1",
            "school": "school1",
            }
    };
    var expectedParameters = {"dept": "dept1", "div": "div1", "email": "myemail", "first": "firstname", "last": "lastname", "major": "major1", "school": "school1", "tel": "1234", "title": "title1"};
    var expectedOptions = {"attributes": ["dn", "mail", "telephonenumber", "uscpvid", "uscsorteddisplayname"], "filter": "(&(givenname=*firstname*)(sn=*lastname*)(telephonenumber=*1234*)(mail=*myemail*)(uscemployeehomedivision=*div1*)(departmentnumber=*dept1*)(title=*title1*))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.facultystaffOptions).toMatchObject(expectedOptions);
});

test('Testing facultystaff advance count search', () => {
    var event = {
        "queryStringParameters": {
            "first": "firstname",
            "last": "lastname",
            "tel": "1234",
            "email": "myemail",
            "div": "div1",
            "dept": "dept1",
            "title": "title1",
            "major": "major1",
            "school": "school1",
            "count": "1"
            }
    };
    var expectedParameters = {"dept": "dept1", "div": "div1", "email": "myemail", "first": "firstname", "last": "lastname", "major": "major1", "school": "school1", "tel": "1234", "title": "title1"};
    var expectedOptions = {"attributes": ["uscpvid"], "filter": "(&(givenname=*firstname*)(sn=*lastname*)(telephonenumber=*1234*)(mail=*myemail*)(uscemployeehomedivision=*div1*)(departmentnumber=*dept1*)(title=*title1*))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.facultystaffOptions).toMatchObject(expectedOptions);
});


test('Testing student uscpvid search', () => {
    var event = {
        "queryStringParameters": null
    };
    var expectedParameters = null;
    var expectedOptions = {"attributes": ["*"], "filter": "uscpvid=scqh4mf5", "scope": "sub"};
    var uscldap = new USCLdap(event.queryStringParameters);
    uscldap.uscpvid = "scqh4mf5";
    expect(uscldap.parameters).toBe(expectedParameters);
    expect(uscldap.uscpvidOptions).toMatchObject(expectedOptions);
});

test('Testing student basic search', () => {
    var event = {
        "queryStringParameters": {
            "basic": "searchterm"
        }
    };
    var expectedParameters = {"basic": "searchterm"};
    var expectedOptions = {"attributes": ["dn", "mail", "telephonenumber", "uscpvid", "uscsorteddisplayname"], "filter": "(&(uscmajor=*)(|(cn=*searchterm*)(mail=*searchterm*)(telephoneNumber=*searchterm*))(uscStudent=Y))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.studentOptions).toMatchObject(expectedOptions);
});

test('Testing student basic count search', () => {
    var event = {
        "queryStringParameters": {
            "count": "1",
            "basic": "searchterm"
        }
    };
    var expectedParameters = {"basic": "searchterm", "count": true};
    var expectedOptions = {"attributes": ["uscpvid"], "filter": "(&(uscmajor=*)(|(cn=*searchterm*)(mail=*searchterm*)(telephoneNumber=*searchterm*))(uscStudent=Y))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.studentOptions).toMatchObject(expectedOptions);
});

test('Testing student advance search', () => {
    var event = {
        "queryStringParameters": {
            "first": "firstname",
            "last": "lastname",
            "tel": "1234",
            "email": "myemail",
            "div": "div1",
            "dept": "dept1",
            "title": "title1",
            "major": "major1",
            "school": "school1",
            }
    };
    var expectedParameters = {"dept": "dept1", "div": "div1", "email": "myemail", "first": "firstname", "last": "lastname", "major": "major1", "school": "school1", "tel": "1234", "title": "title1"};
    var expectedOptions = {"attributes": ["dn", "mail", "telephonenumber", "uscpvid", "uscsorteddisplayname"], "filter": "(&(givenname=*firstname*)(sn=*lastname*)(telephonenumber=*1234*)(mail=*myemail*)(uscemployeehomedivision=*div1*)(departmentnumber=*dept1*)(uscmajor=*major1*)(uscmajorowningschool=*school1*)(uscStudent=Y))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.studentOptions).toMatchObject(expectedOptions);
});

test('Testing student advance count search', () => {
    var event = {
        "queryStringParameters": {
            "first": "firstname",
            "last": "lastname",
            "tel": "1234",
            "email": "myemail",
            "div": "div1",
            "dept": "dept1",
            "title": "title1",
            "major": "major1",
            "school": "school1",
            "count": "1"
            }
    };
    var expectedParameters = {"dept": "dept1", "div": "div1", "email": "myemail", "first": "firstname", "last": "lastname", "major": "major1", "school": "school1", "tel": "1234", "title": "title1"};
    var expectedOptions = {"attributes": ["uscpvid"], "filter": "(&(givenname=*firstname*)(sn=*lastname*)(telephonenumber=*1234*)(mail=*myemail*)(uscemployeehomedivision=*div1*)(departmentnumber=*dept1*)(uscmajor=*major1*)(uscmajorowningschool=*school1*)(uscStudent=Y))", "scope": "sub", "sizeLimit": 100};
    var uscldap = new USCLdap(event.queryStringParameters);
    expect(uscldap.parameters).toMatchObject(expectedParameters);
    expect(uscldap.studentOptions).toMatchObject(expectedOptions);
});


/*

//jest.mock('./controller');


var event_student_uscpvid = {
    "path": "/student/scqh4mf5",
    "queryStringParameters": {
        "test": "test1",
        "first": "firstname",
    }
}

var event = {
    "path": "/student/scqh4mf5",
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
    }
}


test('Testing null path search', () => {
    const event_null_path = {
        "path": "",
    };
    var controller = new Controller(event_null_path.path);
    //expect (classInstance(controllera)).toBe(Controller);
    expect(controller.path).toBe("");
    expect(controller.uscpvid).toBe(null);
    expect(controller.isFacultyStaffQuery).toBe(true);
    expect(controller.isStudentQuery).toBe(false);
    expect(controller.isUscpvidQuery).toBe(false);
});

test('Testing facultystaff uscpvid search', () => {
    const event_facultystaff_uscpvid = {
        "path": "/faculty-staff/scmq7nz9",
    };
    var controller = new Controller(event_facultystaff_uscpvid.path);
    //expect (classInstance(controllera)).toBe(Controller);
    expect(controller.path).toBe("/faculty-staff/scmq7nz9");
    expect(controller.uscpvid).toBe("scmq7nz9");
    expect(controller.isFacultyStaffQuery).toBe(true);
    expect(controller.isStudentQuery).toBe(false);
    expect(controller.isUscpvidQuery).toBe(true);
});

test('Testing facultystaff search', () => {
    const event_facultystaff_uscpvid = {
        "path": "/faculty-staff",
    };
    var controller = new Controller(event_facultystaff_uscpvid.path);
    //expect (classInstance(controllera)).toBe(Controller);
    expect(controller.path).toBe("/faculty-staff");
    expect(controller.uscpvid).toBe(null);
    expect(controller.isFacultyStaffQuery).toBe(true);
    expect(controller.isStudentQuery).toBe(false);
    expect(controller.isUscpvidQuery).toBe(false);
});

test('Testing student uscpvid search', () => {
    const event_student_uscpvid = {
        "path": "/student/scqh4mf5",
    };
    var controller = new Controller(event_student_uscpvid.path);
    //expect (classInstance(controllera)).toBe(Controller);
    expect(controller.path).toBe("/student/scqh4mf5");
    expect(controller.uscpvid).toBe("scqh4mf5");
    expect(controller.isFacultyStaffQuery).toBe(false);
    expect(controller.isStudentQuery).toBe(true);
    expect(controller.isUscpvidQuery).toBe(true);
});

test('Testing student search', () => {
    const event_student = {
        "path": "/student",
    };
    var controller = new Controller(event_student.path);
    //expect (classInstance(controllera)).toBe(Controller);
    expect(controller.path).toBe("/student");
    expect(controller.uscpvid).toBe(null);
    expect(controller.isFacultyStaffQuery).toBe(false);
    expect(controller.isStudentQuery).toBe(true);
    expect(controller.isUscpvidQuery).toBe(false);
});





*/




