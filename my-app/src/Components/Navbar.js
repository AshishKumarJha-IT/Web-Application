import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex', marginTop:'1rem',marginLeft:'1rem'}}>
        <Link to='/' style={{textDecoration:'none'}}><h3>Movies App</h3></Link>
        <Link to='/Favourite' style={{textDecoration:'none'}}><h3 style={{marginLeft:'1rem', marginLeft:'1.5rem'}}>Favourites</h3></Link>
    </div>
    )
  }
}
