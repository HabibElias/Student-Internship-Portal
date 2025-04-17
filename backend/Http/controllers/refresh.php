<?php

use Firebase\JWT\JWT;
use Core\DataBase;
use Core\App;

/** @var Database $db */
$db = App::resolve(Database::class);
$secret_key = App::resolve('secret_key');

$refreshToken = $_COOKIE['refresh_token'];

$token = $db->query(
    "SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()",
    [$refreshToken]
)->find();

if (!$token) {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid or expired refresh token']);
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
echo json_encode(['token' => $newAccessToken]);
