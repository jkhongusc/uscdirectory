"use strict";

/*
Build an ldap filter for the USC Directory 


Example ldapfilters:
(&(|(cn=*jkho*)(mail=*jkho*))(|(uscstaff=*)(uscfaculty=*)(!(|(uscstaff=*)(uscfaculty=*)(uscstudent=*)))))
(&(givenname=*firsta*)(sn=*lasta*)(title=*titlea*)(departmentnumber=*depta*)(uscemployeehomedivision=*diva*)(telephonenumber=*123*)(mail=*emaila@usc.edu*))


(&(uscmajor=*)(|(cn=*janine b*)(mail=*janine b*))(uscStudent=Y))
uscpvid=scbk8kr5
(&(givenname=*first1*)(sn=*last1*)(telephonenumber=*1234*)(mail=*jkhong@usc.edu*)(uscmajor=*maj1*)(uscmajorowningschool=*Humanities*)(uscStudent=Y))


*/
module.exports = class USCLdap{
    constructor (parameters) {
        var filteredparameters = {};
        if (typeof parameters == 'undefined' || !parameters) {
            this.parameters = null;
            return;
        }

        // see if count paramter is set
        if (typeof parameters.count !== 'undefined' && parameters.count) {
            console.log("count is set");
            this.count = true;    
            filteredparameters['count'] = true;
        }
        // see if basic paramter is set
        if (typeof parameters.basic !== 'undefined' && parameters.basic) {
            console.log("basic is set");
            this.basic = parameters.basic.trim();    
            filteredparameters['basic'] = this.basic;
        }
        // filter through the parameters, only accept valid ldap parameters
        var validadvparameters = this.ALL_VALIDINPUTPARAMETERS;
        for (var i in parameters) {
            if (validadvparameters.includes(i)) {
                filteredparameters[i] = parameters[i];
            }
        }
        this.parameters = filteredparameters;
    }

    // (psuedo) constants 
    get USCPVID_ATTRIBUTES () {
        return ['*'];
    }
    get COUNT_ATTRIBUTES() {
        //return ['dn'];
        return ['uscpvid'];
    }
    get FACULTYSTAFF_ATTRIBUTES () {
        return ['dn', 'mail', 'telephonenumber','uscpvid','uscsorteddisplayname'];
    }
    get STUDENT_ATTRIBUTES () {
        return ['dn', 'mail', 'telephonenumber','uscpvid','uscsorteddisplayname'];
    }
    get FACULTYSTAFF_BASICSEARCH () {
        return "(&(|(departmentNumber=*_BASIC_*)(cn=*_BASIC_*)(mail=*_BASIC_*)(telephoneNumber=*_BASIC_*)(title=*_BASIC_*)(uscemployeehomedivision=*_BASIC_*))(|(uscstaff=*)(uscfaculty=*)(!(|(uscstaff=*)(uscfaculty=*)(uscstudent=*)))))";;
    }
    get STUDENT_BASICSEARCH () {
        return "(&(uscmajor=*)(|(cn=*_BASIC_*)(mail=*_BASIC_*)(telephoneNumber=*_BASIC_*))(uscStudent=Y))";
    }
    get ALL_VALIDINPUTPARAMETERS() {
        return [ "first","last","tel","email","div","dept","title","major","school" ];
    }
    get FACULTYSTAFF_VALIDINPUTPARAMETERS() {
        return [ "first","last","tel","email","div","dept","title" ];
    }
    get STUDENT_VALIDINPUTPARAMETERS() {
        return [ "first","last","tel","email","div","dept","major","school" ];
    }
    get FACULTYSTAFF_MAPPINGINPUTPARAMETERS() {
        return { "first": "givenname","last": "sn","tel": "telephonenumber","email": "mail","div": "uscemployeehomedivision","dept": "departmentnumber","title": "title" };
    }
    get STUDENT_MAPPINGINPUTPARAMETERS() {
        return { "first": "givenname","last": "sn","tel": "telephonenumber","email": "mail","div": "uscemployeehomedivision","dept": "departmentnumber","major": "uscmajor", "school": "uscmajorowningschool" };
    }


    set count(count) {
        this._count = count;
    }
    get count() {
        return this._count;
    }

    set basic(basic) {
        this._basic = basic;
    }
    get basic() {
        return this._basic;
    }

    set parameters(parameters) {
        this._parameters = parameters;
    }
    get parameters() {
        return this._parameters;
    }

    set uscpvid(uscpvid) {
        this._uscpvid = uscpvid;
    }
    get uscpvid() {
        return this._uscpvid;
    }

    get uscpvidOptions() {
        // ldap filter depends on model which are determined by parameters
        return {
             filter: "uscpvid="+this._uscpvid,
             scope: 'sub',
             attributes: this.USCPVID_ATTRIBUTES
             //attributes: ['*']
        };
    }

    //ldapOptions(type="facultystaff") {
    ldapOptions(type) {
        var validadvparameters = null;
        var mappingadvparameters = null;
        var myfilter = "";
        var myattributes = [];
        var advfilter = "";
        if (type == "student") {
            validadvparameters = this.STUDENT_VALIDINPUTPARAMETERS; 
            mappingadvparameters = this.STUDENT_MAPPINGINPUTPARAMETERS; 
        } else {
            type = "facultystaff"
            validadvparameters = this.FACULTYSTAFF_VALIDINPUTPARAMETERS; 
            mappingadvparameters = this.FACULTYSTAFF_MAPPINGINPUTPARAMETERS; 
        }
        
        // ldap filter depends on model which are determined by parameters
        if (this.parameters && typeof this.parameters.basic !== 'undefined' && this.parameters.basic) {
            console.log("basic search filter");
            if (type == "student") {
                myfilter = this.STUDENT_BASICSEARCH.replace(/_BASIC_/g,this.parameters.basic);
            } else {
                myfilter = this.FACULTYSTAFF_BASICSEARCH.replace(/_BASIC_/g,this.parameters.basic);
            }
        } else {
            console.log("advanced search filter");
            if (this.parameters && !this.parameters) {
                for (var i in this.parameters) {
                    if (validadvparameters.includes(i)) {
                        advfilter += "("+mappingadvparameters[i]+"=*"+this.parameters[i]+"*)";
                    }
                }
            } else {
                advfilter ="(objectclass=*)";
            }
            if (type == "student") {
                myfilter = "(&"+advfilter+"(uscStudent=Y))";
            } else {
                myfilter = "(&"+advfilter+")";
            }
            console.log("advance filter: "+myfilter);
        }
        if (this.parameters && typeof this.parameters.count !== 'undefined' && this.parameters.count) {
            myattributes = this.COUNT_ATTRIBUTES;
        } else {
            if (type == "student") {
                myattributes = this.STUDENT_ATTRIBUTES;
            } else {
                 myattributes = this.FACULTYSTAFF_ATTRIBUTES;
            }
        }
        return {
             filter: myfilter,
             scope: 'sub',
             sizeLimit: 100,
             attributes: myattributes
        };
    }

    get facultystaffOptions() {
        return this.ldapOptions("facultystaff");
    }

    get studentOptions() {
        return this.ldapOptions("student");
    }

    print() {
        if (this.uscpvid) {
            console.log(this.uscpvid);
        }
        console.log(JSON.stringify(this.parameters));
    }
}

//module.exports = new USCLdap();

