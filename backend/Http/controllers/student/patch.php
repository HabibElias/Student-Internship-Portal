<?php

use Core\App;
use Core\Database;
use Core\Response;
use Core\Validator;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$method = $_SERVER['REQUEST_METHOD'];

/** @var Database $db */
$db = App::resolve(Database::class);

// Get user id from token
$user_id = $_SERVER['verifiedToken']->sub ?? null;
if (!$user_id) {
    http_response_code(Response::UNAUTHORIZED);
    echo json_encode(['status' => false, 'message' => 'Unauthorized']);
    exit;
}

$entityBody = file_get_contents('php://input');
$data = json_decode($entityBody, true);

// Fetch current student data
$student = $db->query('SELECT * FROM students WHERE user_id = :user_id', ['user_id' => $user_id])->find();
if (!$student) {
    http_response_code(Response::NOT_FOUND);
    echo json_encode(['status' => false, 'message' => 'Student not found']);
    exit;
}

// Validate inputs
$errors = [];
if (isset($data['first_name']) && !Validator::string($data['first_name'], 2, 100)) {
    $errors['first_name'] = "First name must be between 2 and 100 characters.";
}
if (isset($data['last_name']) && !Validator::string($data['last_name'], 2, 100)) {
    $errors['last_name'] = "Last name must be between 2 and 100 characters.";
}
if (isset($data['gender']) && !in_array(strtolower($data['gender']), ['male', 'female', 'non-binary', 'prefer not to say'])) {
    $errors['gender'] = "Invalid gender.";
}
// Accept department as either string or int (id)
if (isset($data['department']) && !Validator::number($data['department']) && !Validator::string($data['department'], 2, 100)) {
    $errors['department'] = "Department must be a valid id or name.";
}
if (isset($data['graduation_date']) && !Validator::date($data['graduation_date'])) {
    $errors['graduation_date'] = "Invalid graduation date.";
}
if (isset($data['about']) && !Validator::string($data['about'], 0, 1000)) {
    $errors['about'] = "About must be less than 1000 characters.";
}
if (isset($data['profile_picture']) && $data['profile_picture']) {
    if (!preg_match('/^data:image\/(\w+);base64,/', $data['profile_picture']) && !is_string($data['profile_picture'])) {
        $errors['profile_picture'] = "Invalid image format.";
    }
}
if (!empty($errors)) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    exit;
}

// Handle profile picture upload (base64 or empty string to delete)
$profile_picture_filename = $student['profile_picture'];
if (isset($data['profile_picture'])) {
    if ($data['profile_picture'] === "") {
        $profile_picture_filename = "";
    } elseif (preg_match('/^data:image\/(\w+);base64,/', $data['profile_picture'], $type)) {
        $imgData = substr($data['profile_picture'], strpos($data['profile_picture'], ',') + 1);
        $imgData = base64_decode($imgData);
        $ext = strtolower($type[1]);
        $fileName = 'student_' . $user_id . '_' . time() . '.' . $ext;
        $filePath = __DIR__ . '/../../../uploads/' . $fileName;
        file_put_contents($filePath, $imgData);
        $profile_picture_filename = $fileName;
    }
}

// Prepare update fields
$fields = [
    'first_name' => $data['first_name'] ?? $student['first_name'],
    'last_name' => $data['last_name'] ?? $student['last_name'],
    'gender' => $data['gender'] ?? $student['gender'],
    'department' => $data['department'] ?? $student['department'],
    'graduation_date' => $data['graduation_date'] ?? $student['graduation_date'],
    'about' => $data['about'] ?? $student['about'],
    'profile_picture' => $profile_picture_filename,
];

$db->query(
    'UPDATE students SET first_name = :first_name, last_name = :last_name, gender = :gender, department = :department, graduation_date = :graduation_date, about = :about, profile_picture = :profile_picture WHERE user_id = :user_id',
    array_merge($fields, ['user_id' => $user_id])
);

echo json_encode(['status' => true, 'message' => 'Profile updated successfully']);
exit;
