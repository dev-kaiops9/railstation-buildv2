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
        Schema::create('krsm_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('krsm_id')->constrained('krsm')->onDelete('cascade');
            $table->date('date');
            $table->string('kr_awal')->nullable();
            $table->string('kr_akhir')->nullable();
            $table->text('kr_keterangan')->nullable();
            $table->string('sm_awal')->nullable();
            $table->string('sm_akhir')->nullable();
            $table->text('sm_keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('krsm_data');
    }
};
