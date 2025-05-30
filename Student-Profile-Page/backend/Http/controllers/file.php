<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$fileName = $_GET['file'] ?? false;

if (!$fileName) {
    bad_request("file missing");
}

$filePath = base_path("uploads/{$fileName}");

if (file_exists($filePath)) {
    $fileType = mime_content_type($filePath);
    header("Content-Type: " . $fileType);
    header("Content-Length: " . filesize($filePath));

    readfile($filePath);
    exit;
} else {
    http_response_code(404);
    echo json_encode(["message" => "File not found."]);
    exit;
}
