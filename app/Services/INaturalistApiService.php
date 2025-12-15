<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class INaturalistApiService
{
    private string $baseUrl = 'https://api.inaturalist.org/v1';

    /**
     * Normalize iNaturalist results into a single consistent format
     */
    private function normalize($item)
    {
        return [
            'id' => $item['id'] ?? null,
            'scientific_name' => $item['name'] ?? null,
            'common_name' => $item['preferred_common_name'] ?? null,
            'rank' => $item['rank'] ?? null,
            'family' => $item['family'] ?? null,

            // Photo normalization
            'photo_url' =>
                $item['default_photo']['medium_url']
                ?? $item['default_photo']['url']
                ?? null,

            // Wikipedia summary (best available description)
            'description' => $item['wikipedia_summary'] ?? null,
        ];
    }

    public function searchSpecies(string $term, int $limit = 50)
    {
        try {
            $response = Http::timeout(6)
            ->retry(2, 200)
            ->get("$this->baseUrl/taxa", [
                'q' => $term,
                'per_page' => $limit,
                'all_names' => true
            ]);

            if (!$response->successful()) return [];

            $items = $response->json()['results'] ?? [];

            return array_map(fn($i) => $this->normalize($i), $items);
        }
        catch (\Exception $e) {
            return [];
        }
    }

    public function getSpeciesById(int $id)
    {
        try {
            $response = Http::timeout(6)
            ->retry(2, 200)
            ->get("$this->baseUrl/taxa/$id");

            if (!$response->successful()) return null;

            $item = $response->json()['results'][0] ?? null;

            return $item ? $this->normalize($item) : null;
        }
        catch (\Exception $e) {
            return null;
        }
    }

    public function getRandomSpecies($count = 20)
    {
        $groups = ['shark', 'whale', 'turtle', 'octopus', 'coral', 'seal'];

        $results = [];
        foreach ($groups as $g) {
            $chunk = $this->searchSpecies($g, 6);
            $results = array_merge($results, $chunk);
        }

        shuffle($results);
        return array_slice($results, 0, $count);
    }
}

