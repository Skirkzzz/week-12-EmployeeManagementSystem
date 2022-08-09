const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const { inherits } = require("util");
const Choices = require("inquirer/lib/objects/choices");
const db; require("./db");
require("console.table");

// Display logo text, load main prompts
init() {
    const logoText = logo({ name: "Employee Manager"}).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type:"list",
            name: "choice"
            message; "what would you like to do?"
            Choices;
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_By_Department"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                }
        }
}

]).then(res => {
    let (choice) {
        // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
        case "VIEW_EMPLOYEES_By_Department":
        viewEmployeesByDepartment();
        break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
        case "ADD_EMPLOYEE":
        addEmployee();
        break;
        case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
        case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
        case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
        case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
        case "ADD_DEPARTMENT":
        addDepartment();
        break;
        case "REMOVE_DEPARTMENT":
            reoveDepartment();
        break;
        case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
            viewUnutilizedBudgetByDepartment();
        break;
        case "VIEW_ROLES":
            viewRoles();
        break;
        case "ADD_ROLE":
            addRole();
        break;
        case "REMOVE_ROLE":
            removeRole();
        break;
        default:
            quit();

    }
    }
})

//View 