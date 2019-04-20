"use strict";

class Controller {
    constructor (event) {
        this._event = event;
    }

    set event(event) {
        this._event = event;
    }
    get event() {
        return this._event;
    }
    get uscpvid() {
        var parts = this._event.path.split('/');
        if (parts[parts.length-1].length == 8 && !/[^a-zA-Z0-9]/.test(parts[parts.length-1])) {
            return parts[parts.length-1];
        } else {
            return null;
        }
    }

    get isFacultyStaffQuery() {
        if (this._event.path.indexOf('faculty-staff') > -1) {
            return true;
        } else {
            return false;
        }
    }

    get isStudentQuery() {
        if (this._event.path.indexOf('student') > -1) {
            return true;
        } else {
            return false;
        }
    }

    get isUscpvidQuery() {
        if (!this._event.path) {
            return false;
        }
        var parts = this._event.path.split('/');
        /*
        console.log("entire path: "+this._event.path);
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

    get ldapFilter() {
        // should we add ldap filter logic in here or a separate class?
    }

    print() {
        console.log(JSON.stringify(this.event));
    }
}

module.exports = new Controller(event);

