<?php

namespace Core;

class Authenticator
{
    public function attempt($email, $password): bool
    {
        /** @var Database $db */
        $db = App::resolve(Database::class);

        $user = $db->query('SELECT * FROM user WHERE email = :email', [
            'email' => $email
        ])->find();

        // verify the password
        if ($user) {
            if (password_verify($password, $user['password'])) {
                return true;
            }

            return false;
        }

        return false;
    }
}