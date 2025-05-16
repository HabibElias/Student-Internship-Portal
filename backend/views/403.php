<?php

use Core\Response;

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

http_response_code(Response::FORBIDDEN);
echo json_encode(['status' => false, "message" => "FORBIDDEN"]);
exit;
