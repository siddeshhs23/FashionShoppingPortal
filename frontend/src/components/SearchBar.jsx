import { useState } from "react";

function SearchBar({ onSearch }) {

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  return (

    <div className="container mt-4 mb-4">

      <div className="input-group shadow">

        <input
          type="text"
          className="form-control"
          placeholder="Search Fashion Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          className="btn btn-dark"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

    </div>

  );

}

export default SearchBar;