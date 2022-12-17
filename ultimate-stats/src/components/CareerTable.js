import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
//import tableData1 from "../data.json";
import axios from "axios";
import '../App.css';


const CareerTable = (props) => {
    const [tableData, setTableData] = useState([]);
    
    let columns = [];
    useEffect(() => {
        axios.get(`/statranked/${props.season}`) // your url may look different
        .then(data => setTableData(data.data)) // set data to state
    }, []);
    console.log(tableData);
    //let headers = await fetch(`/statsheaders/${props.table}`);
    //let tableData1 = await fetch(`/statsranked/${headers[9]}/${props.season}`);
    columns = [
        { label: "NAME", accessor: "player_name" },
        { label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "min" },
        { label: "FGM", accessor: "fgm" },
        { label: "FGA", accessor: "fga" },
        { label: "FG PCT", accessor: "fg_pct" },
        { label: "FG3M", accessor: "fg3m" },
        { label: "FG3A", accessor: "fg3a" },
        { label: "FG3 PCT", accessor: "fg3_pct" },
        { label: "FTM", accessor: "ftm" },
        { label: "FTA", accessor: "fta" },
        { label: "FT PCT", accessor: "ft_pct" },
        { label: "OREB", accessor: "oreb" },
        { label: "DREB", accessor: "dreb" },
        { label: "REB", accessor: "reb" },
        { label: "AST", accessor: "ast" },
        { label: "STL", accessor: "stl" },
        { label: "BLK", accessor: "blk" },
        { label: "TO", accessor: "to" },
        { label: "+/-", accessor: "plus_minus" },
    ];
    /*} else if (props.table === 'boxScores') {
        useEffect(() => {
            axios.get(`/statranked/boxScores/${props.season}`) // your url may look different
            .then(data => setTableData(data.data)) // set data to state
        }, []);
        console.log(tableData);
        //let headers = await fetch(`/statsheaders/${props.table}`);
        //let tableData1 = await fetch(`/statsranked/${headers[9]}/${props.season}`);
        console.log(props.table);

        columns = [
            { label: "NAME", accessor: "player_name" },
            { label: "TEAM", accessor: "team_abbreviation" },
            { label: "MIN", accessor: "min" },
            { label: "E_OFF_RATING", accessor: "e_off_rating" },
            { label: "OFF_RATING", accessor: "off_rating" },
            { label: "E_DEF_RATING", accessor: "e_def_rating" },
            { label: "DEF_RATING", accessor: "def_rating" },
            { label: "E_NET_RATING", accessor: "e_net_rating" },
            { label: "NET_RATING", accessor: "net_rating" },
            { label: "AST_PCT", accessor: "ast_pct" },
            { label: "AST_TOV", accessor: "ast_tov" },
            { label: "AST_RATIO", accessor: "ast_ratio" },
            { label: "OREB_PCT", accessor: "oreb_pct" },
            { label: "DREB_PCT", accessor: "dreb_pct" },
            { label: "REB_PCT", accessor: "reb_pct" },
            { label: "TM_TOV_PCT", accessor: "tm_tov_pct" },
            { label: "EFG_PCT", accessor: "efg_pct" },
            { label: "TS_PCT", accessor: "ts_pct" },
            { label: "USG_PCT", accessor: "usg_pct" },
            { label: "E_USG_PCT", accessor: "e_usg_pct" },
            { label: "E_PACE", accessor: "e_pace" },
            { label: "PACE", accessor: "pace" },
            { label: "PACE_PER40", accessor: "pace_per40" },
            { label: "POSS", accessor: "poss" },
            { label: "PIE", accessor: "pie" }

        ];
    }*/
/*
    const columns = [
        { label: "NAME", accessor: "player_name" },
        //{ label: "TEAM", accessor: "team_abbreviation" },
        { label: "MIN", accessor: "avg" },
    ];*/
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;
          let nonNumeric = ['player_id', 'player_name', 'team_id', 'team_abbreviation'];
          if (!nonNumeric.includes(sortField)) {
            if (typeof a[sortField] === 'string') {
                a[sortField] = parseFloat(a[sortField]);
            }
            if (typeof b[sortField] === 'string') {
                b[sortField] = parseFloat(b[sortField]);
            }
            a[sortField] = a[sortField].toFixed(2);
            b[sortField] = b[sortField].toFixed(2);            
          }
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "desc" ? 1 : -1)
          );
         });
         setTableData(sorted);
        }
    };

    return (
     <>
      <table className="table">
       <caption>
        Developers currently enrolled in this course, column headers are sortable.
       </caption>
       <TableHead columns={columns} handleSorting={handleSorting}/>
       <TableBody columns={columns} tableData={tableData} />
      </table>
     </>
    );
};

export default CareerTable;