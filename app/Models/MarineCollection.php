<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'personal_notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
