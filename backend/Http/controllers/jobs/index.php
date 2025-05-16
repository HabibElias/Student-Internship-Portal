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

$page = isset($_GET['page']) ? (((int)$_GET['page'] <= 0) ? 1 : $_GET['page']) : 1;

$limit = $_GET['limit'] ?? 10;

$offset = ($page - 1) * $limit;

// Build dynamic WHERE clauses based on query parameters
$where = [];
$params = [];

// Search by title (partial match)
if (!empty($_GET['title'])) {
    $where[] = 'title LIKE :title';
    $params[':title'] = '%' . $_GET['title'] . '%';
}

// Filter by full_time (expects 0 or 1)
if (isset($_GET['full_time'])) {
    $where[] = 'full_time = :full_time';
    $params[':full_time'] = (int)$_GET['full_time'];
}

// Filter by remoteness (expects 0 or 1)
if (isset($_GET['remote'])) {
    $where[] = 'remote = :remote';
    $params[':remote'] = (int)$_GET['remote'];
    // if the request of pages less than 1 handle it
}

// Filter by job level (exact match)
if (!empty($_GET['job_level'])) {
    $where[] = 'job_level = :job_level';
    $params[':job_level'] = $_GET['job_level'];
}

// Filter by posted_time (expects a number representing days)
if (!empty($_GET['posted_time'])) {
    $days = (int)$_GET['posted_time'];
    $past_date = date('Y-m-d H:i:s', strtotime("-$days days"));
    $where[] = 'posted_time >= :posted_time';
    $params[':posted_time'] = $past_date;
}

// dd($params);


// Build the WHERE clause
$whereClause = '';
if (!empty($where)) {
    $whereClause = 'WHERE ' . implode(' AND ', $where);
}

// Update total count query for filtered results
$countQuery = "SELECT COUNT(*) AS total FROM job $whereClause";
$countStmt = $db->prepare($countQuery);

foreach ($params as $key => $value) {
    $countStmt->bindParam($key, $value);
}

$countStmt->execute();
$all_jobs = $countStmt->get();

// Prepare the main jobs query with filters
$query = "SELECT j.id, company_id, company_name, company_image, title, remote, full_time, job_level, j.description, posted_time, c.location, skills, deadline
    FROM job j
    JOIN companies c ON c.user_id = j.company_id
    $whereClause
    LIMIT :limit OFFSET :offset";

$stmt = $db->prepare($query);

// Bind filter parameters
foreach ($params as $key => $value) {
    $stmt->bindParam($key, $value);
}
$stmt->bindParam(':limit', (int)$limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', (int)$offset, PDO::PARAM_INT);

$stmt->execute();
$jobs = $stmt->get();



$total_pages = (int) ceil(($all_jobs[0]['total'] ?? 0) / $limit);

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
        "total" => $all_jobs[0]['total'],
        "limit" => (int) $limit,
        "hasNext" => ($page < $total_pages),
        "hasPrevious" => ($page > 1)
    ]
);
exit;
