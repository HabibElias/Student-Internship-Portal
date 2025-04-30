<?php

use \Core\Response;
use GuzzleHttp\Psr7\Message;
use PHPMailer\PHPMailer\SMTP;

function dd($smt)
{
    echo '<pre>';
    var_dump($smt);
    echo '</pre>';

    die();
}


function authorize($condition, $status = Response::FORBIDDEN)
{
    if (!$condition) {
        abort($status);
    }
}

function abort($code = Response::NOT_FOUND)
{

    http_response_code($code);

    view("{$code}.php");

    die();
}


function urlIs($value): bool
{
    return $_SERVER['REQUEST_URI'] === $value;
}

function base_path($path)
{
    return BASE_PATH . $path;
}

function view($path, $attributes = [])
{
    extract($attributes);

    require base_path("views/{$path}");
}

function redirect($path)
{
    header("location: {$path}");
    die();
}

function old($key, $default = '')
{
    return \Core\Sessions::get('old')[$key] ?? $default;
}


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require base_path('vendor/autoload.php');
function sendVerificationEmail($email, $token)
{

    $mail = new PHPMailer(true);

    $dotenv = Dotenv\Dotenv::createImmutable(base_path(""));
    $dotenv->load();

    // Server settings
    try {
        $mail->isSMTP();
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->SMTPAuth   = true;
        $mail->Host       = $_ENV["SMTP_HOST"];
        $mail->Username   = $_ENV["SMTP_USER"];
        $mail->Password   = $_ENV["SMTP_PASS"];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS
        $mail->Port       = $_ENV["SMTP_PORT"];

        // Recipients
        $mail->setFrom('habibelias234@gmail.com', 'Student Job Portal');


        // Recipients
        $mail->addAddress($email); // recipient

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Verify your email';
        $mail->Body    = "Click the link below to verify your email:<br>
            <a href='http://localhost:8888/verify?token=$token'>Verify Now</a>";
        $mail->AltBody = 'This is a test email sent via Brevo SMTP.';

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}
