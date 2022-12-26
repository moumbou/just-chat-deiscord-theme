import React from 'react';
import { IoChatbubblesSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { select_channel_name } from '../../features/appSlice';

function HeaderChannel() {

  const channel = useSelector(select_channel_name)

  return <div className='header_channel'>
    <div className="chat_name">
      <IoChatbubblesSharp />
      <span>{channel ? channel : 'select a channel, would you ?'}</span>
    </div>
  </div>;
}

export default HeaderChannel;
