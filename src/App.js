import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' //might use it
import MapForm from './MapForm'
import Cards from './Cards'
import Nav from './Nav'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
            <Route path='/' exact component={Cards}/>
            <Route path='/map' exact component={MapForm}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
