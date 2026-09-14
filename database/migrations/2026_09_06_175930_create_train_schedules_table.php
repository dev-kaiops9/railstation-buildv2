<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('train_schedules', function (Blueprint $table) {
            $table->id();

            $table->foreignId('train_id')
                ->constrained('trains')
                ->onDelete('cascade');

            $table->foreignId('station_id')
                ->constrained('stations')
                ->onDelete('cascade');

            $table->time('arrival_time')->nullable();

            $table->time('departure_time')->nullable();

            $table->foreignId('track_id')
                ->nullable()
                ->constrained('tracks')
                ->onDelete('set null');

            $table->timestamps();

            $table->unique(['train_id', 'station_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('train_schedules');
    }
};