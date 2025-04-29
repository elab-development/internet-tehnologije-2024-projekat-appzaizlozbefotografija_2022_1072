<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\Prijava;
use Illuminate\Http\Request;


class PrijavaController extends Controller
{
    // Prikaz svih prijava
    public function index()
    {
        return response()->json(Prijava::all(), 200);
    }

    // Kreiranje nove prijave
    public function store(Request $request)
    {
        $prijava = Prijava::create($request->all());
        return response()->json($prijava, 201);
    }

    // Prikaz jedne prijave
    public function show($id)
    {
        $prijava = Prijava::find($id);

        if (!$prijava) {
            return response()->json(['message' => 'Prijava nije pronađena.'], 404);
        }

        return response()->json($prijava, 200);
    }

    // Ažuriranje prijave
    public function update(Request $request, $id)
    {
        $prijava = Prijava::find($id);

        if (!$prijava) {
            return response()->json(['message' => 'Prijava nije pronađena.'], 404);
        }

        $prijava->update($request->all());

        return response()->json($prijava, 200);
    }

    // Brisanje prijave
    public function destroy($id)
    {
        $prijava = Prijava::find($id);

        if (!$prijava) {
            return response()->json(['message' => 'Prijava nije pronađena.'], 404);
        }

        $prijava->delete();

        return response()->json(null, 204);
    }
}
