<?php

use Core\App;
use Core\Database;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

/** @var Database $db */
$db = App::resolve('Core\Database');

$job_id = $_GET['id'] ?? null;

if (!$job_id) {
    bad_request('id not provided');
}

// find job
$job = $db->query(
    "SELECT j.id, company_id, company_name, company_image, title, remote, full_time, job_level, j.description, posted_time, c.location, skills, deadline
    FROM job j
    JOIN companies c ON c.user_id = j.company_id where j.id = :id",
    [
        'id' => $job_id
    ]
)->findOrFail();

$job['remote'] = (bool) $job['remote'];
$job['full_time'] = (bool) $job['full_time'];


http_response_code(200);
echo json_encode(
    [
        "status" => true,
        "message" => "job found",
        "data" => $job
    ]
);
exit;
