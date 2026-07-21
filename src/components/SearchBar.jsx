import { useState } from "react";

function SearchBar({ searchWeather }) {
  const [city, setCity] = useState("");

  // 🔍 Text search
  const handleSearch = () => {
    if (city.trim() === "") return;

    searchWeather(city);
    setCity("");
  };

  // 🎤 Voice search
  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;

      setCity(spokenText);
      searchWeather(spokenText);
    };
  };

  return (
    <div className="search-bar">

      {/* input */}
      <input
        type="text"
        value={city}
        placeholder="Enter city..."
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      {/* search button */}
      <button onClick={handleSearch}>
        Search
      </button>

      {/* 🎤 voice button */}
      <button onClick={handleVoice}>
        🎤
      </button>

    </div>
  );
}

export default SearchBar;