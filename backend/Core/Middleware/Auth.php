<?php

namespace Core\Middleware;

class Auth
{
    public function handle()
    {
        if (!$_SESSION['USER'] ?? false) {
            header('location: /register');
            exit();
        }
    }
}