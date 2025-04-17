<?php

use Core\Router;
use Core\Sessions;
use Core\ValidationException;

session_start();

const BASE_PATH = __DIR__ . '/../';


require BASE_PATH . 'Core/functions.php';

spl_autoload_register(
    function ($class) {
        $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
        require base_path("{$class}.php");
    }
);

// autoload import
require base_path('vendor/autoload.php');
require base_path('bootstrap.php');


$router = new Router();
$routes = require base_path('routes.php');

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$method = $_POST['_method'] ?? $_SERVER['REQUEST_METHOD'];





try {
    $router->route($uri, $method);
} catch (ValidationException $e) {
    http_response_code(422);
    echo json_encode(
        [
            'errors' => Sessions::get('errors'),
            'old' => Sessions::get('old')
        ]
    );
    exit;
}

Sessions::unFlash();
