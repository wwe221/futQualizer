import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import PlayerCard from '../player/PlayerCard';
function FormationMaker(prop) {
    const FORMATION_POSITION = {
        "4-4-2": [1, 3, 5, 6, 8, 9, 10, 11, 13, 14, 15],
        "4-3-3": [0, 2, 4, 6, 7, 8, 10, 11, 13, 14, 15]
    };
    const myTeam = prop.squad.players
    const formation = prop.squad.formation    
    const positionList = FORMATION_POSITION[formation];    
    return (
        <Grid
            container
            columns={{ xs: 12, sm: 12, md: 12 }}
        >
            { positionList &&
                [...Array(15).keys()].map(index => (
                    <Grid item spacing={{ xs: 12, md: 12 }} xs={2.4} sm={2.4} md={2.4} key={index} id={'playerCard-' + index}>
                        {
                            positionList.includes(index) && <PlayerCard player={myTeam[index]}/>
                        }
                    </Grid>
                ))
            }
        </Grid>
    )
}
export default FormationMaker;