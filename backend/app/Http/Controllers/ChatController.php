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
        1. HomeSeek - Tech used: PHP, Javascript, HTML, CSS, Bootstrap.
        2. TinkerPro-Website - Tech used: React.
        3. Portfolio - Tech used: React, MySQL, Laravel.

        === EDUCATION ===
        Bachelor Of Science in Industrial Technology - Lapu-Lapu City College, graduated 2025-2026

        === EXPERIENCE ===
        Quality Assurance at TinkerPro (2025 - 2026): I was being assigned as a QA in Tinker Pro Technologies Inc.

        === CONTACT ===
        Email: bonfrancisjhay@gmail.com
        GitHub: github.com/bonfrancisjhay
        LinkedIn: linkedin.com/in/yourhandle

        User question: " . $userMessage;

        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json([
                'message' => 'Configuration error. Please contact the administrator.'
            ]);
        }

        try {
            $response = Http::withOptions([
                'verify' => false,
                'timeout' => 30,
                'connect_timeout' => 10,
                'proxy' => '',
            ])->post(
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

            if (!isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                if (isset($data['error']['code']) && $data['error']['code'] == 429) {
                    return response()->json([
                        'message' => 'I am temporarily unavailable due to high traffic. Please try again later! 😊'
                    ]);
                }
                return response()->json([
                    'message' => 'Sorry, something went wrong. Please try again!'
                ]);
            }

            $botMessage = $data['candidates'][0]['content']['parts'][0]['text'];

            return response()->json([
                'message' => $botMessage
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error connecting to server. Please try again later.'
            ], 500);
        }
    }
}
