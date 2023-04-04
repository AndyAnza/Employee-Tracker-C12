CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO department (name)
VALUES ('Sales'), ('Enginnering'), ('Finance'), ('Legal');


CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1), (2, 'Salesperson', 80000, 1), (3, 'Lead Engineer', 150000, 2), (4, 'Software Engineer', 120000, 2), (5, 'Account Manager', 160000, 3), (6, 'Accountant', 125000, 3), (7, 'Legal Team Lead', 250000, 4), (8, 'Lawyer', 190000, 4);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, null), (2, 'Mike', 'Chan', 2, 1), (3, 'Ashley', 'Rodriguez', 3, null), (4, 'Kevin', 'Tupik', 4, 3), (5, 'Kunal', 'Singh', 5, null), (6, 'Malia', 'Brown', 6, 5), (7, 'Sarah', 'Lourd', 7, null), (8, 'Tom', 'Allen', 8, 7);

