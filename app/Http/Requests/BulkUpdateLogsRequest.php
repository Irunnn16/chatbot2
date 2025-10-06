<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateLogsRequest extends FormRequest
{
    /**
     * Determine if the logs is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'logs_ids' => 'required|array',
            'logs_ids.*' => 'exists:logs,id',
        ];
    }
}
