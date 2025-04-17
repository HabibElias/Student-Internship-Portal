<?php


use Core\App;
use Core\Database;
use Http\Forms\StudentRegisterForm;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Check if the request contains a file

$user_type = $_POST['user_type'];
$email = $_POST['email'];
$password = $_POST['password'];
$fName = $_POST['fName'];
$lName = $_POST['lName'];
$gender = $_POST['gender'];
$enDate = $_POST['enDate'];
$grDate = $_POST['grDate'];

// Validate the form data
$form = StudentRegisterForm::validate([
    'user_type' => $user_type,
    'email' => $email,
    "password" => $password,
    "fName" => $fName,
    "lName" => $lName,
    "gender" => $gender,
    "enDate" => $enDate,
    "grDate" => $grDate
]);

if ($form) {
    /** @var Database $db */
    $db = App::resolve(Database::class);

    try {
        // Handle file upload
        $fileName = null;

        if (isset($_FILES['profilePic'])) {
            $uploadDir = base_path("") . '/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
            }

            $fileName = time() . '_' . basename($_FILES['profilePic']['name']);
            $filePath = $uploadDir . $fileName;

            if (!move_uploaded_file($_FILES['profilePic']['tmp_name'], $filePath)) {
                echo json_encode(["status" => "error", "message" => "Failed to upload the file."]);
            }
        }



        // Save user data and file path to the database
        $db->query(
            "INSERT INTO users (user_type, email, password, firstName, lastName, gender, enrolledTime, gradTime, profile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $user_type,
                $email,
                password_hash($password, PASSWORD_BCRYPT),
                $fName,
                $lName,
                $gender,
                $enDate,
                $grDate,
                $fileName // Save the file name or path
            ]
        );

        echo json_encode(["status" => "success", "message" => "User registered successfully."]);
        //
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => [
            'errors' => $form ? $form->getErrors() : 'Validation failed.'
        ]
    ]);
}
