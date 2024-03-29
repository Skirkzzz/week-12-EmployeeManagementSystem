DROP DATABASE IF EXISTS companyDatabase;
CREATE DATABASE companyDatabase;

USE employees;

CREATE TABLE department (
  id INT NOT NULL, AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
FOREIGN KEY (role_id) 
REFERENCES employee_role(id) 
);
