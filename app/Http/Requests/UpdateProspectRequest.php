<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProspectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jurusan' => 'required|string|max:255',
            'kode' => 'required|string|max:255',
            'prospek_kerja' => 'required|string',
        ];
    }
}
