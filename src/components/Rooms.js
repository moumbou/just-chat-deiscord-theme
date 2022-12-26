import React from 'react';
import '../style/Rooms.css'
import BodyRooms from './RoomsComponents/BodyRooms';
import HeaderRooms from './RoomsComponents/HeaderRooms';
import ProfileRooms from './RoomsComponents/ProfileRooms';

function Rooms({ setModalDisplay }) {
  return <div className='rooms'>
    <HeaderRooms />
    <BodyRooms  setModalDisplay={ setModalDisplay } />
    <ProfileRooms />
  </div>;
}

export default Rooms;
