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
        $fotografija = Fotografija::create($request->all());
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
            return response()->json(['message' => 'Fotografija nije pronađena.'], 404);
        }

        $fotografija->update($request->all());

        return response()->json($fotografija, 200);
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
