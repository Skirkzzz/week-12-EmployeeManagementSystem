const sqlconnection = () => {
  const sql = require ('mysql2');

  db = sql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'companyDatabase'
},
console.log(`Server connected to the company database.`)
  );
}

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  //Find all employees, join with roles and departments to display their roles, salaries, departments and managers
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id,employee.first_name, employee.last_name, role.title, department.name AS department,"
      );
  }
};

findAllPossibleManagers(employeeId) {
    return this.connection.promise().query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
    );
};

//Create a new employee
createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
};

//Remove an employee with the given id
removeEmployee(employeeId) {
    return this.connection.promise().query(
        "DELETE FROM employee WHERE id = ?",
        employeeId
    );
};

//Update an employee role
updateEmployeeRole(employeeId) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleID, employeeId]
    );
};
