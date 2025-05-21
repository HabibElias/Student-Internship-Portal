<?php

use Http\Forms\CreateJobForm;
use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Utility function for error responses
function respond($status, $message, $code = 400)
{
    http_response_code($code);
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

// Parse JSON body
$entityBody = file_get_contents('php://input');
$_POST = json_decode($entityBody, true);

// Get DB instance
/** @var Database $db */
$db = App::resolve(Database::class);

// Get user id from token
$user_id = $_SERVER['verifiedToken']->sub ?? null;
if (!$user_id) {
    respond(false, 'Unauthorized', Response::UNAUTHORIZED);
}

// Fetch user and check company type
function getCompanyUserOrFail($db, $user_id)
{
    try {
        $user = $db->query('SELECT * FROM users WHERE id = :id', ['id' => $user_id])->findOrFail();
        if ($user['user_type'] !== 'company') {
            respond(false, 'FORBIDDEN', Response::FORBIDDEN);
        }
        return $user;
    } catch (Exception $e) {
        respond(false, 'User not found', Response::NOT_FOUND);
    }
}

$user = getCompanyUserOrFail($db, $user_id);

// Collect and validate input
$fields = [
    'title' => $_POST['title'] ?? null,
    'remote' => $_POST['remote'] ?? null,
    'full_time' => $_POST['full_time'] ?? null,
    'job_level' => $_POST['job_level'] ?? null,
    'description' => $_POST['description'] ?? null,
    'skills' => $_POST['skills'] ?? null,
    'deadline' => $_POST['deadline'] ?? null,
];

try {
    CreateJobForm::validate($fields);
} catch (Exception $e) {
    respond(false, $e->getMessage(), Response::BAD_REQUEST);
}

// Insert job
try {
    $db->query(
        'INSERT INTO job (company_id, title, remote, full_time, job_level, description, skills, deadline)
         VALUES (:company_id, :title, :remote, :full_time, :job_level, :description, :skills, :deadline)',
        [
            'company_id' => $user_id,
            'title' => $fields['title'],
            'remote' => $fields['remote'] ? 1 : 0,
            'full_time' => $fields['full_time'] ? 1 : 0,
            'job_level' => $fields['job_level'],
            'description' => $fields['description'],
            'skills' => $fields['skills'],
            'deadline' => $fields['deadline'],
        ]
    );
} catch (Exception $e) {
    respond(false, 'An error occurred while creating the job.', Response::INTERNAL_SERVER_ERROR);
}

respond(true, 'Job created successfully', 200);
