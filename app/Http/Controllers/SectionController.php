<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Sections/Index', [
            'sections' => Section::with('academic_level:id,name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Sections/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:' . Section::class,
            'academic_level_id' => 'required|exists:academic_levels,id',
        ]);

        Section::create($validated);

        return redirect()->route('sections.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        return Inertia::render('Sections/Edit', [
            'section' => $section->load('academic_level'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        $validated = $request->validate([
            'name' => ['required', Rule::unique(Section::class)->ignore($section)],
            'academic_level_id' => ['required', Rule::exists(AcademicLevel::class, 'id')],
        ]);

        $section->update($validated);

        return redirect()->route('sections.edit', $section);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();

        return redirect()->route('sections.index');
    }
}
