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

            // Wikipedia / excerpt / normalized description (best available)
            'description' => $item['wikipedia_summary'] ?? $item['excerpt'] ?? $item['description'] ?? null,

            // Whether this taxon is marked as marine by the API
            'is_marine' => $item['is_marine'] ?? false,
        ];
    }

    /**
     * Heuristic to decide whether a taxon is marine.
     *
     * Uses explicit `is_marine` when present, otherwise looks for marine-related
     * keywords in common/scientific name, family, rank or description.
     */
    private function isMarine($item): bool
    {
        if (empty($item)) return false;

        if (!empty($item['is_marine'])) return true;

        $fields = [];
        foreach (['common_name', 'scientific_name', 'family', 'rank', 'description'] as $k) {
            if (!empty($item[$k])) $fields[] = $item[$k];
        }

        $hay = strtolower(implode(' ', $fields));
        if (trim($hay) === '') return false;

        $marineKeywords = [
            'marine','ocean','sea','saltwater','reef','coastal','estuarine','pelagic','benthic',
            'coral','fish','shark','whale','dolphin','turtle','jellyfish','mollusc','mollusk',
            'crustacean','krill','squid','octopus','seagrass','seaweed','kelp','algae',
            'echinoderm','seastar','starfish','urchin'
        ];

        foreach ($marineKeywords as $kw) {
            if (stripos($hay, $kw) !== false) return true;
        }

        return false;
    }

    public function searchSpecies(string $term, int $limit = 50)
    {
        try {
            $response = Http::timeout(6)
            ->retry(2, 200)
            ->get("$this->baseUrl/taxa", [
                'q' => $term,
                'per_page' => $limit,
                'all_names' => true,
                'rank' => 'species',
                'is_active' => 'true',
                'marine' => 'true'
            ]);

            if (!$response->successful()) return [];

            $items = $response->json()['results'] ?? [];

            // Normalize first so the heuristic can rely on consistent keys
            $normalized = array_map(fn($i) => $this->normalize($i), $items);

            // Filter using a heuristic: prefer explicit `is_marine` but also allow
            // items that contain marine-related keywords in key fields.
            $filtered = array_filter($normalized, fn($i) => $this->isMarine($i));

            return array_values($filtered);
        }
        catch (\Exception $e) {
            return [];
        }
    }

   public function getSpeciesById(int $id)
{
    try {
        $response = Http::timeout(5)
            ->retry(2, 200)
            ->get("{$this->baseUrl}/taxa/{$id}");

        if (!$response->successful()) {
            return null;
        }

        $species = $response->json()['results'][0] ?? null;

        if (!$species) {
            return null;
        }

        // Normalize fields and return in the same shape as searchSpecies
        $normalized = $this->normalize($species);

        // Ensure individual lookups still respect the marine heuristic
        if (!$this->isMarine($normalized)) {
            return null;
        }

        return $normalized;

    } catch (\Exception $e) {
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

