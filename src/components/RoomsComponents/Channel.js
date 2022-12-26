import React from 'react';
import { GrChannel } from 'react-icons/gr'
import { useDispatch } from 'react-redux';
import { setChannelID, setChannelName } from '../../features/appSlice';

function Channel({ channel_name, channel_id }) {

  const dispatch = useDispatch()

  const setChannel = (e) => {
    let target = null
    const className = e.target.className
    if(!className) target = e.target.parentElement
    else target = e.target

    document.querySelectorAll('.channel').forEach((div) => {
      div.classList.remove('selected_room')
    })

    target.classList.add('selected_room')
    dispatch(setChannelID(channel_id))
    dispatch(setChannelName(channel_name))
  }

  return <div className='channel'
    onClick={setChannel}
  >
      <GrChannel style={{ pointerEvents: "none" }} />
      <span>{channel_name && channel_name.length > 25 ? 
        `${channel_name.substring(0, 25)}...` :
        channel_name  
      }</span>
  </div>;
}

export default Channel;
