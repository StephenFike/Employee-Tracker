const inquirer = require('inquirer');
const db = require('./config/connection');
const consoleT = require('console.table');

// conect to mysql
db.connect(err => {
    if(err) throw err;
    console.log(`
    ==============================
    Connected to employee database
    ==============================
    `);
})