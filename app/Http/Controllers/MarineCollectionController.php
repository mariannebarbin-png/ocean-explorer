<?php

namespace App\Http\Controllers;

use App\Models\MarineCollection;
use App\Services\INaturalistApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarineCollectionController extends Controller
{
    protected INaturalistApiService $api;

    public function __construct(INaturalistApiService $api)
    {
        $this->api = $api;
    }

    /**
     * Display user's marine collection
     */
    public function index(Request $request)
    {
        $collections = $request->user()
            ->marineCollections()
            ->latest()
            ->paginate(12);

        return Inertia::render('Collection/Index', [
            'collections' => $collections,
        ]);
    }

    /**
     * Search marine species using iNaturalist
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2',
        ]);

        $results = $this->api->searchSpecies($request->query('query'));

        return response()->json([
            'results' => $results,
        ]);
    }

    /**
     * Get species details by iNaturalist taxon ID
     */
    public function show(int $taxonId)
    {
        $species = $this->api->getSpeciesById($taxonId);

        if (!$species) {
            abort(404, 'Species not found');
        }

        return response()->json([
            'species' => $species,
            'classification' => $species['ancestor_taxa'] ?? [],
            'vernacularNames' => $species['preferred_common_name'] ?? null,
        ]);
    }

    /**
     * Add species to user's collection
     */
    public function store(Request $request)
    {
        $request->validate([
            'taxon_id' => 'required|integer',
            'scientific_name' => 'required|string',
            'common_name' => 'nullable|string',
            'authority' => 'nullable|string',
            'rank' => 'nullable|string',
            'status' => 'nullable|string',
            'kingdom' => 'nullable|string',
            'phylum' => 'nullable|string',
            'class' => 'nullable|string',
            'order' => 'nullable|string',
            'family' => 'nullable|string',
            'image_url' => 'nullable|url',
            'personal_notes' => 'nullable|string|max:1000',
        ]);

        // Check if already exists
        $exists = $request->user()
            ->marineCollections()
            ->where('taxon_id', $request->taxon_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This species is already in your collection',
            ], 409);
        }

        $collection = $request->user()->marineCollections()->create($request->all());

        return response()->json([
            'message' => 'Species added to your collection!',
            'collection' => $collection,
        ], 201);
    }

    /**
     * Update notes
     */
    public function update(Request $request, MarineCollection $collection)
    {
        if ($collection->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'personal_notes' => 'nullable|string|max:1000',
        ]);

        $collection->update($request->only('personal_notes'));

        return response()->json([
            'message' => 'Notes updated successfully',
            'collection' => $collection,
        ]);
    }

    /**
     * Delete species from collection
     */
    public function destroy(Request $request, MarineCollection $collection)
    {
        if ($collection->user_id !== $request->user()->id) {
            abort(403);
        }

        $collection->delete();

        return response()->json([
            'message' => 'Species removed from collection',
        ]);
    }

    /**
     * Random exploration using iNaturalist
     */
    public function explore(Request $request)
        {
            $randomSpecies = $this->api->getRandomSpecies(20);
            
            // Get user's collection count
              $collectionCount = $request->user()
            ? $request->user()->marineCollections()->count()
            : 0;

            return Inertia::render('Explore/Index', [
                'species' => $randomSpecies,
                'collectionCount' => $collectionCount,
            ]);
        }
}
