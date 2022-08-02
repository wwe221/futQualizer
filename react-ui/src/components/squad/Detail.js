import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { Container } from '@mui/material';
import Grid from "@mui/material/Grid";
import { useSearchParams } from "react-router-dom"
import axios from '../../lib/axios'
import PlayerCard from '../player/PlayerCard';

function SquadDetail() {
  const [searchParams, setSearchParams] = useSearchParams()
  const squadId = searchParams.get("squadId")
  const [myTeam, setMyTeam] = useState([]);
  useEffect(() => {
    const squad_url = 'api/squad/' + squadId;
    axios.post(squad_url)
      .then((result) => result.data)
      .then((data) => {
        console.log(data.players)
        setMyTeam(data.players);
      });    
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <Grid
        container
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {[...Array(15).keys()].map(index => (
          <Grid item spacing={{ xs: 12, md: 12 }} xs={2.4} sm={2.4} md={2.4} key={index} id={'playerCard-'+ index}> 
            <PlayerCard player={myTeam[index]}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SquadDetail;