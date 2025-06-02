# Student Internship Portal

## Overview

The Student Internship Portal is a web-based application designed to streamline the process of connecting students with internship opportunities. It provides a platform for students, companies, and administrators to interact, manage internships, and facilitate communication.

## Features

- **Student Management**: Students can register, log in, and apply for internships.
- **Company Management**: Companies can register, post job opportunities, and manage applications.
- **Admin Panel**: Administrators can oversee the platform, manage users, and monitor activities.
- **Authentication**: Secure login and session management for all users.
- **File Uploads**: Support for uploading resumes, images, and other documents.
- **Email Notifications**: Automated email notifications for various actions.

## Project Structure

The project is divided into two main parts:

### Backend

- **Language**: PHP
- **Frameworks/Libraries**: Composer, PHPMailer, GuzzleHTTP, Firebase JWT
- **Key Directories**:
  - `Core/`: Core application logic, including routing, authentication, and database handling.
  - `Http/controllers/`: Controllers for handling HTTP requests.
  - `public/`: Publicly accessible files, including the main entry point (`index.php`).
  - `vendor/`: Third-party dependencies managed by Composer.
  - `views/`: View templates for rendering HTML pages.

### Frontend

- **Language**: TypeScript
- **Frameworks/Libraries**: React, Vite
- **Key Directories**:
  - `src/`: Source code for the frontend application.
  - `public/`: Public assets such as images and icons.
  - `components/`: Reusable React components.
  - `pages/`: Page-level components for routing.

## Installation

### Prerequisites

- PHP 8.0 or higher
- Composer
- Node.js and npm
- MySQL database

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Set up the database:
   - Import the `db.sql` file into your MySQL database.
   - Configure the database connection in `config.php`.
4. Start the PHP server:
   ```bash
   php -S localhost:8888 -t public
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Access the backend API at `http://localhost:8888`.
2. Access the frontend application at the URL provided by the Vite development server.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.


### Group 9

1. Dagmawit Habitamu ETS0363/15
2. Eden Belayneh ETS0409/15
3. Eden Yedemie ETS0410/15
4. Habib Elias ETS0597/15
