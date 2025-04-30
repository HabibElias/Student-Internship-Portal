<?php

use Core\App;
use Core\Database;
use Core\Response;
use Firebase\JWT\JWT;
use GuzzleHttp\Psr7\Message;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$data = json_decode(file_get_contents("php://input"));


$secret_key = App::resolve('secret_key');

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;


/** @var Database $db */
$db = App::resolve(Database::class);

$user = $db->query('SELECT * FROM users where email = :email', [":email" => $email])->find();

if(!$user) {
    echo json_encode(['status' => false, 'message' => 'No Account with this email']);
    exit;
}

if ($user && !$user['is_verified']) {
    echo json_encode(['status' => false, 'message' => 'Verify Your Email Account']);
    exit;
}


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
    if (isset($_COOKIE['refresh_token'])) {
        setcookie('refresh_token', '', [
            'expires' => time() - 3600,
            'httponly' => true,
            'secure' => false,
            'samesite' => 'Strict'
        ]);
    }

    // Set the new refresh_token cookie
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
        "status" => true,
        "token" =>  $accessToken,
        "user" => $user
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Invalid email or password"
    ]);
}
