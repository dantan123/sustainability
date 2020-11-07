import React, { useState, useEffect } from 'react'
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
  const [score, setScore] = useState(0)
  const [card, setCard] = useState(null)
  const [clickedCards, setClickedCards] = useState([])

  const handleScore = () => {
    if (clickedCards.includes(card) == false) {
      setScore(score+1)
    }
  }

  return (
    <div className="cards">
      <h1 id="quiz-header"> Sustainability Quiz </h1>
      <div className="container" onClick={handleScore}>
        {
          Data.map((item, index) => (
            <Card key={index} item={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default Cards
