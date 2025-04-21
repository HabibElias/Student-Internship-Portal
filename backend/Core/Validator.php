<?php

namespace Core;

class Validator
{
    public static function string($value, $min = 1, $max = INF)
    {
        $value = strlen(trim($value));
        return $value >= $min && $value <= $max;
    }

    public static function gender($value)
    {
        $allowedGenders = ['male', 'female'];
        return in_array(strtolower($value), $allowedGenders, true);
    }

    public static function date($date, $format = 'Y-m-d')
    {
        $d = \DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) === $date;
    }

    public static function email($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function int($value) {
        return filter_var($value, FILTER_VALIDATE_INT);
    }

    public static function password($password)
    {
        $hasUppercase = preg_match('/[A-Z]/', $password);
        $hasLowercase = preg_match('/[a-z]/', $password);
        $hasNumber = preg_match('/[0-9]/', $password);
        $hasSpecialChar = preg_match('/[@$!%*?&#]/', $password);
        $length = strlen($password) >= 8 && strlen($password) <= 128;

        return $hasUppercase && $hasLowercase && $hasNumber && $hasSpecialChar && $length;
    }

    public static function url($url)
    {
        return filter_var($url, FILTER_VALIDATE_URL);
    }

    public static function location($location)
    {
        return preg_match('/^[a-zA-Z\s]+(?:,\s*[a-zA-Z\s]+)*$/', $location);
    }

    public static function boolean($value)
    {
        return is_bool($value);
    }
}