<?php

namespace App\Http\Controllers;

use App\Models\Fotografija;
use Illuminate\Http\Request;

class FotografijaController extends Controller
{
    // Prikaz svih fotografija
    public function index()
    {
        return response()->json(Fotografija::all(), 200);
    }

    // Kreiranje nove fotografije
    public function store(Request $request)
{
    $validated = $request->validate([
        'url' => 'required|url|max:2048',
        'naziv' => 'required|string|max:100',
        'opis' => 'nullable|string|max:500',
        'izlozba_id' => 'required|exists:izlozbas,id',
    ]);

    $fotografija = Fotografija::create($validated);

    return response()->json($fotografija, 201);
}

    // Prikaz jedne fotografije
    public function show($id)
    {
        $fotografija = Fotografija::find($id);

        if (!$fotografija) {
            return response()->json(['message' => 'Fotografija nije pronađena.'], 404);
        }

        return response()->json($fotografija, 200);
    }

    // Ažuriranje fotografije
    public function update(Request $request, $id)
{
    $fotografija = Fotografija::find($id);
    if (!$fotografija) {
        return response()->json(['error' => 'Fotografija nije pronađena.'], 404);
    }

    $validated = $request->validate([
        'url' => 'sometimes|url|max:2048',
        'naziv' => 'sometimes|string|max:100',
        'opis' => 'nullable|string|max:500',
        'izlozba_id' => 'sometimes|exists:izlozbas,id',
    ]);

    $fotografija->update($validated);

    return response()->json($fotografija);
}

    // Brisanje fotografije
    public function destroy($id)
    {
        $fotografija = Fotografija::find($id);

        if (!$fotografija) {
            return response()->json(['message' => 'Fotografija nije pronađena.'], 404);
        }

        $fotografija->delete();

        return response()->json(null, 204);
    }
}
