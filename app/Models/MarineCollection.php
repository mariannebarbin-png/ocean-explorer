<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarineCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'taxon_id',
        'scientific_name',
        'common_name',
        'rank',
        'authority',
        'status',
        'kingdom',
        'phylum',
        'class',
        'order',
        'family',
        'image_url',
        'description',
        'personal_notes',
    ];

    /**
     * A marine collection belongs to a user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
