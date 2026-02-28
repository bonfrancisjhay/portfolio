<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::post('/chat', [ChatController::class, 'chat']);

// Temporary debug route
Route::get('/models', function () {
    $apiKey = env('GEMINI_API_KEY');
    $response = \Illuminate\Support\Facades\Http::withOptions(['verify' => false])
        ->get('https://generativelanguage.googleapis.com/v1beta/models?key=' . $apiKey);
    return $response->json();
});