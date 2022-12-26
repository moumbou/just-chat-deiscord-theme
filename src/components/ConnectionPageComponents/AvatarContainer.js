import { Avatar } from '@mui/material';
import React from 'react';
import AvatarsConstants from './AvatarsConstants';


function AvatarContainer({ setProfilePic, setAvatarPickerDisplay, avatarPickerShown }) {

  return <div className='avatars_container' style={{ display: avatarPickerShown ? 'grid' : 'none' }}>
      {AvatarsConstants.map((avatarPic, index) => <Avatar 
      key={index} 
      src={require(`../../Imgs/avatars/${avatarPic}`)} 
      className='avatar_profile'
      onClick={()=> {
                setProfilePic(avatarPic)
                setAvatarPickerDisplay(false)
            }
        }
      />)}
  </div>;
}

export default AvatarContainer;
