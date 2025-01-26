import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {

  const usuario = <FontAwesomeIcon icon={faUser} />

  return (
    <div className='profile'>
      <div className='logeado'>
        <p className='correo'> usuario@correo.com </p>
        <p className='cerrarSesion'>  Cerrar Sesión </p>
      </div>
      <p className='usuario'>{usuario}</p>

    </div>
  )
}

export default Profile