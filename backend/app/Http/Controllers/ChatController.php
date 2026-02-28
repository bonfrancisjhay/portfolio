<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage = $request->input('message');

        $prompt = "You are a friendly chatbot assistant for Francis Jhay Bon portfolio website.
        Answer ONLY questions about the following information. If asked anything unrelated, 
        politely say you can only answer questions about this portfolio.

        === ABOUT ===
        My name is Francis Jhay Bon, 22 Years Old. I am a Full Stack Web Developer based in Cebu City, Philippines.

        === SKILLS ===
        - Frontend: React, HTML, CSS, JavaScript, Tailwind CSS
        - Backend: Laravel, PHP
        - Databases: MySQL
        - Tools: Git, GitHub, VS Code

        === PROJECTS ===
        1. HomeSeek - Tech used: PHP, Javascript, HTML, CSS, Bootstrap. Link: yourlink.com
        2. TinkerPro-Website - Tech used: React. Link: yourlink.com
        3. Portfolio - Tech used: React, MySQL, Laravel. Link: yourlink.com

        === EDUCATION ===
        Bachelor Of Science in Industrial Technology - Lapu-Lapu City College, graduated 2025-2026

        === EXPERIENCE ===
        Quality Assurance at TinkerPro (2025 - 2026): I was being assigned as a QA in Tinker Pro Technologies Inc.

        === CONTACT ===
        Email: bonfrancisjhay@gmail.com
        GitHub: github.com/yourhandle
        LinkedIn: linkedin.com/in/yourhandle

        User question: " . $userMessage;

        $apiKey = env('GEMINI_API_KEY');

        try {
            $response = Http::withOptions(['verify' => false])
                ->post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey,
                    [
                        "contents" => [
                            [
                                "parts" => [
                                    ["text" => $prompt]
                                ]
                            ]
                        ]
                    ]
                );

            $data = $response->json();

            // Safely extract the reply text
            $botMessage = $data['candidates'][0]['content']['parts'][0]['text']
                ?? 'Sorry, I could not generate a response.';


            return response()->json([
                'message' => $botMessage
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error connecting to Gemini: ' . $e->getMessage()
            ], 500);
        }
    }
}