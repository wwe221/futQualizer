import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import axios from "axios";
import cookie from "react-cookies";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
const columns = [   
    {
      field: "player",
      headerName: "Player",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.img} variant="square"/>
             {params.row.name}
          </>
        );
      }
    },  
    { field: 'position', headerName: 'Position', width: 100 },
    { field: 'rating', headerName: 'AGE', width: 100 },
    { field: 'version', headerName: 'version', width: 150 },
    {
      field: 'Action',
      headerName: 'Team에 추가',
      renderCell: (params) => {
        const onClick = (e) => {
          const data = {playerId: params.row.id,};
          const headers = {                           
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': cookie.load("csrftoken"),
          };
          axios.post('player/addMyteam', data, { headers })
          .then((response)=>{
            if(response.status == 200){
              
            }
          })
        }
        return  (
        <Button variant="outlined" onClick={onClick}>
            <AddIcon/>
        </Button>
        )
      }
    },
];
         
function MyTable() {
  const [dataGridRows, setDataGridRows] = useState([]);
  const [myTeam, setMyteam] = useState([]);


  useEffect(() => {
    const url = 'player/all';
    fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
        data.players.forEach(player=>{                
            setDataGridRows(dataGridRows => [...dataGridRows, player]);
        })
    });       
    const squad_url = 'squad/myteam';
    axios.post(squad_url,    
      {
        headers: {
            'X-CSRFTOKEN': cookie.load("csrftoken"),
        },
      },
    ).then((response) => console.log(response));
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>      
      <DataGrid rows={dataGridRows} columns={columns} 
        pageSize={10}
      />
    </div>
  );
}
export default MyTable;