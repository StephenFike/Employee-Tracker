const inquirer = require('inquirer');
const db = require('./config/connection.js');
const consoleT = require('console.table');

// conect to mysql
db.connect(err => {
    if(err) throw err;
    console.log(`
    =====================
    Connected to database
    =====================
    `);
    promptMain();
});

function promptMain() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an epmployees role']
        }
    ])
    .then(answer => {
        const { options } = answer;

        switch(options) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employees role':
                updateEmployeeRole();
                break;
        }
    })
}

function viewDepartments() {
    console.log('Departments: \n');
    let sql = `SELECT department.id AS ID, department.department_name AS Department FROM department;`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows)
            promptMain();
        })
        .catch(console.log)
};

function viewRoles() {
    console.log('Roles: \n');
    let sql = `SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department
                FROM roles
                INNER JOIN department ON roles.department_id = department.id;`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows)
            promptMain();
        })
        .catch(console.log)
};

function viewEmployees() {
    console.log('Employees: \n');
    let sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name,
                roles.title AS Title,
                department.department_name AS Department,
                roles.salary AS Salary, 
                manager.first_name AS Manager
                FROM employee
                LEFT JOIN roles ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows)
            promptMain();
        })
        .catch(console.log)
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the new department?',
            validate: answer => {
                if(answer){
                    return true;
                } else {
                    console.log('Please enter the name of the new department!')
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        let { department_name } = answer;
        let sql = `INSERT INTO department (department_name)
                    VALUES ('${department_name}')`


        db.promise().query(sql)
        .then(() => {
            console.log(`Added ${department_name} to the database!`)
            promptMain();
        })
    })
    .catch(console.log)
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the roles title?',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a title!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the Role?',
            validate: input => {
                if (isNaN(input)) {
                    console.log('Please enter a number value!')
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(answer => {
        let params = [answer.role, answer.salary];

        let dsql = `SELECT department_name AS Name, id AS ID FROM department;`

        db.promise().query(dsql)
            .then(([rows]) => {
                const departments = rows.map (({ Name, ID }) => ({ name: Name, value: ID }));
                
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departments',
                        message: 'Which department does the role belong to?',
                        choices: departments
                    }
                ])
                .then(answer => {
                    let department = answer.department_id;
                    params.push(department);

                    let sql = `INSERT INTO roles (title, salary, department_id)
                                VALUES(?, ?, ?)`;

                    db.promise().query(sql, params)
                        .then(() => {
                            console.log(`Role added!`)
                            promptMain();
                        })
                })
            })
    })
}