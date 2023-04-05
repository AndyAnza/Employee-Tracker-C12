const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const app = express();
require('dotenv').config();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_NAME,
  }
  // console.log('Connected to the employeecms_db database')
);

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to the employeecms_db database');
});
function choices() {
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'theme',
      message: 'What would you like to do?',
      choices: [
        '➡ View all departments',
        '➡ Add Employee',
        '➡ Update Employee Role',
        '➡ View All Roles',
        '➡ Add Role',
        '➡ View All Employees',
        '➡ Add Department',
        '➡ QUIT',
      ],
    },
  ]).then(answers => {
  //VIEW ALL DEPARTMENTS
  if (answers.theme === '➡ View all departments') {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.table(results);
      choices();
    });
    // VIEW ALL ROLES
  } else if (answers.theme === '➡ View All Roles') {
    db.query('SELECT role.id, role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id', (err, results) => {
      if (err) throw err;
      console.table(results);
      choices();
    });
    //VIEW ALL EMPLOYEES
  } else if (answers.theme === '➡ View All Employees') {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id', (err, results) => {
      if (err) throw err;
      console.table(results);
      choices();
    });  
    //ADD DEPARTMENT
  } else if (answers.theme === '➡ Add Department') {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
      },
    ];
    inquirer.prompt(questions).then(answers => {
      db.query(
        'INSERT INTO department (name) VALUES (?)',
        [answers.name],
        (err, results) => {
          if (err) throw err;
          console.log('Added Service to the database ✅');
        }
      );
      choices();
    });
    //ADD ROLE
  } else if (answers.theme === '➡ Add Role') {
    let departments = [];
    db.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      departments = results.map(department => ({
        name: department.name,
        value: department.id,
      }));
      const questions = [
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does the role belong to?',
          choices: departments,
        },
      ];
      inquirer.prompt(questions).then(answers => {
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [answers.name, answers.salary, answers.department_id],
          (err, results) => {
            if (err) throw err;
            console.log('Added Role to the database ✅');
            choices();
          }
        );
      });
    });  
      //ADD EMPLOYEE
    } else if (answers.theme === '➡ Add Employee') {
      db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
    
        const role_id = results.map(role => ({
          name: role.title,
          value: role.id
        }));
    
        const questions = [
          {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's first name?`,
          },
          {
            type: 'input',
            name: 'last_name',
            message: `What is the employee's last name?`,
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'Which role does the employee have?',
            choices: role_id,
          },
        ];
    
        inquirer.prompt(questions).then(answers => {
          db.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
            [answers.first_name, answers.last_name, answers.role_id],
            (err, results) => {
              if (err) throw err;
              console.log('Added Employee to the database ✅');
              choices();
            }
          );
        });
      });
    //UPDATE EMPLOYEE ROLE
  } else if (answers.theme === '➡ Update Employee Role') {
    db.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
      const employees = results.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));
      db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        const roles = results.map((role) => ({
          name: role.title,
          value: role.id
        }));
        const questions = [
          {
            type: 'list',
            name: 'employee_id',
            message: `Which employee's role do you want to update?`,
            choices: employees
          },
          {
            type: 'list',
            name: 'new_role',
            message: "What is the employee's new role?",
            choices: roles
          }
        ];
        inquirer.prompt(questions).then(answers => {
          const employeeId = answers.employee_id;
          const newRoleId = answers.new_role;
          db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId], (err, results) => {
            if (err) throw err;
            console.log(`Employee's role has been updated successfully! ✅`);
            choices();
          });
        });
      });
    });  
  } else {
    console.log('Goodbye!');
      process.exit();
  }
});
}

choices();
