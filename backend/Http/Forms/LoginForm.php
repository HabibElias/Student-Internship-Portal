<?php

namespace Http\Forms;

use Core\ValidationException;
use Core\Validator;

class LoginForm
{
    protected array $errors = [];

    function __construct(public array $attributes)
    {
        if (!Validator::email($attributes['email'])) {
            $this->errors['email'] = 'please enter a valid email';
        }
        if (!Validator::string($attributes['password'], 7, 255)) {
            $this->errors['password'] = 'please enter a password at least 7 characters';
        }

        return empty($this->errors);
    }

    /**
     * @throws ValidationException
     */
    public static function validate($attributes): static
    {
        $instance = new static($attributes);

        return $instance->failed() ? $instance->throw() : $instance;
    }

    public function failed(): bool
    {
        return !empty($this->errors);
    }

    /**
     * @throws ValidationException
     */
    public function throw(): void
    {
        ValidationException::throw($this->getErrors(), $this->attributes);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function error($field, $errorMsg): static
    {
        $this->errors[$field] = $errorMsg;

        return $this;
    }
}