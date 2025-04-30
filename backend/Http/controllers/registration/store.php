<?php


use Core\App;
use Core\Database;
use Core\Response;
use Http\Forms\StudentRegisterForm;
use Http\Forms\CompanyRegisterForm;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));


$user_type = $_POST['user_type'];
$email = $_POST['email'];
$password = $_POST['password'];
$fName = $_POST['fName'] ?? null;
$lName = $_POST['lName'] ?? null;
$gender = $_POST['gender'] ?? null;
$enDate = $_POST['enDate'] ?? null;
$grDate = $_POST['grDate'] ?? null;
$dept = isset($_POST['dept']) ? (int)$_POST['dept'] : null;
$companyName = $_POST["compName"] ?? null;
$location = $_POST["location"] ?? null;
$desc = $_POST["description"] ?? null;
$webLink = $_POST["webLink"] ?? null;
$instLink = $_POST["instagramLink"] ?? null;
$facebook = $_POST["facebookLink"] ?? null;


// Validate the form data
if (!$user_type) {
    http_response_code(Response::BAD_REQUEST);
    echo json_encode(['status' => false, "message" => "user_type has not been specified"]);
    exit;
}


$form = $user_type === 'student' ?
    StudentRegisterForm::validate(
        [
            'email' => $email,
            "password" => $password,
            "fName" => $fName,
            "lName" => $lName,
            "gender" => $gender,
            "enDate" => $enDate,
            "grDate" => $grDate,
            "dept" => $dept
        ]
    )
    :
    CompanyRegisterForm::validate(
        [
            'email' => $email,
            "password" => $password,
            "compName" => $companyName,
            "desc" => $desc,
            "location" => $location,
            "webLink" => $webLink ?? null,
            "facebookLink" => $facebookLink ?? null,
            "instagramLink" => $instagramLink ?? null
        ]
    );

if ($form) {
    /** @var Database $db */
    $db = App::resolve(Database::class);



    try {
        // Handle file upload
        $userInDb = $db->query('SELECT * from users where email = ?', [$email])->find();

        if ($userInDb) {
            http_response_code(Response::BAD_REQUEST);
            echo json_encode(['status' => false, "message" => "Email already been used"]);
            exit;
        }

        $fileName = null;
        $cpFileName = null;

        if (isset($_FILES['profilePic'])) {
            $uploadDir = base_path("") . '/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
            }

            $fileName = time() . '_' . basename($_FILES['profilePic']['name']);
            $filePath = $uploadDir . $fileName;

            if (!move_uploaded_file($_FILES['profilePic']['tmp_name'], $filePath)) {
                echo json_encode(["status" => false, "message" => "Failed to upload the file."]);
            }
        }

        if (isset($_FILES['compImg'])) {
            $uploadDir = base_path("") . '/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
            }

            $cpFileName = time() . '_' . basename($_FILES['compImg']['name']);
            $filePath = $uploadDir . $cpFileName;

            if (!move_uploaded_file($_FILES['compImg']['tmp_name'], $filePath)) {
                echo json_encode(["status" => false, "message" => "Failed to upload the file."]);
            }
        }

        $verifyToken = bin2hex(random_bytes(32));




        // Send email
        // Save user data and file path to the database
        $isEmailSent = sendVerificationEmail($email, $verifyToken);

        if ($isEmailSent) {
            $db->query(
                "INSERT INTO users (user_type, email, password, firstName, lastName, gender, enrolledTime, gradTime, dept_id, profile, companyName, location, compImg, description, webLink, facebookLink, instagramLink, verify_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                $user = [
                    $user_type,
                    $email,
                    password_hash($password, PASSWORD_BCRYPT),
                    $fName,
                    $lName,
                    $gender,
                    $enDate,
                    $grDate,
                    $dept,
                    $fileName,
                    $companyName,
                    $location,
                    $cpFileName,
                    $desc,
                    $webLink ?? null,
                    $facebookLink ?? null,
                    $instagramLink ?? null,
                    $verifyToken // Save the file name or path
                ]
            );
            echo json_encode(["status" => true, "message" => "User registered successfully.", "user" => $user]);
        } else {
            echo json_encode(["status" => false, "message" => "Sending Email Failed Try Again"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode([
        "status" => false,
        "message" => [
            'errors' => $form ? $form->getErrors() : 'Validation failed. or email sent failed'
        ]
    ]);
}
