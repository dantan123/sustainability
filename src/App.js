import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' //might use it
import Map from './Map/MapIndex'
import Cards from './Cards/Cards'
import Nav from './Nav/Nav'
import Weather from './Weather/Weather'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
            <Route path='/' exact component={Map}/>
            <Route path='/weather' exact component={Weather}/>
            <Route path='/quiz' exact component={Cards}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
