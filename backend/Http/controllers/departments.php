<?php

use Core\DataBase;
use Core\App;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


/** @var Database $db */
$db = App::resolve("Core\Database");

$departments = $db->query('SELECT * FROM departments')->get();

if (!$departments) {
    echo json_encode(value: [
        'success' => false,
        'message' => 'No departments found.'
    ]);
    exit;
}

echo json_encode(value: [
    'success' => true,
    "departments" => $departments
]);

exit;
