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

$student = $db->query('SELECT s.*, d.name as department_name from students s join departments d on s.department = d.id')->findOrFail();


$recommendation_jobs = $db->query('SELECT * FROM job WHERE title LIKE :department', [
    'department' => '%' . substr($student['department_name'], 0, 3) . '%'
])->get();

$jobs = $db
    ->query(
        'SELECT j.id, company_id, company_name, company_image, title, remote, full_time, job_level, j.description, c.location, posted_time, skills, deadline FROM job j join companies c on c.user_id = j.company_id where title LIKE :department',
        [
            'department' => '%' . substr($student['department_name'], 0, 3) . '%'
        ]
    )
    ->get();

$data = [];


foreach ($jobs as $job) {
    $job['remote'] = (bool) $job['remote'];
    $job['full_time'] = (bool) $job['full_time'];

    $data[] = $job;
}

// dd($recommendation_jobs);

// return the recommendation_jobs
echo json_encode(
    [
        'status' => true,
        'message' => 'User granted access',
        'data' => $data
    ]
);
