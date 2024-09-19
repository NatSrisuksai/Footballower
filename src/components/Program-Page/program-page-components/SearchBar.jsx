/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const teams = props.data;
  const [inputValue, setInputValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [error, setError] = useState(null);
  const [latestMatch, setLatestMatch] = useState(null);
  const searchBarRef = useRef(null); // Ref to detect clicks outside
  const navigate = useNavigate();

  // Click handler for showing the search list
  function searchHandle() {
    setShowSearch(true);
  }

  // Click handler when user selects a club
  function handleClubClick(teamName, teamURL) {
    setShowSearch(false);
    console.log(teamName);
    // Call the API to get the latest match data
    fetch(
      `https://footballower-backend.vercel.app/latestMatch?url=${encodeURIComponent(teamURL)}`,
      {
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => { throw err; }); // Parse error response
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Log received data
        setLatestMatch(data);
        props.onParse(data);
        navigate(`/program-page?team=${encodeURIComponent(teamName)}`);
      })
      .catch((error) => {
        console.error("Error fetching match data:", error);
      });
  }

  // Handle clicks outside the search bar to close the search list
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  // Filter teams based on input value
  const filteredTeams = teams?.filter((team) =>
    team?.name?.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  return (
    <div className="relative flex-grow max-w-xs" ref={searchBarRef}>
      <div className="flex items-center px-3 py-1 bg-white rounded-lg shadow-md h-full">
        <AiOutlineSearch size={18} className="text-gray-700" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={searchHandle}
          placeholder="Enter Football Club Name"
          className="placeholder:text-gray-700 p-2 outline-none flex-grow ml-2 h-full"
          style={{ height: "1.6rem" }} // Adjust this value to match header height
        />
      </div>

      {showSearch && (
        <ul className="bg-white mt-2 max-h-60 overflow-y-auto rounded-lg shadow-lg border border-gray-200 absolute w-full z-50">
          {filteredTeams?.length > 0 ? (
            filteredTeams.map((team) => (
              <li
                key={team?.teamID}
                className="p-3 text-sm hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() => handleClubClick(team.name, team.url)}
              >
                <img
                  src={team.crest}
                  alt={`${team.name} logo`}
                  className="inline mr-2"
                  width="20"
                />
                {team?.name}
              </li>
            ))
          ) : (
            <li className="p-3 text-sm text-red-500">Team not found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
