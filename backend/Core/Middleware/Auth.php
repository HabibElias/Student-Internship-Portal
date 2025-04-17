<?php

namespace Core\Middleware;

use Core\App;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class Auth
{
    public function handle()
    {


        $headers = getallheaders();
        $secret_key = App::resolve('secret_key');


        if (!isset($headers['Authorization'])) {

            http_response_code(403);
            echo json_encode(["message" => "Unauthorized"]);

            exit();
        }

        $token = str_replace("Bearer ", "", $headers['Authorization']);

        try {

            JWT::decode($token, new Key($secret_key, 'HS256'));

            //
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["message" => "Token invalid or expired"]);
            //
            exit();
        }
    }
}
