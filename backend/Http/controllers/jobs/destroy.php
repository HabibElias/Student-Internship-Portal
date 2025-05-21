<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$entityBody = file_get_contents('php://input');
$_POST = json_decode($entityBody, true);

// check if this user is a company

$user_id = $_SERVER['verifiedToken']->sub;
$job_id = $_POST['job_id'] ?? null;

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

if (!$job_id) {
    bad_request('job id not provided');
}

$job = $db->query(
    'SELECT * from job where id = :id',
    [
        'id' => $job_id
    ]
)->findOrFail();


if ($job['company_id'] !== $user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'UNAUTHORIZED']);
    exit;
}

try {
    $db->query(
        'DELETE from job where id = :id',
        [
            'id' => $job_id
        ]
    );
} catch (Exception) {
    http_response_code(Response::INTERNAL_SERVER_ERROR);
    echo json_encode(['status' => false, 'message' => 'INTERNAL_SERVER_ERROR']);
    exit;
}

echo json_encode(['status' => true, 'message' => 'Job deleted successfully']);
exit;
