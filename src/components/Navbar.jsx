function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <h2>🌤 Weather Forecast App</h2>

      <button
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;