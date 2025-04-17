<?php

use Core\App;
use Core\Database;
use Firebase\JWT\JWT;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$secret_key = App::resolve('secret_key');

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;


/** @var Database $db */
$db = App::resolve(Database::class);

$user = $db->query('SELECT * FROM users where email = :email', [":email" => $email])->find();


if ($user && password_verify($password, $user['password'])) {
    $accessPayload = [
        "iss" => "localhost",
        "iat" => time(),
        "exp" => time() + 60 * 60, // 1 hour
        "sub" => $user['id']
    ];

    $refreshToken = bin2hex(random_bytes(64)); // unique random token
    $expiresAt = date('Y-m-d H:m:s', timestamp: strtotime('+7 days'));


    // Send access token + refresh token (HttpOnly cookie)
    setcookie('refresh_token', $refreshToken, [
        'expires' => strtotime($expiresAt),
        'httponly' => true,
        'secure' => false,
        'samesite' => 'Strict'
    ]);


    /** @var Database $db */
    $db = App::resolve(Database::class);

    $accessToken = JWT::encode($accessPayload, $secret_key, 'HS256');

    $user_token = $db->query('SELECT * from refresh_tokens where user_id = ?', [$user['id']])->find();

    if (!$user_token)
        $db->query("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)", [$user['id'], $refreshToken, $expiresAt]);
    else
        $db->query(
            'UPDATE refresh_tokens SET token = ?, expires_at = ? WHERE user_id = ?',
            [$refreshToken, $expiresAt, $user['id']]
        );


    echo json_encode([
        "status" => "success",
        "token" =>  $accessToken,
        "user" =>  [
            "id" => $user['id'],
            "user_type" => $user['user_type'],
            "fName" => $user['firstName'],
            "lName" => $user['lastName'],
            "email" => $user['email'],
            "gradTime" => $user['gradTime'],
            "enrolledTime" => $user['enrolledTime'],
            "profilePic" => $user['profile']
        ]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email or password"
    ]);
}
