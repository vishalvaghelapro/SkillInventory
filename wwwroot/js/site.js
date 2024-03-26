$(document).ready(function () {
    getEmpData();
    isLocalStorageClear();
    $.fn.dataTable.ext.errMode = 'throw';
});
function isLocalStorageClear() {
    // Check if LocalStorage has any items
    return localStorage.length === 0;
}

// Example usage:
if (isLocalStorageClear()) {
    document.getElementById("login").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("data").style.display = "none";
} else {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
}
function rolehideshow() {
    $.ajax({
        url: 'LOGIN/RoleDecrypt',
        type: 'Get',
        dataType: 'json',
    })
}
function Login() {
    var objData = {
        admin_id: $("#formAdmin").val(),
        password: $("#formPassword").val()
    };
    console.log(objData);
    console.log(objData.admin_id);

    var full_name = objData.admin_id;
    var name = full_name.split(' ');
    var first_name = name[0];
    var last_name = name[1];

    objData.FirstName = first_name;
    objData.LastName = last_name;


    $.ajax({
        url: '/Login/AdminLogin',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function (res) {

            if (res) {
                localStorage.setItem("token", res.oblogin),
                    localStorage.setItem("Role", res.objRoll),

                    localStorage.getItem("token", res.oblogin),
                    localStorage.getItem("token", res.objRoll)
                RoleDycript();
                function RoleDycript() {
                    var objRole = {
                        Oblogin: localStorage.getItem("token", res.oblogin),
                        ObjRoll: localStorage.getItem("Role", res.objRoll),
                    };
                    $.ajax({
                        url: 'LOGIN/RoleDecrypt',
                        type: 'Post',
                        dataType: 'json',
                        data: objRole,
                        contentType: 'application/x-www-form-urlencoded;charset=utf-8;'
                    })
                };
                window.location = "/home/EmployeeDetail";

                rolework();
                //window.location.href("/home/EmployeeDetail"



                $("Welcome").val(alert("Login Successed"));

            }
            else if (res == 0) {
                alert('Login Failed');
            }
            else {
                alert('Something Went Wrong!');
            }

        },
        error: function () {
            alert("Invalid username or password!");
        }
    })
}

$.ajax({
      url: 'LOGIN/RoleDecrypt',
      type: 'Post',
      data: role,
      contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
      })
      if (role = Employee) {
          //Employee();   
          console.log("Employee");
      }
      else if (role = Admin) {
          //Admin();
          console.log("Manager");
      }
      else 
      {
          console.log("User Doesn't Exit");
      }

/*function Employee()
{

}
function Admin()
{

}*/
function logout() {
    localStorage.clear(),
        $("#Login").modal('hide')
}
function AddEmpData() {

    var objData = {
        FirstName: $('#FName').val(),
        LastName: $('#LName').val(),
        Email: $('#Email').val(),
        Department: $('#DropDepartment').val(),
        SkillId: $('#DropSkill').val(),
        ProficiencyLevel: $('#Proficiency').val(),
        roll: $("#Roll").val(),
        password: $("#Password").val()
    };

    $.ajax({
        url: '/Employee/AddEmp',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            alert('Data Saved');

        },
        error: function () {
            alert("Data Can't Saved!");
        }
    })
}
function getEmpData() {
    $.ajax({
        url: '/Employee/GetData',
        type: 'Get',
        dataType: 'json',
        success: OnSuccess
    })
}

