<?php

namespace App\Http\Controllers;

use App\Models\Fotografija;
use Illuminate\Http\Request;

class FotografijaController extends Controller
{
    public function index()
    {
        return response()->json(Fotografija::all(), 200);
    }

    public function store(Request $request)
    {
        if (auth()->user()->uloga !== 'fotograf') {
            return response()->json(['poruka' => 'Samo fotograf može da dodaje fotografije.'], 403);
        }

        $validated = $request->validate([
            'naziv' => 'required|string|max:100',
            'opis' => 'nullable|string|max:500',
            'izlozba_id' => 'required|exists:izlozbe,id',
            'slika' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'url' => 'nullable|url|max:2048',
        ]);
        

        if (!$request->hasFile('slika') && !$request->filled('url')) {
            return response()->json(['poruka' => 'Morate uneti URL slike ili uploadovati fajl.'], 422);
        }

        $fotografija = new Fotografija();
        $fotografija->naziv = $validated['naziv'];
        $fotografija->opis = $validated['opis'] ?? null;
        $fotografija->izlozba_id = $validated['izlozba_id'];

        if ($request->hasFile('slika')) {
            $fotografija->putanja_slike = $request->file('slika')->store('fotografije', 'public');
        } elseif ($request->filled('url')) {
            $fotografija->putanja_slike = $validated['url'];
        }

        $fotografija->save();

        return response()->json($fotografija, 201);
    }

    public function show($id)
    {
        $fotografija = Fotografija::find($id);

        if (!$fotografija) {
            return response()->json(['message' => 'Fotografija nije pronađena.'], 404);
        }

        return response()->json($fotografija, 200);
    }

    public function update(Request $request, $id)
    {
        $fotografija = Fotografija::find($id);
        if (!$fotografija) {
            return response()->json(['error' => 'Fotografija nije pronađena.'], 404);
        }

        $validated = $request->validate([
            'naziv' => 'sometimes|string|max:100',
            'opis' => 'nullable|string|max:500',
            'izlozba_id' => 'sometimes|exists:izlozbe,id',
        ]);

        $fotografija->update($validated);

        return response()->json($fotografija, 200);
    }

    public function destroy($id)
    {
        $fotografija = Fotografija::find($id);
        if (!$fotografija) {
            return response()->json(['message' => 'Fotografija nije pronađena.'], 404);
        }

        $fotografija->delete();

        return response()->json(['message' => 'Fotografija je uspešno obrisana.'], 200);
    }
}
