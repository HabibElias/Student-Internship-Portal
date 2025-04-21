<?php

use Firebase\JWT\JWT;
use Core\DataBase;
use Core\App;
use Core\Response;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


/** @var Database $db */
$db = App::resolve('Core\Database');
$secret_key = App::resolve('secret_key');

$refreshToken = $_COOKIE['refresh_token'] ?? false;

if (!$refreshToken) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Invalid or expired refresh token']);
    exit;
}

$token = $db->query(
    "SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()",
    [$refreshToken]
)->find();

if (!$token) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Invalid or expired refresh token']);
    exit;
}

$user = $db->query('SELECT * from users where id = ?', [$token['user_id']])->find();

$accessPayload = [
    "iss" => "localhost",
    "iat" => time(),
    "exp" => time() + 60 * 60, // 1 hour
    "sub" => $user['id']
];

// generate new access token
$newAccessToken = JWT::encode($accessPayload, $secret_key, 'HS256');
echo json_encode(['status' => true, 'token' => $newAccessToken, 'user' => $user]);
