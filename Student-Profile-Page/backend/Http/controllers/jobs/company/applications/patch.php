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

$application_id = $data['application_id'] ?? null;
$status = $data['status'] ?? null;

if (!$application_id || !$status) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, 'message' => 'application_id and status are required']);
    exit;
}

/** @var Database $db */
$db = App::resolve(Database::class);

// Get user id from token
$user_id = $_SERVER['verifiedToken']->sub ?? null;
if (!$user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Unauthorized']);
    exit;
}

// Check if user is company
$user = $db->query('SELECT * FROM users WHERE id = :id', ['id' => $user_id])->findOrFail();
if ($user['user_type'] !== 'company') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}

// Check if the application belongs to a job posted by this company
$application = $db->query(
    'SELECT a.*, j.company_id FROM applications a JOIN job j ON a.job_id = j.id WHERE a.id = :id',
    ['id' => $application_id]
)->find();

if (!$application || $application['company_id'] != $user_id) {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'You are not authorized to update this application']);
    exit;
}

// Update status
try {
    $db->query(
        'UPDATE applications SET status = :status WHERE id = :id',
        [
            'status' => $status,
            'id' => $application_id
        ]
    );
    echo json_encode(['status' => true, 'message' => 'Application status updated']);
} catch (Exception $e) {
    http_response_code(Response::INTERNAL_SERVER_ERROR);
    echo json_encode(['status' => false, 'message' => 'Failed to update application status']);
}
exit;
