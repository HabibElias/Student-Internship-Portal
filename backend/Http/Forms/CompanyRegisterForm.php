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
            $this->errors['compName'] = 'company name must be at least 3 characters';
        }
        if (!Validator::string($attributes['desc'], 1, 1000)) {
            $this->errors['description'] = 'Description must be no more than 1000 characters';
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
        if (!Validator::imageFile($attributes['compImg'])) {
            $this->errors['compImg'] = 'please enter a valid image format (jpg, png, gif, webp)';
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
