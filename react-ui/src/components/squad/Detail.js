import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
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
        console.log(data);
        data.players.forEach(player => {
          setMyTeam(myTeam => [...myTeam, player]);
        });
      });
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {Array.from(myTeam).map((player, index) => (
          <Grid item xs={2.4} sm={2.4} md={2.4} key={index}>
            <PlayerCard player={player}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SquadDetail;