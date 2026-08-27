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
        Schema::create('ibpr', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->onDelete('cascade');
            $table->text('hazard_description')->nullable();
            $table->text('control_explanation')->nullable();
            $table->text('control_reference')->nullable();
            $table->string('effectiveness', 50)->nullable();
            $table->text('responsible_position')->nullable();
            $table->text('risk_explanation')->nullable();
            $table->integer('probability')->nullable();
            $table->integer('impact')->nullable();
            $table->text('action_plan_explanation')->nullable();
            $table->text('action_plan_reference')->nullable();
            $table->text('action_plan_responsible')->nullable();
            $table->date('completion_date')->nullable();
            $table->integer('after_probability')->nullable();
            $table->integer('after_impact')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ibpr');
    }
};

