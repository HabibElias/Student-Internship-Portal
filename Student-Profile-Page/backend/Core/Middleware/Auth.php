<?php

namespace Core\Middleware;

use Core\App;
use Core\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class Auth
{
    public function handle()
    {

        header("Access-Control-Allow-Origin: http://localhost:5173");
        header("Content-Type: application/json");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



        $headers = getallheaders();
        $secret_key = App::resolve('secret_key');


        if (!isset($headers['Authorization'])) {

            http_response_code(Response::UNAUTHORIZED);
            echo json_encode(["status" => false, "message" => "Unauthorized"]);

            exit();
        }

        $token = str_replace("Bearer ", "", $headers['Authorization']);
        
        try {

            $verifiedToken = JWT::decode($token, new Key($secret_key, 'HS256'));

            $_SERVER['verifiedToken'] = $verifiedToken;

            // continue
        } catch (Exception $e) {
            http_response_code(Response::UNAUTHORIZED);
            echo json_encode(["status" => false, "message" => "Token invalid or expired"]);
            //
            exit();
        }
    }
}
