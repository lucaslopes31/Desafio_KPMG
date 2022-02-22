<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'matricula' => $this->faker->unique()->numberBetween(1000, 9999),
            'cpf' =>$this->faker->unique()->cpf,
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}
