import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";

const TeamsDropdown = (props) => {
    let idSeasonCount = 0;
    let idTeamCount = 0;
    let idGameCount = 0;

    let [teamsData, setTeamsData] = useState([]);
    let [seasonsData, setSeasonsData] = useState([]);
    let [gameData, setGameData] = useState([]);
    let [roster, setRosterData] = useState([]);
    let [shotsData, setShotsData] = useState([]);

    const [playerid, setPlayerId] = useState('');
    const [boxScore, setBoxScore] = useState([]);

    let [selectedTeam, setSelectedTeam] = useState('');
    let [selectedSeason, setSelectedSeason] = useState('');
    let [selectedPlayer, setSelectedPlayer] = useState('');
    let [selectedGame, setSelectedGame] = useState('');


    let options = null;
    let optionsGames = null;
    let shots = null;

    useEffect(() => {
        
        let isSubscribed = true;

        const getTeams = async() => {
            let response = await axios.get(`/teamnames`);
            if (isSubscribed) {
                setTeamsData(response.data);
            }
        }
        getTeams();
        return () => isSubscribed = false;
    }, [])
      
    useEffect(() => {
        
      let isSubscribed = true;
        const getSeasons = async() => {
            if (isSubscribed) {
                setSeasonsData([
                    {season: '2015-2016'},
                    {season: '2016-2017'},
                    {season: '2017-2018'},
                    {season: '2018-2019'},
                    {season: '2019-2020'},
                    {season: '2020-2021'},
                    {season: '2021-2022'},
                    {season: '2022-2023'}
                ])
            }
        }
        getSeasons();
        return () => isSubscribed = false;
    }, [])

    useEffect(() => {
        
      let isSubscribed = true;
        const getRoster = async() => {
            let teamid = await axios.get(`/leagueGames/teamid/${selectedTeam}`)
            console.log(teamid.data)
            let response = await axios.get(`/boxPlayers/getroster/${selectedSeason}/${teamid.data[0].team_id}`)
            if (isSubscribed) {
                setRosterData(response.data);
            }
        }
        if (selectedTeam) {
            console.log(selectedTeam);
            getRoster()
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam])

    useEffect(() => {
        
      let isSubscribed = true;
        const getGames = async() => {
            console.log(selectedPlayer);
            let games = await axios.get(`/leagueGames/gameidgamedatematchup/${selectedPlayer}/${selectedSeason}`)
            if (isSubscribed) {
                setGameData(games.data);
            }
        }
        if (selectedPlayer) {
            console.log(selectedPlayer);
            getGames();
        }
        return () => isSubscribed = false;
    }, [selectedSeason, selectedTeam, selectedPlayer])
  
    useEffect(() => {
        
      let isSubscribed = true;
        const getShots = async() => {
            let shots = await axios.get(`/shots/${selectedPlayer}/${selectedSeason}`)
            console.log(shots.data)
            if (isSubscribed) {
                setShotsData(shots.data);
            }
        }
        if (selectedPlayer) {
            console.log(selectedPlayer);
            getShots();
        }
        return () => isSubscribed = false;
    }, [selectedPlayer])

    useEffect(() => {
        
        let isSubscribed = true;
            const getPlayerId = async() => {
            
                let playerid = await axios.get(`/playersNBA/${selectedPlayer}`)
                console.log(playerid.data);
                if (isSubscribed) {
                    setPlayerId(playerid.data[0]);
                }
          }
          if (selectedPlayer) {
              getPlayerId();
          }
          return () => isSubscribed = false;
    }, [selectedPlayer])

    useEffect(() => {
        
        let isSubscribed = true;
            const getAverages = async() => {
            
                let boxScore = await axios.get(`/boxScoresTraditional/averages/${playerid.playerid}/${selectedSeason}`)
                if (isSubscribed) {
                    setBoxScore(boxScore.data);
                }
            }
            if (playerid) {

                getAverages();
            }
            return () => isSubscribed = false;
    }, [playerid])  
  

    function handleTeamChange(event) {
        setSelectedPlayer('')
        setSelectedGame('')
        setSelectedTeam(event.target.value);
        console.log(selectedTeam);
    }

    function handleSeasonChange(event) {
        setSelectedPlayer('')
        setSelectedGame('')
        setSelectedSeason(event.target.value);
      
        console.log(selectedSeason);
    }

    function handlePlayerChange(event) {
        setSelectedPlayer(event.target.value);
    }

    function handleGameChange(event) {
        setSelectedGame(event.target.value);
    }
    
    if (roster) {
        let idCountRoster = 0;
        options = roster.map((option) => <option key={idCountRoster++} value={option['player_name']}>{option['player_name']}</option>);
    }

    if (gameData) {
        let idGameCount = 0;
        optionsGames = gameData.map((option) => <option key={idGameCount++} value={Object.values(option)}>{Object.values(option)}</option>);
    }

    if (shotsData.length > 0 && boxScore.length > 0) {
        console.log('in here')
        console.log(shotsData)
        console.log(playerid)
        console.log(boxScore)
        console.log(selectedSeason)
        shots = <ShotChartSVG shotsData={shotsData} playerid={playerid} boxData={boxScore} season={selectedSeason}/>
    }


    return (
      <label>
        {props.label}

        <select value={selectedSeason} onChange={handleSeasonChange}>
          <option value="0">Select Season</option>

          {seasonsData.map((option) => (
            <option key={idSeasonCount++} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        <select value={selectedTeam} onChange={handleTeamChange}>
          <option value="0">Select Team</option>

          {teamsData.map((option) => (
            <option key={idTeamCount++} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        <select value={selectedPlayer} onChange={handlePlayerChange}>
          <option value="0">Select Player</option>
        {options}
        </select>
        <select value={selectedGame} onChange={handleGameChange}>
          <option value="0">Select Game</option>
          {optionsGames}
        </select>
        <br></br>
        <div>{shots}</div>
      </label>
    );
        
};
        
export default TeamsDropdown;