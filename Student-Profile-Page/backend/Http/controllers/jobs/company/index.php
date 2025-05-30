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
    $jobs = $db->query(
        'SELECT j.id, company_id, company_name, company_image, title, remote, full_time, job_level, j.description, c.location, posted_time, skills, deadline FROM job j JOIN companies c ON c.user_id = j.company_id where company_id = :id',
        [
            'id' => $user_id
        ]
    )->get();

    foreach ($jobs as &$job) {
        $applicationCount = $db->query(
            'SELECT COUNT(*) as count FROM applications WHERE job_id = :job_id',
            ['job_id' => $job['id']]
        )->find()['count'];
        $job['application_count'] = (int)$applicationCount;
    }
    unset($job);

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
