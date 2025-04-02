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
                $this->login($user);

                return true;
            }

            return false;
        }

        return false;
    }

    public static function login($user)
    {
        $_SESSION["USER"] = [
            'id' => $user['id'],
            'email' => $user['email']
        ];

        session_regenerate_id(true);
    }

    public static function logout()
    {
        Sessions::destroy();
    }
}