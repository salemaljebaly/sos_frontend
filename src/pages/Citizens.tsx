import React from 'react'
import { useParams } from 'react-router-dom'

function Citizens() {
  const {id} = useParams();
  return (
    <div>Citizens {console.log(id)} </div>
  )
}

export default Citizens