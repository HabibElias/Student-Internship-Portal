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


$savedJobs = $db->query(
    "SELECT * from savedJobs where student_id = :id",
    [
        'id' => $user_id
    ]
)->get();

$data = [];

$query = "SELECT j.id, company_id, company_name, company_image, title, remote, full_time, job_level, j.description, posted_time, c.location, skills, deadline FROM job j JOIN companies c ON c.user_id = j.company_id where id = :id";

foreach ($savedJobs as $savedJob) {
    $job = $db->query(
        $query,
        [
            'id' => $savedJob['job_id']
        ]
    )->find();

    $data[] = [
        'id' => $savedJob['id'],
        'job' => $job
    ];
}

// return the savedJobs
echo json_encode([
    'status' => true,
    'message' => 'User granted access',
    'data' => $data
]);
