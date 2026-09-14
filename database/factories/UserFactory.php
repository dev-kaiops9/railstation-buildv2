<?php

namespace Database\Factories;

use App\Models\Station;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $station = Station::first();

        if (!$station) {
            $station = Station::create([
                'name' => 'Mrawan',
                'abbreviation' => 'MRW',
                'grade' => '-',
                'code' => '-',
                'operational_hours' => '-',
                'km_location' => '-',
                'altitude' => '-',
                'address' => '-',
                'road_distance' => '-',
                'region' => '-',
                'facilities' => '-',
                'nearby_facilities' => '-',
            ]);
        }

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => 'station_master',
            'station_id' => $station->id,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
