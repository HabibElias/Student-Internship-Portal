<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Parse JSON body
$entityBody = file_get_contents('php://input');
$data = json_decode($entityBody, true);

$job_id = $_GET['id'] ?? null;
if (!$job_id) {
    // Get job_id from either $_GET or the URL path (support RESTful /job/{id})
    if (isset($_SERVER['REQUEST_URI'])) {
        // Try to extract id from /job/{id}
        if (preg_match('/\/job\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
            $job_id = $matches[1];
        }
    }
}
if (!$job_id) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, 'message' => 'Job id is required']);
    exit;
}

// Get DB instance
/** @var Database $db */
$db = App::resolve(Database::class);

// Get user id from token
$user_id = $_SERVER['verifiedToken']->sub ?? null;
if (!$user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Unauthorized']);
    exit;
}

// Fetch user and check company type
$user = $db->query('SELECT * FROM users WHERE id = :id', ['id' => $user_id])->findOrFail();
if ($user['user_type'] !== 'company') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}

// Check if the job belongs to this company
$job = $db->query('SELECT * FROM job WHERE id = :id', ['id' => $job_id])->find();
if (!$job || $job['company_id'] != $user_id) {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'You are not authorized to update this job']);
    exit;
}

// Prepare fields to update
$fields = [
    'title' => $data['title'] ?? $job['title'],
    'remote' => isset($data['remote']) ? (int)$data['remote'] : $job['remote'],
    'full_time' => isset($data['full_time']) ? (int)$data['full_time'] : $job['full_time'],
    'job_level' => $data['job_level'] ?? $job['job_level'],
    'description' => $data['description'] ?? $job['description'],
    'skills' => $data['skills'] ?? $job['skills'],
    'deadline' => $data['deadline'] ?? $job['deadline'],
];

// dd($fields);

try {
    $db->query(
        'UPDATE job SET title = :title, remote = :remote, full_time = :full_time, job_level = :job_level, description = :description, skills = :skills, deadline = :deadline WHERE id = :id',
        [
            'title' => $fields['title'],
            'remote' => (int)$fields['remote'],
            'full_time' => (int)$fields['full_time'],
            'job_level' => $fields['job_level'],
            'description' => $fields['description'],
            'skills' => $fields['skills'],
            'deadline' => $fields['deadline'],
            'id' => $job_id,
        ]
    );
    echo json_encode(['status' => true, 'message' => 'Job updated successfully']);
} catch (Exception $e) {
    http_response_code(Response::INTERNAL_SERVER_ERROR);
    echo json_encode(['status' => false, 'message' => 'Failed to update job', 'error' => $e->getMessage()]);
}
exit;
