import React from 'react'

const NotFound = () => {
  return (
    <div style={style}>
      <h3 style={h3style}>404 Page Not Found</h3>
    </div>
  )
}

const style = {
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 10rem)'
}

const h3style = {
  transform: 'translateY(-10rem)',
  fontWeight: 600
}

export default NotFound
