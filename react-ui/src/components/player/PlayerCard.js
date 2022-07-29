import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  font: {
    position: "absolute",
    top: "10%",
    width: "100%",
    textAlign: "center",
    color: "black",
    backgroundColor: "none",
    fontFamily: "Comic Sans MS"
  }
}));

export default function Player(prop) {
    const playerInfo = prop.player;
    const player = playerInfo.player
    const classes = useStyles();
    return (
      <Card className={classes.root} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="100%"
          image={player.img}
          alt="green iguana"
        />
        <Typography gutterBottom variant="h5" component="div">
          {playerInfo.position}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={classes.font}>
          {player.name}
        </Typography>        
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

