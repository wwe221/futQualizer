/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
const authorsTableData = {
  columns: [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    
  ],
};

function Author({ image, name, version }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {version}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}
function getPlayers() {
  const url = 'player/all';
  fetch(url)
  .then((response)=> response.json())
  .then((data)=>{    
    let players = data.players
    players.forEach(player=>{      
      let tmp = {
        author: <Author image={player.img} name={player.name} version={player.version} />,
        function: <Function job="Manager" org="Organization" />,
        status: (
          <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            23/04/18
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Edit
          </SoftTypography>
        ),
      }
      authorsTableData.rows.push(tmp)    
    })
  });
}
getPlayers();
function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}


export default authorsTableData;
