# Student Internship Portal - Backend API Documentation

## Authentication

### 1. Login (`POST /login`)

-   **Description:** Authenticates a user and creates a session.
-   **Parameters:**
    -   `email` (string, required): User's email address.
    -   `password` (string, required): User's password.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

### 2. Logout (`POST /logout`)

-   **Description:** Deletes the current user session.
-   **Requires:** Authentication
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

### 3. Verify (`POST /verify`)

-   **Description:** Verifies the user's email.
-   **Requires:** Authentication
-   **Parameters:**
    -   `verification_code` (string, required): The verification code sent to the user's email.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

### 4. Refresh (`GET /refresh`)

-   **Description:** Refreshes the authentication token.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

### 5. Register (`POST /register`)

-   **Description:** Registers a new user account.
-   **Parameters:**
    -   `name` (string, required): User's name.
    -   `email` (string, required): User's email address.
    -   `password` (string, required): User's password.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

## Departments

### 1. Get Departments (`GET /departments`)

-   **Description:** Retrieves a list of all departments.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.
    -   `data` (array): An array of department objects.

## Images and Files

### 1. Get Image (`GET /image`)

-   **Description:** Retrieves an image file.
-   **Parameters:**
    -   `file` (string, required): The name of the image file.
-   **Returns:**
    -   Image file (JPEG).

### 2. Get File (`GET /file`)

-   **Description:** Retrieves a generic file.
-   **Parameters:**
    -   `file` (string, required): The name of the file.
-   **Returns:**
    -   File content with appropriate Content-Type header.

## Jobs

### 1. Get Jobs (`GET /jobs`)

-   **Description:** Retrieves a list of jobs with optional filters and pagination.
-   **Parameters:**
    -   `page` (integer, optional, default: 1): The page number.
    -   `limit` (integer, optional, default: 10): The number of jobs per page.
    -   `title` (string, optional): Search jobs by title (partial match).
    -   `full_time` (integer, optional): Filter by full-time (0 or 1).
    -   `remote` (integer, optional): Filter by remote (0 or 1).
    -   `job_level` (string, optional): Filter by job level (exact match).
    -   `posted_time` (integer, optional): Filter jobs posted within the last X days.
-   **Returns:**
    -   `data` (array): An array of job objects.
    -   `page` (integer): The current page number.
    -   `total` (integer): The total number of jobs.
    -   `limit` (integer): The number of jobs per page.
    -   `hasNext` (boolean): Indicates if there is a next page.
    -   `hasPrevious` (boolean): Indicates if there is a previous page.

### 2. Get Job (`GET /job`)

-   **Description:** Retrieves a specific job by ID.
    -   **Parameters:**
    -   `id` (integer, required): The ID of the job to retrieve.
-   **Returns:**
    -   A job object.

## Saved Jobs

### 1. Get Saved Jobs (`GET /saved-jobs`)

-   **Description:** Retrieves a list of saved jobs for the authenticated user.
-   **Requires:** Authentication
-   **Returns:**
    -   `data` (array): An array of saved job objects.

### 2. Save Job (`POST /saved-jobs`)

-   **Description:** Saves a job for the authenticated user.
-   **Requires:** Authentication
-   **Parameters:**
    -   `job_id` (integer, required): The ID of the job to save.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

### 3. Delete Saved Job (`DELETE /saved-jobs`)

-   **Description:** Deletes a saved job for the authenticated user.
-   **Requires:** Authentication
-   **Parameters:**
    -   `job_id` (integer, required): The ID of the job to delete.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

## Job Applications

### 1. Get Job Applications (`GET /app-jobs`)

-   **Description:** Retrieves a list of job applications for the authenticated user.
-   **Requires:** Authentication
-   **Returns:**
    -   `data` (array): An array of job application objects.

### 2. Apply for Job (`POST /app-jobs`)

-   **Description:** Creates a new job application for the authenticated user.
-   **Requires:** Authentication
-   **Parameters:**
    -   `job_id` (integer, required): The ID of the job to apply for.
    -   `cv` (string, required): The path to the CV file.
    -   `recommendation_letter` (string, optional): The path to the recommendation letter file.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

### 3. Delete Job Application (`DELETE /app-jobs`)

-   **Description:** Deletes a job application for the authenticated user.
-   **Requires:** Authentication
-   **Parameters:**
    -   `application_id` (integer, required): The ID of the application to delete.
-   **Returns:**
    -   `status` (boolean): Indicates success or failure.
    -   `message` (string): A message describing the result.

## Recommendations

### 1. Get Recommendations (`GET /recommend`)

-   **Description:** Retrieves a list of recommended jobs for the authenticated user.
-   **Requires:** Authentication
-   **Returns:**
    -   `data` (array): An array of recommended job objects.

## Email Verification

### 1. Verify Email (`GET /verify`)

-   **Description:** Verifies the user's email address using a token.
-   **Parameters:**
    -   `token` (string, required): The verification token sent to the user's email.
-   **Returns:**
    -   Redirects to a success or failure page.