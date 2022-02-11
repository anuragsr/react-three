import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
	return (
	  <div className="nav-link">
	  	<NavLink to="/space-ex">SpaceExplorer</NavLink>
	  	<NavLink to="/anim-char">AnimatedCharacter</NavLink>
      <NavLink to="/the-room">TheRoom</NavLink>
	  </div>
	)
}
