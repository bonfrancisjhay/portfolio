import { useTheme } from "./ThemeContext";

function Certificate() {
  const { dark } = useTheme();

  const certificates = [
    { title: "Quality Assurance/Tester", issuer: "TinkerPro Technologies Inc.", year: "2026" },
  ];

  return (
    <section className={`w-full ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-5xl mx-auto px-10 py-10">
        <h2 className="text-xl font-bold mb-6">Certificates</h2>
        <div className="flex flex-col gap-3">
          {certificates.map((cert) => (
            <div key={cert.title} className={`p-3 rounded-lg border
              ${dark ? "border-gray-700" : "border-gray-300"}`}>
              <h3 className="font-semibold">{cert.title}</h3>
              <p className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                {cert.issuer} · {cert.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificate;