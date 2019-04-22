
const Controller = require('../controller');
//jest.mock('./controller');


test('Testing null path parameter', () => {
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










