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
}
