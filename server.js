const {
  sqlconnection,
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  updateEmployeeRole,
} = require("./lib/selections");

function questionList() {
  const inquirer = require("inquirer");
  const compDepartments = [];
  const compRoles = [];
  const compEmployeeNames = [{ value: 0, name: "NONE" }];
}

inquirer
  .prompt([
    {
      type: "list",
      name: "menu",
      message: "SELECT AN OPTION TO CONTINUE:",
      choices: [
        "Find All Departments",
        "Find All Roles",
        "Find All Employees",
        "Create Department",
        "Create Role",
        "Create Employee",
        "Update Employee Role",
        "Close",
      ],
    },
  ])
  .then((answer) => {
    if (answer.menu == "Find All Departments") {
      findAllDepartments().then(([rows]) => {
        console.table(rows);
        console.log("\n");
        questionList();
      });
    }
    if (answer.menu == "Find all Roles") {
      findAllRoles().then(([rows]) => {
        console.table(rows);
        console.log("\n");
        questionList();
      });
    }
    if (answer.menu == "Find all Employees") {
      findAllEmployees().then(([rows]) => {
        console.table(rows);
        console.log("\n");
        questionList();
      });
    }
    if (answer.menu == "Create Department") {
      createDepartment();
    }
    if (answer.menu == "Create Role") {
      renderCompanyDepartments();
      createRole();
    }
    if (answer.menu == "Add new Employee") {
      renderCompanyEmployees();
      renderCompanyRoles();
      createEmployee();
    }
    if (answer.menu == "Update Employee Role") {
      rendercompEmployees();
      rendercompRoles();
      updateEmployeeRole();
    }
    if (answer.menu == "Close") {
      process.exit();
    }
  });

let createDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_department",
        message: "Please enter the name of the new department",
      },
    ])

    .then((answers) => {
      createDepartment(answers.new_department).then(
        viewOurDepartments().then(([rows]) => {
          console.table(rows);
          console.log("\n");
          questionList();
        })
      );
    });
};

let createRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_role",
        message: "Please name the new role?",
      },

      {
        type: "input",
        name: "add_salary",
        message: "Please enter the salary of the new role?",
      },

      {
        type: "list",
        name: "create_department",
        message: "Please enter the department the new role belongs to?",
        choices: compDepartments,
      },
    ])
    .then((answers) => {
      db.query("SELECT * FROM department ", function (err, results) {
        for (i = 0; i < results.length; i++) {
          if (results[i].department_name == answers.add_department) {
            department_id = results[i].id;
            addRole(answers.new_role, answers.add_salary, department_id);
            questionList();
          }
        }
      });
    });
};

let createEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add_new_firstname",
        message: "What is the new employee's first name?",
      },

      {
        type: "input",
        name: "add_new_lastname",
        message: "What is the new employee's last name?",
      },

      {
        name: "add_newemployee_role",
        type: "list",
        message: "What is the new employee's role?",
        choices: compRoles,
      },

      {
        type: "list",
        name: "add_newemployee_manager",
        message: "Who is the new  employee's manager?",
        choices: compEmployeeNames,
      },
    ])
    .then((answers) => {
      addEmployee(
        answers.add_new_firstname,
        answers.add_new_lastname,
        answers.add_newemployee_role,
        answers.add_newemployee_manager
      );

      questionList();
    });
};

let updateEmployeeSelection = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "updated_credentials",
        message: "Please enter the updated credentials",
      },

      {
        type: "list",
        name: "employee_update",
        message: "Select an employee to update his/her role:",
        choices: compEmployeeNames,
      },

      {
        type: "list",
        name: "role_update",
        message: "Assign a new role to the selected employee:",
        choices: compRoles,
      },
    ])

    .then((answers) => {
      console.log(answers.role_update);
      console.log(answers.employee_update);
      updateEmployeeRole(answers.role_update, answers.employee_update);

      questionList();
    });
};

let renderCompDepartments = () => {
  db.query("SELECT * FROM department ", function (err, results) {
    for (i = 0; i < results.length; i++) {
      compDepartments.push(results[i].department_name);
    }
  });
};

let renderCompRoles = () => {
  db.query(
    "SELECT id as value, title as name FROM employee_role ",
    function (err, results) {
      let renderList = [];

      for (i = 0; i < results.length; i++) {
        renderList.push(results[i]);
      }

      for (i = 0; i < results.length; i++) {
        let renderName = renderList.pop();
        compRoles.push(renderName);
      }
    }
  );
};

let renderCompEmployees = () => {
  db.query(
    "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee",
    function (err, results) {
      let renderList = [];

      for (i = 0; i < results.length; i++) {
        renderList.push(results[i]);
      }

      for (i = 0; i < results.length; i++) {
        let renderName = renderList.pop();
        compEmployeeNames.push(renderName);
      }
    }
  );
};

sqlconnection();

questionList();
