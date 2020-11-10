import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <nav>
      <img src="green.png" alt="" width="110px" height="110px"/>
      <ul className="nav-links">
        <Link to='/' className="nav-item">
          <li>Quiz</li>
        </Link>
        <Link to='/map' className="nav-item">
          <li>Map</li>
        </Link>
        <Link to='/weather' className="nav-item">
          <li>Weather</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
