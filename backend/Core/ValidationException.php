<?php

namespace Core;

class ValidationException extends \Exception
{


    /**
     * @throws ValidationException
     */
    public static function throw($errors, $old)
    {
        $instance = new static;

        Sessions::flash('errors', $errors);
        Sessions::flash('old', $old);

        throw $instance;
    }
}