function OnSuccess(response) {
    $('#empDataTable').DataTable({
        bProcessing: true,
        blenghtChange: true,
        lenghtMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
        bfilter: true,
        bSort: true,
        bPaginate: true,
        data: response,
        buttons: [
            {
                text: 'Create new record',
                action: () => {
                    // Create new record
                    editor.create({
                        title: 'Create new record',
                        buttons: 'Add'
                    });
                }
            }
        ],
        columns: [

            {
                data: 'Id',
                visible: false,

                render: function (data, type, row, meta) {

                    return row.employeeSkillId
                }


            },
            {
                data: 'ESId',
                visible: false,
                render: function (data, type, row, meta) {
                    return row.employeeId
                }

            },
            {
                data: 'firstName',
                render: function (data, type, row, meta) {
                    return row.firstName
                }

            },
            {
                data: 'lastName',
                render: function (data, type, row, meta) {
                    return row.lastName
                }

            },
            {
                data: 'email',
                render: function (data, type, row, meta) {
                    return row.email
                }

            },
            {
                data: 'department',
                render: function (data, type, row, meta) {
                    return row.department
                }

            },
            {
                data: 'skill',
                render: function (data, type, row, meta) {
                    return row.skillName
                }

            },
            /*{
                data: 'jobTitle',
                render: function (data, type, row, meta) {
                    return row.jobTitle
                }

            },*/
            {
                data: 'ProficiencyLevel',
                render: function (data, type, row, meta) {
                    return row.proficiencyLevel
                }

            },
            {
                data: 'Roll',
                render: function (data, type, row, meta) {
                    return row.roll
                }

            },
            {
                data: 'Password',
                render: function (data, type, row, meta) {
                    return row.password
                }

            },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-primary' onclick=EditBtn(" + row.employeeSkillId + ");>Edit</a>";
                }

            },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger' onclick=DeleteBtn(" + row.employeeSkillId + "); >Delete</a>";
                }
            },
        ]
    });
}

function EditBtn(employeeSkillId) {

    $.ajax({
        url: '/Employee/EditEmp?id=' + employeeSkillId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (res) {

            //$("#EmployeeMadal").modal('show');
            //$("#FName").val(res.firstName);
            //$("#LName").val(res.lastName);
            //$("#Email").val(res.email);
            //$("#DropDepartment").val(res.department);
            //$("#DropSkill").val(res.skillName);
            //$("#Proficiency").val(res.proficiencyLevel);

            $.each(res, function (index, item) {
                $("#EmployeeMadal").modal('show');
                $("#EId").val(item.employeeId)
                $("#ESId").val(item.employeeSkillId);
                $("#FName").val(item.firstName);
                $("#LName").val(item.lastName);
                $("#Email").val(item.email);
                $("#DropDepartment").val(item.department);
                $("#DropSkill").val(item.skillName);
                $("#DropSkill").val(item.skillId);
                $("#Proficiency").val(item.proficiencyLevel);
                $('#UpdateBtn');
            });
        },
        error: function () {
            alert("Couldn't get data for EmployeeSkillID = " + employeeSkillId);
        }
    })
}

function UpdateEmpBtn() {
    var objData = {
        EmployeeSkillId: $('#ESId').val(),
        EmployeeId: $('#EId').val(),
        FirstName: $('#FName').val(),
        LastName: $('#LName').val(),
        Email: $('#Email').val(),
        Department: $('#DropDepartment').val(),
        SkillId: $('#DropSkill').val(),
        ProficiencyLevel: $('#Proficiency').val()
    };

    $.ajax({
        url: '/Employee/UpdateEmp',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            $("#EmployeeMadal").modal('hide'),
                alert('Data Updated Successfully!');
            window.location.reload();
        },
        error: function () {
            alert("Data Couldn't be Updated!");
        }

    })
}


function DeleteBtn(employeeSkillId) {

    $.ajax({
        url: '/Employee/DeleteEmp?id=' + employeeSkillId,
        data: {},
        success: function () {
            alert("Record Deleted!");
            window.location.reload();
            getEmpData();
        },
        error: function () {
            alert("Data can't be deleted!");
        }

    })

}

$.ajax({
    type: 'Get',
    url: '/Employee/GetDepartmentName',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
    dataType: 'json',

    success: function (res) {
        $('#DropDepartment').html('');
        $('#DropDepartment').html('<Option value="">Select</Option>');
        $.each(res, function (data, value) {

            // $('#DropDepartment').append('<Option value=' + value.department + '>' + value.department + '</Option>');
            $("#DropDepartment").append($("<option     />").val(this.department).text(this.department));

        });
        data = null;
    }

});

$.ajax({
    type: 'Get',
    url: '/Employee/GetSkillName',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (res) {
        $('#DropSkill').html('');
        $('#DropSkill').html('<Option value="">Select</Option>');
        $.each(res, function (data, value) {
            $("#DropSkill").append($("<option     />").val(this.skillId).text(this.skillName));

            // $('#DropSkill').append('<Option value=' + value.skillId + '>' + value.skillName + '</Option>');


        });
        data = null;
    }
});





