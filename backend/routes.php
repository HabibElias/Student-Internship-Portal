<?php


$router->get('/', "/index.php");

$router->get('/todos', '/todo/index.php');

$router->post('/students', '/registration/store.php');

$router->post('/login', '/session/store.php');

$router->post('/verify', '/verify.php')->only('auth');

$router->get('/refresh', '/refresh.php');

$router->get('/departments', '/departments.php');