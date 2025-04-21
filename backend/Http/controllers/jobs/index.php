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

$all_jobs = $db->query('SELECT COUNT(*) AS total FROM job')->find();

// if the request of pages less than 1 handle it
$page = isset($_GET['page']) ? (((int)$_GET['page'] <= 0) ? 1 : $_GET['page']) : 1;

$limit = $_GET['limit'] ?? 10;

$offset = ($page - 1) * $limit;

$total_pages = (int) ceil(($all_jobs['total'] ?? 0) / $limit);


$jobs = $db
    ->prepare('SELECT job.id, company_id, compImg, title, remote, full_time, job_level, job.description, posted_time, skills, deadline FROM job join users on users.id = job.company_id limit :limit offset :offset')
    ->bindParam(':limit', $limit, PDO::PARAM_INT)
    ->bindParam(':offset', $offset, PDO::PARAM_INT)
    ->execute()
    ->get();

$data = [];


foreach ($jobs as $job) {
    $job['remote'] = (bool) $job['remote'];
    $job['full_time'] = (bool) $job['full_time'];

    $data[] = $job;
}

http_response_code(200);
echo json_encode(
    [
        "data" => $data,
        "page" => $page,
        "total" => $all_jobs['total'] ?? 0,
        "limit" => (int) $limit,
        "hasNext" => ($page < $total_pages),
        "hasPrevious" => ($page > 1)
    ]
);
exit;
