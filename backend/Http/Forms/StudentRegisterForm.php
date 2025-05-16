<?php

namespace Http\Forms;

use Core\ValidationException;
use Core\Validator;

class StudentRegisterForm
{
    protected array $errors = [];

    public function __construct(public array $attributes)
    {
        if (!Validator::email($attributes['email'])) {
            $this->errors['email'] = 'please enter a valid email';
        }
        if (!Validator::string($attributes['password'], 8, 255)) {
            $this->errors['password'] = 'please enter a password at least 7 characters';
        }
        if (!Validator::string($attributes['fName'], min:3)) {
            $this->errors['fName'] = 'First Name must be at least 3 characters';
        }
        if (!Validator::string($attributes['lName'], min:3)) {
            $this->errors['lName'] = 'Last Name must be at least 3 characters';
        }
        if(!Validator::gender($attributes['gender'])) {
            $this->errors['gender'] = 'Please enter a valid gender';
        }
        if(!Validator::grDate($attributes['grDate'])) {
            $this->errors['grDate'] = 'Please enter a valid graduation date';
        }
        if(!Validator::int($attributes['dept'])) {
            $this->errors['dept'] = 'Please enter a valid department value';
        }
    }

    public static function validate($attribute)
    {
        $instance = new static($attribute);

        // dd($instance);

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

    public function errors($key, $value): static
    {
        $this->errors[$key] = $value;

        return $this;
    }
}