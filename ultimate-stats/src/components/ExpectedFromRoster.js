import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";
import ExpectedResults from "./ExpectedResults";

const ExpectedFromRoster = ({ totalMins, setTotalMins, totalStat, setTotalStat, gameId, previousSeason, selectedSeason, playerId, H_or_V, teamId }) => {
    
    const [playerAverages, setPlayerAverages] = useState([]);

    useEffect(() => {
        const getStats = async() => {
            
            if (gameId !== '1') {
                let results = await axios.get(`/boxScoresTraditional/averages/82games/${gameId}/${playerId}/${selectedSeason}/${H_or_V}`)
                if (results.data.length > 0) {
                    setPlayerAverages(results.data);
                } else {
                    let results = await axios.get(`/boxScoresTraditional/averages/82games/${playerId}/${previousSeason}/${H_or_V}`)
                    if (results.data.length > 0) {
                        setPlayerAverages(results.data);
                    } else {
                        setPlayerAverages([{
                            "+/-": 0,
                            ast: 0,
                            blk: 0,
                            dreb: 0,
                            fg3_pct: 0,
                            fg3a: 0,
                            fg3m: 0,
                            fg_pct: 0,
                            fga: 0,
                            fgm: 0,
                            ft_pct: 0,
                            fta: 0,
                            ftm: 0,
                            min: 0,
                            oreb: 0,
                            pf: 0,
                            playerId: 0,
                            player_name: 'NO STATS FOR PLAYER',
                            pts: 0,
                            reb: 0,
                            stl: 0,
                            team_abbreviation: 'NO STATS FOR PLAYER',
                            team_id: 0,
                            to: 0
                        }])
                    }
                }
            } else {
                let results = await axios.get(`/boxScoresTraditional/averages/82games/${playerId}/${previousSeason}/${H_or_V}`)
                if (results.data.length > 0) {
                    setPlayerAverages(results.data);
                }
            }

        }
        if (playerId) {
            getStats();

        }
    }, [playerId])



    return (
        <div>
            {playerAverages.length > 0 ? Object.keys(playerAverages[0]).map((keyName, i) => (
                <li key={i}>
                    <span>{keyName}: {playerAverages[0][keyName]}</span>
                    <br></br>
                </li>
            )) : 'loading'}
        </div>
    )
}

export default ExpectedFromRoster;