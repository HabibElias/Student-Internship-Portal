<?php

namespace Http\Forms;

use Core\ValidationException;
use Core\Validator;

class CompanyRegisterForm
{
    protected array $errors = [];

    public function __construct(public array $attributes)
    {
        if (!Validator::string($attributes['compName'], 3)) {
            $this->errors['compName'] = 'compName must be at lease 3 characters';
        }
        if (!Validator::string($attributes['desc'], 1, 250)) {
            $this->errors['description'] = 'Description must be no more than 250';
        }
        if (!Validator::email($attributes['email'])) {
            $this->errors['email'] = 'please enter a valid email';
        }
        if (!Validator::password($attributes['password'])) {
            $this->errors['password'] = 'please enter a password at least 8 characters or strong one';
        }
        if (!Validator::location($attributes['location'])) {
            $this->errors['location'] = 'please enter a valid location';
        }
        if ($attributes['webLink'] !== null) {
            if (!Validator::url($attributes['webLink'])) {
                $this->errors['webLink'] = 'please enter a valid url';
            }
        }
        if ($attributes['instagramLink'] !== null) {
            if (!Validator::url($attributes['instagramLink'])) {
                $this->errors['instagramLink'] = 'please enter a valid url';
            }
        }
        if ($attributes['facebookLink'] !== null) {
            if (!Validator::url($attributes['facebookLink'])) {
                $this->errors['facebookLink'] = 'please enter a valid url';
            }
        }
    }

    public static function validate($attribute)
    {
        $instance = new static($attribute);

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
