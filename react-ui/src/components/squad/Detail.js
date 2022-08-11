import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { Container } from '@mui/material';
import { useSearchParams } from "react-router-dom"
import axios from '../../lib/axios'

import FormationMaker from './Formation';
function SquadDetail() {
  const [searchParams, setSearchParams] = useSearchParams()
  const squadId = searchParams.get("squadId")
  const [squad, setSquad] = useState({});
  useEffect(() => {
    const squad_url = 'api/squad/' + squadId;
    axios.post(squad_url)
      .then((result) => result.data)
      .then((data) => {
        console.log("DETAIL", data)
        setSquad(data);        
      });    
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>     
        <FormationMaker squad={squad}/>
    </div>
  );
}

export default SquadDetail;