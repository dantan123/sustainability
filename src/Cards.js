import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip'
import Data from './data/questions.json'
import './Cards.css'

const Card = ({item, checked}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    checked.push(item)
  }

  return (
    <div className="card" onClick={handleFlip}>
      <ReactCardFlip isFlipped={isFlipped}>
          <div>
              <h2> {item.question} </h2>
          </div>
          <div>
              <h2> {item.answer} </h2>
          </div>
      </ReactCardFlip>
    </div>
  )
}

const Cards = () => {
  const [score, setScore] = useState(0)
  const checked = []

  return (
    <div className="cards">
      <h1 id="quiz-header"> Sustainability Quiz </h1>
      <div className="container">
        {
          Data.map((item, index) => (
            <Card key={index} item={item} checked={checked}/>
          ))
        }
      </div>
    </div>
  )
}

export default Cards
