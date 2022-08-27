const inquirer = require("inquirer");

const {
  sqlconnection,
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  updateEmployeeRole,
  renderCompDepartments,
  renderCompRoles,
  renderCompEmployees,
} = require("./lib/selections");

// function init() {
// }

let createDept = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_department",
        message: "Please enter the name of the new department",
      },
    ])
    .then((answers) => {
      createDepartment(answers.new_department).then(() => {
        findAllDepartments().then(([rows]) => {
          console.table(rows);
          console.log("\n");
          init();
        });
      });
    });
};

let newRole = async () => {
  let compDepartments = await renderCompDepartments();
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
    .then(async (answers) => {
      await createRole(
        answers.new_role,
        answers.add_salary,
        answers.create_department
      );
      console.log(`${answers.new_role} added successfully!`);
      await findAllRoles();
      init();
    });
};

let newEmployee = async () => {
  // const tempRoles = await renderCompRoles();
  // console.log(tempRoles);
  // process.exit();
  // const tempEmployees = await renderCompEmployees();
  // let compRoles = Object.values(tempRoles);
  // let compEmployeeNames = Object.values(tempEmployees);
  const compRoles = await renderCompRoles();
  const compEmployeeNames = await renderCompEmployees();
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
      createEmployee(
        answers.add_new_firstname,
        answers.add_new_lastname,
        answers.add_newemployee_role,
        answers.add_newemployee_manager
      );
      console.log(
        `${answers.add_new_firstname} ${answers.add_new_lastname} added successfully!`
      );
      init();
    });
};

let updateEmployeeSelection = async () => {
  const compRoles = await renderCompRoles();
  const compEmployeeNames = await renderCompEmployees();
  inquirer
    .prompt([
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
      console.log(`Employee update successfully!`);
      init();
    });
};

async function start() {
  await sqlconnection();
  // res = await findAllEmployees();
  // console.log(res[0]);
  // process.exit();
  // findAllEmployees().then((res) => {
  //   console.table(res[0]);
  //   init();
  // });
  await init();
  // const res = await renderCompEmployees();
  // console.log(typeof res);
}

async function init() {
  // init();
  const answer = await inquirer.prompt([
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
  ]);

  if (answer.menu == "Find All Departments") {
    findAllDepartments().then(([rows]) => {
      console.table(rows);
      console.log("\n");
      init();
    });
  }
  if (answer.menu == "Find All Roles") {
    findAllRoles().then((res) => {
      console.table(res[0]);
      init();
    });
  }
  if (answer.menu == "Find All Employees") {
    findAllEmployees().then((res) => {
      console.table(res[0]);
      init();
    });
  }
  if (answer.menu == "Create Department") {
    createDept();
  }
  if (answer.menu == "Create Role") {
    // renderCompanyDepartments();
    newRole();
  }
  if (answer.menu == "Create Employee") {
    // renderCompanyEmployees();
    // renderCompanyRoles();
    newEmployee();
  }
  if (answer.menu == "Update Employee Role") {
    // rendercompEmployees();
    // rendercompRoles();
    updateEmployeeSelection();
  }
  if (answer.menu == "Close") {
    console.log("yupppp");
    process.exit();
  }
}

start();
