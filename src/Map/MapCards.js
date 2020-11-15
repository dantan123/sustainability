import React, {useState} from 'react';
import {Grid, Card, CardContent, CardMedia, CardActions, CardActionArea, Typography, Collapse, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useSlopeCardMediaStyles } from '@mui-treasury/styles/cardMedia/slope';
import Color from 'color';
import styles from './MapCards.module.css';
import cx from 'clsx';
import clsx from 'clsx';
import CardData from './data/parkcards.json';

// material-ui lib styling
const useStyles = makeStyles((theme) => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  title: {
    textTransform: 'uppercase'
  },
  card: {
    marginRight: '12%',
    marginTop: '1%',
    marginBottom: '5%',
    height: '100%',
    minWidth: '30%',
    opacity: '90%',
    borderBottom: '10px solid green',
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color('black')
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  },
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
  const mediaStyles = useSlopeCardMediaStyles();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(prev => !prev);
  };

  return (
    <Grid item component={Card} xs={5} md={4} className={classes.card}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          classes={mediaStyles}
          image={item.imageFileName}
        />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
            {item.bodyHeader}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.bodyContent}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
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
      </CardActionArea>
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
