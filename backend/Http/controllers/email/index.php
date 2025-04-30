<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require base_path('vendor/autoload.php'); // or include the PHPMailer classes manually

$mail = new PHPMailer(true);

try {
    $dotenv = Dotenv\Dotenv::createImmutable(base_path(""));
    $dotenv->load();

    // Server settings
    $mail->isSMTP();
    $mail->Host       = $_ENV["SMTP_HOST"];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV["SMTP_USER"];
    $mail->Password   = $_ENV["SMTP_PASS"];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS
    $mail->Port       = (int) $_ENV["SMTP_PORT"];

    // Recipients
    $mail->setFrom('8bb606001@smtp-brevo.com', 'Student Job Portal');


    // Recipients
    $mail->addAddress($email); // recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Verify your email';
    $mail->Body    = "Click the link below to verify your email:<br>
            <a href='http://localhost:8000/api/verify.php?token=$token'>Verify Now</a>";
    $mail->AltBody = 'This is a test email sent via Brevo SMTP.';

    $mail->send();
    echo '✅ Message has been sent successfully';
} catch (Exception $e) {
    echo "❌ Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
