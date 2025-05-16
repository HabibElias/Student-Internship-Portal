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


$user_type = $_POST['user_type'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$fName = $_POST['fName'] ?? null;
$lName = $_POST['lName'] ?? null;
$gender = $_POST['gender'] ?? null;
$grDate = $_POST['grDate'] ?? null;
$dept = isset($_POST['dept']) ? (int)$_POST['dept'] : null;
$companyName = $_POST["compName"] ?? null;
$location = $_POST["location"] ?? null;
$desc = $_POST["description"] ?? null;


// Validate the form data
if (!$user_type) {
    bad_request("user_type has not been specified");
}


if ($user_type === 'student') {
    $form = StudentRegisterForm::validate(
        [
            "fName" => $fName,
            "lName" => $lName,
            "gender" => $gender,
            'email' => $email,
            "password" => $password,
            "grDate" => $grDate,
            "dept" => $dept
        ]
    );
} elseif ($user_type === 'company') {
    $form = CompanyRegisterForm::validate(
        [
            "compName" => $companyName,
            'email' => $email,
            "password" => $password,
            "desc" => $desc,
            "location" => $location,
            'compImg' => $_FILES['compImg'] ?? null,
        ]
    );
} else {
    bad_request("user_type has not been specified correctly");
}


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

        $fileName = null; // for students
        $cpFileName = null; // for companies

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
                "INSERT INTO users (email, password, user_type, verify_token) VALUES (:email, :password, :user_type, :verify_token)",
                [
                    'email' => $email,
                    'password' => password_hash($password, PASSWORD_BCRYPT),
                    'user_type' => $user_type,
                    'verify_token' => $verifyToken,
                ]
            );

            $user = $db->query(
                'select * from users where email = :email',
                [
                    'email' => $email
                ]
            )->findOrFail();

            // if student add to students table
            if ($user_type === 'student') {
                $db->query(
                    'INSERT INTO students (user_id, first_name, last_name, gender, graduation_date, department, profile_picture) values (?, ?, ?, ?, ?, ?, ?)',
                    [
                        $user['id'],
                        $fName,
                        $lName,
                        $gender,
                        $grDate,
                        $dept,
                        $fileName
                    ]
                );

                // $user = $db->query(
                //     'SELECT u.*, s.* FROM users u JOIN students s ON u.id = s.user_id WHERE u.email = :email',
                //     [
                //         'email' => $email
                //     ]
                // )->findOrFail();
            } else {
                $db->query(
                    'INSERT INTO companies (user_id , company_name, description, company_image, location) values (?, ?, ?, ?, ?)',
                    [
                        $user['id'],
                        $companyName,
                        $desc,
                        $cpFileName,
                        $location
                    ]
                );


                // $user = $db->query(
                //     '',
                //     [
                //         'email' => $email
                //     ]
                // )->findOrFail();
            }


            echo json_encode(["status" => true, "message" => "User registered successfully."]);
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