$(document).ready(function () {
    getEmpData();
    isLocalStorageClear();
    $.fn.dataTable.ext.errMode = 'throw';
});
function isLocalStorageClear() {
    // Check if LocalStorage has any items
    return localStorage.length === 0;
}

// Example usage:
if (isLocalStorageClear()) {
    document.getElementById("login").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("data").style.display = "none";
} else {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
}
function rolehideshow() {
    $.ajax({
        url: 'LOGIN/RoleDecrypt',
        type: 'Get',
        dataType: 'json',
    })
}
function Login() {
    var objData = {
        admin_id: $("#formAdmin").val(),
        password: $("#formPassword").val()
    };
    console.log(objData);
    console.log(objData.admin_id);

    var full_name = objData.admin_id;
    var name = full_name.split(' ');
    var first_name = name[0];
    var last_name = name[1];

    objData.FirstName = first_name;
    objData.LastName = last_name;


    $.ajax({
        url: '/Login/AdminLogin',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function (res) {

            if (res) {
                localStorage.setItem("token", res.oblogin),
                    localStorage.setItem("Role", res.objRoll),

                    localStorage.getItem("token", res.oblogin),
                    localStorage.getItem("token", res.objRoll)
                RoleDycript();
                function RoleDycript() {
                    var objRole = {
                        Oblogin: localStorage.getItem("token", res.oblogin),
                        ObjRoll: localStorage.getItem("Role", res.objRoll),
                    };
                    $.ajax({
                        url: 'LOGIN/RoleDecrypt',
                        type: 'Post',
                        dataType: 'json',
                        data: objRole,
                        contentType: 'application/x-www-form-urlencoded;charset=utf-8;'
                    })
                };
                window.location = "/home/EmployeeDetail";

                rolework();
                //window.location.href("/home/EmployeeDetail"



                $("Welcome").val(alert("Login Successed"));

            }
            else if (res == 0) {
                alert('Login Failed');
            }
            else {
                alert('Something Went Wrong!');
            }

        },
        error: function () {
            alert("Invalid username or password!");
        }
    })
}

/*  $.ajax({
      url: 'LOGIN/RoleDecrypt',
      type: 'Post',
      data: role,
      contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
      })
      if (role = Employee) {
          //Employee();   
          console.log("Employee");
      }
      else if (role = Admin) {
          //Admin();
          console.log("Manager");
      }
      else 
      {
          console.log("User Doesn't Exit");
      }*/

/*function Employee()
{

}
function Admin()
{

}*/
function logout() {
    localStorage.clear(),
        $("#Login").modal('hide')
}
function AddEmpData() {

    var objData = {
        FirstName: $('#FName').val(),
        LastName: $('#LName').val(),
        Email: $('#Email').val(),
        Department: $('#DropDepartment').val(),
        SkillId: $('#DropSkill').val(),
        ProficiencyLevel: $('#Proficiency').val(),
        roll: $("#Roll").val(),
        password: $("#Password").val()
    };

    $.ajax({
        url: '/Employee/AddEmp',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            alert('Data Saved');

        },
        error: function () {
            alert("Data Can't Saved!");
        }
    })
}
function getEmpData() {
    $.ajax({
        url: '/Employee/GetData',
        type: 'Get',
        dataType: 'json',
        success: OnSuccess
    })
}

