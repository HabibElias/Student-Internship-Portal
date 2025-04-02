<?php

namespace Core\Middleware;

class Guest
{
    public function handle()
    {
        if ($_SESSION['USER'] ?? false) {
            header('location: /');
            exit();
        }
    }
}