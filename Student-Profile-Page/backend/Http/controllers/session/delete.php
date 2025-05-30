<?php

use Core\App;
use Core\Database;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");



$refreshToken = $_COOKIE["refresh_token"] ?? null;

if (!$refreshToken) {
    echo json_encode(['success' => false, "message" => 'token invalid or missing']);
    exit;
}


// just saying this is a database class
/**
 * @var Database $db
 */
$db = App::resolve(Database::class);


// delete the token from the database
$db->query('DELETE FROM refresh_tokens WHERE token = ?', [$refreshToken]);

// clear the cookie
setcookie('refresh_token', '', time() - 3600, '/', "", false, true);


echo json_encode([
    "status" => true,
    'message' => 'Logged out Successfully'
]);
