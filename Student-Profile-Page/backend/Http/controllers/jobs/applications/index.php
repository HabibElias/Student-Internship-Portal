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


$applications = $db->query('SELECT a.id, a.job_id, a.student_id, c.company_name, a.cv, a.recommendation_letter, a.status from applications a join companies c on a.company_id = c.user_id where student_id = :id', [
    'id' => $user_id
])->get();

$data = [];

foreach ($applications as $application) {
    $job = $db->query('SELECT * from job where id = :id', ['id' => $application['job_id']])->find();
    $data[] = [
        'id' => $application['id'],
        'job' => $job,
        'cv' => $application['cv'],
        'company_name' => $application['company_name'],
        'recommendation_letter' => $application['recommendation_letter'],
        'status' => $application['status']
    ];
}



// return the applications
echo json_encode([
    'status' => true,
    'message' => 'User granted access',
    'data' => $data
]);
