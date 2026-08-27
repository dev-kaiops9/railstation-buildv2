<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('duty_shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->onDelete('cascade');
            $table->string('code', 10);
            $table->string('name');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('color', 7)->default('#3B82F6');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('duty_rosters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->onDelete('cascade');
            $table->year('year');
            $table->tinyInteger('month');
            $table->string('title')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamps();

            $table->unique(['station_id', 'year', 'month']);
        });

        Schema::create('duty_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('duty_roster_id')->constrained('duty_rosters')->onDelete('cascade');
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->tinyInteger('day');
            $table->foreignId('duty_shift_id')->constrained('duty_shifts')->onDelete('cascade')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['duty_roster_id', 'employee_id', 'day']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('duty_assignments');
        Schema::dropIfExists('duty_rosters');
        Schema::dropIfExists('duty_shifts');
    }
};
