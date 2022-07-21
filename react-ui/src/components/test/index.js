import { DataGrid } from '@material-ui/data-grid';
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
    { field: 'age', headerName: 'AGE', width: 170 },
];
function MyTable() {
    const [dataGridRows, setDataGridRows] = useState([]);
    function SetPlayerData(){
        const url = 'player/all';
        fetch(url)
        .then((response)=> response.json())
        .then((data)=>{
            data.players.forEach(player=>{
                let tmpPlayer = {
                    id: player.id,
                    name : player.name,
                    img :player.img,
                    rating: player.rating
                }
                setDataGridRows(dataGridRows => [...dataGridRows, tmpPlayer]);            
            })
        });
    }
    useEffect(() => {
        SetPlayerData();
      }, []);
  return (
    <div style={{ height: 500, width: '80%' }}>      
      <DataGrid rows={dataGridRows} columns={columns} 
        pageSize={5}
      />
    </div>
  );
}
export default MyTable;