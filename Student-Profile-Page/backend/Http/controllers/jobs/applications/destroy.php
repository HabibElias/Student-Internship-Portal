<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$entityBody = file_get_contents('php://input');
$_POST = json_decode($entityBody, true);

$application_id = $_POST['application_id'] ?? null;
$user_id = $_SERVER['verifiedToken']->sub;

if (!$application_id) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, 'message' => 'no application id']);
    exit;
}

// authorize the user

/**
 * @var Database $db
 */
$db = App::resolve(Database::class);

// if there is no user it will show 404 page
$user = $db->query('select * from users where id = :id', [
    'id' => $user_id
])->findOrFail();

if ($user['user_type'] !== 'student') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}

// if this application is his
$application = $db->query('select * from applications where id = :id', ['id' => $application_id])->findOrFail();

if ($application['student_id'] !== $user_id) {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}

// delete from the database
$db->query(
    'DELETE from applications where id = :id',
    [
        'id' => $application_id
    ]
);

http_response_code(200);
echo json_encode(
    [
        'status' => true,
        'message' => 'job application deleted successful'
    ]
);
exit;
