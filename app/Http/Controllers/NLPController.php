<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NLPController extends Controller
{
    //
    public function analyze(Request $request)
    {
        try {
            $response = Http::post(env('FLASK_API_URL') . '/analyze', [
                'sentence' => $request->input('message'),
            ]);

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to connect to NLP service.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