function OnSuccess(response) {
    $('#empDataTable').DataTable({
        bProcessing: true,
        blenghtChange: true,
        lenghtMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
        bfilter: true,
        bSort: true,
        bPaginate: true,
        data: response,
        buttons: [
            {
                text: 'Create new record',
                action: () => {
                    // Create new record
                    editor.create({
                        title: 'Create new record',
                        buttons: 'Add'
                    });
                }
            }
        ],
        columns: [

            {
                data: 'Id',
                visible: false,

                render: function (data, type, row, meta) {

                    return row.employeeSkillId
                }


            },
            {
                data: 'ESId',
                visible: false,
                render: function (data, type, row, meta) {
                    return row.employeeId
                }

            },
            {
                data: 'firstName',
                render: function (data, type, row, meta) {
                    return row.firstName
                }

            },
            {
                data: 'lastName',
                render: function (data, type, row, meta) {
                    return row.lastName
                }

            },
            {
                data: 'email',
                render: function (data, type, row, meta) {
                    return row.email
                }

            },
            {
                data: 'department',
                render: function (data, type, row, meta) {
                    return row.department
                }

            },
            {
                data: 'skill',
                render: function (data, type, row, meta) {
                    return row.skillName
                }

            },
            /*{
                data: 'jobTitle',
                render: function (data, type, row, meta) {
                    return row.jobTitle
                }

            },*/
            {
                data: 'ProficiencyLevel',
                render: function (data, type, row, meta) {
                    return row.proficiencyLevel
                }

            },
            {
                data: 'Roll',
                render: function (data, type, row, meta) {
                    return row.roll
                }

            },
            {
                data: 'Password',
                render: function (data, type, row, meta) {
                    return row.password
                }

            },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-primary' onclick=EditBtn(" + row.employeeSkillId + ");>Edit</a>";
                }

            },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger' onclick=DeleteBtn(" + row.employeeSkillId + "); >Delete</a>";
                }
            },
        ]
    });
}

function EditBtn(employeeSkillId) {

    $.ajax({
        url: '/Employee/EditEmp?id=' + employeeSkillId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (res) {

            //$("#EmployeeMadal").modal('show');
            //$("#FName").val(res.firstName);
            //$("#LName").val(res.lastName);
            //$("#Email").val(res.email);
            //$("#DropDepartment").val(res.department);
            //$("#DropSkill").val(res.skillName);
            //$("#Proficiency").val(res.proficiencyLevel);

            $.each(res, function (index, item) {
                $("#EmployeeMadal").modal('show');
                $("#EId").val(item.employeeId)
                $("#ESId").val(item.employeeSkillId);
                $("#FName").val(item.firstName);
                $("#LName").val(item.lastName);
                $("#Email").val(item.email);
                $("#DropDepartment").val(item.department);
                $("#DropSkill").val(item.skillName);
                $("#DropSkill").val(item.skillId);
                $("#Proficiency").val(item.proficiencyLevel);
                $('#UpdateBtn');
            });
        },
        error: function () {
            alert("Couldn't get data for EmployeeSkillID = " + employeeSkillId);
        }
    })
}

function UpdateEmpBtn() {
    var objData = {
        EmployeeSkillId: $('#ESId').val(),
        EmployeeId: $('#EId').val(),
        FirstName: $('#FName').val(),
        LastName: $('#LName').val(),
        Email: $('#Email').val(),
        Department: $('#DropDepartment').val(),
        SkillId: $('#DropSkill').val(),
        ProficiencyLevel: $('#Proficiency').val()
    };

    $.ajax({
        url: '/Employee/UpdateEmp',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            $("#EmployeeMadal").modal('hide'),
                alert('Data Updated Successfully!');
            window.location.reload();
        },
        error: function () {
            alert("Data Couldn't be Updated!");
        }

    })
}


function DeleteBtn(employeeSkillId) {

    $.ajax({
        url: '/Employee/DeleteEmp?id=' + employeeSkillId,
        data: {},
        success: function () {
            alert("Record Deleted!");
            window.location.reload();
            getEmpData();
        },
        error: function () {
            alert("Data can't be deleted!");
        }

    })

}

$.ajax({
    type: 'Get',
    url: '/Employee/GetDepartmentName',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
    dataType: 'json',

    success: function (res) {
        $('#DropDepartment').html('');
        $('#DropDepartment').html('<Option value="">Select</Option>');
        $.each(res, function (data, value) {

            // $('#DropDepartment').append('<Option value=' + value.department + '>' + value.department + '</Option>');
            $("#DropDepartment").append($("<option     />").val(this.department).text(this.department));

        });
        data = null;
    }

});

$.ajax({
    type: 'Get',
    url: '/Employee/GetSkillName',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (res) {
        $('#DropSkill').html('');
        $('#DropSkill').html('<Option value="">Select</Option>');
        $.each(res, function (data, value) {
            $("#DropSkill").append($("<option     />").val(this.skillId).text(this.skillName));

            // $('#DropSkill').append('<Option value=' + value.skillId + '>' + value.skillName + '</Option>');


        });
        data = null;
    }
});





