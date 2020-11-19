import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <div>
      <nav>
        <img src="green.png" alt="" className="navLogo"/>
        <ul className="nav-links">
          <Link to='/' className="nav-item">
            <li>Map</li>
          </Link>
          <Link to='/weather' className="nav-item">
            <li>Weather</li>
          </Link>
          <Link to='/quiz' className="nav-item">
            <li>Quiz</li>
          </Link>
        </ul>
      </nav>
      <hr className='break'/>
    </div>
  )
}

export default Nav
