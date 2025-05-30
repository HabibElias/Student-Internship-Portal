<?php


$router->get('/', "/index.php");

// auth

$router->post('/login', '/session/store.php');

$router->post('/logout', '/session/delete.php');

$router->post('/verify', '/verify.php')->only('auth');

$router->get('/refresh', '/refresh.php');

$router->post('/register', '/account/store.php');


// department

$router->get('/departments', '/departments.php');


// image and files

$router->get('/image', "/image.php");

$router->get('/file', '/file.php');

// jobs

$router->get('/jobs', '/jobs/index.php');

$router->get('/job', '/jobs/show.php');

// company access on job

$router->post('/job', '/jobs/store.php')->only('auth'); // creating job

$router->delete('/job', '/jobs/destroy.php')->only('auth'); // deleting job

$router->patch('/job', '/jobs/patch.php')->only('auth'); // patching job

$router->get('/c-jobs', '/jobs/company/index.php')->only('auth'); // getting job of a company

// saved jobs

$router->get('/saved-jobs', '/jobs/saved/index.php')->only('auth');

$router->post('/saved-jobs', '/jobs/saved/store.php')->only('auth');

$router->delete('/saved-jobs', '/jobs/saved/destroy.php')->only('auth');

// job applications

$router->get('/app-jobs', '/jobs/applications/index.php')->only('auth');

$router->post('/app-jobs', '/jobs/applications/store.php')->only('auth');

$router->delete('/app-jobs', '/jobs/applications/destroy.php')->only('auth');

// company application

$router->get('/company/applicants', '/jobs/company/applications/index.php')->only('auth');

$router->patch('/company/applicants', '/jobs/company/applications/patch.php')->only('auth');

// recommendations

$router->get('/recommend', '/jobs/recommendation/index.php')->only('auth');

// email

$router->get('/verify', '/email/verification.php');
