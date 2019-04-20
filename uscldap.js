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
        this._parameters = parameters;
    }

    // (fake) constants 
    get USCPVID_ATTRIBUTES () {
        return ['*'];
    }

    get FACULTYSTAFF_ATTRIBUTES () {
        return ['*'];
    }

    get STUDENT_ATTRIBUTES () {
        return ['*'];
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

    get facultystaffOptions() {
        // ldap filter depends on model which are determined by parameters
        return {
             filter: "uscpvid="+this._uscpvid,
             scope: 'sub',
             attributes: ['*']
        };
    }

    get studentOptions() {
        // ldap filter depends on model which are determined by parameters
        return {
             filter: "uscpvid="+this._uscpvid,
             scope: 'sub',
             attributes: ['*']
        };
    }

    print() {
        console.log(this.uscpvid);
        console.log(JSON.stringify(this.parameters));
    }
}

//module.exports = new USCLdap();

