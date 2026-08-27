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
        Schema::create('stations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation');
            $table->string('grade');
            $table->string('code');
            $table->string('operational_hours');
            $table->string('km_location');
            $table->string('altitude');
            $table->text('address');
            $table->string('road_distance');
            $table->string('region');
            $table->text('facilities');
            $table->text('nearby_facilities');
            $table->string('emplasemen')->nullable();
            $table->date('track_validity_period')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stations');
    }
};
