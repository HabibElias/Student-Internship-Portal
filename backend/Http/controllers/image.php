<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: image/jpeg");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Check if GD library is loaded
if (!function_exists('imagecreatefromjpeg')) {
    http_response_code(500);
    echo json_encode(["message" => "GD library is not available. Please enable it in your PHP configuration."]);
    exit;
}

$imgName = $_GET['img'] ?? false;
if (!$imgName) {
    http_response_code(400);
    echo json_encode(["message" => "imgUrl missing"]);
    exit;
}
$imagePath = base_path("uploads/{$imgName}");
if (file_exists($imagePath)) {
    $image = imagecreatefromjpeg($imagePath) ?? false;
    if ($image) {
        $resizedImage = imagescale($image, 700, 600);
        if ($resizedImage) {
            imagejpeg($resizedImage);
            imagedestroy($resizedImage);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to resize image."]);
        }
        imagedestroy($image);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to process image."]);
    }
    exit;
} else {
    http_response_code(404);
    echo json_encode(["message" => "Image not found."]);
    exit;
}
