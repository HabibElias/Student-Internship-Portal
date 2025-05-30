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


$saved_id = $_POST['saved_id'] ?? null;
$user_id = $_SERVER['verifiedToken']->sub;

if (!$saved_id) {
    bad_request('saved id not specified');
}


/**
 * @var Database $db
 */
$db = App::resolve(Database::class);


// if there is no user it will show 404 page
$user = $db->query(
    'SELECT * from users where id = :id',
    [
        'id' => $user_id
    ]
)->findOrFail();


if ($user['user_type'] !== 'student') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN TO ACCESS']);
    exit;
}

// authorize
$savedJob = $db->query(
    "SELECT * from savedJobs where id = :id",
    [
        'id' => $saved_id
    ]
)->findOrFail();

if ($savedJob['student_id'] !== $user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'UNAUTHORIZED']);
    exit;
}

$db->query(
    "DELETE from savedJobs where id = :id",
    [
        "id" => $saved_id
    ]
);


http_response_code(200);
echo json_encode(
    [
        'status' => true,
        'message' => 'Deleted Successfully',
    ]
);
exit;
