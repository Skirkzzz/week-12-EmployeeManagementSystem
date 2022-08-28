const e = require("express");

const sqlconnection = async () => {
  console.log(">>>>");
  const sql = require("mysql2");

  db = await sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "companyDatabase",
    },
    console.log(`Server connected to the company database.`)
  );
};

//Find all employees, join with roles and departments to display their roles, salaries, departments and managers
async function findAllDepartments() {
  const search = "SELECT * FROM department";

  return db != null ? db.promise().query(search) : null;
}

const findAllRoles = () => {
  console.log("here");
  const search =
    "SELECT employee_role.id, employee_role.title, employee_role.salary, department.department_name FROM employee_role INNER JOIN department on department.id = employee_role.department_id";

  return db != null ? db.promise().query(search) : null;
};

const findAllEmployees = () => {
  const search =
    'SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.department_name, CONCAT(managers.first_name," ", managers.last_name) AS manager FROM department INNER JOIN employee_role ON department.id = employee_role.department_id INNER JOIN employee ON employee_role.id = employee.role_id LEFT JOIN employee AS managers on employee.manager_id = managers.id';

  return db != null ? db.promise().query(search) : null;
};

//Create employees, roles, departments and managers
const createDepartment = (answer) => {
  const sql = `INSERT INTO department (department_name) VALUES ('${answer}')`;

  return db != null ? db.promise().query(sql) : null;
};

const createRole = async (title, salary, department_name) => {
  let dept_id = null;
  const allDept = await findAllDepartments();
  const listOfDept = allDept[0];
  console.log(Object.keys(listOfDept));
  for (const dept in listOfDept) {
    console.log(department_name, listOfDept[dept]);
    if (listOfDept[dept]["department_name"] == department_name) {
      console.log("kjdfnskdjnf");
      dept_id = listOfDept[dept]["id"];
    }
  }

  const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES ('${title}', '${salary}', ${dept_id})`;
  return db != null ? db.promise().query(sql) : null;
};

const createEmployee = async (first_name, last_name, role_name, manager) => {
  let role_id = null;
  let manager_id = null;

  // get all the roles
  const allRoles = await findAllRoles();
  const listOfRoles = allRoles[0];
  // check for selected role
  for (const role in listOfRoles) {
    if (listOfRoles[role]["title"] == role_name) {
      role_id = listOfRoles[role]["id"];
      break;
    }
  }

  // get all the employees
  const allEmp = await findAllEmployees();
  const listOfEmp = allEmp[0];
  // check for selected employee as manager
  for (const emp in listOfEmp) {
    if (
      listOfEmp[emp]["first_name"] + " " + listOfEmp[emp]["last_name"] ==
      manager
    ) {
      manager_id = listOfEmp[emp]["id"];
      break;
    }
  }

  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
  return db != null ? db.promise().query(sql) : null;
};

const updateEmployeeRole = async (newTitle, newEmployee) => {
  let empId = null;
  let role_id = null;
  // get all the employees
  const allEmp = await findAllEmployees();
  const listOfEmp = allEmp[0];
  // check for selected employee as manager
  for (const emp in listOfEmp) {
    if (
      listOfEmp[emp]["first_name"] + " " + listOfEmp[emp]["last_name"] ==
      newEmployee
    ) {
      empId = listOfEmp[emp]["id"];
      break;
    }
  }

  // get all the roles
  const allRoles = await findAllRoles();
  const listOfRoles = allRoles[0];
  // check for selected role
  for (const role in listOfRoles) {
    if (listOfRoles[role]["title"] == newTitle) {
      role_id = listOfRoles[role]["id"];
      break;
    }
  }

  db.query(
    "UPDATE employee INNER JOIN employee_role ON employee.role_id= employee_role.id SET employee.role_id = ? WHERE employee.id= ?",
    [role_id, empId],
    function (err, results) {
      // console.log(results);
    }
  );
  return;
};

let renderCompDepartments = async () => {
  let compDepartments = [];
  db.query("SELECT * FROM department ", function (err, results) {
    for (i = 0; i < results.length; i++) {
      compDepartments.push(results[i].department_name);
    }
  });
  return compDepartments;
};

let renderCompRoles = async () => {
  let compRoles = [];

  const allRoles = await findAllRoles();
  const listOfRoles = allRoles[0];
  // check for selected role
  for (const role in listOfRoles) {
    // console.log(listOfRoles[role]);
    compRoles.push(listOfRoles[role]["title"]);
  }

  return compRoles;
};

let renderCompEmployees = async () => {
  let compEmployeeNames = [];

  const allEmp = await findAllEmployees();
  const listOfEmp = allEmp[0];
  // check for selected role
  for (const emp in listOfEmp) {
    compEmployeeNames.push(
      listOfEmp[emp]["first_name"] + " " + listOfEmp[emp]["last_name"]
    );
  }

  return compEmployeeNames;
};

module.exports = {
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
};
