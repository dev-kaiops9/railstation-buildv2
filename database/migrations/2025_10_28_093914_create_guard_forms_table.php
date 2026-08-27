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
        Schema::create('guard_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->onDelete('cascade');
            $table->date('date');
            $table->string('ptp');
            $table->string('bh');
            $table->string('bk');
            $table->string('ms');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guard_forms');
    }
};
