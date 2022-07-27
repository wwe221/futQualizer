import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import axios from "../../lib/axios";
const columns = [   
    {
      field: "name",
      headerName: "name",
      width: 200,     
    },  
    { field: 'formation', headerName: 'formation', width: 100 },
    {
      field: 'Action',
      headerName: '',
      renderCell: (params) => {
        const onClick = (e) => {
          axios.post('api/squad/test')
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
         
function Squad() {
  const [dataGridRows, setDataGridRows] = useState([]);
  
  useEffect(() => {    
    const squad_url = 'api/squad/list';
    axios.post(squad_url)     
    .then((result)=>result.data)
    .then((data)=>{                  
      data.squad_list.forEach(player=>{
          setDataGridRows(dataGridRows => [...dataGridRows, player]);
      })
    });
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>      
      <DataGrid rows={dataGridRows} columns={columns} 
        pageSize={10}
      />
    </div>
  );
}
export default Squad;