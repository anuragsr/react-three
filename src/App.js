import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Nav from './components/Nav'
import SpaceExplorer from './components/SpaceExplorer'
import AnimatedCharacter from './components/AnimatedCharacter'
import TheRoom from './components/TheRoom'

import './scss/app.scss'

export default function App() {
  return (
    <HashRouter>
      <Nav/>      
      <Switch>          
        <Route path="/space-ex" component={SpaceExplorer}/>        
        <Route path="/anim-char" component={AnimatedCharacter}/>     
        <Route path="/the-room" component={TheRoom}/>     
        <Redirect from="*" to="/space-ex"/>
      </Switch>
    </HashRouter>
  )
}