<?php

use Core\App;
use Core\Database;
use Core\Response;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// check if this user is a company

$user_id = $_SERVER['verifiedToken']->sub;

// authorize the user

/**
 * @var Database $db
 */
$db = App::resolve(Database::class);


// if there is no user it will show 404 page
$user = $db->query('select * from users where id = :id', [
    'id' => $user_id
])->findOrFail();


if ($user['user_type'] !== 'company') {
    http_response_code(Response::FORBIDDEN);
    echo json_encode(['status' => false, 'message' => 'FORBIDDEN']);
    exit;
}


try {

    // Fetch company info
    $companyInfo = $db->query(
        'SELECT 
            c.company_name, 
            c.company_image, 
            u.email, 
            c.description, 
            c.location
        FROM companies c
        JOIN users u ON u.id = c.user_id
        WHERE c.user_id = :id',
        [
            'id' => $user_id
        ]
    )->findOrFail();

    // Fetch company socials
    $companySocials = $db->query(
        'SELECT * FROM company_socials WHERE company_id = :company_id',
        [
            'company_id' => $user_id
        ]
    )->findOrFail();

    // Attach socials to company info
    $companyInfo['socials'] = $companySocials;
} catch (Exception) {
    http_response_code(Response::INTERNAL_SERVER_ERROR);
    echo json_encode(['status' => false, 'message' => 'INTERNAL_SERVER_ERROR']);
    exit;
}

echo json_encode(
    [
        'status' => true,
        'message' => 'User granted access',
        'data' => $companyInfo,
    ]
);
exit;
