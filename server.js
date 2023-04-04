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
inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'theme',
      message: 'What would you like to do?',
      choices: [
        '➡ View all departments',
        '➡ Add Employee', //TODO
        '➡ Update Employee Role', //TODO
        '➡ View All Roles',
        '➡ Add Role', //TODO
        '➡ View All Employees',
        '➡ Add Department',
        '➡ QUIT',
      ],
    },
  ])
  .then(answers => {
    if (answers.theme === '➡ View all departments') {
      //Query database
      db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
      });
    } else if (answers.theme === '➡ View All Roles') {
      //Query database
      db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
      });
    } else if (answers.theme === '➡ View All Employees') {
      db.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
      });
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
      });
    } else if (answers.theme === '➡ Add Role') {
      const questions = [
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the role?',
        },
        {
          type: 'input',
          salary: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'rawlist',
          department: 'department',
          message: 'Which department does the role belongs to?',
          choices: [''], //TODO map on department choices
        },
      ];
      inquirer.prompt(questions).then(answers => {
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?)',
          [answers.title, answers.salary, department_id],
          (err, results) => {
            if (err) throw err;
            console.log('Added Role to the database ✅');
          }
        );
      });
    }
  });
