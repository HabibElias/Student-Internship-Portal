<?php

namespace Http\Forms;

use Core\Validator;
use Core\ValidationException;

class CreateJobForm
{
    protected array $errors = [];

    public function __construct(public array $attributes)
    {
        if (!Validator::string($attributes['title'], 5, 255)) {
            $this->errors['title'] = 'Job title must be at least 5 characters';
        }
        if (!Validator::string($attributes['description'], 5)) {
            $this->errors['description'] = 'description must be at least 5 characters';
        }
        if (!Validator::boolean($attributes['remote'])) {
            $this->errors['remote'] = 'remote should be a true or false';
        }
        if (!Validator::boolean($attributes['full_time'])) {
            $this->errors['full_time'] = 'full time should be a true or false';
        }
        if (!Validator::job_level($attributes['job_level'])) {
            $this->errors['job_level'] = 'job level should be of [eg. internship, junior, mid-senior, senior]';
        }
        if (!Validator::string($attributes['skills'], 3)) {
            $this->errors['skills'] = 'Skills should contain at least 1 skill';
        }
        if (!Validator::date($attributes['deadline'])) {
            $this->errors['deadline'] = 'Deadline should be a date in Y-m-d';
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
