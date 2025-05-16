<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// check if this user is a student

$user_id = $_SERVER['verifiedToken']->sub;

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
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN TO ACCESS']);
    exit;
}

$applications = $db->query("select * from applications where student_id = :id and status = 'accepted'", params: [
    'id' => $user_id
])->get();

// return the applications
echo json_encode([
    'status' => true,
    'message' => 'User granted access',
    'data' => $applications
]);
