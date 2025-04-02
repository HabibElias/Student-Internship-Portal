<?php

namespace Core;

class Registrar
{
    public function attempt($attributes): bool
    {

        /** @var Database $db */
        $db = App::resolve(Database::class);

        $userEmail = $db->query('SELECT * FROM user WHERE email = :email', [
            'email' => $attributes['email']
        ])->find();

        // checking if an email already exists
        if (!$userEmail) {
            // creating a new account
            $db->query('INSERT INTO user (email, password) values (:email, :password)', [
                'email' => $attributes['email'],
                'password' => password_hash($attributes['password'], PASSWORD_BCRYPT)
            ]);

            // match the user with its account
            $user = $db->query('SELECT * from user where email = :email', ['email' => $attributes['email']])->find();

            Authenticator::login($user);

            return true;
        }

        // because there is a user with the same email address
        return false;
    }
}