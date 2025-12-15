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
        Schema::create('marine_collections', function (Blueprint $table) {
            $table->id();

            // Link to user
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // OBIS species identifiers
            $table->integer('taxon_id')->unique(); // OBIS taxonID
            $table->string('scientific_name');
            $table->string('common_name')->nullable();
            $table->string('rank')->nullable();
            $table->string('authority')->nullable();
            $table->string('status')->nullable();

            // Classification (optional but useful)
            $table->string('kingdom')->nullable();
            $table->string('phylum')->nullable();
            $table->string('class')->nullable();
            $table->string('order')->nullable();
            $table->string('family')->nullable();

            // Optional: image
            $table->string('image_url')->nullable();

            // User notes
            $table->text('personal_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marine_collections');
    }
};
