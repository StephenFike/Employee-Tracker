INSERT INTO department (department_name)
VALUES 
    ('Development'),
    ('Field Services'),
    ('Accounting'),
    ('Administration');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Software Developer', 100000, 1),
    ('Sr Technician', 60000, 2),
    ('CFO', 200000, 3),
    ('CEO', 250000, 4),
    ('HR', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 4, null),
    ('William', 'Richards', 2, 1),
    ('Paul', 'Allen', 3, 1),
    ('Justin', 'Thompson', 1, null),
    ('Elijah', 'Wood', 5, null);