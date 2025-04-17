create database SJP;

use SJP;

CREATE TABLE users (
    id INT PRIMARY KEY,
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
    profile TEXT,
    companyName VARCHAR(255),
    location TEXT,
    compImg TEXT,
    description TEXT,
    webLink VARCHAR(255),
    facebookLink VARCHAR(255),
    instagramLink VARCHAR(255)
);

INSERT INTO
    users (
        id,
        user_type,
        email,
        password,
        firstName,
        lastName,
        enrolledTime,
        gradTime,
        profile
    )
VALUES (
        1,
        'student',
        'john.doe@example.com',
        '$2y$10$123456studenthash',
        'John',
        'Doe',
        '2022-09-01',
        '2026-06-30',
        'Aspiring software engineer with a passion for web development.'
    ),
    (
        2,
        'student',
        'jane.smith@example.com',
        '$2y$10$654321studenthash',
        'Jane',
        'Smith',
        '2021-09-01',
        '2025-06-30',
        'Computer science major with strong interest in AI and machine learning.'
    );

INSERT INTO
    users (
        id,
        user_type,
        email,
        password,
        companyName,
        location,
        compImg,
        description,
        webLink,
        facebookLink,
        instagramLink
    )
VALUES (
        3,
        'company',
        'info@techwave.io',
        '$2y$10$987654companyhash',
        'TechWave Inc.',
        'San Francisco, CA',
        'techwave.png',
        'Innovative software solutions for the modern enterprise.',
        'https://techwave.io',
        'https://facebook.com/techwave',
        'https://instagram.com/techwave'
    ),
    (
        4,
        'company',
        'hello@greengrowth.org',
        '$2y$10$abcdefcompanyhash',
        'GreenGrowth Ltd.',
        'Berlin, Germany',
        'greengrowth.jpg',
        'Sustainable tech company focused on renewable energy.',
        'https://greengrowth.org',
        'https://facebook.com/greengrowth',
        'https://instagram.com/greengrowth'
    );

select * from users;

DROP TABLE users;

CREATE TABLE refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

drop Table refresh_tokens;

DESCRIBE refresh_tokens;

select * from refresh_tokens;

CREATE TABLE IF NOT EXISTS department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name text not null
);

INSERT INTO department (name)
VALUES 
    ('Computer Science'),
    ('Mechanical Engineering'),
    ('Electrical Engineering'),
    ('Civil Engineering'),
    ('Business Administration'),
    ('Biology'),
    ('Chemistry'),
    ('Physics'),
    ('Mathematics'),
    ('Psychology'),
    ('Economics'),
    ('Political Science'),
    ('Sociology'),
    ('History'),
    ('Philosophy'),
    ('Environmental Science'),
    ('Architecture'),
    ('Law'),
    ('Medicine'),
    ('Nursing'),
    ('Education'),
    ('Fine Arts'),
    ('Music'),
    ('Theater'),
    ('Journalism'),
    ('Information Technology'),
    ('Data Science'),
    ('Astronomy'),
    ('Geology'),
    ('Anthropology');

select * from department;