$(document).ready(function () {
    getEmpData();
    isLocalStorageClear();
    $.fn.dataTable.ext.errMode = 'throw';
});
function isLocalStorageClear() {
    // Check if LocalStorage has any items
    return localStorage.length === 0;
}

// Example usage:
if (isLocalStorageClear()) {
    document.getElementById("login").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("data").style.display = "none";
} else {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
}
function rolehideshow() {
    $.ajax({
        url: 'LOGIN/RoleDecrypt',
        type: 'Get',
        dataType: 'json',
    })
}
function Login() {
    var objData = {
        admin_id: $("#formAdmin").val(),
        password: $("#formPassword").val()
    };
    console.log(objData);
    console.log(objData.admin_id);

    var full_name = objData.admin_id;
    var name = full_name.split(' ');
    var first_name = name[0];
    var last_name = name[1];

    objData.FirstName = first_name;
    objData.LastName = last_name;


    $.ajax({
        url: '/Login/AdminLogin',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function (res) {

            if (res) {
                localStorage.setItem("token", res.oblogin),
                    localStorage.setItem("Role", res.objRoll),

                    localStorage.getItem("token", res.oblogin),
                    localStorage.getItem("token", res.objRoll)
                RoleDycript();
                function RoleDycript() {
                    var objRole = {
                        Oblogin: localStorage.getItem("token", res.oblogin),
                        ObjRoll: localStorage.getItem("Role", res.objRoll),
                    };
                    $.ajax({
                        url: 'LOGIN/RoleDecrypt',
                        type: 'Post',
                        dataType: 'json',
                        data: objRole,
                        contentType: 'application/x-www-form-urlencoded;charset=utf-8;'
                    })
                };
                window.location = "/home/EmployeeDetail";

                rolework();
                //window.location.href("/home/EmployeeDetail"



                $("Welcome").val(alert("Login Successed"));

            }
            else if (res == 0) {
                alert('Login Failed');
            }
            else {
                alert('Something Went Wrong!');
            }

        },
        error: function () {
            alert("Invalid username or password!");
        }
    })
}

/*  $.ajax({
      url: 'LOGIN/RoleDecrypt',
      type: 'Post',
      data: role,
      contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
      })
      if (role = Employee) {
          //Employee();   
          console.log("Employee");
      }
      else if (role = Admin) {
          //Admin();
          console.log("Manager");
      }
      else 
      {
          console.log("User Doesn't Exit");
      }*/

/*function Employee()
{

}
function Admin()
{

}*/
function logout() {
    localStorage.clear(),
        $("#Login").modal('hide')
}
function AddEmpData() {

    var objData = {
        FirstName: $('#FName').val(),
        LastName: $('#LName').val(),
        Email: $('#Email').val(),
        Department: $('#DropDepartment').val(),
        SkillId: $('#DropSkill').val(),
        ProficiencyLevel: $('#Proficiency').val(),
        roll: $("#Roll").val(),
        password: $("#Password").val()
    };

    $.ajax({
        url: '/Employee/AddEmp',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            alert('Data Saved');

        },
        error: function () {
            alert("Data Can't Saved!");
        }
    })
}
function getEmpData() {
    $.ajax({
        url: '/Employee/GetData',
        type: 'Get',
        dataType: 'json',
        success: OnSuccess
    })
}

