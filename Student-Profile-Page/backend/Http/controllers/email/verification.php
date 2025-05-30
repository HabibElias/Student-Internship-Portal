<?php

use Core\App;
use Core\Database;

$token = $_GET['token'] ?? null;

if ($token) {
    /** 
     * @var Database $db */
    $db = App::resolve(Database::class);

    $user = $db->query("SELECT * FROM users WHERE verify_token = ?", [$token])->find();

    if ($user) {
        $stmt = $db->query("UPDATE users SET is_verified = TRUE, verify_token = NULL WHERE id = ?", [$user['id']]);
        echo "Email verified! You can now log in.";

        header('Location: http://localhost:5173/login');
        exit;
    } else {
        echo "Invalid verification token.";
    }
} else {
    echo "No token provided.";
}
