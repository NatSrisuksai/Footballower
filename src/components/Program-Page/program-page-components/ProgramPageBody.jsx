/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import videoBG from "../../../assets/eplAnthem.mp4";

function ClubInfo(props) {
  const [isSelected, setisSelected] = useState(false);

  const [hasTeam, setHasTeam] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  const [lastMatch, setLastMatch] = useState(null);

  const [selectedFav, setselectedFav] = useState(null);
  const [val, setval] = useState(null);

  const allTeamData = props.data;
  // const val = props.selectedTeamName;

  useEffect(() => {
    if (props.selectedFav != null && props.selectedTeamName != null) {
      setHasTeam(true);
      setselectedFav(props.selectedFav);
      setval(props.selectedTeamName);
    } else if (props.selectedFav === null && props.selectedTeamName != null) {
      setHasTeam(true);
      setselectedFav(null);
      setval(props.selectedTeamName);
    } else if (props.selectedFav != null && props.selectedTeamName === null) {
      setHasTeam(true);
      setselectedFav(props.selectedFav);
      setval(null);
    } else if (props.selectedFav === null && props.selectedTeamName === null) {
      setHasTeam(false);
      setselectedFav(null);
      setval(null);
    }
  }, [props.selectedFav, props.selectedTeamName]);

  useEffect(() => {
    if (props.lastMatchData != null) {
      setHasVal(true);
      setLastMatch(props.lastMatchData);
    } else {
      setHasVal(false);
      setLastMatch(null);
    }
  }, [props.lastMatchData]);

  // ===================
  const handleStarClick = async () => {
    try {
      const teamName = val || selectedFav;

      await axios.post(
        "https://footballower-backend.vercel.app/addFavorite",
        { teamName },
        {
          withCredentials: true,
        }
      );

      alert("Favorite team added successfully!");
    } catch (error) {
      console.error("Error adding favorite team:", error);
      alert("An error occurred while adding the favorite team.");
    }
  };

  const handleStarClickDelete = async () => {
    try {
      const teamName = val || selectedFav; // Get the selected team name

      await axios.delete("https://footballower-backend.vercel.app/deleteFavorite", {
        data: { teamName },
        withCredentials: true,
        
      });

      alert("Favorite team removed successfully!");
    } catch (error) {
      console.error("Error removing favorite team:", error);
      alert("An error occurred while removing the favorite team.");
    }
  };

  useEffect(() => {
    const teamToFind = val || selectedFav;

    if (teamToFind) {
      if (props.favTeam.some((obj) => obj.team === teamToFind)) {
        setisSelected(true);
      } else {
        setisSelected(false);
      }
    } else {
      setisSelected(false);
    }
  }, [props.favTeam, selectedFav, val]);

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] overflow-auto">
      {hasVal ? (
        <div className="grid-container h-full w-full grid-cols-[1fr_3fr] grid-rows-[1fr_3fr]">
          <div className="first bg-cyan-100 flex flex-col items-center justify-start content-center ">
            <div className="mt-3">
              {isSelected ? (
                <SolidStarIcon
                  className="h-8 w-8 text-yellow-500"
                  onClick={handleStarClickDelete}
                />
              ) : (
                <OutlineStarIcon
                  className="h-8 w-8 text-gray-500"
                  onClick={handleStarClick}
                />
              )}
            </div>
            <div className="mb-2 mt-3">
              {hasTeam ? (
                <img
                  src={
                    allTeamData.find(
                      (element) => element.name === (val || selectedFav)
                    )?.crest || "https://crests.football-data.org/64.png"
                  }
                  alt="Description"
                />
              ) : (
                <img
                  src="https://crests.football-data.org/64.png"
                  alt="Description"
                />
              )}
            </div>
            <div className="text-xl mb-5 font-medium">
              {hasTeam ? (
                <p>
                  {allTeamData.find(
                    (element) => element.name === (val || selectedFav)
                  )?.name || "Liverpool FC"}
                </p>
              ) : (
                <p>Liverpool FC</p>
              )}
            </div>
            <div className="font-medium flex flex-col items-center justify-start content-center">
              {hasTeam ? (
                <p>
                  League Rank:{" "}
                  {allTeamData.find(
                    (element) => element.name === (val || selectedFav)
                  )?.rank || "2"}
                </p>
              ) : (
                <p>League Rank: 2</p>
              )}
              {hasTeam ? (
                <p>
                  Coach:{" "}
                  {allTeamData.find(
                    (element) => element.name === (val || selectedFav)
                  )?.coach || "Arne Slot"}
                </p>
              ) : (
                <p>Coach: Arne Slot</p>
              )}
              {hasTeam ? (
                allTeamData
                  .find((element) => element.name === (val || selectedFav))
                  ?.ongoingTournament.map((tournament, index) => (
                    <p key={index}>{tournament} (Ongoing)</p>
                  ))
              ) : (
                <div className="font-medium flex flex-col items-center justify-start content-center">
                  <p>Premier League (Ongoing)</p>
                  <p>UEFA Champions League (Ongoing)</p>
                </div>
              )}
            </div>
          </div>

          <div className="second bg-amber-100 h-full w-full grid-rows-[1fr_2fr] grid-cols-1">
            <div className="upcoming flex flex-col items-center justify-start content-center">
              <div className="text-3xl font-medium mt-2">Upcoming Match</div>
            </div>
            <div className="showUpcoming h-full w-full grid-rows-1 grid-cols-[2fr_1fr_2fr]">
              <div className="homeTeam flex flex-col items-center justify-center h-full">
                <img
                  src={
                    allTeamData.find(
                      (element) => element.name === lastMatch[5].nextMatch[0]
                    )?.crest || "https://crests.football-data.org/64.png" // Fallback URL
                  }
                  alt="Description"
                  className="w-12 h-12"
                />
                <p className="text-xl font-medium">
                  {lastMatch[5].nextMatch[0]}
                </p>
              </div>

              <div className="matchPeriod h-full w-full grid-rows-2 grid-cols-1">
                <div className="showTime flex flex-col items-center justify-center h-full">
                  <p className="text-2xl font-bold">
                    {lastMatch[5].matchDate.dateText}
                  </p>
                </div>
                <div className="showDay flex flex-col items-center justify-center h-full">
                  <p className="font-bold">
                    {lastMatch[5].matchDate.date.split(",")[0].trim()}
                  </p>
                </div>
              </div>
              <div className="awayTeam flex flex-col items-center justify-center h-full">
                <img
                  src={
                    allTeamData.find(
                      (element) => element.name === lastMatch[5].nextMatch[1]
                    )?.crest || "https://crests.football-data.org/64.png" // Fallback URL
                  }
                  alt="Description"
                  className="w-12 h-12"
                />
                <p className="text-xl font-medium">
                  {lastMatch[5].nextMatch[1]}
                </p>
              </div>
            </div>
            <hr className="mx-2 border-6 border-black" />
          </div>

          <div className="third bg-amber-100 h-full w-full grid-rows-[1fr_5fr] grid-cols-1">
            <hr className="mx-2 border-6 border-black" />
            <div className="previousmatchTitle flex flex-col items-center justify-start content-center">
              <div className="text-3xl font-medium mt-4">Last 5 Matches</div>
            </div>

            <div className="showPreviousmatch h-full w-full grid-rows-[1fr_1fr_1fr_1fr_1fr] grid-cols-1">
              <div className="previosFirstMatch w-full grid-rows-1 grid-cols-[3fr_1fr_3fr]">
                <div className="home font-medium text-xl flex mb-4 justify-end items-center">
                  <p>{lastMatch[0].homeTeam}</p>
                </div>
                <div className="score flex mb-4 justify-center items-center">
                  <p className="font-medium text-xl">
                    {lastMatch[0].homeScore} : {lastMatch[0].awayScore}
                  </p>
                </div>
                <div className="away font-medium text-xl flex mb-4 justify-start items-center">
                  <p>{lastMatch[0].awayTeam}</p>
                </div>
              </div>
              <div className="previosSecondMatch  w-full grid-rows-1 grid-cols-[3fr_1fr_3fr]">
                <div className="home font-medium text-xl flex mb-4 justify-end items-center">
                  <p>{lastMatch[1].homeTeam}</p>
                </div>
                <div className="score flex mb-4 justify-center items-center">
                  <p className="font-medium text-xl">
                    {lastMatch[1].homeScore} : {lastMatch[1].awayScore}
                  </p>
                </div>
                <div className="away font-medium text-xl flex mb-4 justify-start items-center">
                  <p>{lastMatch[1].awayTeam}</p>
                </div>
              </div>
              <div className="previosThirdMatch w-full grid-rows-1 grid-cols-[3fr_1fr_3fr]">
                <div className="home font-medium text-xl flex mb-4 justify-end items-center">
                  <p>{lastMatch[2].homeTeam}</p>
                </div>
                <div className="score flex mb-4 justify-center items-center">
                  <p className="font-medium text-xl">
                    {lastMatch[2].homeScore} : {lastMatch[2].awayScore}
                  </p>
                </div>
                <div className="away font-medium text-xl flex mb-4 justify-start items-center">
                  <p>{lastMatch[2].awayTeam}</p>
                </div>
              </div>
              <div className="previosFourthMatch  w-full grid-rows-1 grid-cols-[3fr_1fr_3fr]">
                <div className="home font-medium text-xl flex mb-4 justify-end items-center">
                  <p>{lastMatch[3].homeTeam}</p>
                </div>
                <div className="score flex mb-4 justify-center items-center">
                  <p className="font-medium text-xl">
                    {lastMatch[3].homeScore} : {lastMatch[3].awayScore}
                  </p>
                </div>
                <div className="away font-medium text-xl flex mb-4 justify-start items-center">
                  <p>{lastMatch[3].awayTeam}</p>
                </div>
              </div>
              <div className="previosFivthMatch w-full grid-rows-1 grid-cols-[3fr_1fr_3fr]">
                <div className="home font-medium text-xl flex mb-4 justify-end items-center">
                  <p>{lastMatch[4].homeTeam}</p>
                </div>
                <div className="score flex mb-4 justify-center items-center">
                  <p className="font-medium text-xl">
                    {lastMatch[4].homeScore} : {lastMatch[4].awayScore}
                  </p>
                </div>
                <div className="away font-medium text-xl flex mb-4 justify-start items-center">
                  <p>{lastMatch[4].awayTeam}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 min-h-screen">
          <video
            src={videoBG}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        </div>

        // <p>This is website that allow everyone to follow your own favorite club in Premier Leauge</p>
      )}
    </div>
  );
}

export default ClubInfo;
