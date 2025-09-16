import React from 'react'
import Search from './Search'


const Header = ({searchTerm, setSearchTerm }) => {
    return (
        <header><img src= "/hero.png" alt= "hero" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></header>
    )
}
export default Header
