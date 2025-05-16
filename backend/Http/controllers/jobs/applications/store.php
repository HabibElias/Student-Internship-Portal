<?php

use Core\App;
use Core\Database;
use Core\Response;
use Http\Forms\ApplicationForm;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// check if this user is a student

$job_id = $_POST['job_id'] ?? null;
$user_id = $_SERVER['verifiedToken']->sub;
$cv_file = $_FILES['cv'] ?? null;
$recommendation_letter_file = $_FILES['recommendation_letter'] ?? null;

// dd($cv_file);

// authorize the user


/**
 * @var Database $db
 */
$db = App::resolve(Database::class);


// if there is no user it will show 404 page
$user = $db->query('select * from users where id = :id', [
    'id' => $user_id
])->findOrFail();


if ($user['user_type'] !== 'student') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}



// validate the user inputs
ApplicationForm::validate([
    'job_id' => $job_id,
    'cv' => $cv_file,
    'recommendation_letter' => $recommendation_letter_file
]);

$job = $db->query('SELECT * from job where id = :id', ['id' => $job_id])->findOrFail();

// check if already applied
$hasApplied = $db->query(
    'SELECT * from applications where student_id = :user_id and job_id = :job_id',
    [
        'user_id' => $user_id,
        'job_id' => $job_id
    ]
)->find();

if ($hasApplied) {
    bad_request('Already applied for the job');
}

// check if there is cv and recommendation letter and store it in the server

$cv = null; // for students

if (!isset($_FILES['cv'])) {
    bad_request('Cv Is Needed For Applications');
}

$uploadDir = base_path("") . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
}

$cv = time() . '_' . basename($_FILES['cv']['name']);
$filePath = $uploadDir . $cv;

if (!move_uploaded_file($_FILES['cv']['tmp_name'], $filePath)) {
    echo json_encode(["status" => false, "message" => "Failed to upload the file."]);
    exit;
}

$recommendation_letter_fileName = null;

// recommendation letter storing
if (isset($_FILES['recommendation_letter'])) {
    $uploadDir = base_path("") . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
    }

    $recommendation_letter_fileName = time() . '_' . basename($_FILES['recommendation_letter']['name']);
    $filePath = $uploadDir . $recommendation_letter_fileName;

    if (!move_uploaded_file($_FILES['recommendation_letter']['tmp_name'], $filePath)) {
        echo json_encode(["status" => false, "message" => "Failed to upload the file."]);
    }
}

// inserting to database
$db->query(
    'INSERT INTO applications (job_id, student_id, company_id, cv, recommendation_letter) values (:job_id, :student_id, :company_id, :cv, :recommendation_letter)',
    [
        'job_id' => $job_id,
        'student_id' => $user_id,
        'company_id' => $job['company_id'],
        'cv' => $cv,
        'recommendation_letter' => $recommendation_letter_fileName
    ]
);

http_response_code(200);
echo json_encode(['status' => true, 'message' => 'job application successful']);
exit;
