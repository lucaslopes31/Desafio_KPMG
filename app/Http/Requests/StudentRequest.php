<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use LaravelLegends\PtBrValidator\Rules\FormatoCpf;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'matricula' => [
                'required',
                'lte:9999',
                'gte:1000',
                Rule::unique('students', 'matricula')->ignore($this->id),
            ],
            'cpf' => [
                'required',
                new FormatoCpf,
                Rule::unique('students', 'cpf')->ignore($this->id),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('students', 'email')->ignore($this->id),
            ]
        ];
    }
}
