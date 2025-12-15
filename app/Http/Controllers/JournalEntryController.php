<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalEntryController extends Controller
{
    /**
     * Display user's journal entries
     */
    public function index(Request $request)
    {
        $entries = $request->user()
            ->journalEntries()
            ->with('marineCollection')
            ->latest()
            ->paginate(10);

        return Inertia::render('Journal/Index', [
            'entries' => $entries,
        ]);
    }

    /**
     * Show form to create new entry
     */
    public function create()
    {
        return Inertia::render('Journal/Create');
    }

    /**
     * Store new journal entry
     */
    public function store(Request $request)
    {
        $request->validate([
            'marine_collection_id' => 'nullable|exists:marine_collections,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'location' => 'nullable|string|max:255',
            'discovery_date' => 'nullable|date',
            'tags' => 'nullable|array',
        ]);

        // If marine_collection_id is provided, verify ownership
        if ($request->marine_collection_id) {
            $collection = $request->user()
                ->marineCollections()
                ->find($request->marine_collection_id);
            
            if (!$collection) {
                return response()->json([
                    'message' => 'Invalid species reference',
                ], 403);
            }
        }

        $entry = $request->user()->journalEntries()->create($request->all());

        return response()->json([
            'message' => 'Journal entry created!',
            'entry' => $entry->load('marineCollection'),
        ], 201);
    }

    /**
     * Display specific journal entry
     */
    public function show(Request $request, JournalEntry $entry)
    {
        // Check ownership
        if ($entry->user_id !== $request->user()->id) {
            abort(403);
        }

        $entry->load('marineCollection');

        return Inertia::render('Journal/Show', [
            'entry' => $entry,
        ]);
    }

    /**
     * Show form to edit entry
     */
    public function edit(Request $request, JournalEntry $entry)
    {
        // Check ownership
        if ($entry->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('Journal/Edit', [
            'entry' => $entry,
        ]);
    }

    /**
     * Update journal entry
     */
    public function update(Request $request, JournalEntry $entry)
    {
        // Check ownership
        if ($entry->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'location' => 'nullable|string|max:255',
            'discovery_date' => 'nullable|date',
            'tags' => 'nullable|array',
        ]);

        $entry->update($request->all());

        return response()->json([
            'message' => 'Journal entry updated!',
            'entry' => $entry->load('marineCollection'),
        ]);
    }

    /**
     * Delete journal entry
     */
    public function destroy(Request $request, JournalEntry $entry)
    {
        // Check ownership
        if ($entry->user_id !== $request->user()->id) {
            abort(403);
        }

        $entry->delete();

        return response()->json([
            'message' => 'Journal entry deleted',
        ]);
    }
}