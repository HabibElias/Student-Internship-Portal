<?php

namespace Http\Forms;

use Core\ValidationException;
use Core\Validator;

class ApplicationForm
{
    protected array $errors = [];

    public function __construct(public array $attributes)
    {
        if (!Validator::number($attributes['job_id'])) {
            $this->errors['job_id'] = 'Please enter a number for Job ID';
        }
        if (!Validator::otherFiles($attributes['cv'])) {
            $this->errors['cv'] = 'Please enter a valid type of file. [eg. pdf, msdoc, images]';
        }
        if (isset($attributes['recommendation_letter'])) {
            if (!Validator::otherFiles($attributes['recommendation_letter'])) {
                $this->errors['recommendation_letter'] = 'Please enter a valid type of file. [eg. pdf, msdoc, images]';
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
