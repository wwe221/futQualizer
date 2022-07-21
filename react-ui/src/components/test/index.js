import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
const columns = [
    {
        field: 'img',
        headerName: 'Image',
        width: 150,
        editable: true,
        renderCell: (params) => <img src={params.value} />, // renderCell will render the component
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
    <div style={{ height: 500, width: '80%' }}>      
      <DataGrid rows={dataGridRows} columns={columns} 
        pageSize={10}
      />
    </div>
  );
}
export default MyTable;