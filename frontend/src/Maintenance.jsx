import { useTheme } from "./ThemeContext";

function Maintenance() {
  const { dark } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300
      ${dark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">
          🚧 Under Maintenance
        </h1>

        <p
          className={`${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          This project is currently unavailable.
        </p>
      </div>
    </div>
  );
}

export default Maintenance;