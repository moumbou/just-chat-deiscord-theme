import React from 'react';
import Avatar from '@mui/material/Avatar'
import { VscDebugDisconnect } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { setToken, selectUser } from '../../features/userSlice'
import { useSelector } from 'react-redux';
import { resetChannel } from '../../features/appSlice';

function ProfileRooms() {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const logout = () => {
    localStorage.setItem('token', '')
    dispatch(setToken(''))
    dispatch(resetChannel())
  }

  return <div className='profile_rooms'>

  <div className='profile_info'>
    <Avatar src={require(`../../Imgs/avatars/${user.avatar}`)} alt="avatar" />
    <div>
      <p>{user.username}</p>
      <small>#{user.uid}</small>
    </div>
  </div>

  <VscDebugDisconnect 
    size={25} 
    className='disconnect_icon'
    onClick={logout}
  />

  </div>;
}

export default ProfileRooms;
