import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <nav>
      <img src="green.png" alt="" width="110px" height="110px"/>
      <ul className="nav-links">
        <Link to='/'>
          <li className="nav-item">Quiz</li>
        </Link>
        <Link to='/map'>
          <li className="nav-item">Map</li>
        </Link>
        <Link to='/weather'>
          <li className="nav-item">Weather</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
