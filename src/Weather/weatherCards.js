import React from 'react'
import {Grid, Card, CardContent, CardMedia, CardActions, CardActionArea, Typography, Collapse, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Data from './data/weatherCards.json'

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: '8%',
  },
  card: {
    marginTop: '3%',
    marginBottom: '5%',
    marginLeft: '3%',
    borderBottom: '10px solid green',
    borderRadius: 16,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  }
}));

export const WeatherCards = ({ data : {current} }) => {
  const classes = useStyles();

  if (current) {
    return (
    <Grid container spacing={5} justify='start' className={classes.container}>
      <Grid item component={Card} xs={5} md={2} className={classes.card}>
        <CardMedia
          component='img'
          image='temperature.png'
          height='120'
        />
          <CardContent>
            <Typography color='h2' gutterBottom> Temperature </Typography>
            <Typography variant='h5'> {current.temp} </Typography>
          </CardContent>
      </Grid>
      <Grid item component={Card} xs={5} md={2} className={classes.card}>
        <CardMedia
          component='img'
          image='humidity.png'
          height='120'
        />
        <CardContent>
          <Typography color='h2' gutterBottom> Humidity </Typography>
          <Typography variant='h5'> {current.humidity} </Typography>
        </CardContent>
      </Grid>
      <Grid item component={Card} xs={5} md={2} className={classes.card}>
        <CardMedia
          component='img'
          image='anemometer.png'
          height='120'
        />
        <CardContent>
          <Typography color='h2' gutterBottom> Wind Speed </Typography>
          <Typography variant='h5'> {current.wind_speed} </Typography>
        </CardContent>
      </Grid>
      <Grid item component={Card} xs={5} md={2} className={classes.card}>
        <CardMedia
          component='img'
          image='barometer.png'
          height='120'
        />
        <CardContent>
          <Typography color='h2' gutterBottom> Pressure </Typography>
          <Typography variant='h5'> {current.pressure} </Typography>
        </CardContent>
      </Grid>
    </Grid>
    )
  } else {
    return null;
  }
}