function OnSuccess(response) {
    $('#empDataTable').DataTable({
        bProcessing: true,
        blenghtChange: true,
        lenghtMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
        bfilter: true,
        bSort: true,
        bPaginate: true,
        data: response,
        buttons: [
            {
                text: 'Create new record',
                action: () => {
                    // Create new record
                    editor.create({
                        title: 'Create new record',
                        buttons: 'Add'
                    });
                }
            }
        ],
        columns: [

            {
                data: 'Id',
                visible: false,

                render: function (data, type, row, meta) {

                    return row.employeeSkillId
                }


            },
            {
                data: 'ESId',
                visible: false,
                render: function (data, type, row, meta) {
                    return row.employeeId
                }

            },
            {
                data: 'firstName',
                render: function (data, type, row, meta) {
                    return row.firstName
                }

            },
            {
                data: 'lastName',
                render: function (data, type, row, meta) {
                    return row.lastName
                }

            },
            {
                data: 'email',
                render: function (data, type, row, meta) {
                    return row.email
                }

            },
            {
                data: 'department',
                render: function (data, type, row, meta) {
                    return row.department
                }

            },
            {
                data: 'skill',
                render: function (data, type, row, meta) {
                    return row.skillName
                }

            },
            /*{
                data: 'jobTitle',
                render: function (data, type, row, meta) {
                    return row.jobTitle
                }

            },*/
            {
                data: 'ProficiencyLevel',
                render: function (data, type, row, meta) {
                    return row.proficiencyLevel
                }

            },
            {
                data: 'Roll',
                render: function (data, type, row, meta) {
                    return row.roll
                }

            },
            {
                data: 'Password',
                render: function (data, type, row, meta) {
                    return row.password
                }

            },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-primary' onclick=EditBtn(" + row.employeeSkillId + ");>Edit</a>";
                }

            },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger' onclick=DeleteBtn(" + row.employeeSkillId + "); >Delete</a>";
                }
            },
        ]
    });
}

function EditBtn(employeeSkillId) {

    $.ajax({
        url: '/Employee/EditEmp?id=' + employeeSkillId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (res) {

            //$("#EmployeeMadal").modal('show');
            //$("#FName").val(res.firstName);
            //$("#LName").val(res.lastName);
            //$("#Email").val(res.email);
            //$("#DropDepartment").val(res.department);
            //$("#DropSkill").val(res.skillName);
            //$("#Proficiency").val(res.proficiencyLevel);

            $.each(res, function (index, item) {
                $("#EmployeeMadal").modal('show');
                $("#EId").val(item.employeeId)
                $("#ESId").val(item.employeeSkillId);
                $("#FName").val(item.firstName);
                $("#LName").val(item.lastName);
                $("#Email").val(item.email);
                $("#DropDepartment").val(item.department);
                $("#DropSkill").val(item.skillName);
                $("#DropSkill").val(item.skillId);
                $("#Proficiency").val(item.proficiencyLevel);
                $('#UpdateBtn');
            });
        },
        error: function () {
            alert("Couldn't get data for EmployeeSkillID = " + employeeSkillId);
        }
    })
}

function UpdateEmpBtn() {
    var objData = {
        EmployeeSkillId: $('#ESId').val(),
        EmployeeId: $('#EId').val(),
        FirstName: $('#FName').val(),
        LastName: $('#LName').val(),
        Email: $('#Email').val(),
        Department: $('#DropDepartment').val(),
        SkillId: $('#DropSkill').val(),
        ProficiencyLevel: $('#Proficiency').val()
    };

    $.ajax({
        url: '/Employee/UpdateEmp',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            $("#EmployeeMadal").modal('hide'),
                alert('Data Updated Successfully!');
            window.location.reload();
        },
        error: function () {
            alert("Data Couldn't be Updated!");
        }

    })
}


function DeleteBtn(employeeSkillId) {

    $.ajax({
        url: '/Employee/DeleteEmp?id=' + employeeSkillId,
        data: {},
        success: function () {
            alert("Record Deleted!");
            window.location.reload();
            getEmpData();
        },
        error: function () {
            alert("Data can't be deleted!");
        }

    })

}

$.ajax({
    type: 'Get',
    url: '/Employee/GetDepartmentName',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
    dataType: 'json',

    success: function (res) {
        $('#DropDepartment').html('');
        $('#DropDepartment').html('<Option value="">Select</Option>');
        $.each(res, function (data, value) {

            // $('#DropDepartment').append('<Option value=' + value.department + '>' + value.department + '</Option>');
            $("#DropDepartment").append($("<option     />").val(this.department).text(this.department));

        });
        data = null;
    }

});

$.ajax({
    type: 'Get',
    url: '/Employee/GetSkillName',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (res) {
        $('#DropSkill').html('');
        $('#DropSkill').html('<Option value="">Select</Option>');
        $.each(res, function (data, value) {
            $("#DropSkill").append($("<option     />").val(this.skillId).text(this.skillName));

            // $('#DropSkill').append('<Option value=' + value.skillId + '>' + value.skillName + '</Option>');


        });
        data = null;
    }
});





