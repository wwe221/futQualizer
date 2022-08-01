import { DataGrid, GridToolbarQuickFilter, GridLinkOperator, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import * as React from 'react'
import axios from "../../lib/axios";
import cookie from "react-cookies";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}
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
    { field: 'name', headerName: 'name', width: 100, hide:true},
    { field: 'position', headerName: 'Position', width: 100 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'version', headerName: 'version', width: 150 },
    { field: 'club', headerName: 'Club', width: 150 },
    { field: 'nation', headerName: 'nation', width: 100 },
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
  const customColumns = React.useMemo(
    () =>
      columns        
        .map((column) => {
          if (column.field !== 'name') {
            return {
              ...column,
              getApplyQuickFilterFn: undefined,
            };
          }
          return column;
        }),
    [columns],
  );
  useEffect(() => {
    fetch('api/player/all')
    .then((response)=> response.json())
    .then((data)=>{
        data.players.forEach(player=>{                
            setDataGridRows(dataGridRows => [...dataGridRows, player]);
        })
    });    
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>      
      <DataGrid rows={dataGridRows} columns={customColumns} 
        pageSize={10} components={{ Toolbar: QuickSearchToolbar }}
      />
    </div>
  );
}
export default MyTable;