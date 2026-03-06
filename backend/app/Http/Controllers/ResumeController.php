<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Smalot\PdfParser\Parser;

class ResumeController extends Controller
{
    public function analyze(Request $request)
    {
        // 1. Get the uploaded PDF
        $file = $request->file('resume');
        $jobDescription = $request->input('jobDescription', '');

        // 2. Extract text from PDF
        $parser = new Parser();
        $pdf = $parser->parseContent(file_get_contents($file->getRealPath()));
        $resumeText = $pdf->getText();

        // 3. Build the prompt (same pattern as ChatController)
        $prompt = "You are an expert resume reviewer.
        Analyze the resume below and return ONLY a valid JSON object, no explanation, no markdown.

        Resume:
        " . $resumeText . "

        " . ($jobDescription ? "Job Description:\n" . $jobDescription : "") . "

        Return this exact JSON:
        {
            \"score\": <0-100>,
            \"scoreLabel\": <\"Excellent\" | \"Strong\" | \"Average\" | \"Needs Work\">,
            \"strengths\": [<3-5 strings>],
            \"improvements\": [<3-6 strings>]
            " . ($jobDescription ? ",\"matchScore\": <0-100>, \"matchSummary\": <string>" : "") . "
        }";

        // 4. Call Gemini API (exact same as ChatController)
        $apiKey = env('GEMINI_API_KEY');

        $response = Http::withOptions([
            'verify' => false,
            'timeout' => 30,
        ])->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey,
            [
                "contents" => [
                    ["parts" => [["text" => $prompt]]]
                ]
            ]
        );

        // 5. Parse and return the result
        $data = $response->json();
        $raw = $data['candidates'][0]['content']['parts'][0]['text'];
        $clean = preg_replace('/```json|```/', '', $raw);
        $result = json_decode(trim($clean), true);

        return response()->json($result);
    }
}