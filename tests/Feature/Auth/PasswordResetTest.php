<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_reset_password_link_screen_can_be_rendered(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
    }

    public function test_reset_password_link_can_be_requested(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/forgot-password', [
            'email' => $user->email,
        ]);

        $response->assertRedirect(route('reset.form', $user->email));
    }

    public function test_reset_password_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->get('/reset-password/' . $user->email);

        $response->assertStatus(200);
    }

    public function test_password_can_be_reset_with_valid_email(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/reset-password', [
            'email' => $user->email,
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertTrue(
            \Illuminate\Support\Facades\Hash::check(
                'new-password',
                $user->fresh()->password
            )
        );
    }
}