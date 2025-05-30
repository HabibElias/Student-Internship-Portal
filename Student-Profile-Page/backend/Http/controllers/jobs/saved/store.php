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


$job_id = $_POST['job_id'] ?? null;
$user_id = $_SERVER['verifiedToken']->sub;


if (!$job_id) {
    bad_request('job id not specified');
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

$job = $db->query(
    "SELECT * from job where id = :id",
    [
        'id' => $job_id
    ]
);

$savedJob = $db->query(
    "SELECT * from savedJobs where student_id = :id and job_id = :job_id",
    [
        'id' => $user_id,
        'job_id' => $job_id
    ]
)->find();

if ($savedJob) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, 'message' => 'already saved job']);
    exit;
}

$db->query(
    "INSERT into savedJobs (student_id, job_id) values (:user_id, :job_id)",
    [
        "user_id" => $user_id,
        "job_id" => $job_id
    ]
);


http_response_code(200);
echo json_encode(
    [
        'status' => true,
        'message' => 'Added Successfully',
    ]
);
exit;
