import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from 'react';
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
    { field: 'name', headerName: 'NAME', width: 170 },
    { field: 'rating', headerName: 'AGE', width: 100 },
    { field: 'version', headerName: 'version', width: 150 },
];
function MyTable() {
    const [dataGridRows, setDataGridRows] = useState([]);
    function SetPlayerData(){
        const url = 'player/all';
        fetch(url)
        .then((response)=> response.json())
        .then((data)=>{
            data.players.forEach(player=>{                
                setDataGridRows(dataGridRows => [...dataGridRows, player]);
            })
        });
    }
    useEffect(() => {
        SetPlayerData();
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