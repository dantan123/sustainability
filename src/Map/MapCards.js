import React, {useState} from 'react';
import {Grid, Card, CardContent, CardMedia, CardActions, Typography, Collapse, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import styles from './MapCards.module.css';
import cx from 'classnames';
import clsx from 'clsx';
import CardData from './data/parkcards.json';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const MapCard = ({item}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(prev => !prev);
  };

  return (
      <Grid item component={Card} xs={5} md={4} className={cx(styles.card, styles.parks)}>
        <CardMedia
          image={item.imageFileName}
          title={item.imageTitle}
          height="140"
          alt=""
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {item.bodyHeader}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.bodyContent}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {item.detail}
            </Typography>
          </CardContent>
        </Collapse>
      </Grid>
  )
}

export const MapCards = () => {
  return (
    <div className={styles.container}>
      <Grid container spacing={2} justify='left'>
      {
        CardData.map((item, index) => (
          <MapCard key={index} item={item} />
        ))
      }
      </Grid>
    </div>
  )
}
