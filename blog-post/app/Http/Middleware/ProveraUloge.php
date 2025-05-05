<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProveraUloge
{
    public function handle(Request $request, Closure $next, ...$uloge): Response
    {
        $korisnik = $request->user();

        if (!$korisnik || !in_array($korisnik->uloga, $uloge)) {
            return response()->json(['poruka' => 'Nemate dozvolu za ovu akciju.'], 403);
        }

        return $next($request);
    }
}