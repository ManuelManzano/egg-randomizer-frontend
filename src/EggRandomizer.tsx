import { useState } from "react";
import axios from "axios";



export default function EggRandomizer() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [eggCount, setEggCount] = useState<number | null>(null);
  const [rgbColors, setRgbColors] = useState<number[][]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const generateRandomNumber = async () => {
    try {
      const res = await axios.get("https://egg-randomizer-backend.onrender.com");
      const seed = res.data.seed;
      const scaled = Math.floor(seed * (max - min + 1)) + parseInt(min.toString());
      setRandomNumber(scaled);
      setError(null);
      setEggCount(res.data.egg_count);
      setRgbColors(res.data.egg_colors);
      setImageSrc(res.data.image);
    } catch (err) {
      setError("Failed to fetch egg seed. Is your Flask server running?");
      setRandomNumber(null);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-start p-8 space-y-12">
      {/* Top Card */}
      <section className="w-full max-w-3xl bg-yellow-100 rounded-2xl shadow-md p-6 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={generateRandomNumber}
            className="px-4 py-2 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 transition"
          >
            Generate Random Number
          </button>
        </div>

        {randomNumber !== null && (
          <p className="text-xl font-semibold text-green-700">
            Random Number: {randomNumber}
          </p>
        )}
        {error && (
          <p className="text-red-600 font-semibold mt-2">{error}</p>
        )}

        <h1 className="text-3xl font-bold mt-6">Egg Randomizer</h1>
        <p className="mt-2 text-gray-700">
          This tool uses entropy derived from real egg-laying patterns and colors observed daily in my chicken coop. It generates true randomness that is then scaled into your desired range.
        </p>
      </section>

      {/* Paper link */}
      <section className="w-full max-w-3xl text-center">
        <a
          href="https://link-to-your-paper.com"
          className="text-blue-600 underline text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the original paper and research references
        </a>
      </section>

      {/* Detection Info */}
      {imageSrc && (
        <section className="w-full max-w-3xl bg-gray-100 rounded-xl shadow-inner p-6 text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Detection Snapshot</h2>

          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt="Detected Eggs"
              className="rounded-lg shadow-lg max-h-[400px]"
            />
          </div>

          <p className="text-lg text-gray-700 font-medium">
            Egg Count: {eggCount}
          </p>

          <div className="text-left mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sampled Egg Colors (RGB):
            </h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              {rgbColors.map((rgb, index) => (
                <li key={index}>
                  <span className="font-semibold">Egg {index + 1}</span>: [ {rgb.map((value) => value.toFixed(2)).join(", ")} ]
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
