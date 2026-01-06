const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      {/* Input que captura o texto e envia para o pai via props */}
      <input
        type="text"
        className="search-input"
        placeholder="Search for name..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;
