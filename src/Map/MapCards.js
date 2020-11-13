import React from 'react';
import {Card, CardContent, CardMedia, CardActionArea, Typography, Grid} from '@material-ui/core';
import styles from './MapCards.module.css';
import cx from 'classnames';

export const MapCards = () => {
  return (
    <div className={styles.container}>
      <Grid container spacing={2} justify='left'>
        <Grid item component={Card} xs={5} md={4} className={cx(styles.card, styles.parks)}>
          <CardMedia
            image="stanley-park.jpg"
            title="Stanley Park"
            height="140"
            alt=""
            component="img"
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              Parks
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Vancouver's Parks are some of the best.
            </Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={5} md={4} className={cx(styles.card, styles.biking)}>
        <CardMedia
          image="biking.jpg"
          title="Biking"
          height="140"
          alt=""
          component="img"
        />
          <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                Biking
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Biking is a wonderful sport.
             </Typography>
           </CardContent>
         </Grid>

      </Grid>
    </div>
  )
}
