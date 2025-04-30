<?php


$router->get('/', "/index.php");

$router->post('/register', '/registration/store.php');

$router->post('/login', '/session/store.php');

$router->post('/logout', '/session/delete.php');

$router->post('/verify', '/verify.php')->only('auth');

$router->get('/refresh', '/refresh.php');

$router->get('/departments', '/departments.php');

$router->get('/image', "/image.php");

$router->get('/jobs', '/jobs/index.php');

$router->get('/verify', '/email/verification.php');
