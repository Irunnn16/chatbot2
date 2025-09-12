<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'nullable',
            'title' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'content' => 'required|string',
        ];
    }
}
