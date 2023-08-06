<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AlphaNumericWithOneUnderscore implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

    }

    public function passes($attribute, $value)
    {
        //return preg_match('/^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)?$/', $value);
        $trimmedValue = trim($value);
        $normalizedValue = preg_replace('/_+/', '_', $trimmedValue);
        return preg_match('/^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*(?: [A-Za-z0-9]+)?$/', $normalizedValue);
    }

    public function message()
    {
        return 'The :attribute may only contain alphanumeric characters and a maximum of one underscore.';
    }
}
