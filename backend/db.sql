create database SJP;

use SJP;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_type NVARCHAR (50) NOT NULL CHECK (
        user_type IN ('student', 'company')
    ),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender NVARCHAR (50) check (gender IN ('male', 'female')),
    enrolledTime DATE,
    gradTime DATE,
    dept_id INT NULL,
    profile TEXT,
    companyName VARCHAR(255),
    location TEXT,
    compImg TEXT,
    description TEXT,
    webLink VARCHAR(255),
    facebookLink VARCHAR(255),
    instagramLink VARCHAR(255)
);

select * from users;

DROP TABLE users;
DESCRIBE users;

CREATE TABLE refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

drop Table refresh_tokens;

DESCRIBE refresh_tokens;
DESCRIBE users;

select * from refresh_tokens;

CREATE TABLE IF NOT EXISTS department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name text not null
);

INSERT INTO department (name)
VALUES 
    ('Software Engineering'),
    ('Food Science And Technology');
select * from department;

create table job (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id int not null,
    title VARCHAR(255) not NULL,
    remote BOOLEAN DEFAULT false,
    full_time BOOLEAN DEFAULT false,
    job_level NVARCHAR (50) NOT NULL CHECK (
        job_level IN ('junior', 'mid-senior','senior')
    ),
    description text not NULL,
    posted_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    skills text not null,
    deadline DATETIME not NULL,
    Foreign Key (company_id) REFERENCES users(id)
);
INSERT INTO job (company_id, title, remote, full_time, job_level, description, skills, deadline)
    VALUES
        (1, 'Junior Software Developer', true, true, 'junior', 'Develop and maintain web applications.', 'JavaScript, React, Node.js', '2023-12-31 23:59:59'),
        (2, 'Mid-Senior Data Analyst', false, true, 'mid-senior', 'Analyze and interpret complex data sets.', 'SQL, Python, Tableau', '2023-11-30 23:59:59'),
        (1, 'Senior Project Manager', false, false, 'senior', 'Lead and manage multiple projects.', 'Leadership, Agile, Communication', '2023-10-31 23:59:59'),
        (2, 'Backend Developer', true, true, 'mid-senior', 'Build and optimize server-side applications.', 'Java, Spring Boot, MySQL', '2023-12-15 23:59:59'),
        (1, 'UI/UX Designer', false, false, 'junior', 'Design user-friendly interfaces.', 'Figma, Adobe XD, CSS', '2023-11-15 23:59:59'),
        (2, 'Cloud Engineer', true, true, 'mid-senior', 'Design and manage cloud infrastructure.', 'AWS, Azure, Kubernetes', '2023-12-20 23:59:59'),
        (1, 'DevOps Engineer', true, true, 'senior', 'Implement CI/CD pipelines and automate processes.', 'Docker, Jenkins, Ansible', '2023-12-25 23:59:59'),
        (2, 'Mobile App Developer', false, true, 'junior', 'Develop mobile applications for Android and iOS.', 'Flutter, Kotlin, Swift', '2023-11-20 23:59:59'),
        (1, 'Cybersecurity Analyst', false, false, 'mid-senior', 'Monitor and secure IT systems.', 'Penetration Testing, SIEM, Firewalls', '2023-12-10 23:59:59'),
        (2, 'AI/ML Engineer', true, true, 'senior', 'Develop machine learning models and AI solutions.', 'Python, TensorFlow, PyTorch', '2023-12-05 23:59:59'),
        (1, 'Database Administrator', false, true, 'mid-senior', 'Manage and optimize database systems.', 'SQL, PostgreSQL, MongoDB', '2023-11-25 23:59:59'),
        (2, 'Game Developer', true, false, 'junior', 'Design and develop video games.', 'Unity, C#, Unreal Engine', '2023-12-18 23:59:59'),
        (1, 'Technical Writer', false, false, 'junior', 'Create technical documentation and manuals.', 'Markdown, MS Word, XML', '2023-11-28 23:59:59'),
        (2, 'Network Engineer', false, true, 'mid-senior', 'Design and maintain network infrastructure.', 'Cisco, Networking Protocols, VPN', '2023-12-22 23:59:59'),
        (1, 'Product Manager', false, false, 'senior', 'Oversee product development and strategy.', 'Product Roadmap, Market Research, Communication', '2023-12-30 23:59:59'),
        (2, 'Frontend Developer', true, true, 'junior', 'Create responsive web interfaces.', 'HTML, CSS, JavaScript', '2023-12-28 23:59:59'),
        (1, 'Quality Assurance Engineer', false, true, 'mid-senior', 'Test and ensure software quality.', 'Selenium, JIRA, Test Automation', '2023-12-12 23:59:59'),
        (2, 'Blockchain Developer', true, true, 'senior', 'Develop and maintain blockchain applications.', 'Solidity, Ethereum, Smart Contracts', '2023-12-08 23:59:59'),
        (1, 'IT Support Specialist', false, false, 'junior', 'Provide technical support to users.', 'Troubleshooting, Windows, Linux', '2023-11-18 23:59:59'),
        (2, 'Digital Marketing Specialist', false, true, 'mid-senior', 'Plan and execute digital marketing campaigns.', 'SEO, Google Ads, Analytics', '2023-12-14 23:59:59'),
        (1, 'Data Scientist', true, true, 'senior', 'Analyze data and build predictive models.', 'Python, R, Machine Learning', '2023-12-29 23:59:59'),
        (2, 'Embedded Systems Engineer', false, true, 'mid-senior', 'Develop firmware for embedded systems.', 'C, C++, Microcontrollers', '2023-12-27 23:59:59'),
        (1, 'Salesforce Developer', true, true, 'junior', 'Customize and develop Salesforce applications.', 'Apex, Visualforce, Lightning', '2023-12-26 23:59:59'),
        (2, 'Robotics Engineer', false, false, 'senior', 'Design and build robotic systems.', 'ROS, Python, CAD', '2023-12-24 23:59:59'),
        (1, 'E-commerce Specialist', true, true, 'mid-senior', 'Manage and optimize e-commerce platforms.', 'Shopify, WooCommerce, SEO', '2023-12-23 23:59:59');
select id, user_type from users;

drop table job;

DESCRIBE job;

SELECT * FROM job LIMIT 10 OFFSET 0;