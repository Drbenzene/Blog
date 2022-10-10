import React from 'react'

export const Button = ({action, className}) => {
  return (
    <div>
        <button className={className}>{action}</button>
    </div>
  )
}

