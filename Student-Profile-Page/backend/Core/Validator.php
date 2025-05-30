<?php

namespace Core;

class Validator
{
    public static function string($value, $min = 1, $max = INF)
    {
        $value = strlen(trim($value));
        return $value >= $min && $value <= $max;
    }

    public static function number($value)
    {
        return is_numeric($value);
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
    public static function grDate($date, $format = 'Y-m-d')
    {
        $d = \DateTime::createFromFormat($format, $date);
        if ($d && $d->format($format) === $date) {
            $now = new \DateTime();
            return $d > $now;
        }
        return false;
    }

    public static function email($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function int($value)
    {
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

    public static function job_level($level)
    {
        $levels = [
            'internship',
            'junior',
            'mid-senior',
            'senior'
        ];

        return in_array($level, $levels, true);
    }

    public static function imageFile($file)
    {
        if (!$file) return false;

        // If $file is an array (from $_FILES), extract the tmp_name
        if (is_array($file) && isset($file['tmp_name'])) {
            $file = $file['tmp_name'];
        }

        if (!is_string($file) || !file_exists($file)) {
            return false;
        }

        $allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        $fileMimeType = mime_content_type($file);

        return in_array($fileMimeType, $allowedMimeTypes, true);
    }
    public static function otherFiles($file)
    {

        // dd($file);
        if (!$file) return false;

        // If $file is an array (from $_FILES), extract the tmp_name
        if (is_array($file) && isset($file['tmp_name'])) {
            $file = $file['tmp_name'];
        }

        if (!is_string($file) || !file_exists($file)) {
            return false;
        }
        $allowedMimeTypes = ['application/pdf', 'application/msword', 'image/jpeg', 'image/jpg', 'image/png'];
        $fileMimeType = mime_content_type($file);

        return in_array($fileMimeType, $allowedMimeTypes, true);
    }
}
