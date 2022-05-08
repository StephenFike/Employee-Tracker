INSERT INTO department (name)
VALUES 
    ('Development'),
    ('Field Services'),
    ('Accounting'),
    ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sr Software Developer', 150000, 1),
    ('Software Developer', 100000, 1),
    ('Junior Developer', 75000, 1),
    ('Technician manager', 75000, 2),
    ('Sr Technician', 60000, 2),
    ('Junior Technician', 45000, 2),
    ('CFO', 200000, 3),
    ('Accounting Manager', 130000, 3),
    ('Accountant', 75000, 3),
    ('CEO', 250000, 4),
    ('Department Overseer', 175000, 4),
    ('HR', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, null),
    ('William', 'Richards', 2, 1),
    ('Paul', 'Allen', 3, 1),
    ('Justin', 'Thompson', 4, null),
    ('Elijah', 'Wood', 5, 4),
    ('Emma', 'Wattson', 6, 4),
    ('Oliver', 'Tree', 7, null),
    ('James', 'Francis', 8, 7),
    ('Timothy', 'White', 9, 7),
    ('Donald', 'Trump', 10, null),
    ('Joe', 'Biden', 11, 10),
    ('Dameon', 'Wayne', 12, 10);