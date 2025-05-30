<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// check if this user is a company

$user_id = $_SERVER['verifiedToken']->sub;
$job_id = $_GET['id'] ?? null;

// authorize the user

/**
 * @var Database $db
 */
$db = App::resolve(Database::class);


// if there is no user it will show 404 page
$user = $db->query('select * from users where id = :id', [
    'id' => $user_id
])->findOrFail();


if ($user['user_type'] !== 'company') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}


try {
    // Get all applications for a specific job posted by the company
    if (!$job_id) {
        http_response_code(Response::BAD_REQUEST);
        echo json_encode(['status' => false, 'message' => 'Job ID is required']);
        exit;
    }

    // Check if the job belongs to the company
    $job = $db->query(
        'SELECT * FROM job WHERE id = :job_id AND company_id = :company_id',
        [
            'job_id' => $job_id,
            'company_id' => $user_id
        ]
    )->find();

    if (!$job) {
        http_response_code(Response::FORBIDDEN);
        echo json_encode(['status' => false, 'message' => 'You do not have access to this job\'s applications']);
        exit;
    }

    // Get applications for the job
    $jobs = $db->query(
        'SELECT a.*, s.first_name as applicant_first_name, s.last_name as applicant_last_name, u.email as applicant_email 
         FROM applications a 
         JOIN users u ON a.student_id = u.id 
         JOIN students s ON s.user_id = u.id 
         WHERE a.job_id = :job_id',
        [
            'job_id' => $job_id
        ]
    )->get();

    // dd($jobs);
} catch (Exception) {
    http_response_code(Response::INTERNAL_SERVER_ERROR);
    echo json_encode(['status' => false, 'message' => 'INTERNAL_SERVER_ERROR']);
    exit;
}

echo json_encode(
    [
        'status' => true,
        'message' => 'User granted access',
        'data' => $jobs
    ]
);
exit;
