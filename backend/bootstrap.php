<?php


use Core\Container;
use Core\Database;
use Core\App;


$container = new Container();


$container->bind(Database::class, function () {
    $config = require base_path('config.php');
    return new Database($config, $config['user'], $config['password']);
});


$container->bind('secret_key', function () {

    $dotenv = Dotenv\Dotenv::createImmutable(base_path(""));
    $dotenv->load();

    // Now access env vars like this:

    return $_ENV['JWT_SECRET_KEY'];
});


App::setContainer($container);
