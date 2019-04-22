"use strict";

module.exports = class Controller {
    constructor (path) {
        this._path = path;
    }

    set path(path) {
        this._path = path;
    }
    get path() {
        return this._path;
    }
    get uscpvid() {
        var parts = this.path.split('/');
        if (parts[parts.length-1].length == 8 && !/[^a-zA-Z0-9]/.test(parts[parts.length-1])) {
            return parts[parts.length-1];
        } else {
            return null;
        }
    }

    get isFacultyStaffQuery() {
        // if path is not set or null default to faculty-staff
        //if (typeof this.path == 'undefined' || this.path == null || this.path.indexOf('faculty-staff') > -1) {
        if (typeof this.path == 'undefined' || !this.path || this.path.indexOf('faculty-staff') > -1) {
            return true;
        } else {
            return false;
        }
    }

    get isStudentQuery() {
        if (this.path.indexOf('student') > -1) {
            return true;
        } else {
            return false;
        }
    }

    get isUscpvidQuery() {
        if (typeof this.path == 'undefined' || !this.path) { 
            return false;
        }
        var parts = this.path.split('/');
        /*
        console.log("entire path: "+this.path);
        console.log("last part path: "+parts[parts.length-1]);
        console.log("last part length: "+parts[parts.length-1].length);
        */
        if (parts[parts.length-1].length == 8 && !/[^a-zA-Z0-9]/.test(parts[parts.length-1])) {
            //console.log("last part length is 8 and is alphanumeric: "+parts[parts.length-1]);
            return true;
        } else {
            return false;
        }
    }

    print() {
        console.log(JSON.stringify(this.path));
    }
}

//module.exports = new Controller(path);

