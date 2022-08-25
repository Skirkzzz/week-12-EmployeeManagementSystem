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

  //Find all employees, join with roles and departments to display their roles, salaries, departments and managers
  findAllDepartments = () => {
    const search = 'SELECT * FROM department';

    return (db != null ? db.promise().query(search) : null)
  }

  const findAllRoles = () => {

    const search = 'SELECT employee_role.title, employee_role.salary, department.department_name FROM employee_role LEFT JOIN department on department.id = employee_role.department_id';

    return (db != null ? db.promise().query(search) : null);

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
