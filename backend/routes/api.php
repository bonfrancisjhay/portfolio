<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ResumeController;

Route::post('/chat', [ChatController::class, 'chat']);
Route::post('/analyze-resume', [App\Http\Controllers\ResumeController::class, 'analyze']);