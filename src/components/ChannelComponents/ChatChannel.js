import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { select_channel_id } from '../../features/appSlice';
import { selectToken } from '../../features/userSlice';
import axios from '../../server/axios'
import Message from './Message';
import Pusher from 'pusher-js'

const pusher = new Pusher(process.env.PUSHER_ID_KEY, {
  cluster: 'eu'
});

function ChatChannel() {

  const channel_id = useSelector(select_channel_id)
  const [messages, setMessages] = useState([])
  const token = useSelector(selectToken)


  useEffect(() => {


    //* GET ALL MESSAGES
    const getMessages = (channel_id) => {
      axios.get(`/channel/${channel_id}`, {
        headers: {
          "x-access-token": token
        }
      }).then((res) => {
        const { messages } = res.data
        const reverseArray = messages.slice(0).reverse()
        setMessages(reverseArray)
      }).catch(() => {
      })
    }

    //* GET ONE MESSAGE
    const getMessage = (message_id) => {
      axios.get(`/get/message/${message_id}`, {
        headers: {
          "x-access-token": token
        }
      }).then((res) => {
        const { message } = res.data
        setMessages(messages => [message[0], ...messages])
      }).catch(() => {
      })
    }

    getMessages(channel_id)

    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', (data) => {
      const { fullDocument } = data.change
      const { _id, channel } = fullDocument
      if(channel === channel_id) getMessage(_id)
    })
  }, [channel_id, token])

  return <div className='chat_channel'>
    {
      messages.reverse().map(({ avatar, message, timeStamp, userName, _id }) => <Message 
        key={_id} 
        message={ message }
        avatar={ avatar }
        timeStamp={ timeStamp }
        userName={ userName }
      />)
    }
  </div>;
}

export default ChatChannel;
