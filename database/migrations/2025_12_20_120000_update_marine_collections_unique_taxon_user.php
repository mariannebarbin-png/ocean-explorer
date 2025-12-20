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
        Schema::table('marine_collections', function (Blueprint $table) {
            // Drop the global unique constraint on taxon_id (if it exists)
            // The original index name created by the migration is likely
            // `marine_collections_taxon_id_unique` so we drop that.
            $table->dropUnique('marine_collections_taxon_id_unique');

            // Create a composite unique index so each user can have the same taxon_id once
            $table->unique(['user_id', 'taxon_id'], 'marine_collections_user_id_taxon_id_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('marine_collections', function (Blueprint $table) {
            $table->dropUnique('marine_collections_user_id_taxon_id_unique');
            $table->unique('taxon_id');
        });
    }
};
