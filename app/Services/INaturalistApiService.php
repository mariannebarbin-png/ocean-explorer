<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class INaturalistApiService
{
    private string $baseUrl = 'https://api.inaturalist.org/v1';

    /* ---------------------------------------------
       Normalize result
    ----------------------------------------------*/
    private function normalize(array $item): array
    {
        return [
            'id' => $item['id'] ?? null,
            'scientific_name' => $item['name'] ?? null,
            'common_name' => $item['preferred_common_name'] ?? null,
            'rank' => $item['rank'] ?? null,
            'family' => $item['family'] ?? null,

            'photo_url' =>
                $item['default_photo']['medium_url']
                ?? $item['default_photo']['url']
                ?? null,

            'description' =>
                $item['wikipedia_summary']
                ?? $item['excerpt']
                ?? null,
        ];
    }

    /* ---------------------------------------------
        EXCLUDE OBVIOUS NON-MARINE LIFE
       (SAFE FILTER — DOES NOT OVERBLOCK)
    ----------------------------------------------*/
    private function isClearlyNonMarine(array $item): bool
    {
        $text = strtolower(
            ($item['wikipedia_summary'] ?? '') .
            ' ' .
            ($item['name'] ?? '')
        );

        $blockedKeywords = [
            'forest',
            'rainforest',
            'desert',
            'savanna',
            'grassland',
            'terrestrial',
            'land plant',
            'tree',
            'bird',
            'insect',
            'butterfly',
            'bee',
            'ant',
            'reptile',
            'amphibian',
            'freshwater',
            'river',
            'lake',
            'pond'
        ];

        foreach ($blockedKeywords as $word) {
            if (str_contains($text, $word)) {
                return true;
            }
        }

        return false;
    }

    /* ---------------------------------------------
       SEARCH (WORKING & MARINE-FOCUSED)
    ----------------------------------------------*/
    public function searchSpecies(string $term, int $limit = 50): array
    {
        try {
            $response = Http::timeout(6)
                ->retry(2, 200)
                ->get("{$this->baseUrl}/taxa", [
                    'q' => $term,
                    'per_page' => $limit,
                    'all_names' => true,
                    'rank' => 'species',
                ]);

            if (!$response->successful()) {
                return [];
            }

            $items = $response->json()['results'] ?? [];

            //  SAFE FILTER
            $filtered = array_filter(
                $items,
                fn ($item) => !$this->isClearlyNonMarine($item)
            );

            return array_map(
                fn ($item) => $this->normalize($item),
                $filtered
            );

        } catch (\Exception $e) {
            return [];
        }
    }

    /* ---------------------------------------------
       GET SPECIES DETAILS
    ----------------------------------------------*/
    public function getSpeciesById(int $id): ?array
    {
        try {
            $response = Http::timeout(5)
                ->retry(2, 200)
                ->get("{$this->baseUrl}/taxa/{$id}");

            if (!$response->successful()) {
                return null;
            }

            $species = $response->json()['results'][0] ?? null;

            if (!$species || $this->isClearlyNonMarine($species)) {
                return null;
            }

            $species['description'] =
                $species['wikipedia_summary']
                ?? $species['excerpt']
                ?? null;

            $species['photo_url'] =
                $species['default_photo']['medium_url']
                ?? null;

            return $species;

        } catch (\Exception $e) {
            return null;
        }
    }

    /* ---------------------------------------------
       RANDOM MARINE SPECIES
    ----------------------------------------------*/
    public function getRandomSpecies(int $count = 20): array
    {
        $groups = ['shark', 'fish', 'whale', 'dolphin', 'coral', 'octopus'];

        $results = [];

        foreach ($groups as $group) {
            $results = array_merge(
                $results,
                $this->searchSpecies($group, 6)
            );
        }

        shuffle($results);

        return array_slice($results, 0, $count);
    }
}
