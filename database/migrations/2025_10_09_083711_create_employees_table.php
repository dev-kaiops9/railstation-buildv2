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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->onDelete('cascade');
            $table->string('name');
            $table->string('nipp');
            $table->string('position');
            $table->string('unit');
            $table->string('gender')->nullable();
            $table->date('dob')->nullable();
            $table->text('photo_url')->nullable();
            $table->text('cert_image')->nullable();
            $table->string('cert_type')->nullable();
            $table->string('cert_number')->nullable();
            $table->date('cert_expiry')->nullable();
            $table->string('cert_status')->nullable();
            $table->text('skill_image')->nullable();
            $table->string('skill_type')->nullable();
            $table->string('skill_number')->nullable();
            $table->date('skill_expiry')->nullable();
            $table->string('skill_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
