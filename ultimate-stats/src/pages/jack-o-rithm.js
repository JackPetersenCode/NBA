import axios from "axios";
import Dropdown from "../components/Dropdown"
import React, { useEffect, useState } from "react";
import TeamsDropdown from "../components/TeamsDropdown";
import SeasonsDropdown from "../components/SeasonsDropdown";
import Schedule from "../components/Schedule";
import PredictionResultsTable from "../components/JackODropDown";
import GameResults from "../components/GameResults";


const Jackarithm = () => {
    
    const [teamsData, setTeamsData] = useState([]);
    const [seasonsData, setSeasonsData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [gameResults, setGameResults] = useState([]);
    const [expectedResults, setExpectedResults] = useState([]);

    const [selectedHomeTeam, setSelectedHomeTeam] = useState('');
    const [selectedVisitorTeam, setSelectedVisitorTeam] = useState('');
    const [selectedSeason, setSelectedSeason] = useState('');

    const [teamsH, setTeamsH] = useState([]);
    const [teamsV, setTeamsV] = useState([]);


    return (
        <div>
        <h1>
          <TeamsDropdown teamsData={teamsData} setTeamsData={setTeamsData} selectedTeam={selectedHomeTeam} setSelectedTeam={setSelectedHomeTeam} H_or_V={'home'}/>
          <TeamsDropdown teamsData={teamsData} setTeamsData={setTeamsData} selectedTeam={selectedVisitorTeam} setSelectedTeam={setSelectedVisitorTeam} H_or_V={'visitor'}/>
          <SeasonsDropdown seasonsData={seasonsData} setSeasonsData={setSeasonsData} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>
          <Schedule selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} scheduleData={scheduleData} setScheduleData={setScheduleData}/>
          <PredictionResultsTable teamsH={teamsH} setTeamsH={setTeamsH} teamsV={teamsV} setTeamsV={setTeamsV}/>
          <GameResults expectedResults={expectedResults} setExpectedResults={setExpectedResults} gameResults={gameResults} setGameResults={setGameResults} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>
        </h1>
      </div>         
    )
}

export default Jackarithm;