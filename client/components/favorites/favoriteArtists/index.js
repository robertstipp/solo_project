import React from 'react'
import FavoriteArtist from './favoriteArtist'

const FavoriteArtists = ({artists}) => {
  return (
    <div>
      {artists.map((artist,index)=>{
      return <FavoriteArtist key={index} artist={artist}/>
    })}
    </div>
    
  )
}

export default FavoriteArtists