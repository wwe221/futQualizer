import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import axios from "../../lib/axios";
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
    { field: 'rating', headerName: 'Rating', width: 100 },
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
          axios.post('api/player/addMyteam', data)
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
  
  useEffect(() => {
    fetch('api/player/all')
    .then((response)=> response.json())
    .then((data)=>{
        data.players.forEach(player=>{                
            setDataGridRows(dataGridRows => [...dataGridRows, player]);
        })
    });
    axios.post('api/squad/myteam')
    .then((response) => console.log(response));
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