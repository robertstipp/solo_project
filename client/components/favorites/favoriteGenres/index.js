import React from 'react'
import FavoriteGenre from './favoriteGenre'
const FavoriteGenres = ({genres}) => {
  return (
    <div>
      {genres.map((genre,index)=>{
        return <FavoriteGenre key={index} genre={genre} />
      })}
    </div>
    
  )
}

export default FavoriteGenres