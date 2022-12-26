import { Avatar } from '@mui/material';
import React from 'react';

function Message({ message, avatar, timeStamp, userName }) {
  return <div className='message_container'>
      <Avatar src={require(`../../Imgs/avatars/${avatar}`)} alt={userName}/>
      <div className="message_content">
          <div className="message_info">
              <p className="user_info">{userName}</p>
              <small className="timestamp">{timeStamp}</small>
          </div>
          <p className='message'>{message}</p>
      </div>
  </div>;
}

export default Message;
