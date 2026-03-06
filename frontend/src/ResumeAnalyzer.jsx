import { useState, useRef } from "react";
import { useTheme } from "./ThemeContext";
import { Upload, FileText, Briefcase, Star, Lightbulb, ChevronRight, Loader2, X } from "lucide-react";

function Section({ icon: Icon, title, children, dark }) {
  return (
    <div className={`rounded-xl p-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-gray-400" />
        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ResumeAnalyzer() {
  const { dark } = useTheme();
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const analyze = async () => {
    if (!file) return setError("Please upload a resume PDF.");
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      if (jobDesc.trim()) formData.append("jobDescription", jobDesc);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze-resume`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed.");
      setResult(data);
    } catch (err) {
      setError(err.message || "Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen px-4 py-12 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Resume Analyzer</h1>
          <p className="text-gray-400 text-sm">Upload your resume and get instant AI-powered feedback</p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => !file && fileRef.current.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-4
            ${dark ? "border-gray-700 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"}
            ${file ? "cursor-default" : ""}`}
        >
          <input ref={fileRef} type="file" accept=".pdf" className="hidden"
            onChange={(e) => handleFile(e.target.files[0])} />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText size={24} className="text-gray-400" />
              <span className="text-sm font-medium">{file.name}</span>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }}
                className="ml-2 text-gray-400 hover:text-red-400 transition">
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <Upload size={28} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm font-medium">Drop your PDF here or <span className="underline">browse</span></p>
              <p className="text-xs text-gray-500 mt-1">PDF files only</p>
            </>
          )}
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Job Description <span className="text-gray-500 font-normal normal-case">(optional — for match score)</span>
          </label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here..."
            rows={4}
            className={`w-full rounded-xl px-4 py-3 text-sm outline-none resize-none
              ${dark ? "bg-gray-800 text-white placeholder-gray-500" : "bg-gray-50 text-gray-900 placeholder-gray-400"}`}
          />
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {/* Analyze Button */}
        <button
          onClick={analyze}
          disabled={loading || !file}
          className="w-full py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</>
            : <>Analyze Resume <ChevronRight size={16} /></>}
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 flex flex-col gap-4">

            {/* Score */}
            <div className={`rounded-2xl p-6 text-center ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Overall Score</p>
              <p className="text-6xl font-bold">{result.score}<span className="text-2xl text-gray-400">/100</span></p>
              <p className="text-gray-400 mt-1 text-sm">{result.scoreLabel}</p>
            </div>

            {/* Job Match */}
            {result.matchScore !== undefined && (
              <Section icon={Briefcase} title="Job Match" dark={dark}>
                <div className="flex items-center gap-3">
                  <div className={`h-2 flex-1 rounded-full ${dark ? "bg-gray-700" : "bg-gray-200"}`}>
                    <div className="h-2 rounded-full bg-gray-500 transition-all duration-700"
                      style={{ width: `${result.matchScore}%` }} />
                  </div>
                  <span className="text-sm font-bold">{result.matchScore}%</span>
                </div>
                {result.matchSummary && <p className="text-sm text-gray-400 mt-2">{result.matchSummary}</p>}
              </Section>
            )}

            {/* Strengths */}
            {result.strengths?.length > 0 && (
              <Section icon={Star} title="Strengths" dark={dark}>
                <ul className="flex flex-col gap-2">
                  {result.strengths.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className={dark ? "text-gray-300" : "text-gray-700"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Improvements */}
            {result.improvements?.length > 0 && (
              <Section icon={Lightbulb} title="Suggested Improvements" dark={dark}>
                <ul className="flex flex-col gap-2">
                  {result.improvements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-yellow-400">•</span>
                      <span className={dark ? "text-gray-300" : "text-gray-700"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;