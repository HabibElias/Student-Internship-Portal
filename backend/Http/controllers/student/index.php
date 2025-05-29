<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$method = $_SERVER['REQUEST_METHOD'];

/** @var Database $db */
$db = App::resolve(Database::class);

// Get user id from token
$user_id = $_SERVER['verifiedToken']->sub ?? null;
if (!$user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Unauthorized']);
    exit;
}

// GET: Fetch student profile
$student = $db->query('SELECT * FROM students WHERE user_id = :user_id', ['user_id' => $user_id])->find();
if (!$student) {
    http_response_code(Response::NOT_FOUND);
    echo json_encode(['status' => false, 'message' => 'Student not found']);
    exit;
}

echo json_encode(['status' => true, 'data' => $student]);
exit;
