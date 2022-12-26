import React, { useEffect, useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi'
import { AiFillCaretRight } from 'react-icons/ai'
import Channel from './Channel';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/userSlice';
import axios from '../../server/axios'
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.PUSHER_ID_KEY, {
  cluster: 'eu'
});

function BodyRooms({ setModalDisplay }) {

  const [rooms, setRooms] = useState([])
  const token = useSelector(selectToken)

  useEffect(() => {

    const getChannels = () => {
      axios({
        method: 'GET',
        headers: {
          "x-access-token": token
        },
        url: '/channels'
      }).then((res) => {
  
        const data = res.data
        const reverseData = data.slice(0).reverse()
        setRooms(reverseData)
  
      }).catch((err) => {
        console.log(err)
      })
    }

    getChannels()

    const channel = pusher.subscribe('channels');
    channel.bind('newChannel', function(data) {
      getChannels()
    });

  }, [token])

  return <div className='body_rooms'>
      <button onClick={() => setModalDisplay(true)}>
        <AiFillCaretRight size={15} />
        <span>Add room</span>
        <BiAddToQueue size={20} />
      </button>
      <div className='channels_rooms'>
        {
          rooms.map(({ _id, channelName }) => <Channel 
            key={_id} 
            channel_name={channelName}
            channel_id={_id}
          />)
        }
      </div>
  </div>;
}

export default BodyRooms;
