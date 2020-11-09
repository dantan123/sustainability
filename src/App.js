import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' //might use it
import MapForm from './Map/MapForm'
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
            <Route path='/' exact component={Cards}/>
            <Route path='/map' exact component={MapForm}/>
            <Route path='/weather' exact component={Weather}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
