import React, { useState, useCallback } from 'react'
import ReactCardFlip from 'react-card-flip'
import Data from './data/questions.json'
import './Cards.css'

const Card = ({item}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="card" onClick={() => setIsFlipped((prev) => !prev)}>
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
  return (
    <div className="cards">
      <h1 id="quiz-header"> Sustainability Quiz </h1>
      <div className="container">
        {Data.map((item, index) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  )
}

export default Cards
