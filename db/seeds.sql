CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ( 'Sales Lead', 100000, 1 ), ('Salesperson', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Account Manager', 160000, 3), ('Accountant', 125000, 3), ( 'Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4);


CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
    ON DELETE SET NULL
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, null), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3, null), ('Kevin', 'Tupik', 4, 3), ('Kunal', 'Singh', 5, null), ('Malia', 'Brown', 6, 5), ('Sarah', 'Lourd', 7, null), ('Tom', 'Allen', 8, 7);

