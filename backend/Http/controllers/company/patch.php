<?php

use Core\App;
use Core\Database;
use Core\Response;
use Core\Sessions;
use Core\Validator;
use Http\Forms\CompanyRegisterForm;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Parse JSON body
$entityBody = file_get_contents('php://input');
$data = json_decode($entityBody, true);

/** @var Database $db */
$db = App::resolve(Database::class);

// Get user id from token
$user_id = $_SERVER['verifiedToken']->sub ?? null;
if (!$user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Unauthorized']);
    exit;
}

// Fetch user and check company type
$user = $db->query('SELECT * FROM users WHERE id = :id', ['id' => $user_id])->findOrFail();
if ($user['user_type'] !== 'company') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}

// Check if the company belongs to this user
$company = $db->query('SELECT * FROM companies WHERE user_id = :user_id', ['user_id' => $user_id])->find();

if (!$company) {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'You are not authorized to update this company']);
    exit;
}

$company_id = $company['user_id'];

// --- Input Validation ---
$errors = [];

// Company name validation (required, not null, min 3 chars)
$company_name = $data['company_name'] ?? $company['company_name'] ?? null;
if ($company_name === null || trim($company_name) === "") {
    $errors['company_name'] = "Company name is required.";
} elseif (!Validator::string($company_name, 3, 100)) {
    $errors['company_name'] = "Company name must be between 3 and 100 characters.";
}

// Location validation (required, not null, valid format)
$location = $data['location'] ?? $company['location'] ?? null;
if ($location === null || trim($location) === "") {
    $errors['location'] = "Location is required.";
} elseif (!Validator::location($location)) {
    $errors['location'] = "Please enter a valid location.";
}

// Image validation (required, not null, valid format)
$company_image = $data['company_image'] ?? $company['company_image'] ?? null;
if ($company_image === null || $company_image === "") {
    $errors['company_image'] = "Company image is required.";
} elseif (
    !preg_match('/^data:image\/(\w+);base64,/', $company_image) &&
    !preg_match('/^[\w\-.]+\.(jpg|jpeg|png|gif|webp)$/i', $company_image)
) {
    $errors['company_image'] = "Please enter a valid image format (jpg, png, gif, webp).";
}

// Description validation (optional, but if present, must be valid)
if (isset($data['description']) && !Validator::string($data['description'], 1, 1000)) {
    $errors['description'] = "Description must be no more than 1000 characters.";
}

if (!empty($errors)) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    exit;
}

// Prepare fields to update
$fields = [
    'company_name' => $company_name,
    'location' => $location,
    'description' => $data['description'] ?? $company['description'],
];

// Handle company image upload (expects base64 string in 'company_image')
if (isset($data['company_image']) && !empty($data['company_image']) && preg_match('/^data:image\/(\w+);base64,/', $data['company_image'], $type)) {
    $imgData = substr($data['company_image'], strpos($data['company_image'], ',') + 1);
    $imgData = base64_decode($imgData);
    $ext = strtolower($type[1]);
    $fileName = 'company_' . $company_id . '_' . time() . '.' . $ext;
    $filePath = __DIR__ . '/../../../uploads/' . $fileName;
    file_put_contents($filePath, $imgData);
    $fields['company_image'] = $fileName;
} elseif (isset($data['company_image']) && $data['company_image'] !== $company['company_image']) {
    // If a filename is provided (not base64), just set it
    $fields['company_image'] = $data['company_image'];
}

try {
    $db->query(
        'UPDATE companies SET company_name = :company_name, location = :location, description = :description' .
            (isset($fields['company_image']) ? ', company_image = :company_image' : '') .
            ' WHERE user_id = :id',
        array_merge($fields, ['id' => $company_id])
    );

    // Socials
    $socialFields = [
        'website' => $data['website'] ?? null,
        'facebook' => $data['facebook'] ?? null,
        'linkedin' => $data['linkedin'] ?? null,
        'twitter' => $data['twitter'] ?? null,
    ];
    $social = $db->query('SELECT * FROM company_socials WHERE company_id = :company_id', ['company_id' => $company_id])->find();
    if ($social) {
        $db->query(
            'UPDATE company_socials SET website = :website, facebook = :facebook, linkedin = :linkedin, twitter = :twitter WHERE company_id = :company_id',
            array_merge($socialFields, ['company_id' => $company_id])
        );
    } else {
        $db->query(
            'INSERT INTO company_socials (company_id, website, facebook, linkedin, twitter) VALUES (:company_id, :website, :facebook, :linkedin, :twitter)',
            array_merge(['company_id' => $company_id], $socialFields)
        );
    }

    echo json_encode(['status' => true, 'message' => 'Company updated successfully']);
} catch (Exception $e) {
    http_response_code(Response::INTERNAL_SERVER_ERROR);
    echo json_encode(['status' => false, 'message' => 'Failed to update company', 'error' => $e->getMessage()]);
}
exit;
