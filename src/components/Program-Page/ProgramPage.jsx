/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProgramHeader from "./program-page-components/ProgramHeader";
import Sidebar from "./program-page-components/SideBar";
import ClubInfo from "./program-page-components/ProgramPageBody";
import { useNavigate } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProgramPage = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [lastestMatch, setlastestMatch] = useState(null);
  const [selectedFav, setselectedFav] = useState(null);

  const [favTeams, setFavTeams] = useState([]);
  // Get the 'team' parameter from the query string
  const query = useQuery();
  var selectedTeamName = query.get("team");

  useEffect(() => {
    fetch("https://footballower-backend.vercel.app/", {
      credentials: "include", // Include credentials (cookies)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  function getLastMatch(obj) {
    setlastestMatch(obj);
  }

  function getSelectedFav(obj) {
    setselectedFav(obj);
  }
  const navigate = useNavigate();

  function getLastMatchFav(teamName, teamURL) {
    fetch(
      `https://footballower-backend.vercel.app/latestMatch?url=${encodeURIComponent(
        teamURL
      )}`,
      {
        method: "GET",
        credentials: "include", // Include credentials (cookies) in the request
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setlastestMatch(data);
        navigate(`/program-page?team=${teamName}`);
      })
      .catch((error) => {
        console.error("Error fetching match data:", error);
      });
  }

  function getFavTeam() {
    fetch(`http://localhost:3000/getFav`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length >= 5) {
          setFavTeams(data.slice(-5));
        } else {
          setFavTeams(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching match data:", error);
      });
  }

  return (
    <div className="flex flex-col h-screen">
      <ProgramHeader data={teams} onParse={getLastMatch} />
      <div className="flex flex-1">
        <Sidebar
          className="w-1/7"
          onParse={getLastMatchFav}
          onGetFav={getFavTeam}
          data={teams} // Pass the teams data to Sidebar
          favTeam={favTeams}
        />
        <ClubInfo
          data={teams}
          selectedTeamName={selectedTeamName}
          lastMatchData={lastestMatch}
          selectedFav={selectedFav}
          favTeam={favTeams}
        />
      </div>
    </div>
  );
};

export default ProgramPage;
